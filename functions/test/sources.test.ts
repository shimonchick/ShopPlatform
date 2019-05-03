import * as admin from 'firebase-admin';

import {fun} from './test-config';
import {getMockSource, mockUser} from './mocks';
import {attachSource} from '../src/sources';

fun.cleanup;

admin.initializeApp();

let user: any;

beforeAll(async () => {

    user = await mockUser();
});

test('attachSource attaches a payment source the customer', async () => {
    const mockSource = await getMockSource();
    const customer: any = await attachSource(user.uid, mockSource.id);
    expect(customer.id).toContain('cus_');
    expect(customer['sources'].data.length).toBeGreaterThan(0);
});
