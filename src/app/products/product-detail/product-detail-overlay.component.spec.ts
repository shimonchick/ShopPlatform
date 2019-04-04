import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailOverlayComponent} from './product-detail-overlay.component';

describe('ProductDetailComponent', () => {
    let component: ProductDetailOverlayComponent;
    let fixture: ComponentFixture<ProductDetailOverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductDetailOverlayComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
