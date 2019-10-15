import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGoalEditingComponent } from './line-goal-editing.component';

describe('LineGoalEditingComponent', () => {
  let component: LineGoalEditingComponent;
  let fixture: ComponentFixture<LineGoalEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineGoalEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGoalEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
