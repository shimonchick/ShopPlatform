import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-buyer-chat-list',
    templateUrl: './buyer-chat-list.component.html',
    styleUrls: ['./buyer-chat-list.component.scss']
})
export class BuyerChatListComponent implements OnInit {

    userChats: any[] = [];
    seller: User;
    constructor(
        private cs: ChatService,
        public auth: AuthService,
        private userService: UserService
    ) {
    }

    async ngOnInit() {
        this.cs.getBuyerChats().subscribe(async chats => {
            this.userChats = chats;
            console.log(this.userChats[1]);
            console.log(this.userChats[0].messages[this.userChats[0].messages.length - 1]);
            this.seller = await this.userService.getUserById(this.userChats[0].sellerId);
        });
    }

}
