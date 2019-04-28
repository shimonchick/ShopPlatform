import {NgModule} from '@angular/core';

import {ChatRoutingModule} from './chat-routing.module';
import {SharedModule} from '../shared.module';
import {ChatDrawerComponent} from './chat-drawer.component';
import {ChatModule as KendoChatModule} from '@progress/kendo-angular-conversational-ui';
import {ContactsComponent} from './contacts/contacts.component';
import {ChatComponent} from './chat/chat.component';
import {HeaderComponent} from './chat/header/header.component';
import {ChatMediatorService} from './mediator/chat-mediator.service';

@NgModule({
    declarations: [
        ChatDrawerComponent,
        ContactsComponent,
        ChatComponent,
        HeaderComponent
    ],
    imports: [
        SharedModule,
        ChatRoutingModule,
        KendoChatModule
    ],
    providers: [
        ChatMediatorService
    ]
})
export class ChatModule {
}
