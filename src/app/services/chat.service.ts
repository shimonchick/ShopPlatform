import {Injectable} from '@angular/core';
import {IChatParticipant, Message, ParticipantResponse} from 'ng-chat';
import {UserService} from './user.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {firestore} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    mockedParticipants: IChatParticipant[];

    private _newChat$ = new BehaviorSubject<string>(null);
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
        return of(this.mockedParticipants.map(user => {
            const participantResponse = new ParticipantResponse();

            participantResponse.participant = user;
            participantResponse.metadata = {
                totalUnreadMessages: Math.floor(Math.random() * 10)
            };

            return participantResponse;
        }));
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

    //
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

}
