import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterlimitsComponent } from './parameterlimits.component';

describe('ParameterlimitsComponent', () => {
  let component: ParameterlimitsComponent;
  let fixture: ComponentFixture<ParameterlimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterlimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterlimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
