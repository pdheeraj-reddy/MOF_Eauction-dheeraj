import { TestBed } from '@angular/core/testing';

import { AucModeratorService } from './auc-moderator.service';

describe('AucModeratorService', () => {
  let service: AucModeratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AucModeratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
