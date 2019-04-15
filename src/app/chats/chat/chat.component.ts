import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {tap} from 'rxjs/operators';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    chat$: Observable<any>;
    newMsg: string;
    // @Input() source: Chat;
    @Input() chat: Chat;

    constructor(
        public cs: ChatService,
        private route: ActivatedRoute,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        // const chatId = this.route.snapshot.paramMap.get('id');
        // const source = this.cs.getChat(this.chatId);
        // console.log(of(this.source) === source);
        // this.chat$ = this.cs.get(chatId);

        this.chat$ = this.cs.joinUser(of(this.chat)).pipe(
            tap(it => console.log(it))
        ); // .pipe(tap(v => this.scrollBottom()));
        // console.log(this.source);
        // this.chat$ = this.cs.joinUser(of(this.source).pipe(first())); // .pipe(tap(v => this.scrollBottom()));
        // this.chat$ = of(this.source);
        // console.log(this.chat$);
        this.scrollBottom();
    }

    submit(chatId) {
        if (!this.newMsg) {
            return alert('you need to enter something');
        }
        this.cs.sendMessage(chatId, this.newMsg);
        this.newMsg = '';
        this.scrollBottom();
    }

    trackByCreated(i, msg) {
        return msg.createdAt;
    }

    private scrollBottom() {
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
    }
}
