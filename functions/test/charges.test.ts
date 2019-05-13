import {fun} from './test-config';
import * as admin from 'firebase-admin';
import {getMockSource, mockUser} from './mocks';
import {createCharge} from '../src/charges';
import {createCustomer} from '../src/customers';


admin.initializeApp();
fun.cleanup;

let user: any;

beforeAll(async () => {

    user = await mockUser();
    await createCustomer(user.uid);
});

test('createCharge creates a charge', async () => {
    const amt = 30000;
    const mockSource = await getMockSource();
    const charge = await createCharge(user.uid, mockSource.id, amt);

    expect(charge.id).toContain('ch_');
    expect(charge.amount).toBe(amt);
});
