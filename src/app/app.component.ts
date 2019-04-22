import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ChatAdapter, IChatController, Theme} from 'ng-chat';
import {ProductChatAdapter} from './models/ProductChatAdapter';
import {ChatService} from './services/chat.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
    title = 'ShopPlatform';
    chatTheme: Theme = Theme.Dark;
    public adapter: ChatAdapter;

    @ViewChildren('ngChatInstance')
    public chatElement: QueryList<HTMLElement>;

    protected chatController: IChatController;

    constructor(private chatService: ChatService, public auth: AuthService) {
        this.adapter = new ProductChatAdapter(this.chatService);

    }

    ngAfterViewInit(): void {
        this.chatElement.changes.subscribe((query: QueryList<IChatController>) => {
            this.chatController = query.first;
            console.log(this.chatController);
            this.chatService.registerController(this.chatController);
        });
    }
}
