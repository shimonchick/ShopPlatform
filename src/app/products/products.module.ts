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
import {AgmCoreModule} from '@agm/core';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductDetailOverlayComponent,
        ProductPreviewComponent,
        ProductDetailComponent,
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
            apiKey: 'AIzaSyCZZpfER7Nqg_yvw5q0jJfIpR3I4akGpKM'
            /* apiKey is required, unless you are a
            premium customer, in which case you can
            use clientId
            */
        })
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
