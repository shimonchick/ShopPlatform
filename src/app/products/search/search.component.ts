import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, mergeMap, scan, tap, throttleTime} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/product';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    /*
        Drawer
     */
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    /*
        Virtual Scroller
     */
    infinite$: Observable<Product[]>;
    theEnd = false;
    private batch = 10;
    private offset = new BehaviorSubject(null);

    /*
        Algolia
     */
    searchConfig = {
        ...environment.algolia,
        indexName: 'product_search'
    };
    showResults = false;
    searchChanged(query) {
        this.showResults = !!query.length;
        console.log('results: ');
        console.log(query);
    }

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
    }

    getBatch(offset) {
        console.log('getting next batch');
        console.log(offset);
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
                })
            );
    }
    nextOffset(offset) {
        this.offset.next(offset);
    }
}
