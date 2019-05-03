import {NgModule} from '@angular/core';
import {ProductCreateComponent} from './product-create.component';
import {SharedModule} from '../../shared.module';
import {ProductCreateRoutingModule} from './product-create-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {ImagePreviewComponent} from './image-preview/image-preview.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ImageCropperModule} from 'ngx-img-cropper';
import {CategoriesComponent} from './categories/categories.component';
import {AgmCoreModule} from '@agm/core';
import {ProductSharedModule} from '../product-shared.module';

@NgModule({
    declarations: [
        ProductCreateComponent,
        // ImageComponent,
        ImagePreviewComponent,
        CategoriesComponent,

    ],
    imports: [
        SharedModule,
        ProductCreateRoutingModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        DragDropModule,
        ImageCropperModule,
        AgmCoreModule,
        ProductSharedModule
    ]
})
export class ProductCreateModule {
}
