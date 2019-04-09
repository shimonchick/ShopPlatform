import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {AngularFireStorage} from '@angular/fire/storage';
import {forkJoin, from, Observable} from 'rxjs';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

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
    // firstFormGroup: FormGroup;
    // secondFormGroup: FormGroup;

    files: File[] = [];
    downloadUrls: string[];

    done = false;
    categories: string[] = [];
    private NAME_MIN_LENGTH = 3;
    private NAME_MAX_LENGTH = 50;
    private DESCRIPTION_MAX_LENGTH = 10000;
    productForm = this.formBuilder.group({
        name: [null, Validators.compose(
            [Validators.required, Validators.minLength(this.NAME_MIN_LENGTH), Validators.maxLength(this.NAME_MAX_LENGTH)])],
        description: [null, Validators.compose(
            [Validators.required, Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)])],
        price: [null, Validators.required]
    });

    constructor(
        private productService: ProductService,
        public auth: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private storage: AngularFireStorage,
    ) {

        auth.user$.subscribe(user => {
            this.user = user;
        });

    }

    onCategoriesChanged(categories: string[]) {
        this.categories = categories;
        console.log(this.categories);
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
                urls: this.downloadUrls,
            } as Product);
        this.router.navigateByUrl('/products');

    }


    getNameErrorMessage() {
        let message: string;
        if (this.productForm.controls['name'].hasError('required')) {
            message = 'Product name is required';
        } else if (this.productForm.controls['name'].hasError('minlength')) {
            message = `Product name must be more than ${this.NAME_MIN_LENGTH}`;
        } else if (this.productForm.controls['name'].hasError('maxlength')) {
            message = `Product name must be less than ${this.NAME_MAX_LENGTH}`;
        }
        return message;
    }

    getDescriptionErrorMessage() {
        let message: string;
        if (this.productForm.controls['description'].hasError('required')) {
            message = 'Product name is required';
        } else if (this.productForm.controls['description'].hasError('maxlength')) {
            message = `Product name must be less than ${this.NAME_MAX_LENGTH}`;
        }
        return message;
    }

    onFilesSelected(files: File[]) {
        this.files = files;
    }

    uploadFile(file: File): Observable<UploadTaskSnapshot> {
        const path = `images/${Date.now()}_${file.name}`;
        const task = this.storage.upload(path, file);
        return task.snapshotChanges();
    }

    UploadAllFiles() {

        forkJoin(this.files.map((file) => this.uploadFile(file)))
            .subscribe(uploads => {

                const downloadUrlObservables: Observable<any>[] = uploads
                    .map((upload) => from(upload.ref.getDownloadURL()));

                forkJoin(downloadUrlObservables).subscribe(downloadUrls => {
                    this.downloadUrls = downloadUrls;
                    this.done = true;
                });
            });
    }
}
