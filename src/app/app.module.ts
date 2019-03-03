import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import {FormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NavComponent} from './nav/nav.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';


const config = {
    apiKey: 'AIzaSyBfeAdlwMo49LteklnZP5sugxTG_ybXJUs',
    authDomain: 'shopplatform-3c1c4.firebaseapp.com',
    databaseURL: 'https://shopplatform-3c1c4.firebaseio.com',
    projectId: 'shopplatform-3c1c4',
    storageBucket: 'shopplatform-3c1c4.appspot.com',
    messagingSenderId: '878506105599'
};

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ProductDetailComponent,
        NavComponent
    ],
    imports: [
        // AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, {dataEncapsulation: false, passThruUnknownUrl: true}
        ),
        FormsModule,
        NgxAuthFirebaseUIModule.forRoot(config)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
