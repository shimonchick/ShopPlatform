import {NgModule} from '@angular/core';
import {ProductCreateComponent} from './product-create.component';
import {SharedModule} from '../../shared.module';
import {ProductCreateRoutingModule} from './product-create-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {ImagePreviewComponent} from './image-preview/image-preview.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ImageCropperModule} from 'ngx-img-cropper';
import {AgmCoreModule} from '@agm/core';
import {ProductSharedModule} from '../product-shared.module';
import {ChooseCategoryComponent} from './choose-category/choose-category.component';
import {CheckoutDirective} from './checkout.directive';
import {CheckoutComponent} from './checkout/checkout.component';
import {GridsterModule} from 'angular-gridster2';

@NgModule({
    declarations: [
        ProductCreateComponent,
        // ImageComponent,
        ImagePreviewComponent,

        CheckoutDirective,
        CheckoutComponent,
        ChooseCategoryComponent,
    ],
    imports: [
        SharedModule,
        ProductCreateRoutingModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        DragDropModule,
        ImageCropperModule,
        AgmCoreModule,
        ProductSharedModule,
        GridsterModule,
    ],
    entryComponents: [
        ChooseCategoryComponent,
        CheckoutComponent
    ]
})
export class ProductCreateModule {
}
