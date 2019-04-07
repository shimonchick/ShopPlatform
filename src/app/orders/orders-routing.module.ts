import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuyerOrderListComponent} from './buyer-order-list/buyer-order-list.component';
import {SellerOrderListComponent} from './seller-order-list/seller-order-list.component';

const routes: Routes = [
    {path: 'buyer', component: BuyerOrderListComponent},
    {path: 'seller', component: SellerOrderListComponent},
    // {path: ':id', component: OrderComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {
}
