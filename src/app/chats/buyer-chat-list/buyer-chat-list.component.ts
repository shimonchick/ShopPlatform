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

    userChats$;
    seller: User;

    constructor(
        private cs: ChatService,
        public auth: AuthService,
        private userService: UserService
    ) {
    }

    async ngOnInit() {

        this.userChats$ = this.cs.getBuyerChats();
        console.log(this.userChats$.sellerId);
        this.seller = await this.userService.getUserById(this.userChats$.sellerId);
    }

}
