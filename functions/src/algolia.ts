import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('product_search');

export const indexProduct = functions.firestore
    .document('products/{productId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const objectID = snap.id;

        // Add the data to the algolia index
        return index.addObject({
            objectID,
            ...data
        });
    });

export const unindexProduct = functions.firestore
    .document('products/{productId}')
    .onDelete((snap, context) => {
        const objectId = snap.id;

        // Delete an ID from the index
        return index.deleteObject(objectId);
    });
