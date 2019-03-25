import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SellerChatListComponent} from './seller-chat-list.component';

describe('SellerChatListComponent', () => {
    let component: SellerChatListComponent;
    let fixture: ComponentFixture<SellerChatListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SellerChatListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SellerChatListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
