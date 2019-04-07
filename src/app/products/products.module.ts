import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {ProductDetailOverlayComponent} from './product-detail/product-detail-overlay.component';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../shared.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FlexLayoutModule} from '@angular/flex-layout';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {ProductPreviewComponent} from './product-preview/product-preview.component';
import {ProductPreviewOverlayService} from '../services/preview-overlay/product-preview-overlay.service';
import {ProductDetailComponent} from './product-detail/product-detail/product-detail.component';
import {GalleryModule} from '@ngx-gallery/core';
import {GallerizeModule} from '@ngx-gallery/gallerize';
import {LightboxModule} from '@ngx-gallery/lightbox';
import {environment} from '../../environments/environment';
import {NgAisModule} from 'angular-instantsearch';
import {SearchComponent} from './search-test/search.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {AgmCoreModule} from '@agm/core';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductDetailOverlayComponent,
        ProductPreviewComponent,
        ProductDetailComponent,
        SearchComponent,
        SearchBarComponent,
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
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule
    ],
    entryComponents: [
        ProductPreviewComponent
    ],
    providers: [
        ProductPreviewOverlayService
    ]
})
export class ProductsModule {
}
