import {db} from './config';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

export const orderNotification = functions.firestore
    .document('/orders/{orderId}')
    .onCreate(async (snapshot, context) => {


        const order = snapshot.data();

        const buyerRef = db.doc(`/users/${order.buyerId}`);
        const buyerSnap = await buyerRef.get();
        const buyer = buyerSnap.data();

        const productRef = db.doc(`products/${order.productId}`);
        const productSnap = await productRef.get();
        const product = productSnap.data();

        const payload = {
            notification: {
                title: `${buyer.displayName} ordered ${product.name} from you`,
                body: `Name of buyer: ${buyer.firstName} ${buyer.lastName}\n`
                    + `Address of buyer: ${buyer.address}\n`
                    + `Phone number of buyer: ${buyer.phoneNumber}`,
                icon: 'https://material.io/tools/icons/static/icons/baseline-event_note-24px.svg',
                click_action: 'localhost:3000/orders/seller', // TODO: rename when deployed or move to configuration file

            }
        };

        const tokenRef = db.doc(`fcmTokens/${order.sellerId}`);
        const tokenSnap = await tokenRef.get();
        const token = tokenSnap.data().token;

        console.log(token);
        try {
            const sent = await admin.messaging().sendToDevice(token, payload);
            console.log('Sent Successfully', sent);
        } catch (err) {
            console.log(err);
        }
        // admin.database()
        //     .ref(`/fcmTokens/${order.buyerId}`)
        //     .once('value')
        //     .then(token => token.val())
        //     .then(userFcmToken => {
        //         return admin.messaging().sendToDevice(userFcmToken, payload);
        //     })
        //     .then(res => {
        //         console.log('Sent Successfully', res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

    });
