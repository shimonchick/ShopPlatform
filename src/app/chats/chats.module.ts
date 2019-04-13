import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat/chat.component';
import {SharedModule} from '../shared.module';
import {MaterialModule} from '../material.module';
import {ChatListComponent} from './chat-list/chat-list.component';

@NgModule({
    declarations: [ChatComponent, ChatListComponent],
    imports: [
        CommonModule,
        ChatRoutingModule,
        SharedModule,
        MaterialModule,
    ]
})
export class ChatsModule {
}
