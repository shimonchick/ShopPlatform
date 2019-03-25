import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';
import {BuyerChatListComponent} from './buyer-chat-list/buyer-chat-list.component';
import {SellerChatListComponent} from './seller-chat-list/seller-chat-list.component';

const routes: Routes = [
    {path: 'buyer', component: BuyerChatListComponent, canActivate: [LoggedInGuard]},
    {path: 'seller', component: SellerChatListComponent, canActivate: [LoggedInGuard]},
    {path: ':id', component: ChatComponent, canActivate: [LoggedInGuard]},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {
}
