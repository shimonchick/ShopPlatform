import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductBottomSheetComponent} from './product-bottom-sheet/product-bottom-sheet.component';
import {ProductsRoutingModule} from './products-routing.module';
import {SharedModule} from '../shared.module';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductDetailComponent,
        ProductBottomSheetComponent,
    ],
    imports: [
        ProductsRoutingModule,
        SharedModule
    ],
    entryComponents: [
        ProductBottomSheetComponent
    ]
})
export class ProductsModule {
}
