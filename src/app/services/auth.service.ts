import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {first, shareReplay, switchMap} from 'rxjs/operators';
import {AuthProcessService} from 'ngx-auth-firebaseui';
import {CoreModule} from '../core.module';

@Injectable({
    providedIn: CoreModule
})
export class AuthService {

    user$: Observable<User>;
    private snapshotUser: User;

    constructor(private ngxAuth: AuthProcessService,
                private db: AngularFirestore,
                private router: Router) {
        this.ngxAuth.onSuccessEmitter.subscribe(user => {
            console.log('updating user data');
            console.log(user);
            this.updateUserData(user);
        });
        this.user$ = this.ngxAuth.afa.authState.pipe(
            switchMap(user => {
                if (user) {
                    console.log('logged in');
                    return this.db.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }),
            shareReplay(1)
        );
        this.user$.subscribe(user => {
            this.snapshotUser = user;
        });
    }

    isSeller() {
        if (this.snapshotUser.roles.seller) {
            return true;
        }
        return false;
    }

    getUserAsPromise() {
        return this.user$.pipe(first()).toPromise();
    }

    getSnapshotUser() {
        return this.snapshotUser;
    }

    private updateUserData({uid, photoURL, displayName, email, phoneNumber}) {
        // Sets user data in firestore on login
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);
        const customUserData = {
            uid: uid,
            photoURL: photoURL,
            displayName: displayName,
            email: email,
            phoneNumber: phoneNumber,
            roles: {
                buyer: false,
                seller: false
            }
        };
        return userRef.set(customUserData, {merge: true});
    }

    async signOut() {
        await this.ngxAuth.afa.auth.signOut();
        return this.router.navigate(['/']);
    }

}
