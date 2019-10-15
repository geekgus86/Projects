import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycletimesGoalsComponent } from './cycletimes-goals.component';

describe('CycletimesGoalsComponent', () => {
  let component: CycletimesGoalsComponent;
  let fixture: ComponentFixture<CycletimesGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycletimesGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycletimesGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
