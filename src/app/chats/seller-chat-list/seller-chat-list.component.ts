import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {tap} from 'rxjs/operators';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {forkJoin, from, Observable} from 'rxjs';

@Component({
    selector: 'app-seller-chat-list',
    templateUrl: './seller-chat-list.component.html',
    styleUrls: ['./seller-chat-list.component.scss']
})
export class SellerChatListComponent implements OnInit {

    userChats: any[] = [];
    buyers: User[] = [];

    constructor(
        private cs: ChatService,
        public auth: AuthService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.cs.getBuyerChats().subscribe((chats: Chat[]) => {
            // console.log('fetched chats');
            console.log(chats[0]);
            this.userChats = chats;
            const sellerObservables: Observable<User>[] = chats
                .map((chat) => from(this.userService.getUserById(chat.buyerId)).pipe(tap((user) => console.log(user))));
            forkJoin(sellerObservables).subscribe((buyers) => {
                console.log(this.buyers);
                this.buyers = buyers;
            });
        });
    }

}
