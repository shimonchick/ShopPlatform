import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Item} from '../Item';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private itemUrl = 'api/items';

    constructor(
        private http: HttpClient,
    ) {
    }

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.itemUrl)
            .pipe(
                catchError(this.handleError('getHeroes', []))
            );
    }

    getItem(id: number): Observable<Item> {
        const url = `${this.itemUrl}/${id}`;
        return this.http.get<Item>(url)
            .pipe(
                catchError(this.handleError<Item>('getItem', undefined))
            );
    }

    updateItem(item: Item) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-type': 'application/json'})

        };
        return this.http.put<Item>(this.itemUrl, item, httpOptions)
            .pipe(catchError(this.handleError('updateItem')));
    }

    addItem(item: Item) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-type': 'application/json'})

        };
        return this.http.post<Item>(this.itemUrl, item, httpOptions);
    }

    deleteItem(item: Item | number): Observable<Item> {
        const id = typeof item === 'number' ? item : item.id;
        const url = `${this.itemUrl}/${id}`;
        const httpOptions = {
            headers: new HttpHeaders({'Content-type': 'application/json'})

        };

        return this.http.delete<Item>(url)
            .pipe(
                catchError(this.handleError<Item>('deleteItem'))
            );
    }

    /*
        getItem(id: number): Observable<Item> {
            const itemFound: Item = ITEMS.find(item => {
                return item.id === id;
            });
            // TODO: check if itemFound exists
            return of(itemFound);
        }*/
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead


            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
