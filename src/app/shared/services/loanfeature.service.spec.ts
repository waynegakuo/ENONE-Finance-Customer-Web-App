import { TestBed } from '@angular/core/testing';

import { LoanfeatureService } from './loanfeature.service';

describe('LoanfeatureService', () => {
  let service: LoanfeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanfeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
