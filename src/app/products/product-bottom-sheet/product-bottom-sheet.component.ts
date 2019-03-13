import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {Product} from '../../models/product';

@Component({
    selector: 'app-product-bottom-sheet',
    templateUrl: './product-bottom-sheet.component.html',
    styleUrls: ['./product-bottom-sheet.component.scss']
})
export class ProductBottomSheetComponent {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Product, private bottomSheetRef: MatBottomSheetRef) {
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
