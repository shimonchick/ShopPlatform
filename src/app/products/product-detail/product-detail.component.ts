import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Location} from '@angular/common';
import {Product} from '../../models/product';
import {AuthService} from '../../services/auth.service';
import {ChatService} from '../../services/chat.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    @Input() product: Product;

    seller: User;
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private location: Location,
        public auth: AuthService,
        public chatService: ChatService,
        private userService: UserService) {
    }

    async ngOnInit() {
        this.seller = await this.userService.getUserById(this.product.sellerUid);
        console.log(this.seller);
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
