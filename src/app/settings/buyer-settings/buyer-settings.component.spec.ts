import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule,} from '@angular/material';

import {BuyerSettingsComponent} from './buyer-settings.component';

describe('BuyerSettingsComponent', () => {
    let component: BuyerSettingsComponent;
    let fixture: ComponentFixture<BuyerSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuyerSettingsComponent],
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
        fixture = TestBed.createComponent(BuyerSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
