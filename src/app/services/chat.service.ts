import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private _newChat$ = new Subject<User>();
    newChat$ = this._newChat$.asObservable();

    openChat(otherUser: User) {
        this._newChat$.next(otherUser);
    }
}
