import {Component, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {AuthService} from '../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ChatMediatorService} from './mediator/chat-mediator.service';
import {onMainContentChange} from './animations';

@Component({
    selector: 'app-chat-drawer',
    templateUrl: './chat-drawer.component.html',
    styleUrls: ['./chat-drawer.component.scss'],
    animations: [onMainContentChange]
})
export class ChatDrawerComponent implements OnInit {


    isHandset$ = this.breakPointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );
    onSideNavChange$: Observable<boolean>;

    constructor(private breakPointObserver: BreakpointObserver,
                private chatService: ChatService,
                public auth: AuthService,
                private db: AngularFirestore,
                private mediatorService: ChatMediatorService) {
    }

    ngOnInit() {
        // create default document
        // zip(this.auth.user$, this.chatService.newChat$).subscribe(([user, otherUser]: [User, User]) => {
        //     this.db.doc(`chats/${user.uid}_${otherUser.uid}`).set({messages: []}, {merge: true});
        //     this.db.doc(`friends/${user.uid}`).set({
        //         [otherUser.uid]: true
        //     }, {merge: true});
        // });
        this.onSideNavChange$ = this.mediatorService.sideNavOpen$;
        // todo when to add friends
        // this.chatService.newChat$.subscribe(otherUser => {
        //     this.chatController.triggerOpenChatWindow(userToIChatParticipant(otherUser).participant);
        // });
    }

}
