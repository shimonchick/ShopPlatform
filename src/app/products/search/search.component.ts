import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
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
        Algolia
     */
    searchConfig = {
        ...environment.algolia,
        indexName: 'product_search'
    };

    constructor(private breakpointObserver: BreakpointObserver) {
    }

}
