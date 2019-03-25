import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat/chat.component';
import {SharedModule} from '../shared.module';
import {MaterialModule} from '../material.module';
import {BuyerChatListComponent} from './buyer-chat-list/buyer-chat-list.component';
import {SellerChatListComponent} from './seller-chat-list/seller-chat-list.component';

@NgModule({
    declarations: [ChatComponent, BuyerChatListComponent, SellerChatListComponent],
    imports: [
        CommonModule,
        ChatRoutingModule,
        SharedModule,
        MaterialModule,
    ]
})
export class ChatsModule {
}
