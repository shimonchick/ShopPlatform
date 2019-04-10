import {Component} from '@angular/core';
import {BehaviorSubject, interval, Observable, of} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {debounceTime, distinctUntilChanged, map, mergeMap, scan, switchMap, tap, mergeMapTo} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/product';
import {environment} from '../../../environments/environment';
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
            // switchMapTo(interval(1000)),
            tap(() => this.reset()),
            switchMap(text => this.currentPage$.pipe(
                mergeMapTo(this.search(text)),
                tap(arr => (arr.length ? null : (this.theEnd = true))),
                scan((acc, batch) => {
                    return [...acc, ...batch];
                }, []),
                tap((it) => console.log(it))
            )),
        );
    }

    reset() {
        this.theEnd = false;
        this.currentPage$.next(0);
    }

    searchChanged(query) {
        this.showResults = !!query.length;
        if (typeof query !== 'object') {
            this.searchText$.next(query);
            return;
        }
        console.log('OBJECT!!');
    }

    search(text: string) {
        return of(text).pipe(
            tap(() => console.log(text)),
            mergeMap(query => this.functions.httpsCallable('search')({query, page: this.currentPage$.value})),
            tap(res => console.log(res)),
            map(response => response.hits),
        );
    }

    nextPage() {
        this.currentPage$.next(this.currentPage$.value + 1);
    }
}
