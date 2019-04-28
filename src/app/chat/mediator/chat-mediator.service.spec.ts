import { TestBed } from '@angular/core/testing';

import { ChatMediatorService } from './chat-mediator.service';

describe('ChatMediatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatMediatorService = TestBed.get(ChatMediatorService);
    expect(service).toBeTruthy();
  });
});
