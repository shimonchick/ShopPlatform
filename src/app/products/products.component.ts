import {Component, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, mergeMap, scan, tap, throttleTime} from 'rxjs/operators';
import {Product} from '../models/product';
import {MatBottomSheet} from '@angular/material';
import {ProductBottomSheetComponent} from './product-bottom-sheet/product-bottom-sheet.component';
import {AuthService} from '../services/auth.service';
import {ChatService} from '../services/chat.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    @ViewChild(CdkVirtualScrollViewport)
    viewport: CdkVirtualScrollViewport;

    batch = 20;
    theEnd = false;

    offset = new BehaviorSubject(null);
    infinite$: Observable<Product[]>;

    displayedColumns = ['img', 'name', 'description', 'options'];

    constructor(private db: AngularFirestore,
                private bottomSheet: MatBottomSheet,
                private auth: AuthService,
                private cs: ChatService) {
        const batchMap = this.offset.pipe(
            tap(() => console.log('Getting new batch of data')),
            throttleTime(500),
            mergeMap(n => this.getBatch(n)),
            scan((acc, batch) => {
                return {...acc, ...batch};
            }, {})
        );

        this.infinite$ = batchMap.pipe(map(v => Object.values(v)));
    }

    getBatch(offset) {
        return this.db
            .collection('products', ref =>
                ref
                    .orderBy('name')
                    .startAfter(offset)
                    .limit(this.batch)
            )
            .snapshotChanges()
            .pipe(
                tap(arr => (arr.length ? null : (this.theEnd = true))),
                map(arr => {
                    return arr.reduce((acc, cur) => {
                        const id = cur.payload.doc.id;
                        const data = cur.payload.doc.data();
                        return {...acc, [id]: data};
                    }, {});
                })
            );
    }

    nextBatch(e, offset) {

        if (this.theEnd) {
            return;
        }

        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();
        const limit = total - 4; // If you are 4 elements before the end - fetch more

        console.log(`${end}, '>=', ${total}`);
        if (end >= limit) {
            this.offset.next(offset);
        }
    }

    trackByIdx(i) {
        return i;
    }

    openProductDetailBottomSheet(product: Product) {
        this.bottomSheet.open(ProductBottomSheetComponent, {
            data: product
        });
    }

}
