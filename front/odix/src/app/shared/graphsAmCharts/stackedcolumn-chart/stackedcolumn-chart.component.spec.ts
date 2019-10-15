import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedcolumnChartComponent } from './stackedcolumn-chart.component';

describe('StackedcolumnChartComponent', () => {
  let component: StackedcolumnChartComponent;
  let fixture: ComponentFixture<StackedcolumnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedcolumnChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedcolumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
