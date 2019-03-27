import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductBottomSheetComponent} from './product-bottom-sheet/product-bottom-sheet.component';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../shared.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FlexLayoutModule} from '@angular/flex-layout';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import { ProductPreviewComponent } from './product-preview/product-preview.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductDetailComponent,
        ProductBottomSheetComponent,
        ProductPreviewComponent,
    ],
    imports: [
        ProductsRoutingModule,
        SharedModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        FlexLayoutModule,
        VirtualScrollerModule,
    ],
    entryComponents: [
        ProductBottomSheetComponent
    ]
})
export class ProductsModule {
}
