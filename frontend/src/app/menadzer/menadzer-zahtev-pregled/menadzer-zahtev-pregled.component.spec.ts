import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerZahtevPregledComponent } from './menadzer-zahtev-pregled.component';

describe('MenadzerZahtevPregledComponent', () => {
  let component: MenadzerZahtevPregledComponent;
  let fixture: ComponentFixture<MenadzerZahtevPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerZahtevPregledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerZahtevPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
