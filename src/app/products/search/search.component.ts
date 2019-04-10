import {Component} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {debounceTime, map, mergeMap, mergeMapTo, scan, switchMapTo, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/product';
import {environment} from '../../../environments/environment';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {AngularFireFunctions} from '@angular/fire/functions';

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

    /*
        Algolia
     */
    searchConfig = {
        ...environment.algolia,
        indexName: 'product_search'
    };
    showResults = false;
    private searchText$ = new BehaviorSubject<string>('');
    // private batch = 10;
    private currentPage$ = new BehaviorSubject<number>(0); // todo

    constructor(private breakpointObserver: BreakpointObserver,
                private db: AngularFirestore,
                private functions: AngularFireFunctions) {

        this.infinite$ = this.searchText$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMapTo(this.currentPage$),
            tap(page => {
                console.log(`current page: ${page}`);
            }),
            mergeMapTo(this.search()),
            scan((acc, batch) => {
                return [...acc, ...batch];
            }, []),
            tap((it) => console.log(it))
        );
        this.searchText$.subscribe(() => {
            this.currentPage$.next(0);
        });
    }

    // getBatch() {
    //     console.log('getting next batch');
    //     // console.log(offset);
    //     return this.functions.httpsCallable('search')({
    //         query: ''
    //     }) // todo
    //     // return this.db
    //     //     .collection('products', ref =>
    //     //         ref
    //     //             .orderBy('id')
    //     //             .startAfter(offset)
    //     //             .limit(this.batch)
    //     //     )
    //     //     .snapshotChanges()
    //         .pipe(
    //             tap(arr => (arr.length ? null : (this.theEnd = true)))
    //         );
    // }

    searchChanged(query) {
        this.showResults = !!query.length;
        this.searchText$.next(query);
    }

    search() {
        return of(this.searchText$.value).pipe(
            tap(() => {
                console.log(`piping page ${this.currentPage$.value}`);
            }),
            mergeMap(query => this.functions.httpsCallable('search')({query, page: this.currentPage$.value})),
            tap(res => console.log(res)),
            map(response => response.hits),
        );
    }

    nextPage() {
        this.currentPage$.next(this.currentPage$.value + 1);
    }
}
