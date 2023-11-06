import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjePregledaComponent } from './azuriranje-pregleda.component';

describe('AzuriranjePregledaComponent', () => {
  let component: AzuriranjePregledaComponent;
  let fixture: ComponentFixture<AzuriranjePregledaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjePregledaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjePregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
