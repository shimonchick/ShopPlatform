import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Theme} from 'ngx-auth-firebaseui';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    theme = Theme;

    constructor(public auth: AuthService) {
    }
}
