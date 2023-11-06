import { TestBed } from '@angular/core/testing';

import { AutentikacijaMenadzerService } from './autentikacija-menadzer.service';

describe('AutentikacijaMenadzerService', () => {
  let service: AutentikacijaMenadzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentikacijaMenadzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
