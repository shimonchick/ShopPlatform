import {NgModule} from '@angular/core';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../shared.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FlexLayoutModule} from '@angular/flex-layout';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {ProductPreviewComponent} from './product-preview-card/product-preview.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {GalleryModule} from '@ngx-gallery/core';
import {GallerizeModule} from '@ngx-gallery/gallerize';
import {LightboxModule} from '@ngx-gallery/lightbox';
import {environment} from '../../environments/environment';
import {NgAisModule} from 'angular-instantsearch';
import {LayoutModule} from '@angular/cdk/layout';
import {AgmCoreModule} from '@agm/core';
import {ProductsListComponent} from './products-list/products-list.component';
import {SearchComponent} from './search/search.component';
import {AngularFireFunctionsModule} from '@angular/fire/functions';

@NgModule({
    declarations: [
        ProductPreviewComponent,
        ProductDetailComponent,
        SearchComponent,
        ProductsListComponent,
    ],
    imports: [
        ProductsRoutingModule,
        SharedModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        FlexLayoutModule,
        VirtualScrollerModule,
        GalleryModule,
        LightboxModule,
        GallerizeModule,
        AgmCoreModule.forRoot({
            apiKey: environment.maps.apiKey
            /* apiKey is required, unless you are a
            premium customer, in which case you can
            use clientId
            */
        }),
        NgAisModule,
        LayoutModule,
        AngularFireFunctionsModule
    ],
    entryComponents: [
        ProductPreviewComponent
    ]
})
export class ProductsModule {
}
