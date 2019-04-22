import {Injectable} from '@angular/core';
import {Message} from 'ng-chat';
import {UserService} from './user.service';
import {Observable, of, Subject} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {firestore} from 'firebase';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    // mockedParticipants: IChatParticipant[];

    private _newChat$ = new Subject<User>();
    newChat$ = this._newChat$.asObservable();

    constructor(private db: AngularFirestore,
                private userService: UserService,
                private auth: AuthService) {
        // const user = this.auth.getSnapshotUser();
        // console.log(user);
        // this.mockedParticipants = [
        //     {
        //         participantType: ChatParticipantType.User,
        //         id: 1,
        //         displayName: 'Arya Stark',
        //         avatar: 'https://66.media.tumblr.com/avatar_9dd9bb497b75_128.pnj',
        //         status: ChatParticipantStatus.Online
        //     },
        // ];
    }

    // registerController(chatController: IChatController) {
    //     this.chatControllerSource.next(chatController);
    //     console.log('chat controller value registered:');
    //     console.log(this.chatControllerSource.value);
    // }
    // getChatController(){
    //     return this.chatControllerSource.value;
    // }

    // async chatWith(uid: string) {
    //     // TODO: create Chat in db
    //
    //     console.log(this._chatController);
    //     const user = await this.userService.getUserByIdAsPromise(uid);
    //
    //     this._chatController.triggerOpenChatWindow({
    //         displayName: user.displayName,
    //         id: user.uid,
    //         participantType: ChatParticipantType.User,
    //         avatar: user.photoURL,
    //         status: ChatParticipantStatus.Offline
    //     });
    // }

    getMessageHistory(destinataryId: any): Observable<Message[]> {
        return this.auth.user$.pipe(
            switchMap(user => {
                return this.db.doc<Message[]>(`chats${user.uid + destinataryId}`).valueChanges();

            })
        );
    }

    listFriends() {
        return of([]);
        // return this.auth.user$.pipe(
        //     switchMap(user => this.db.doc(`friends/${user.uid}`).valueChanges()),
        //     map((friendIds: string[]) => )
        // );
    }

    async sendMessage(message: Message) {
        const ref = this.db.doc(`chats/${message.fromId + message.toId}`);
        await ref.update(firestore.FieldValue.arrayUnion(message));
        const replyMessage = new Message();
        replyMessage.message = message.message;
        replyMessage.dateSent = new Date();
        replyMessage.fromId = message.toId;
        replyMessage.toId = message.fromId;

        // this.onMessageReceived(this.mockedParticipants[0], replyMessage);
    }

    // listFriends(): Observable<ParticipantResponse[]> {
    //     new ParticipantResponse();
    //     this.db.collection('chats', ref => {
    //         return ref.where('messages/fromId', 'array-contains', this.auth.getSnapshotUser().uid);
    //     }).valueChanges().pipe(
    //         switchMap(async (chats: Chat[]) => {
    //             const userIds: string[] = chats.map((messages: Message[]) => {
    //                 return messages.map((message: Message) => message.toId as string);
    //             });
    //             const users: User[] = await userIds.map(id => this.userService.getUserById(id));
    //             const participants: ParticipantResponse[] = users.map((user) => {
    //                 const participant = new ParticipantResponse();
    //                 participant.participant = {};
    //             });
    //             const participant = new ParticipantResponse();
    //             // map chatElement to other user
    //         })
    //     );
    //     // map response to ParticipantResponse
    // }

    openChat(otherUser: User) {
        this._newChat$.next(otherUser);
    }
}
