import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {tap} from 'rxjs/operators';
import {forkJoin, from, Observable} from 'rxjs';

@Component({
    selector: 'app-buyer-chat-list',
    templateUrl: './buyer-chat-list.component.html',
    styleUrls: ['./buyer-chat-list.component.scss']
})
export class BuyerChatListComponent implements OnInit {

    userChats: any[] = [];
    sellers: User[] = [];

    constructor(
        private cs: ChatService,
        public auth: AuthService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.cs.getBuyerChats().subscribe((chats: Chat[]) => {
            // console.log('fetched chats');
            // console.log(chats);
            this.userChats = chats.filter((chat) => {
                return chat.messages.length > 0;
            });
            console.log(this.userChats);
            const sellerObservables: Observable<User>[] = chats
                .map((chat) => from(this.userService.getUserById(chat.sellerId)).pipe(tap((user) => console.log(user))));
            forkJoin(sellerObservables).subscribe((sellers) => {
                this.sellers = sellers;
            });
        });
    }
}
