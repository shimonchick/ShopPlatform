import * as admin from 'firebase-admin';

admin.initializeApp();
export {indexProduct, unindexProduct, search} from './algolia';
export {archiveChat} from './archive_chat';
export {calculator} from './calculator';
