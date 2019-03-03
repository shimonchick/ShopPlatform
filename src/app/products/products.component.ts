import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    products$: Observable<Product[]>;
    user: User;

    constructor(private productService: ProductService,
                public auth: AuthService) {
        auth.user$.subscribe(user => {
            this.user = user;
        });
    }

    ngOnInit() {
        this.products$ = this.productService.getProducts();
    }

    add(name: string, description: string, price: string) {
        name = name.trim();
        description = description.trim();
        const price_number: number = Number(price.trim());

        if (!name || !description || !price) {
            // TODO: show a message to the user.
            return;
        }
        // TODO: validate input
        // TODO: valid seller
        this.productService.createProduct({name: name, description: description, price: price_number, seller: this.user.uid} as Product);

    }
}
