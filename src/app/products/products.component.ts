import {Component, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, mergeMap, scan, tap, throttleTime} from 'rxjs/operators';
import {Product} from '../models/product';
import {ChangeEvent, VirtualScrollerComponent} from 'ngx-virtual-scroller';
import {ProductPreviewOverlayService} from '../services/preview-overlay/product-preview-overlay.service';
import {ProductPreviewOverlayRef} from '../services/preview-overlay/overlay-ref';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    @ViewChild(VirtualScrollerComponent)
    scroller: VirtualScrollerComponent;

    batch = 10;
    theEnd = false;
    loading = false;

    offset = new BehaviorSubject(null);
    infinite$: Observable<Product[]>;
    private total: number;

    constructor(private db: AngularFirestore,
                private previewDialog: ProductPreviewOverlayService) {

        const batchMap = this.offset.pipe(
            throttleTime(100),
            mergeMap(n => this.getBatch(n)),
            scan((acc, batch) => {
                return {...acc, ...batch};
            }, {}),
            tap(console.log),
        );

        this.infinite$ = batchMap.pipe(map(v => Object.values(v)));
        this.infinite$.subscribe(all => {
            this.total = all.length;
        });
        // this.infinite$.subscribe(it => {
        //     console.log('ALL DATA:');
        //     console.log(it);
        // });
    }

    getBatch(offset) {
        return this.db
            .collection('products', ref =>
                ref
                    .orderBy('id')
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
                }),
                tap(() => this.loading = false)
            );
    }

    nextBatch(event: ChangeEvent, offset) {
        console.log(event);
        if (event.end !== this.total - 1) {
            // console.log('in return');
            return;
        }
        if (this.theEnd) {
            return;
        }
        this.loading = true;

        // const end = this.scroller.viewPortInfo.endIndex;
        // const total = this.total;
        // todo
        // const limit = total - 4; // If you are 4 elements before the end - fetch more
        // console.log(`end: ${end} | total: ${total} | e: ${e}, limit: ${limit}`);

        // console.log(`${end}, '>=', ${total}`);
        // if (end >= limit) {
        console.log('%c next please', 'color: brown');
        this.offset.next(offset);
        // }
    }

    showProductPreview(product: Product) {
        const dialogRef: ProductPreviewOverlayRef = this.previewDialog.open({
            product: product
        });
    }
}
