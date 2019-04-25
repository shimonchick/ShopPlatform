import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition} from '@ngx-gallery/core';
import {Lightbox} from '@ngx-gallery/lightbox';
import {Seller, User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ChatService} from '../../services/chat.service';

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

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private productService: ProductService,
                public gallery: Gallery,
                public lightbox: Lightbox,
                public userService: UserService,
                public chatService: ChatService) {
    }


    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(id);
        this.product$ = this.productService.getProduct(id);

        /** Basic Gallery Example */
        this.product$.subscribe(async product => {
            // Creat gallery items
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

    chatWith(otherUser: User) {
        this.chatService.openChat(otherUser);
    }
}
