import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentKartonComponent } from './pacijent-karton.component';

describe('PacijentKartonComponent', () => {
  let component: PacijentKartonComponent;
  let fixture: ComponentFixture<PacijentKartonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentKartonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentKartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
