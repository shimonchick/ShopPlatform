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
import {NgAisModule} from 'angular-instantsearch';
import {LayoutModule} from '@angular/cdk/layout';
import {AgmCoreModule} from '@agm/core';
import {SearchComponent} from './search/search.component';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductSharedModule} from './product-shared.module';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
    declarations: [
        // ProductPreviewComponent,
        ProductDetailComponent,
        SearchComponent,
        ProductsListComponent,
        ConfirmationDialogComponent
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
        AgmCoreModule,
        NgAisModule,
        LayoutModule,
        AngularFireFunctionsModule,
        ProductSharedModule
    ],
    entryComponents: [
        ProductPreviewComponent,
        ConfirmationDialogComponent,
    ]
})
export class ProductsModule {
}
