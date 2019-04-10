import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule} from '@angular/material';

import {SellerRegistrationComponent} from './seller-registration.component';

describe('SellerRegistrationComponent', () => {
    let component: SellerRegistrationComponent;
    let fixture: ComponentFixture<SellerRegistrationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SellerRegistrationComponent],
            imports: [
                NoopAnimationsModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatCardModule,
                MatInputModule,
                MatRadioModule,
                MatSelectModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SellerRegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
