import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentPocetnaComponent } from './pacijent-pocetna.component';

describe('PacijentPocetnaComponent', () => {
  let component: PacijentPocetnaComponent;
  let fixture: ComponentFixture<PacijentPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentPocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
