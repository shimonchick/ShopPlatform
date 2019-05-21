import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductCreateComponent} from './product-create.component';
import {AuthGuard} from '../../core/auth.guard';
import {SellerGuard} from '../../core/seller.guard';

const routes = [
    {path: ':productId', canActivate: [AuthGuard, SellerGuard], component: ProductCreateComponent},
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
