import {User} from '../models/user';
import {User as KendoUser} from '@progress/kendo-angular-conversational-ui';

// export function userToIChatParticipant(user: User) {
//     return {
//         participant: {
//             avatar: user.photoURL,
//             displayName: user.displayName,
//             id: user.uid,
//             participantType: ChatParticipantType.User,
//             status: ChatParticipantStatus.Online
//             // todo add proper state management
//         },
//         metadata: {totalUnreadMessages: 0}
//     };
// }

// export function messageToFirestoreMessage(message: any): Message {
//     return {
//         ...message,
//         dateSeen: message.dateSeen.toDate(),
//         dateSent: message.dateSent.toDate()
//         // for frontend
//     };
// }

export function userToKendoUser(user: User): KendoUser {
    return {
        avatarUrl: user.photoURL,
        id: user.uid,
        name: user.displayName
    };
}
