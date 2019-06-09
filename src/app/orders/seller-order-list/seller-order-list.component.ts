import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';
import {DisplayOrder, Order} from '../../models/order';
import {first, tap} from 'rxjs/operators';
import {Product} from '../../models/product';
import {Seller} from '../../models/seller';

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
        const orders: Order[] = await this.orderService.getSellerOrders().pipe(first(), tap(console.log)).toPromise();
        const people = await Promise.all(orders.map(order => this.userService.getUserByIdAsPromise(order.sellerId))) as Seller[];
        const products: Product[] = await Promise.all(orders.map(order => {
            return this.productService.getProduct(order.productId).pipe(first()).toPromise();
        }));
        for (let i = 0; i < orders.length; i++) {
            this.displayOrders.push({product: products[i], person: people[i], order: orders[i]});
        }
    }


    deleteOrder(displayOrder: DisplayOrder) {
        this.orderService.delete(displayOrder.order);
        this.displayOrders.splice(this.displayOrders.indexOf(displayOrder), 1);
    }
}
