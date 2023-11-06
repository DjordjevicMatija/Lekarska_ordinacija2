import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarProfilComponent } from './lekar-profil.component';

describe('LekarProfilComponent', () => {
  let component: LekarProfilComponent;
  let fixture: ComponentFixture<LekarProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
