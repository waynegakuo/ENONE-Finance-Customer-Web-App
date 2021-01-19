import { TestBed } from '@angular/core/testing';

import { LetterOfOfferService } from './letter-of-offer.service';

describe('LetterOfOfferService', () => {
  let service: LetterOfOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterOfOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
