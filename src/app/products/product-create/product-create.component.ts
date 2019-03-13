import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this.formBuilder.group({
            secondCtrl: ['']
        });
    }

    createProduct(name: string, description: string, price: number) {

        this.productService.createProduct(
            {
                name: name,
                description: description,
                price: price,
                seller: this.user.uid,
                urls: this.urls,
            } as Product);

    }

    OnUploads(urls: string[]) {
        this.urls = urls;
    }

}
