import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AuthProcessService} from 'ngx-auth-firebaseui';
import {Product} from '../models/product';

@Injectable({
    providedIn: 'root'
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
            })
        );
        this.user$.subscribe(user => {
            this.snapshotUser = user;
        });
    }

    canRead(product: Product): boolean {
        const allowed = ['admin', 'buyer', 'seller'];
        return this.checkAuthorization(this.snapshotUser, allowed);
    }

    ///// Role-based Authorization //////

    canEdit(product: Product): boolean {
        return product.seller === this.snapshotUser.uid || this.snapshotUser.roles.admin;
    }

    canDelete(product: Product): boolean {
        return product.seller === this.snapshotUser.uid || this.snapshotUser.roles.admin;
    }

    canCreateProducts() {
        const allowed = ['admin', 'seller'];
        return this.checkAuthorization(this.snapshotUser, allowed);
    }

    private updateUserData({uid, photoURL, displayName, email, phoneNumber}) {
        console.log(`photoURL: ${photoURL}`);
        // Sets user data in firestore on login
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);
        const customUserData = {
            uid: uid,
            photoUrl: photoURL,
            displayName: displayName,
            email: email,
            phoneNumber: phoneNumber,
            roles: {
                buyer: true
            }
        };
        // @ts-ignore
        return userRef.set(customUserData, {merge: true});
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
}
