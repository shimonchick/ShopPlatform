import {Component, OnInit} from '@angular/core';
import {MessagingService} from './services/messaging.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'ShopPlatform';
    message;

    constructor(private msgService: MessagingService,
                private snackbar: MatSnackBar,
                private router: Router) {
    }

    ngOnInit() {
        this.msgService.getPermission();
        this.msgService.receiveMessage();
        this.msgService.currentMessage.subscribe((message: any) => {
            const ref = this.snackbar.open(message.notification.title, 'See details');
            ref.afterOpened().subscribe(() => {
                this.router.navigateByUrl(message.notification.click_action);
            });
        });

    }

}
