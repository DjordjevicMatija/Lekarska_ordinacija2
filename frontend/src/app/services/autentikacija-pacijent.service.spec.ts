import { TestBed } from '@angular/core/testing';

import { AutentikacijaPacijentService } from './autentikacija-pacijent.service';

describe('AutentikacijaService', () => {
  let service: AutentikacijaPacijentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentikacijaPacijentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
