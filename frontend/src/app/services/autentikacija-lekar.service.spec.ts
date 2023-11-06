import { TestBed } from '@angular/core/testing';

import { AutentikacijaLekarService } from './autentikacija-lekar.service';

describe('AutentikacijaLekarService', () => {
  let service: AutentikacijaLekarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentikacijaLekarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
