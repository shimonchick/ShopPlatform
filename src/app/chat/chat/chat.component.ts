import {Component, OnInit} from '@angular/core';
import {map, switchMap, tap} from 'rxjs/operators';
import {Chat} from '../../models/chat';
import {orderChatIds, userToKendoUser} from '../utils';
import {Message, SendMessageEvent} from '@progress/kendo-angular-conversational-ui';
import {User} from '../../models/user';
import {BehaviorSubject, combineLatest, merge, Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ChatMediatorService} from '../mediator/chat-mediator.service';
import {firestore} from 'firebase/app';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    messages$: Observable<Message[]>;
    chatRef$ = new BehaviorSubject<AngularFirestoreDocument>(null);

    constructor(public auth: AuthService,
                private db: AngularFirestore,
                private mediatorService: ChatMediatorService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            console.log(params);
        });
        this.messages$ = combineLatest(
            this.auth.user$.pipe(map(user => user.uid)),
            merge(
                this.mediatorService.selectedUserId$,
                this.activatedRoute.paramMap.pipe(map(it => it.get('id')))
            )
        ).pipe(
            map(([userId, selectedUserId]) => {
                console.log(`new id selected: ${selectedUserId}`);
                /*
                    Change the chat reference every time we switch to a new user
                 */
                console.log(selectedUserId);
                console.log(userId);
                const [chatId1, chatId2] = orderChatIds(userId, selectedUserId);
                const ref = this.db.doc<Chat>(`chats/${chatId1}_${chatId2}`);
                this.chatRef$.next(ref);
                return ref;
            }),
            switchMap(ref => ref.valueChanges()),
            map(chat => chat ? chat.messages : []),
            map((messages: any[]) =>
                messages.map(message => {
                    message.timestamp = message.timestamp.toDate();
                    return message;
                }))
        );
    }

    toKendo(user: User) {
        return userToKendoUser(user);
    }

    async sendMessage($event: SendMessageEvent) {
        const ref = this.chatRef$.value;
        console.log(`sending message: ${$event.message}`);
        await ref.set({
            messages: firestore.FieldValue.arrayUnion($event.message)
        }, {merge: true});
    }
}
