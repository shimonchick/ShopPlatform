import {NgModule} from '@angular/core';
import {ProductSetComponent} from './product-set.component';
import {SharedModule} from '../../shared.module';
import {ProductSetRoutingModule} from './product-set-routing.module';
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
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';

@NgModule({
    declarations: [
        ProductSetComponent,
        // ImageComponent,
        ImagePreviewComponent,

        CheckoutDirective,
        CheckoutComponent,
        ChooseCategoryComponent,
    ],
    imports: [
        SharedModule,
        ProductSetRoutingModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        DragDropModule,
        ImageCropperModule,
        AgmCoreModule,
        ProductSharedModule,
        FormlyMaterialModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
        }),
    ],
    entryComponents: [
        ChooseCategoryComponent,
        CheckoutComponent
    ]
})
export class ProductSetModule {
}
