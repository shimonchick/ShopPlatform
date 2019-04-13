import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';
import {ChatListComponent} from './chat-list/chat-list.component';

const routes: Routes = [
    {path: '', component: ChatListComponent, canActivate: [LoggedInGuard]},
    {path: ':id', component: ChatComponent, canActivate: [LoggedInGuard]},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {
}
