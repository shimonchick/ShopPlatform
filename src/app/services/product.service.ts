import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private db: AngularFirestore,
        private storage: AngularFireStorage,
        private http: HttpClient
    ) {
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
    async createProduct(data: any) {
        console.log('creating product');
        const key: string = data.id || this.db.createId();
        const product: Product = {id: key, ...data};
        const documentReference = this.db.doc<Product>(`/products/${key}`);
        await documentReference.set(Object.assign({}, product), {merge: true});
        return key;
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


    /*
        uploadProductImage(path: string, file: File): AngularFireUploadTask{
            const ref = this.storage.ref(path);
            const task = this.storage.upload(path, file);
            return task;
        }
    */

}
