import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private db: AngularFirestore,
        private auth: AuthService) {
    }

    async create(buyerId: string, sellerId: string, productId: string): Promise<void> {

        const data = {
            buyerId: buyerId,
            sellerId: sellerId,
            productId: productId,
        };

        const docRef = await this.db.collection('orders').add(data);

    }

    delete(order: Order): Promise<any> {
        const uid = this.auth.getSnapshotUser().uid;
        if (uid !== order.buyerId) {
            return;
        }
        return this.db.collection('orders').doc(order.productId).delete();

    }

    getBuyerOrders() {
        return this.auth.user$.pipe(
            switchMap(user => {
                return this.db
                    .collection('orders', ref => ref.where('buyerId', '==', user.uid))
                    .snapshotChanges()
                    .pipe(
                        map(actions => {
                            return actions.map(a => {
                                const data: Object = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return {id, ...data};
                            });
                        })
                    );
            })
        );
    }


    getSellerOrders() {
        return this.auth.user$.pipe(
            switchMap(user => {
                return this.db
                    .collection('orders', ref => ref.where('sellerId', '==', user.uid))
                    .snapshotChanges()
                    .pipe(
                        map(actions => {
                            return actions.map(a => {
                                const data: Object = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return {id, ...data};
                            });
                        })
                    );
            })
        );
    }

    get(orderId) {
        return this.db
            .collection<any>('orders')
            .doc(orderId)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    return {id: doc.payload.id, ...doc.payload.data()};
                })
            );
    }


}
