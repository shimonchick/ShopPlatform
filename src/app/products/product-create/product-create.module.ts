import {NgModule} from '@angular/core';
import {ProductCreateComponent} from './product-create.component';
import {UploaderComponent} from './uploader/uploader.component';
import {UploadTaskComponent} from './upload-task/upload-task.component';
import {SharedModule} from '../../shared.module';
import {ProductCreateRoutingModule} from './product-create-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({
    declarations: [
        ProductCreateComponent,
        UploaderComponent,
        UploadTaskComponent,
    ],
    imports: [
        SharedModule,
        ProductCreateRoutingModule,
        ReactiveFormsModule,
        NgxDropzoneModule
    ]
})
export class ProductCreateModule {
}
