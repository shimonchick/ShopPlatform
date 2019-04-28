import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';

@Injectable()
export class ChatMediatorService {

    /**
     * This is the mini variant solution with animations trick.
     */
    sideNavOpen$ = new BehaviorSubject(true);
    selectedUserId$ = new ReplaySubject<string>(1);
}
