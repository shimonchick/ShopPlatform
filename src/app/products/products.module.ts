import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../shared.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FlexLayoutModule} from '@angular/flex-layout';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {ProductPreviewComponent} from './product-preview/product-preview.component';
import {GalleryModule} from '@ngx-gallery/core';
import {GallerizeModule} from '@ngx-gallery/gallerize';
import {LightboxModule} from '@ngx-gallery/lightbox';
import {environment} from '../../environments/environment';
import {NgAisModule} from 'angular-instantsearch';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {LayoutModule} from '@angular/cdk/layout';
import {AgmCoreModule} from '@agm/core';
import {ProductsViewComponent} from './products-view/products-view.component';
import {SearchComponent} from './search/search.component';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {ProductDetailComponent} from './product-detail/product-detail.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductPreviewComponent,
        ProductDetailComponent,
        SearchComponent,
        SearchBarComponent,
        ProductsViewComponent,
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
