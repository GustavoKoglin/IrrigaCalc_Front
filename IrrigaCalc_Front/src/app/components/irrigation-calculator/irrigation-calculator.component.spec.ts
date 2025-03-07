import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrrigationCalculatorComponent } from './irrigation-calculator.component';

describe('IrrigationCalculatorComponent', () => {
  let component: IrrigationCalculatorComponent;
  let fixture: ComponentFixture<IrrigationCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrrigationCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrrigationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
