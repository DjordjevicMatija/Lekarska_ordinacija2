import { TestBed } from '@angular/core/testing';

import { LekariService } from './lekari.service';

describe('LekariService', () => {
  let service: LekariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LekariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
