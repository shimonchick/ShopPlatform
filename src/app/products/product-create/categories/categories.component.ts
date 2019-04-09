import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


    @Output()
    categoryChanged = new EventEmitter<string[]>();
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    categories: string[] = [];
    // fruits: Fruit[] = [
    //   {name: 'Lemon'},
    //   {name: 'Lime'},
    //   {name: 'Apple'},

    constructor() {
    }

    ngOnInit() {
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.categories.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.categoryChanged.emit(this.categories);
    }

    remove(category: string): void {
        const index = this.categories.indexOf(category);

        if (index >= 0) {
            this.categories.splice(index, 1);
        }
        this.categoryChanged.emit(this.categories);
    }


}
