import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared.module';
import {SellerRegistrationComponent} from './seller-registration/seller-registration.component';
import {SettingsComponent} from './settings.component';
import {MatTabsModule} from '@angular/material';

@NgModule({
    declarations: [
        UserSettingsComponent,
        SellerRegistrationComponent,
        SettingsComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        NgxAuthFirebaseUIModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MatTabsModule,

    ]
})
export class SettingsModule {
}
