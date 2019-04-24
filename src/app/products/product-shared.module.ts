import {NgModule} from '@angular/core';
import {ProductPreviewComponent} from './product-preview-card/product-preview.component';
import {SharedModule} from '../shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [ProductPreviewComponent],
    exports: [ProductPreviewComponent]
})
export class ProductSharedModule {
}
