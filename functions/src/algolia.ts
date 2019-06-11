import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';
//govnokod
const env = functions.config();

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

export const updateProduct = functions.firestore
    .document('products/{productId}')
    .onUpdate((snapchange, context) => {
        const snap = snapchange.after;
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


export const search = functions.https.onCall(async (data, context) => {
    const query = data['query'];
    const page = data['page'];
    return await index.search({query, page});
});

