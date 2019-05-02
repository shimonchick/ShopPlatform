import * as TestFunctions from 'firebase-functions-test';

const firebaseConfig = {
    apiKey: 'AIzaSyBfeAdlwMo49LteklnZP5sugxTG_ybXJUs',
    authDomain: 'shopplatform-3c1c4.firebaseapp.com',
    databaseURL: 'https://shopplatform-3c1c4.firebaseio.com',
    projectId: 'shopplatform-3c1c4',
    storageBucket: 'shopplatform-3c1c4.appspot.com',
    messagingSenderId: '878506105599'
};
const envConfig = {stripe: {secret: 'sk_test_zBhH3lFdwaWcgsA0lHvWcyDg00LKg3kMNt'}};

const fun = TestFunctions(firebaseConfig, 'service-account.json');
fun.mockConfig(envConfig);

export {fun};
