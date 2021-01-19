import { TestBed } from '@angular/core/testing';

import { FinalDemandService } from './final-demand.service';

describe('FinalDemandService', () => {
  let service: FinalDemandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalDemandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
