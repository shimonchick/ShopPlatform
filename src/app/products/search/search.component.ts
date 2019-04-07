import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, throttleTime} from 'rxjs/operators';
import {ChangeEvent, VirtualScrollerComponent} from 'ngx-virtual-scroller';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/product';
import {scan} from 'rxjs/internal/operators/scan';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';
import {tap} from 'rxjs/internal/operators/tap';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver,
                private db: AngularFirestore) {
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
    }

    @ViewChild(VirtualScrollerComponent)
    scroller: VirtualScrollerComponent;
    loading = false;
    viewportItems: Product[];
    infinite$: Observable<Product[]>;
    private batch = 10;
    private theEnd = false;
    private offset = new BehaviorSubject(null);
    private total: number;


        // const chance = new Chance();
        // for (let i = 0; i < 20; i++) {
        //     const id = this.db.createId();
        //     this.db.collection('products')
        //         .doc(id)
        //         .set({
        //             name: chance.name(),
        //             description: chance.paragraph(),
        //             price: chance.integer({min: 0, max: 1500}),
        //             sellerUid: 'ICGBWSieAWWtBKG9u0qkCw1DqTA2',
        //             urls: [chance.avatar({protocol: 'https'})],
        //             id: id
        //         } as Product).then();
        // }



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

    // showProductPreview(product: Product) {
    //     const dialogRef: ProductPreviewOverlayRef = this.previewDialog.open({
    //         product: product
    //     });
    // }
}
