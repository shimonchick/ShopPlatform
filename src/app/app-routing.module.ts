import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';

const routes: Routes = [
    {path: 'products', loadChildren: './products/products.module#ProductsModule'},
    {path: 'chats', loadChildren: './chats/chats.module#ChatsModule'},
    {path: 'login', component: LoginComponent},
    {path: 'user', component: UserSettingsComponent, canActivate: [LoggedInGuard]},
    {path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
