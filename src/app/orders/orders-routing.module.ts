import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuyerOrderListComponent} from './buyer-order-list/buyer-order-list.component';
import {SellerOrderListComponent} from './seller-order-list/seller-order-list.component';
import {AuthGuard} from '../core/auth.guard';
import {SellerGuard} from '../core/seller.guard';

const routes: Routes = [
    {path: 'buyer', canActivate: [AuthGuard], component: BuyerOrderListComponent},
    {path: 'seller', canActivate: [AuthGuard, SellerGuard], component: SellerOrderListComponent},
    // {path: ':id', component: OrderComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {
}
