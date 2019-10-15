import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftScheduledDowntimeComponent } from './shift-scheduled-downtime.component';

describe('ShiftScheduledDowntimeComponent', () => {
  let component: ShiftScheduledDowntimeComponent;
  let fixture: ComponentFixture<ShiftScheduledDowntimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftScheduledDowntimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftScheduledDowntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
