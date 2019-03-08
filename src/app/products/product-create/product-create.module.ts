import {NgModule} from '@angular/core';
import {ProductCreateComponent} from './product-create.component';
import {UploaderComponent} from './uploader/uploader.component';
import {UploadTaskComponent} from './upload-task/upload-task.component';
import {SharedModule} from '../../shared.module';
import {ProductCreateRoutingModule} from './product-create-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DropzoneDirective} from './directives/dropzone.directive';

@NgModule({
    declarations: [
        ProductCreateComponent,
        UploaderComponent,
        UploadTaskComponent,
        DropzoneDirective,
    ],
    imports: [
        SharedModule,
        ProductCreateRoutingModule,
        ReactiveFormsModule,
    ]
})
export class ProductCreateModule {
}
