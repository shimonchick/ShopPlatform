import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

    user: User;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;


    priceFormControl = new FormControl('', [
        Validators.required,
    ]);
    descriptionFormControl = new FormControl('', [
        Validators.required,
    ]);
    matcher = new CustomErrorStateMatcher();
    private MIN_LENGTH = 3;
    private MAX_LENGTH = 50;
    nameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(this.MIN_LENGTH),
        Validators.maxLength(this.MAX_LENGTH)
    ]);
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

    getErrorMessage() {
        let message: string;
        if (this.nameFormControl.hasError('required')) {
            message = 'Product name is required';
        } else if (this.nameFormControl.hasError('minlength')) {
            message = `Product name must be more than ${this.MIN_LENGTH}`;
        } else if (this.nameFormControl.hasError('maxlength')) {
            message = `Product name must be less than ${this.MAX_LENGTH}`;
        }
        return message;
    }
}
