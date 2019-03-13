import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {firestore} from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthService,
        private router: Router
    ) {
    }

    get(chatId) {
        return this.afs
            .collection<any>('chats')
            .doc(chatId)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    return {id: doc.payload.id, ...doc.payload.data()};
                })
            );
    }

    async create(sellerId: string, productId: string) {
        const user = await this.auth.getSnapshotUser();
        const buyerId = user.uid;

        const data = {
            buyerId,
            sellerId,
            productId,
            createdAt: Date.now(),
            count: 0,
            messages: []
        };

        const docRef = await this.afs.collection('chats').add(data);
        console.log('navigating');
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

    joinUsers(chat$: Observable<any>) {
        let chat;
        const joinKeys = {};

        return chat$.pipe(
            switchMap(c => {
                // Unique User IDs
                chat = c;

                const uids = Array.from(new Set(c.messages.map(v => v.uid)));

                // Firestore User Doc Reads
                if (uids) {
                    const userDocs = uids.map(u =>
                        this.afs.doc(`users/${u}`).valueChanges()
                    );
                    return userDocs.length ? combineLatest(userDocs) : of([]);
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
