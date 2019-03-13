import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

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
        private router: Router,
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

    createProduct(name: string, description: string, price: number) {

        this.productService.createProduct(
            {
                name: name,
                description: description,
                price: price,
                sellerUid: this.user.uid,
                urls: this.urls,
            } as Product);
        this.router.navigateByUrl('/products');

    }

    OnUploads(urls: string[]) {
        this.urls = urls;
    }

}
