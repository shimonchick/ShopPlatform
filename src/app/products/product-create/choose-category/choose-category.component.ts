import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatStepper} from '@angular/material';
import {Category, CategoryTree} from '../../../models/product';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {possibleCategories} from './possible-categories';

@Component({
    selector: 'app-choose-category',
    templateUrl: './choose-category.component.html',
    styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {
    @ViewChild(MatStepper)
    stepper: MatStepper;

    // allCategories$: Observable<Category[]>;
    allCategories = possibleCategories;
    loading = true;
    selectedCategory: Category;
    categoryControl = new FormGroup({
        categoryLvl0: new FormControl(null, Validators.required)
    });

    constructor(public dialogRef: MatDialogRef<ChooseCategoryComponent>,
                private db: AngularFirestore) {
    }

    ngOnInit() {
        // this.allCategories$ = this.db.collection('categories').snapshotChanges().pipe(
        //     tap((it) => {
        //         console.log(it);
        //         this.loading = false;
        //     }),
        //     map(snapshots => snapshots.map(snapshot => {
        //         return {
        //             name: snapshot.payload.doc.id, ...snapshot.payload.doc.data()
        //         } as Category;
        //     }))
        // );
    }

    chooseCategoryTree(subCategory: any) {
        this.dialogRef.close({
            lvl0: this.selectedCategory.name,
            lvl1: subCategory.name,
            fields: subCategory.fields,
        } as CategoryTree);
    }

    chooseCategoryLvl0(category: Category) {
        this.selectedCategory = category;
        this.stepper.next();
    }
}
