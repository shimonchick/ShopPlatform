import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NavComponent} from './nav/nav.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {AngularFireModule} from '@angular/fire';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CoreModule} from './core.module';
import {LoginComponent} from './login/login.component';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {SettingsModule} from './settings/settings.module';
import {LayoutModule} from '@angular/cdk/layout';
import {SharedModule} from './shared.module';
import {AgmCoreModule} from '@agm/core';
import {MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        LoginComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase, 'ShopPlatform'),
        NgxAuthFirebaseUIModule.forRoot(environment.firebase),
        MatPasswordStrengthModule.forRoot(),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        NgxAuthFirebaseUIModule.forRoot(environment.firebase),
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ScrollingModule,
        CoreModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatPasswordStrengthModule,
        SettingsModule,
        LayoutModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: environment.maps.apiKey
        }),
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
