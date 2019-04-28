import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

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
        const user: User = await this.db.doc<User>(`users/${id}`).valueChanges().pipe(first()).toPromise();
        console.log(user);
        return user;
    }

    getUserById(id: string): Observable<User> {
        const user = this.db.doc<User>(`users/${id}`).valueChanges();
        console.log('fetched user');
        return user;
    }

}
