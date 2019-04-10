import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {first, share, switchMap} from 'rxjs/operators';
import {AuthProcessService} from 'ngx-auth-firebaseui';
import {Product} from '../models/product';
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
            share() // make it hot baby!!
        );
        this.user$.subscribe(user => {
            this.snapshotUser = user;
        });
    }

    canRead(product: Product): boolean {
        const allowed = ['admin', 'buyer', 'seller'];
        return this.checkAuthorization(this.snapshotUser, allowed);
    }

    canEdit(product: Product): boolean {
        if (!this.isLoggedIn()) { // unauthorised users cannot edit
            return false;
        }
        return product.sellerUid === this.snapshotUser.uid || this.snapshotUser.roles.admin;
    }

    ///// Role-based Authorization //////

    canDelete(product: Product): boolean {
        if (!this.isLoggedIn()) { // unauthorised users cannot edit
            return false;
        }
        return product.sellerUid === this.snapshotUser.uid || this.snapshotUser.roles.admin;
    }

    canCreateProducts() {
        const allowed = ['admin', 'seller'];
        return this.checkAuthorization(this.snapshotUser, allowed);
    }

    getUserAsPromise() {
        return this.user$.pipe(first()).toPromise();
    }

    getSnapshotUser() {
        return this.snapshotUser;
    }

    // private updateUserData({uid, photoURL, displayName, email, phoneNumber}) {
    //     // Sets user data in firestore on login
    //     const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);
    //     const customUserData = {
    //         uid: uid,
    //         photoURL: photoURL,
    //         displayName: displayName,
    //         email: email,
    //         phoneNumber: phoneNumber,
    //         roles: {
    //             buyer: true
    //         }
    //     };
    //     // @ts-ignore
    //     return userRef.set(customUserData, {merge: true});
    // }
    updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
        return userRef.set(user, {merge: true});
    }

    private isLoggedIn() {
        return !!this.snapshotUser;
    }

// determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) {
            return false;
        }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }

    async signOut() {
        await this.ngxAuth.afa.auth.signOut();
        return this.router.navigate(['/']);
    }
}
