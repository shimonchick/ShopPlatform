import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
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

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ProductDetailComponent,
        NavComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase, 'ShopPlatform'),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        NgxAuthFirebaseUIModule.forRoot(environment.firebase)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
