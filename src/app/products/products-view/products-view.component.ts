import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ChangeEvent, VirtualScrollerComponent} from 'ngx-virtual-scroller';
import {Product} from '../../models/product';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnChanges {
    @ViewChild(VirtualScrollerComponent)
    scroller: VirtualScrollerComponent;
    loading = false;
    viewportItems: Product[];
    @Input()
    products: Product[];
    @Input()
    theEnd = false; // todo make automatic by response []
    @Output()
    nextBatchEmitter = new EventEmitter<any>();
    @Output()
    more = new EventEmitter();
    private get total() {
        return this.products.length;
    }

    nextBatch(event: ChangeEvent, offset) {
        console.log(event);
        if (event.end !== this.total - 1 || this.theEnd) {
            return;
        }
        this.loading = true;

        console.log('%c next please', 'color: brown');
        this.nextBatchEmitter.emit(offset);
        this.more.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loading = false; // when product changes, new products have been loaded and so stop loading
        console.log(this.products);
    }
    trackById(index, item) {
        return 4;
    }
}
