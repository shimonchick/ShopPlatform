import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../services/item.service';
import {Location} from '@angular/common';
import {Item} from '../Item';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
    public item: Item;

    constructor(
        private route: ActivatedRoute,
        private itemService: ItemService,
        private location: Location) {
    }

    ngOnInit() {
        this.getItem();
    }

    getItem() {
        const id: number = Number(this.route.snapshot.paramMap.get('id')); // get id parameter from URL
        this.itemService.getItem(id)
            .subscribe(item => {
                this.item = item;
            });

    }

    goBack() {
        this.location.back();
    }

    save() {
        this.itemService.updateItem(this.item)
            .subscribe(() => this.goBack());
    }

    delete(item: Item) {
        this.itemService.deleteItem(item)
            .subscribe(() => this.goBack());
    }
}
