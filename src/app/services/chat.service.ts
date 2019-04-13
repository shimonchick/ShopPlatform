import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {firestore} from 'firebase/app';
import {first, map, switchMap} from 'rxjs/operators';
import {combineLatest, merge, Observable, of} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthService,
        private router: Router,
        private userService: UserService
    ) {
    }

    getChat(sellerId) {
        return this.afs
            .collection('chats', ref => ref.where('sellerId', '==', sellerId).limit(1))
            .snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map(a => {
                        const data: Object = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return {id, ...data};
                    });
                }),
                first()
            );
    }

    getChats() {
        return this.auth.user$.pipe(
            switchMap(user => {
                const buyerChats = this.afs.collection('chats', ref => ref.where('buyerId', '==', user.uid));
                const sellerChats = this.afs.collection('chats', ref => ref.where('sellerId', '==', user.uid));
                const buyerChatObservables = buyerChats.snapshotChanges();
                const sellerChatObservables = sellerChats.snapshotChanges();
                return merge(buyerChatObservables, sellerChatObservables)
                    .pipe(
                        map((actions) => {
                                return actions.map(a => {
                                    const data: Object = a.payload.doc.data();
                                    const id = a.payload.doc.id;
                                    return {id, ...data};
                                });
                            }
                        )
                    );
                // return chatObservables
                //     .pipe(
                //         map((observables) => {
                //             return observables.map(observable => {
                //                 return observable.map((a) => {
                //                     const data: Object = a.payload.doc.data();
                //                     const id = a.payload.doc.id;
                //                     return {id, ...data};
                //                 });
                //             });
                //         })
                //     );
            })
        );
    }

    // getSellerChats() {
    //     return this.auth.user$.pipe(
    //         switchMap(user => {
    //             return this.afs
    //                 .collection('chats', ref => ref.where('sellerId', '==', user.uid))
    //                 .snapshotChanges()
    //                 .pipe(
    //                     map(actions => {
    //                         return actions.map(a => {
    //                             const data: Object = a.payload.doc.data();
    //                             const id = a.payload.doc.id;
    //                             return {id, ...data};
    //                         });
    //                     })
    //                 );
    //         })
    //     );
    // }

    async chatWith(sellerId: string) {
        const chat = await this.getChat(sellerId).toPromise();
        console.log(chat);
        const firstChat = chat[0];
        console.log(firstChat);
        if (firstChat === undefined) {
            await this.createChat(sellerId);
        }
        this.router.navigate(['chats', firstChat.id]);
    }

    async createChat(sellerId: string) {
        const buyer = await this.auth.getUserAsPromise();
        const buyerId = buyer.uid;

        const data = {
            buyerId: buyerId,
            sellerId: sellerId,
            createdAt: Date.now(),
            count: 0,
            messages: []
        };

        const docRef = await this.afs.collection('chats').add(data);

        return this.router.navigate(['chats', docRef.id]);
    }

    async sendMessage(chatId, content) {
        const {uid} = await this.auth.getUserAsPromise();

        const data = {
            uid,
            content,
            createdAt: Date.now()
        };

        if (uid) {
            const ref = this.afs.collection('chats').doc(chatId);
            return ref.update({
                messages: firestore.FieldValue.arrayUnion(data)
            });
        }
    }

    async deleteMessage(chat, msg) {
        const {uid} = await this.auth.getUserAsPromise();

        const ref = this.afs.collection('chats').doc(chat.id);
        console.log(msg);
        if (chat.uid === uid || msg.uid === uid) {
            // Allowed to delete
            delete msg.user;
            return ref.update({
                messages: firestore.FieldValue.arrayRemove(msg)
            });
        }
    }

    joinUsers(chat$: Observable<any>) {
        let chat;
        const joinKeys = {};

        return chat$.pipe(
            switchMap(c => {
                // Unique User IDs
                chat = c;
                console.log(c);

                const uids = Array.from(new Set(c.messages.map(v => v.uid)));
                if (uids) {
                    // Firestore User Doc Reads
                    const userDocs = uids.map(u =>
                        this.afs.doc(`users/${u}`).valueChanges()
                    );
                    return userDocs.length ? combineLatest(userDocs) : of([]);

                } else {
                    return of([]);
                }
            }),
            map(arr => {
                arr.forEach(v => (joinKeys[(<any>v).uid] = v));
                chat.messages = chat.messages.map(v => {
                    return {...v, user: joinKeys[v.uid]};
                });

                return chat;
            })
        );
    }
}
