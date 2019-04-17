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
        Algolia
     */
    searchConfig = {
        ...environment.algolia,
        indexName: 'product_search'
    };

    constructor(private breakpointObserver: BreakpointObserver) {
    }

}
