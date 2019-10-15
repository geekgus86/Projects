import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessParameterlimitsComponent } from './parameterlimits.component';

describe('ParameterlimitsComponent', () => {
  let component: ProcessParameterlimitsComponent;
  let fixture: ComponentFixture<ProcessParameterlimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessParameterlimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessParameterlimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
