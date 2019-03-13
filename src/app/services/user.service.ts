import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private db: AngularFirestore
    ) {
    }

    async getUserById(id: string) {
        const snapshot = await this.db.doc<User>(`users/${id}`).get().toPromise();
        return snapshot.data() as User;
    }
}
