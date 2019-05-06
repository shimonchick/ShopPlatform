import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared.module';
import {MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {AgmCoreModule} from '@agm/core';
import {SettingsComponent} from './settings.component';
import {AngularFireFunctionsModule} from '@angular/fire/functions';

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        NgxAuthFirebaseUIModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MatTabsModule,
        AgmCoreModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        AgmCoreModule,
        AngularFireFunctionsModule
    ]
})
export class SettingsModule {
}
