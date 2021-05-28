import { TestBed } from '@angular/core/testing';

import { ConversationsService } from './conversations.service';

describe('MessagesService', () => {
  let service: ConversationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
