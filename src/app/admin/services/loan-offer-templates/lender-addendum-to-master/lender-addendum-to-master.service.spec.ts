import { TestBed } from '@angular/core/testing';

import { LenderAddendumToMasterService } from './lender-addendum-to-master.service';

describe('LenderAddendumToMasterService', () => {
  let service: LenderAddendumToMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LenderAddendumToMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
