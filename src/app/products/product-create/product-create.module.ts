import {NgModule} from '@angular/core';
import {ProductCreateComponent} from './product-create.component';
import {UploaderComponent} from './uploader/uploader.component';
import {UploadTaskComponent} from './upload-task/upload-task.component';
import {SharedModule} from '../../shared.module';
import {ProductCreateRoutingModule} from './product-create-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {ImagePreviewComponent} from './image-preview/image-preview.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ImageCropperModule} from 'ngx-img-cropper';
import {AgmCoreModule} from '@agm/core';
import {ProductSharedModule} from '../product-shared.module';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';

@NgModule({
    declarations: [
        ProductCreateComponent,
        UploaderComponent,
        UploadTaskComponent,
        // ImageComponent,
        ImagePreviewComponent,
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
        ProductSharedModule
    ],
    entryComponents: [
        ChooseCategoryComponent,
    ]
})
export class ProductCreateModule {
}
