import {Component, OnInit} from '@angular/core';
import {animateText, onSideNavChange} from '../animations';
import {ChatMediatorService} from '../mediator/chat-mediator.service';
import {Observable, zip} from 'rxjs';
import {User} from '../../models/user';
import {map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    animations: [onSideNavChange, animateText]
})
export class ContactsComponent implements OnInit {

    sideNavOpened = false;
    showText = false;
    contacts$: Observable<User[]>;
    constructor(private mediatorService: ChatMediatorService,
                private db: AngularFirestore,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.contacts$ = this.listFriends();
    }

    /**
     * @returns the friends of the currently logged in user
     */
    listFriends(): Observable<User[]> {
        const friendIds$ = this.auth.user$.pipe(
            tap((user) => {
                console.log('user was emitted');
                console.log(user);
            }),
            switchMap(user => this.db.doc(`friends/${user.uid}`).valueChanges()),
            map((data) => data ? Object.keys(data) : []),
        );
        /**
         * @return friends observable
         */
        return friendIds$.pipe(
            switchMap(friendIds => {
                return zip(
                    ...friendIds.map(
                        friendId => this.db.doc(`users/${friendId}`).valueChanges() as Observable<User>)
                );
            }),
        );
    }

    onSinenavToggle() {
        this.sideNavOpened = !this.sideNavOpened;

        setTimeout(() => {
            this.showText = this.sideNavOpened;
        }, 200);
        this.mediatorService.sideNavOpen$.next(this.sideNavOpened);
    }

    openChat(uid: string) {
        this.mediatorService.selectedUserId$.next(uid);
    }
}
