import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
    selector: 'app-product-bottom-sheet',
    templateUrl: './product-bottom-sheet.component.html',
    styleUrls: ['./product-bottom-sheet.component.scss']
})
export class ProductBottomSheetComponent implements OnInit {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        console.log('%c DATAAA', 'color: brown');
        console.log(data);
    }

    ngOnInit() {
    }

}
