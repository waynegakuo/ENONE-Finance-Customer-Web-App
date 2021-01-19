import { TestBed } from '@angular/core/testing';

import { LenderLoanMasterService } from './lender-loan-master.service';

describe('LenderLoanMasterService', () => {
  let service: LenderLoanMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LenderLoanMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
