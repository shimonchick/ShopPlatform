import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
    selector: 'app-buyer-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

    // userChats: any[] = [];
    users$: Observable<User[]>;
    users: User[] = [];
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
        // this.chats$.subscribe(it => console.log(it));
        // const chats = sources.map((source) => this.cs.joinUser(of(source)));
        // this.chats$.pipe(
        //     flatMap((chats: Chat[]) => {
        //         <Observable<User[]>>zip(...chats.map((chat: Chat) => {
        //             const user: User = this.auth.getSnapshotUser();
        //             const userId = user.uid === chat.buyerId ? chat.sellerId : chat.buyerId;
        //             this.userService.getUserByIdAsPromise(userId);
        //
        //         }))
        //     })
        // );
        //     this.chats$.pipe(
        //         mergeMap((chats: Chat[]) => {
        //             <Observable<User[]>>zip(...chats.map((chat: Chat) => {
        //                 const user: User = this.auth.getSnapshotUser();
        //                 const userId = user.uid === chat.buyerId ? chat.sellerId : chat.buyerId;
        //                 this.userService.getUserByIdAsPromise(userId);
        //             }));
        //         })
        //             .subscribe(users => this.users = users);
        // );
        // return forkJoin(
        //     from(them).pipe(
        //         map(async (it: Chat) => {
        //             const user = await this.auth.getUserAsPromise();
        //             return user.uid === it.buyerId ? it.sellerId : it.buyerId;
        //         }),
        //         map(it => this.userService.getUserByIdAsPromise(it))
        //     )
        // );


        // console.log('logging chats');
        // this.sellers$.subscribe(them => {
        //     console.log(them);
        // });
        this.auth.user$.pipe(
            switchMap((user) => this.userService.getUserById(user.uid))
        ).subscribe(other => {
            console.log(other);
            console.log('otherrr');
        });
        this.chatService.getChat('CdHBywwujFwnIzUbsJ5O').pipe(
            map(it => it.payload.data() as Chat)
        ).subscribe(chat => {
            this.auth.user$.pipe(
                tap((user) => console.log(user.uid)),
                map(user => user.uid === chat.buyerId ? chat.sellerId : chat.buyerId),
                switchMap((id) => this.userService.getUserById(id)),
                // map(it => it.data() as User),
                tap(user => console.log(user))
            );
        });
    }

    onSelect(chat: Chat) {
        // console.log(chat);
        this.selectedChat = chat;
    }

    getOtherUser(chat: Chat): Observable<User> {
        console.log('1');
        return this.auth.user$.pipe(
            tap((user) => console.log(user.uid)),
            map(user => user.uid === chat.buyerId ? chat.sellerId : chat.buyerId),
            mergeMap((id) => this.userService.getUserByIdAsPromise(id)),
            // map(it => it.data() as User),
            tap(user => console.log(user))
        );
        //                     return user.uid === it.buyerId ? it.sellerId : it.buyerId;
        // return of(null);
    }

    func(id: string) {
        console.log(id);
        return of(id);
    }

    trackByIndex(i) {
        // console.log(i);
        return i;
    }
}
