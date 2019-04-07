import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {SellerRegistrationComponent} from './seller-registration/seller-registration.component';

const routes: Routes = [
    {path: '', component: UserSettingsComponent},
    {path: 'seller', component: SellerRegistrationComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
