import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition} from '@ngx-gallery/core';
import {Lightbox} from '@ngx-gallery/lightbox';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Seller} from '../../models/seller';
import {UserService} from '../../services/user.service';
import {OrderService} from '../../services/order.service';
import {AuthService} from '../../services/auth.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../models/user';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    product$: Observable<Product>;
    items: GalleryItem[];
    seller: Seller;
    showMap = true;
    product: Product;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private productService: ProductService,
                public gallery: Gallery,
                public lightbox: Lightbox,
                public userService: UserService,
                public orderService: OrderService,
                public auth: AuthService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private db: AngularFirestore) {
    }


    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(id);
        this.product$ = this.productService.getProduct(id);

        /** Basic Gallery Example */
        this.product$.subscribe(async product => {
            console.log('productttt');
            console.log(product);
            // Creat gallery items
            this.product = product;
            this.items = product.urls.map(url => new ImageItem({src: url, thumb: url}));
            this.seller = await this.userService.getUserByIdAsPromise(product.sellerUid) as Seller;


            /** Lightbox Example */

                // Get a lightbox gallery ref
            const lightboxRef = this.gallery.ref('lightbox');

            // Add custom gallery config to the lightbox (optional)
            lightboxRef.setConfig({
                imageSize: ImageSize.Cover,
                thumbPosition: ThumbnailsPosition.Top,
                loadingMode: 'indeterminate'
            });

            // Load items into the lightbox gallery ref
            lightboxRef.load(this.items);
        });

    }

    openDialog() {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.orderItem();
            }
        });
    }

    setBuyerRole(user: User) {
        const newUser = {
            ...user,
            roles: {
                buyer: true
            }
        };

        this.db.doc(`users/${user.uid}`).set(newUser, {merge: true});
    }

    async orderItem() {
        const user = await this.auth.getUser();
        console.log('user fetched');
        await this.orderService.create(user.uid, this.seller.uid, this.product.id);
        console.log('order created');
        if (!user.roles.buyer) {
            this.setBuyerRole(user);
        }
        const snackBarRef = this.snackBar.open('Successfully ordered item', 'View', {
            duration: 10000
        });
        snackBarRef.onAction().subscribe(() => {
            this.router.navigateByUrl('orders/buyer');
        });
    }


    async openChat(participantUserId: string) {
        // add friend
        const user = await this.auth.getUser();
        await this.db.doc(`friends/${user.uid}`).set({[participantUserId]: true}, {merge: true});
        await this.db.doc(`friends/${participantUserId}`).set({[user.uid]: true}, {merge: true});
        await this.router.navigate(['/chats', participantUserId]);
    }
}

