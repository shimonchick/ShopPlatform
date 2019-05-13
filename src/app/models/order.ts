import {Product} from './product';
import {User} from './user';

export interface Order {
    orderId;
    productId;
    buyerId;
    sellerId;
}

export interface DisplayOrder {
    product: Product;
    person: User;
}
