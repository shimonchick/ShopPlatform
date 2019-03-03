import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Location} from '@angular/common';
import {Product} from '../models/product';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    public product: Product;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private location: Location,
        private auth: AuthService) {
    }

    ngOnInit() {
        this.getProduct();
    }

    getProduct() {
        const id: number = Number(this.route.snapshot.paramMap.get('id')); // get id parameter from URL
        this.productService.getProduct(id)
            .subscribe(product => {
                this.product = product;
            });

    }

    goBack() {
        this.location.back();
    }

    save() {
        this.productService.updateProduct(this.product)
            .subscribe(() => this.goBack());
    }

    delete(product: Product) {
        this.productService.deleteProduct(product)
            .subscribe(() => this.goBack());
    }
}
