import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    constructor() {
    }

    createDb() {
        const products: Product[] = [
            {id: 'kljfaskdljf', seller: 'seller3', name: 'nhsfgh', description: 'description3', price: 832564.32},
            {id: 'ksljfkasjf', seller: 'seller2', name: 'dfgdde', description: 'description2', price: 43524.36542},
            {id: 'slkafjka;sljf', seller: 'seller4', name: 'trhry', description: 'description4', price: 45},
            {id: 'kasldfjklasdjf', seller: 'ICGBWSieAWWtBKG9u0qkCw1DqTA2', name: '4redf', description: 'description1', price: 45237},
        ];
        return {products};
    }

}
    // Overrides the genId method to ensure that a hero always has an id.
    // If the heroes array is empty,
    // the method below returns the initial number (11).
    // if the heroes array is not empty, the method below returns the highest
    // hero id + 1.

