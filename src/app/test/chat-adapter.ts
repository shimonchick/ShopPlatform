import {ChatAdapter, Message, ParticipantResponse} from 'ng-chat';
import {Observable} from 'rxjs';

class ChatAdapterImpl extends ChatAdapter {
    getMessageHistory(destinataryId: any): Observable<Message[]> {
        return undefined;
    }

    listFriends(): Observable<ParticipantResponse[]> {
        return undefined;
    }

    sendMessage(message: Message): void {
    }


}
