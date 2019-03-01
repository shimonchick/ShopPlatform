import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../Product';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = 'api/products';

    constructor(
        private http: HttpClient,
    ) {
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl)
            .pipe(
                catchError(this.handleError('getHeroes', []))
            );
    }

    getProduct(id: number): Observable<Product> {
        const url = `${this.productUrl}/${id}`;
        return this.http.get<Product>(url)
            .pipe(
                catchError(this.handleError<Product>('getProduct', undefined))
            );
    }

    updateProduct(product: Product) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-type': 'application/json'})

        };
        return this.http.put<Product>(this.productUrl, product, httpOptions)
            .pipe(catchError(this.handleError('updateProduct')));
    }

    addProduct(product: Product) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-type': 'application/json'})

        };
        return this.http.post<Product>(this.productUrl, product, httpOptions);
    }

    deleteProduct(product: Product | number): Observable<Product> {
        const id = typeof product === 'number' ? product : product.id;
        const url = `${this.productUrl}/${id}`;
        return this.http.delete<Product>(url)
            .pipe(
                catchError(this.handleError<Product>('deleteProduct'))
            );
    }

    /*
        getProduct(id: number): Observable<Product> {
            const productFound: Product = PRODUCTS.find(product => {
                return product.id === id;
            });
            // TODO: check if productFound exists
            return of(productFound);
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
