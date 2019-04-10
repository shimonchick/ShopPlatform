import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Theme} from 'ngx-auth-firebaseui';
import {ChatService} from '../services/chat.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    theme = Theme;

    constructor(public auth: AuthService,
                public chatService: ChatService) {
    }
}
