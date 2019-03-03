import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class ProductService {


    constructor(
        private db: AngularFirestore) {
    }

    getProducts(): Observable<Product[]> {
        return this.db.collection<Product>('products').valueChanges();
    }

// TODO: store reference for the product in the service so you can manipulate it without making extra requests
    getProduct(id: string): Observable<Product> {
        return this.db.doc<Product>(`products/${id}`).valueChanges();
    }

    updateProduct(product: Product): Promise<void> {
        return this.db.doc<Product>(`products/${product.id}`).update(product);
    }

    // parameter is object and not a product since we don't want the product id starting value(undefined)
    createProduct(data: any): Promise<void> {
        const key: string = this.db.createId();
        const product: Product = {id: key, ...data};
        const documentReference = this.db.doc<Product>(`/products/${key}`);
        return documentReference.set(product);
    }


    deleteProduct(product: Product): Promise<void> {
        return this.db.doc<Product>(`/products/${product.id}`).delete();
    }

    /*
        private handleError<T>(operation = 'operation', result?: T) {
            return (error: any): Observable<T> => {

                // TODO: send the error to remote logging infrastructure
                console.error(error); // log to console instead


                // Let the app keep running by returning an empty result.
                return of(result as T);
            };
        }*/
}
