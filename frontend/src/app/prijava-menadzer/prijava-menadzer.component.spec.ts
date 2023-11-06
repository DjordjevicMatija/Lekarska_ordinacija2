import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaMenadzerComponent } from './prijava-menadzer.component';

describe('PrijavaMenadzerComponent', () => {
  let component: PrijavaMenadzerComponent;
  let fixture: ComponentFixture<PrijavaMenadzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrijavaMenadzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrijavaMenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
