import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyerChatListComponent} from './buyer-chat-list.component';

describe('SellerChatListComponent', () => {
  let component: BuyerChatListComponent;
  let fixture: ComponentFixture<BuyerChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerChatListComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
