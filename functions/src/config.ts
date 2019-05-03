import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Stripe from 'stripe';
// admin.initializeApp();

export const db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export const stripeSecret = functions.config().stripe.secret;

export const stripe = new Stripe(stripeSecret);
