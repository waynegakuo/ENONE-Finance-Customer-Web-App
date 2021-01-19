import { TestBed } from '@angular/core/testing';

import { BoardResolutionService } from './board-resolution.service';

describe('BoardResolutionService', () => {
  let service: BoardResolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardResolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
