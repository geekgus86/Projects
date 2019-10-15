import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlowestcyclesComponent } from '@app/reports/slowestcycles/slowestcycles.component';

describe('SlowestcyclesComponent', () => {
  let component: SlowestcyclesComponent;
  let fixture: ComponentFixture<SlowestcyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlowestcyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlowestcyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
