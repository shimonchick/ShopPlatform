import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

    user: User;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    private urls: string[];
    private name: string;
    private description: string;
    private price: number;

    constructor(
        private productService: ProductService,
        public auth: AuthService,
        private formBuilder: FormBuilder,
    ) {

        auth.user$.subscribe(user => {
            this.user = user;
        });

    }

    ngOnInit() {
        this.firstFormGroup = this.formBuilder.group({
            firstCtrl: ['']
        });
        this.secondFormGroup = this.formBuilder.group({
            secondCtrl: ['']
        });
    }

    createProduct() {

        this.productService.createProduct(
            {
                name: this.name,
                description: this.description,
                price: this.price,
                seller: this.user.uid,
                urls: this.urls,
            } as Product);

    }

    OnUploads(urls: string[]) {
        this.urls = urls;
    }

    setProductName(value: string) {
        if (!value) {
            return;
        }
        value = value.trim();
        // TODO other validations
        this.name = value;
    }

    setProductDescription(value: string) {
        if (!value) {
            return;
        }
        value = value.trim();
        // TODO other validations
        this.description = value;
    }

    setProductPrice(value: number) {
        if (!value) {
            return;
        }

        // TODO other validations
        this.price = value;
    }
}
