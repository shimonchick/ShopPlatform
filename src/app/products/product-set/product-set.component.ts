import {Component, OnInit} from '@angular/core';
import {CategoryTree, PreviewProduct, Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import {AngularFireStorage} from '@angular/fire/storage';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {Seller} from '../../models/seller';
import {ChooseCategoryComponent} from './choose-category/choose-category.component';
import {first, last, map, startWith} from 'rxjs/operators';
import {MapsLocation} from '../../models/location';
import {possibleCategories} from './choose-category/possible-categories';
import {CheckoutComponent} from './checkout/checkout.component';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import {FormlyFieldConfig} from '@ngx-formly/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-product-create',
    templateUrl: './product-set.component.html',
    styleUrls: ['./product-set.component.scss']
})
export class ProductSetComponent implements OnInit {

    user: Seller;
    // firstFormGroup: FormGroup;
    // secondFormGroup: FormGroup;

    form = new FormGroup({});
    fields: FormlyFieldConfig[] = [];
    additionalDetails = {};
    newFiles: File[] = [];

    categoryTree: CategoryTree;
    previewProduct$: Observable<PreviewProduct>;
    product = new Product();
    coordinates: MapsLocation;
    readonly allCategories = possibleCategories;
    uploading = false;
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
    private urlsChanges = new BehaviorSubject<string[]>(['https://via.placeholder.com/500']);

    constructor(
        private productService: ProductService,
        public auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private storage: AngularFireStorage,
        private dialog: MatDialog
    ) {

    }

    /*async*/
    ngOnInit() {
        const productId = this.activatedRoute.snapshot.paramMap.get('id');
        if (productId) {
            // if there was an id provided - use the data from the product
            this.productService.getProduct(productId).pipe(first()).toPromise().then(product => {
                this.product = product;
                this.productForm.controls['name'].setValue(this.product.name);
                this.productForm.controls['description'].setValue(this.product.description);
                this.productForm.controls['price'].setValue(this.product.price);
                this.productForm.controls['categoryTree'].setValue(this.product['categories.lvl1']);
                this.additionalDetails = product.additionalDetails;
                this.urlsChanges.next(this.product.urls);
            });
        } else {
            // if there was no id provided - use the user's data
            this.auth.user$.subscribe((user: Seller) => {
                this.product.coordinates = this.product.coordinates || {
                    lng: user.coordinates.lng,
                    lat: user.coordinates.lat
                };
                console.log(this.product.coordinates);
                this.product.sellerUid = user.uid;
            });
        }
        this.previewProduct$ = combineLatest(
            this.productForm.controls['name'].valueChanges.pipe(
                startWith('Name')),
            this.productForm.controls['price'].valueChanges.pipe(startWith(0)),
            this.urlsChanges
            // previewUrls as well
        ).pipe(
            map(([name, price, urls]: [string, number, string[]]) => ({name, price, urls}))
        );
    }

    async uploadProduct() {
        this.uploading = true;
        await this.uploadAllFiles();
        const productId = await this.productService.createProduct(this.product);
        this.uploading = false;
        console.log(productId);
        const dialogRef = this.dialog.open(CheckoutComponent, {
            data: {productId: productId},
        });
        dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['products']);
        });
        // alert('product successfully created');
        // this.router.navigate(['products', productId]);
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
        this.newFiles = [...this.newFiles, ...files];
    }

    uploadFile(file: File): Promise<UploadTaskSnapshot> {
        const path = `images/${Date.now()}_${file.name}`;
        const task = this.storage.upload(path, file);
        return task.snapshotChanges().pipe(last()).toPromise() as Promise<UploadTaskSnapshot>;
    }

    async uploadAllFiles() {
        const uploads = await Promise.all(this.newFiles.map(file => this.uploadFile(file)));
        console.log(this.product.urls);
        this.product.urls = [...this.product.urls, ...await Promise.all(uploads.map(upload => upload.ref.getDownloadURL()))];
    }

    selectMarker(lat: number, lng: number) {
        this.product.coordinates.lat = lat;
        this.product.coordinates.lng = lng;
    }


    fillProductDetails(name: string, description: string, price: string) {
        name = name.trim();
        description = description.trim();
        const priceInt = parseInt(price.trim(), 10);
        this.product.name = name;
        this.product.description = description;
        this.product.price = priceInt;
        this.product = {...this.product, additionalDetails: this.aditionalDetails};
    }

    chooseCategory() {
        const dialogRef = this.dialog.open(ChooseCategoryComponent, {
            maxHeight: '90vh'
        });

        dialogRef.afterClosed().subscribe((categoryTree: CategoryTree) => {
            this.categoryTree = categoryTree;
            this.product['categories.lvl0'] = categoryTree.lvl0;
            this.product['categories.lvl1'] = `${categoryTree.lvl0} > ${categoryTree.lvl1}`;
            this.productForm.controls['categoryTree'].setValue(this.toSelectOption(categoryTree));

            this.fields = this.categoryTree.fields;
        });
    }

    onUrlsSelected($event: string[]) {
        this.urlsChanges.next($event);
    }

    toSelectOption(categoryTree: CategoryTree) {
        return `${categoryTree.lvl0} -> ${categoryTree.lvl1}`;
    }
}
