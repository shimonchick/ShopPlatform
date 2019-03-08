import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NavComponent} from './nav/nav.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {AngularFireModule} from '@angular/fire';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CoreModule} from './core.module';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase, 'ShopPlatform'),
        NgxAuthFirebaseUIModule.forRoot(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ScrollingModule,
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
