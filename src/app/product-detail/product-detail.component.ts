import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Location} from '@angular/common';
import {Product} from '../Product';

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
        private location: Location) {
    }

    ngOnInit() {
        this.getProduct();
    }

    getProduct() {
        const id: string = this.route.snapshot.paramMap.get('id'); // get id parameter from URL
        this.productService.getProduct(id)
            .subscribe(product => {
                this.product = product;
            });

    }

    goBack() {
        this.location.back();
    }

    update() {
        this.productService.updateProduct(this.product);
        this.goBack();
    }

    delete() {
        this.productService.deleteProduct(this.product)
            .then(() => this.goBack());
    }
}
