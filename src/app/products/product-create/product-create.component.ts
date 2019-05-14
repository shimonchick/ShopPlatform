import {Component, OnInit} from '@angular/core';
import {CategoryTree, PreviewProduct, Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import {AngularFireStorage} from '@angular/fire/storage';
import {combineLatest, Observable, Subject} from 'rxjs';
import {Seller} from '../../models/seller';
import {ChooseCategoryComponent} from './choose-category/choose-category.component';
import {last, map, startWith} from 'rxjs/operators';
import {MapsLocation} from '../../models/location';
import {possibleCategories} from './choose-category/possible-categories';
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

    user: Seller;
    // firstFormGroup: FormGroup;
    // secondFormGroup: FormGroup;

    files: File[] = [];

    categoryTree: CategoryTree;
    previewProduct$: Observable<PreviewProduct>;
    product = new Product();
    coordinates: MapsLocation;
    private NAME_MIN_LENGTH = 3;
    private NAME_MAX_LENGTH = 50;
    private DESCRIPTION_MAX_LENGTH = 10000;
    productForm = this.formBuilder.group({
        name: [null, Validators.compose(
            [Validators.required, Validators.minLength(this.NAME_MIN_LENGTH), Validators.maxLength(this.NAME_MAX_LENGTH)])],
        categoryTree: [null, Validators.required],
        description: [null, Validators.compose(
            [Validators.required, Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)])],
        price: [null, Validators.required],
        address: ['seller', Validators.required],
    });
    private urlsChanges = new Subject<string[]>();
    readonly allCategories = possibleCategories;
    uploading = false;

    constructor(
        private productService: ProductService,
        public auth: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private storage: AngularFireStorage,
        private dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.auth.user$.subscribe((user: Seller) => {
            this.product.coordinates = this.product.coordinates || {
                lng: user.coordinates.lng,
                lat: user.coordinates.lat
            };
            console.log(this.product.coordinates);
            this.product.sellerUid = user.uid;
            this.product.priority = 1; // normal offer priority, higher is better
        });
        this.previewProduct$ = combineLatest(
            this.productForm.controls['name'].valueChanges.pipe(
                startWith('Name')),
            this.productForm.controls['price'].valueChanges.pipe(startWith(0)),
            this.urlsChanges.pipe(startWith(['https://via.placeholder.com/500']))
            // urls as well
        ).pipe(
            map(([name, price, urls]: [string, number, string[]]) => {
                return {
                    name: name,
                    price: price,
                    urls: urls
                };
            })
        );
    }

    async uploadProduct() {
        this.uploading = true;
        await this.uploadAllFiles();
        const productId = await this.productService.createProduct(this.product);
        this.uploading = false;
        alert('product successfully created');
        this.router.navigate(['products', productId]);
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

    uploadFile(file: File): Promise<UploadTaskSnapshot> {
        const path = `images/${Date.now()}_${file.name}`;
        const task = this.storage.upload(path, file);
        return task.snapshotChanges().pipe(last()).toPromise();
    }

    async uploadAllFiles() {
        const uploads = await Promise.all(this.files.map(file => this.uploadFile(file)));
        this.product.urls = await Promise.all(uploads.map(upload => upload.ref.getDownloadURL()));
    }

    selectMarker(lat: number, lng: number) {
        this.product.coordinates.lat = lat;
        this.product.coordinates.lng = lng;
    }


    onListingPayAttempt(confirmation: any, priority: number) {
        if (!confirmation.paid || confirmation.status !== 'succeeded') {
            return;
        }
        this.product.priority = priority;
        this.uploadProduct();
    }

    fillProductDetails(name: string, description: string, price: string) {
        name = name.trim();
        description = description.trim();
        const priceInt = parseInt(price.trim(), 10);
        this.product.name = name;
        this.product.description = description;
        this.product.price = priceInt;
    }
    chooseCategory() {
        const dialogRef = this.dialog.open(ChooseCategoryComponent, {
            maxHeight: '90vh'
        });

        dialogRef.afterClosed().subscribe((categoryTree: CategoryTree) => {
            this.categoryTree = categoryTree;
            this.productForm.controls['categoryTree'].setValue(this.toSelectOption(categoryTree));
        });
    }

    onUrlsSelected($event: string[]) {
        this.urlsChanges.next($event);
    }
    toSelectOption(categoryTree: CategoryTree) {
        return `${categoryTree.lvl0} -> ${categoryTree.lvl1}`;
    }
}
