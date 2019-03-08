import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductCreateComponent} from './product-create.component';

const routes = [
    {path: '', component: ProductCreateComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductCreateRoutingModule {
}
