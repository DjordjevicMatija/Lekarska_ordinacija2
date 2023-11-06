import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikProfilComponent } from './korisnik-profil.component';

describe('KorisnikProfilComponent', () => {
  let component: KorisnikProfilComponent;
  let fixture: ComponentFixture<KorisnikProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
