import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

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
