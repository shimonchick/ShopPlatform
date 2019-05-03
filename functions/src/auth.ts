import * as functions from 'firebase-functions';
import {db} from './config';

export const createUserRecord = functions.auth
    .user()
    .onCreate((user, context) => {
        const userRef = db.doc(`users/${user.uid}`);
        return userRef.set({
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            roles: {
                buyer: false,
                seller: false
            }
        });
    });
