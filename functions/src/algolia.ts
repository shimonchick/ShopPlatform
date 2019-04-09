import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';

admin.initializeApp();
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

export const unindexProduct = functions.firestore
    .document('products/{productId}')
    .onDelete((snap, context) => {
        const objectId = snap.id;

        // Delete an ID from the index
        return index.deleteObject(objectId);
    });


export const searchUser = functions.https.onCall(async (data, context) => {
    const query = data['query'];
    return await index.search({query});
});

// export const search = (text$: Observable<string>) =>
//     text$.pipe(
//         debounceTime(200),
//         distinctUntilChanged(),
//         switchMap(query => this.functions.httpsCallable('onCalls-searchUser')({query})),
//         map(response => response.hits.map(user => user.name))
//     );
