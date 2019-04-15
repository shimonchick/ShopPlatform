import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {map, switchMap} from 'rxjs/operators';
import {forkJoin, from, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
    selector: 'app-buyer-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

    // userChats: any[] = [];
    users$: Observable<User[]>;
    chats$: Observable<Chat[]>;
    selectedChat: Chat = null;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(
        private chatService: ChatService,
        public auth: AuthService,
        private userService: UserService,
        private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.chats$ = this.chatService.getChats();
        this.chats$.subscribe(it => console.log(it));
        // const chats = sources.map((source) => this.cs.joinUser(of(source)));
        this.users$ = this.chats$.pipe(
            switchMap((them: Chat[]) => {
                return forkJoin(
                    them
                        .map(it => from(this.userService.getUserById(it.sellerId)))
                        .concat(them.map(it => from(this.userService.getUserById(it.buyerId)))));
            })
        );

        console.log('logging chats');
        // this.sellers$.subscribe(them => {
        //     console.log(them);
        // });
    }

    onSelect(chat: Chat) {
        // console.log(chat);
        this.selectedChat = chat;
    }
}
