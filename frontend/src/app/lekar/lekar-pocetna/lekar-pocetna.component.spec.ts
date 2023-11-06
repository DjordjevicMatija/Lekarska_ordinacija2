import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarPocetnaComponent } from './lekar-pocetna.component';

describe('LekarPocetnaComponent', () => {
  let component: LekarPocetnaComponent;
  let fixture: ComponentFixture<LekarPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarPocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
