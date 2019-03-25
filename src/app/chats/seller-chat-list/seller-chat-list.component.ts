import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-seller-chat-list',
    templateUrl: './seller-chat-list.component.html',
    styleUrls: ['./seller-chat-list.component.scss']
})
export class SellerChatListComponent implements OnInit {

    userChats$;
    private avatarImages: any;

    constructor(
        private cs: ChatService,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        console.log('before chat call');
        this.userChats$ = this.cs.getSellerChats();
        console.log('after chat call');
        this.avatarImages = this.userChats$.subscribe((userchats) => {
            console.log(userchats);
        });
    }

}
