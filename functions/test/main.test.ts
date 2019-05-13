/* tslint:disable:no-reference */
///<reference path="../node_modules/@types/jest/index.d.ts"/>

import {fun} from './test-config';
import * as admin from 'firebase-admin';
import {db, stripe} from '../src/config';

admin.initializeApp();
fun.cleanup;


test('Firestore is initialized', () => {
    expect(db).toBeDefined();
});

test('Stripe is initialized', () => {
    expect(stripe).toBeDefined();
});
