import {Component, Input} from '@angular/core';
import {MatDrawer} from '@angular/material';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() sidenav: MatDrawer;
}
