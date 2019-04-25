import {ChatParticipantStatus, ChatParticipantType, Message} from 'ng-chat';
import {User} from '../models/user';

export function userToIChatParticipant(user: User) {
    return {
        participant: {
            avatar: user.photoURL,
            displayName: user.displayName,
            id: user.uid,
            participantType: ChatParticipantType.User,
            status: ChatParticipantStatus.Online
            // todo add proper state management
        },
        metadata: {totalUnreadMessages: 0}
    };
}

export function messageToFirestoreMessage(message: any): Message {
    return {
        ...message,
        dateSeen: message.dateSeen.toDate(),
        dateSent: message.dateSent.toDate()
        // for frontend
    };
}
