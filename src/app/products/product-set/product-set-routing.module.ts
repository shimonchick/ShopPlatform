import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductSetComponent} from './product-set.component';
import {AuthGuard} from '../../core/auth.guard';
import {SellerGuard} from '../../core/seller.guard';

const routes = [
    {path: '', canActivate: [AuthGuard, SellerGuard], component: ProductSetComponent},
    {path: ':id', canActivate: [AuthGuard, SellerGuard], component: ProductSetComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductSetRoutingModule {
}
