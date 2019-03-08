import {NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    exports: [
        FormsModule,
        CommonModule,
        MaterialModule
    ]
})
export class SharedModule {
}
