// import {Observable, zip} from 'rxjs';
// import {ChatService} from '../services/chat.service';
// import {first, map, scan, switchMap} from 'rxjs/operators';
// import {AuthService} from '../services/auth.service';
// import {AngularFirestore} from '@angular/fire/firestore';
// import {User} from '../models/user';
// import * as firebase from 'firebase';
// import {firestore} from 'firebase';
// import {Chat} from '../models/chat';
// import {messageToFirestoreMessage, userToIChatParticipant} from './utils';

// todo fix

// export class ProductChatAdapter extends ChatAdapter {
//
//     constructor(private chatService: ChatService,
//                 private auth: AuthService,
//                 private db: AngularFirestore) {
//         super();
//     }
//
//
//     getMessageHistory(destinataryId: any): Observable<Message[]> {
//         console.log('gimme the history');
//
//         return this.auth.user$.pipe(
//             switchMap(user => {
//                 return this.db.doc<Chat>(`chats/${user.uid}_${destinataryId}`).valueChanges();
//             }),
//             map(chat => chat ? chat.messages : []),
//             map((messages: any[]) => messages ? messages.map((message) => messageToFirestoreMessage(message)) : []),
//             // scan((acc, cur) => {
//             //     return cur;
//             // })
//             // scan is not the proper way
//             // implement a real chat server
//         );
//     }
//
//
//     listFriends(): Observable<ParticipantResponse[]> {
//         console.log('listing friends');
//         const friendIds$ = this.auth.user$.pipe(
//             switchMap(user => this.db.doc(`friends/${user.uid}`).valueChanges()),
//             map((data) => data ? Object.keys(data) : []),
//         );
//         const friends$ = friendIds$.pipe(
//             switchMap(friendIds => {
//                 return zip(
//                     ...friendIds.map(
//                         friendId => this.db.doc(`users/${friendId}`).valueChanges() as Observable<User>)
//                 );
//             }),
//         );
//         return friends$.pipe(
//             map(friends => {
//                 return friends.map(friend => userToIChatParticipant(friend));
//             })
//         );
//     }
//
//     sendMessage(message: Message) {
//         console.log(message);
//         message.dateSent = firebase.firestore.Timestamp.now().toDate();
//         message.dateSeen = firebase.firestore.Timestamp.now().toDate();
//         // Todo not date.now
//         const ref = this.db.doc(`chats/${message.fromId}_${message.toId}`);
//         ref.set({
//             messages: firestore.FieldValue.arrayUnion(Object.assign({}, message))
//         }, {merge: true});
//     }
// }
