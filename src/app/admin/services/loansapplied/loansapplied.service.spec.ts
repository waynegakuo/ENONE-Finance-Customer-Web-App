import { TestBed } from '@angular/core/testing';

import { LoansappliedService } from './loansapplied.service';

describe('LoansappliedService', () => {
  let service: LoansappliedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoansappliedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
