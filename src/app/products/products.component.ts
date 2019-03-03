import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    products: Product[];

    constructor(private productService: ProductService,
                public auth: AuthService) {

    }

    ngOnInit() {
        this.getProducts();
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
        this.productService.addProduct({name: name, description: description, price: price_number, seller: 'misho'} as Product)
            .subscribe(product => this.products.push(product));

    }

    private getProducts() {
        this.productService.getProducts()
            .subscribe(products => this.products = products);
    }
}
