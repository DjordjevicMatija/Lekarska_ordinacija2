import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerZahtevRegComponent } from './menadzer-zahtev-reg.component';

describe('MenadzerZahtevRegComponent', () => {
  let component: MenadzerZahtevRegComponent;
  let fixture: ComponentFixture<MenadzerZahtevRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerZahtevRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerZahtevRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
