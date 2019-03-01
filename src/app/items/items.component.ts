import {Component, OnInit} from '@angular/core';
import {Item} from '../Item';
import {ItemService} from '../services/item.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    items: Item[];

    constructor(private itemService: ItemService) {

    }

    ngOnInit() {
        this.getItems();
    }

    add(name: string, description: string, price: string) {
        name = name.trim();
        description = description.trim();
        const price_number: number = Number(price.trim());

        if (!name || !description || !price) {
            // TODO: show a message to the user.
            return;
        }
        // TODO: validate input
        // TODO: valid seller
        this.itemService.addItem({name: name, description: description, price: price_number, seller: 'misho'} as Item)
            .subscribe(item => this.items.push(item));

    }

    private getItems() {
        this.itemService.getItems()
            .subscribe(items => this.items = items);
    }
}
