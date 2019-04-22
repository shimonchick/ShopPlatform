import {Component, ViewChild} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ChatAdapter, ChatParticipantStatus, ChatParticipantType, IChatController, Theme} from 'ng-chat';
import {ProductChatAdapter} from './models/ProductChatAdapter';
import {ChatService} from './services/chat.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'ShopPlatform';
    chatTheme: Theme = Theme.Dark;
    public adapter: ChatAdapter;

    // @ViewChildren('ngChatInstance')
    // public chatElement: QueryList<HTMLElement>;
    @ViewChild('ngChatInstance')
    chatController: IChatController;

    constructor(private chatService: ChatService, public auth: AuthService) {
        this.adapter = new ProductChatAdapter(this.chatService);
        this.chatService.newChat$.subscribe(otherUser => {
            console.log(otherUser);
                this.chatController.triggerOpenChatWindow({
                    displayName: otherUser.displayName,
                    id: otherUser.uid,
                    participantType: ChatParticipantType.User,
                    avatar: otherUser.photoURL,
                    status: ChatParticipantStatus.Offline
                });
        });
    }
}
