import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Category} from '../../../models/product';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-choose-category',
    templateUrl: './choose-category.component.html',
    styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {
    allCategories$: Observable<Category[]>;
    loading = true;

    constructor(public dialogRef: MatDialogRef<ChooseCategoryComponent>,
                private db: AngularFirestore) {
    }

    ngOnInit() {
        this.allCategories$ = this.db.collection('categories').snapshotChanges().pipe(
            tap((it) => {
                console.log(it);
                this.loading = false;
            }),
            map(snapshots => snapshots.map(snapshot => {
                return {
                    name: snapshot.payload.doc.id, ...snapshot.payload.doc.data()
                };
            }))
        );
    }

    chooseCategory(category: string) {
        this.dialogRef.close(category);
    }
}
