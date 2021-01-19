import { TestBed } from '@angular/core/testing';

import { PersonalGuaranteeService } from './personal-guarantee.service';

describe('PersonalGuaranteeService', () => {
  let service: PersonalGuaranteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalGuaranteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
