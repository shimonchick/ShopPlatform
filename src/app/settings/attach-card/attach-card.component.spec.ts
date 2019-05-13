import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AttachCardComponent} from './attach-card.component';

describe('AttachCardComponent', () => {
    let component: AttachCardComponent;
    let fixture: ComponentFixture<AttachCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AttachCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AttachCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
