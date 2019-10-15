import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAndShiftComponent } from './date-and-shift.component';

describe('DateAndShiftComponent', () => {
  let component: DateAndShiftComponent;
  let fixture: ComponentFixture<DateAndShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateAndShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAndShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
