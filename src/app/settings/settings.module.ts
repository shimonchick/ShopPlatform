import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared.module';
import {SellerRegistrationComponent} from './seller-registration/seller-registration.component';

@NgModule({
    declarations: [
        UserSettingsComponent,
        SellerRegistrationComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        NgxAuthFirebaseUIModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,

    ]
})
export class SettingsModule {
}
