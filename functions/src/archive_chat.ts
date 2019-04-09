import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import DocumentData = admin.firestore.DocumentData;

const db = admin.firestore();

export const archiveChat = functions.firestore
    .document('chats/{chatId}')
    .onUpdate(change => {

        const data: DocumentData | undefined = change.after.data();
        if (data === undefined) {
            return;
        }
        const maxLen = 100;
        const msgLen = data.messages.length > 0 ? data.messages.length : 0;
        const charLen = JSON.stringify(data).length;

        const batch = db.batch();

        if (charLen >= 10000 || msgLen >= maxLen) {

            // Always delete at least 1 message
            const deleteCount = msgLen - maxLen <= 0 ? 1 : msgLen - maxLen;
            data.messages.splice(0, deleteCount);

            const ref = db.collection('chats').doc(change.after.id);

            batch.set(ref, data, {merge: true});

            return batch.commit();
        } else {
            return null;
        }
    });
