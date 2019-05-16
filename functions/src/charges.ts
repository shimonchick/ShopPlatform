import * as functions from 'firebase-functions';
import {assert, assertUID, catchErrors} from './helpers';
import {db, stripe} from './config';
import {getCustomer} from './customers';
import {attachSource} from './sources';

/**
 Gets a user's charge history
 */
export const getUserCharges = async (uid: string, limit?: number) => {
    const customer = await getCustomer(uid);

    return await stripe.charges.list({
        limit,
        customer
    });
};

/**
 Creates a charge for a specific amount
 */
export const createCharge = async (uid: string, source: string, amount: number, idempotency_key?: string) => {
    const customer = await getCustomer(uid);

    await attachSource(uid, source);

    return stripe.charges.create({
            amount,
            customer,
            source,
            currency: 'usd',
        },

        {idempotency_key}
    );
};


/////// DEPLOYABLE FUNCTIONS ////////

export const stripeCreateCharge = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    const source = assert(data, 'source');
    const amount = assert(data, 'amount');
    const productId = assert(data, 'productId');

    // Optional
    const idempotency_key = data.itempotency_key;

    const confirmation = await catchErrors(createCharge(uid, source, amount, idempotency_key));
    if (confirmation.paid && confirmation.status === 'succeeded') {
        console.log('paid');
        const product = await db.doc(`products/${productId}`).get().then(doc => doc.data());
        product.priority = amount / 100;
        await db.doc(`products/${productId}`).update(product);
        return true;
    } else {
        console.log('not paid');
        return false;
    }
});


export const stripeGetCharges = functions.https.onCall(async (data, context) => {
    const uid = assertUID(context);
    return catchErrors(getUserCharges(uid));
});
