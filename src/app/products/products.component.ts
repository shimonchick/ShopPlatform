import {Component, EventEmitter, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, mergeMap, scan, tap, throttleTime} from 'rxjs/operators';
import {Product} from '../models/product';
import {ChangeEvent, VirtualScrollerComponent} from 'ngx-virtual-scroller';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    @ViewChild(VirtualScrollerComponent)
    scroller: VirtualScrollerComponent;
    loading = false;
    viewportItems: Product[];
    infinite$: Observable<Product[]>;
    private batch = 10;
    private theEnd = false;
    private offset = new BehaviorSubject(null);
    private total: number;

    constructor(private db: AngularFirestore) {
        const batchMap = this.offset.pipe(
            // shareReplay(1),
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
    }

    getBatch(offset) {
        // todo should come from algolia
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
            return;
        }
        if (this.theEnd) {
            return;
        }
        this.loading = true;

        console.log('%c next please', 'color: brown');
        this.offset.next(offset);
    }
}
