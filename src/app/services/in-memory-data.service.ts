import {Injectable} from '@angular/core';
import {Item} from '../Item';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    constructor() {
    }

    createDb() {
        const items: Item[] = [
            {id: 1, seller: 'seller3', name: 'nhsfgh', description: 'description3', price: 832564.32},
            {id: 2, seller: 'seller2', name: 'dfgdde', description: 'description2', price: 43524.36542},
            {id: 3, seller: 'seller4', name: 'trhry', description: 'description4', price: 45},
            {id: 4, seller: 'seller1', name: '4redf', description: 'description1', price: 45237},
        ];
        return {items};
    }

    // Overrides the genId method to ensure that a hero always has an id.
    // If the heroes array is empty,
    // the method below returns the initial number (11).
    // if the heroes array is not empty, the method below returns the highest
    // hero id + 1.
    genId(items: Item[]): number {
        return items.length > 0 ? Math.max(...items.map(hero => hero.id)) + 1 : 11;
    }
}
