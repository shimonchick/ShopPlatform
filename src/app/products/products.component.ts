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

}
