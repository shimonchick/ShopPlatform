import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';
import {DisplayOrder, Order} from '../../models/order';
import {first, tap} from 'rxjs/operators';
import {User} from '../../models/user';
import {Product} from '../../models/product';

@Component({
    selector: 'app-seller-order-list',
    templateUrl: './seller-order-list.component.html',
    styleUrls: ['./seller-order-list.component.scss']
})
export class SellerOrderListComponent implements OnInit {
    displayOrders: DisplayOrder[] = [];
    constructor(
        public auth: AuthService,
        private orderService: OrderService,
        private userService: UserService,
        private productService: ProductService
    ) {
    }

    async ngOnInit() {
        const orders: Order[] = await this.orderService.getBuyerOrders().pipe(first(), tap(console.log)).toPromise();
        const buyers: User[] = await Promise.all(orders.map(order => this.userService.getUserByIdAsPromise(order.buyerId)));
        const products: Product[] = await Promise.all(orders.map(order => {
            return this.productService.getProduct(order.productId).pipe(first()).toPromise();
        }));
        for (let i = 0; i < orders.length; i++) {
            this.displayOrders.push({product: products[i], person: buyers[i]});
        }
        // this.orderService.getSellerOrders().subscribe(async (orders: any) => {
        //         console.log(orders);
        //         for (let i = 0; i < orders.length; i++) {
        //             this._newOrder.seller = await this.userService.getUserByIdAsPromise(orders[i].sellerId);
        //             this.productService.getProduct(orders[i].productId).subscribe((product) => {
        //                 this._newOrder.product = product;
        //                 this.orders.push(this._newOrder);
        //             });
        //
        //         }
        //
        //     }
        // );
    }


}
