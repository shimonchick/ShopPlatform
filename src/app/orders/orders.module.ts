import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {BuyerOrderListComponent} from './buyer-order-list/buyer-order-list.component';
import {SharedModule} from '../shared.module';
import {SellerOrderListComponent} from './seller-order-list/seller-order-list.component';

@NgModule({
    declarations: [BuyerOrderListComponent, SellerOrderListComponent],
    imports: [
        CommonModule,
        OrdersRoutingModule,
        SharedModule
    ]
})
export class OrdersModule {
}
