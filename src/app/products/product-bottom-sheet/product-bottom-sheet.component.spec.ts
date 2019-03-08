import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductBottomSheetComponent} from './product-bottom-sheet.component';

describe('ProductBottomSheetComponent', () => {
    let component: ProductBottomSheetComponent;
    let fixture: ComponentFixture<ProductBottomSheetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductBottomSheetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductBottomSheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
