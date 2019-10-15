import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainOperatorComponent } from './train-operator.component';

describe('TrainOperatorComponent', () => {
  let component: TrainOperatorComponent;
  let fixture: ComponentFixture<TrainOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
