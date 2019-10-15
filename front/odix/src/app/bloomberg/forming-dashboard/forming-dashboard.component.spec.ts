import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormingDashboardComponent } from './forming-dashboard.component';

describe('FormingDashboardComponent', () => {
  let component: FormingDashboardComponent;
  let fixture: ComponentFixture<FormingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
