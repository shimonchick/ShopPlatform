import {Product} from './product';
import {Seller} from './seller';

export interface Order {
    orderId;
    productId;
    buyerId;
    sellerId;
}

export interface DisplayOrder {
    product: Product;
    person: Seller;
    order: Order;
}
