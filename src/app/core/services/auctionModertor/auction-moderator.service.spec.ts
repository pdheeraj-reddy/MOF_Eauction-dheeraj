import { TestBed } from '@angular/core/testing';

import { AuctionModeratorService } from './auction-moderator.service';

describe('AuctionModeratorService', () => {
  let service: AuctionModeratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionModeratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
