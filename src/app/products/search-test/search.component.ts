import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-search-test',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchTestComponent {

    showResults = false;

    searchConfig = {
        ...environment.algolia,
        indexName: 'product_search'
    };

    constructor() {
    }

    searchChanged(query) {
        this.showResults = !!query.length;
    }
}
