import {Component, Inject, OnInit} from '@angular/core';
import {ProductPreviewOverlayRef} from '../../services/preview-overlay/overlay-ref';
import {PRODUCT_PREVIEW_DIALOG_DATA} from '../product-preview/preview-data';
import {Product} from '../../models/product';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail-overlay.component.html',
    styleUrls: ['./product-detail-overlay.component.scss']
})
export class ProductDetailOverlayComponent implements OnInit {

    constructor(
        public dialogRef: ProductPreviewOverlayRef,
        @Inject(PRODUCT_PREVIEW_DIALOG_DATA) public product: Product
    ) {
    }

    ngOnInit() {
    }

    closeOverlay() {
        this.dialogRef.close();
    }
}
