import {ChatAdapter, Message, ParticipantResponse} from 'ng-chat';
import {Observable} from 'rxjs';
import {ChatService} from '../services/chat.service';

export class ProductChatAdapter extends ChatAdapter {

    constructor(private chatService: ChatService) {
        super();
    }


    getMessageHistory(destinataryId: any): Observable<Message[]> {
        return this.chatService.getMessageHistory(destinataryId);
    }


    listFriends(): Observable<ParticipantResponse[]> {
        return this.chatService.listFriends();

    }

    async sendMessage(message: Message) {
        await this.chatService.sendMessage(message);
    }

}
