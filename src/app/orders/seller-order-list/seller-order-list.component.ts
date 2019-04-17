import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-seller-order-list',
    templateUrl: './seller-order-list.component.html',
    styleUrls: ['./seller-order-list.component.scss']
})
export class SellerOrderListComponent implements OnInit {
    orders: DisplayOrder[] = [];
    private _newOrder: DisplayOrder = {product: null, seller: null};

    constructor(
        public auth: AuthService,
        private orderService: OrderService,
        private userService: UserService,
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        this.orderService.getSellerOrders().subscribe(async (orders: any) => {
                console.log(orders);
                for (let i = 0; i < orders.length; i++) {
                    this._newOrder.seller = await this.userService.getUserByIdAsPromise(orders[i].sellerId);
                    this.productService.getProduct(orders[i].productId).subscribe((product) => {
                        this._newOrder.product = product;
                        this.orders.push(this._newOrder);
                    });

                }

            }
        );
    }


}
