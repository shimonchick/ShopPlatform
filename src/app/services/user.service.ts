import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private db: AngularFirestore,
        private auth: AuthService
    ) {
    }

    async getUserByIdAsPromise(id: string) {
        const snapshot = await this.db.doc<User>(`users/${id}`).get().toPromise();
        const snapshotData = snapshot.data() as User;
        console.log(snapshotData);
        return snapshotData;
    }

    getUserById(id: string) {
        return this.db.doc<User>(`users/${id}`).valueChanges();
        // return of(this.auth.getSnapshotUser());
    }
}
