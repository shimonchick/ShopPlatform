import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private _newChat$ = new Subject<User>();
    newChat$ = this._newChat$.asObservable();

    // constructor(private db: AngularFirestore, private auth: AuthService) {
    // }

    // instance: any;
    // create: any;
    // plugin: any;
    // constructor() {
    //     this.instance = ChatEngineCore.create(
    //         {
    //             publishKey: 'YOUR PUBLISH KEY HERE',
    //             subscribeKey: 'YOUR SUBSCRIBE KEY HERE'
    //         },
    //         {
    //             debug: true,
    //             globalChannel: 'chat-engine-angular2-simple'
    //         });
    //     this.create = ChatEngineCore.create.bind(this);
    //     this.plugin = ChatEngineCore.plugin;
    // }

    openChat(otherUser: User) {
        this._newChat$.next(otherUser);
    }
}
