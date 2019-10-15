import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastCyclesComponent } from '@app/reports/past-cycles/past-cycles.component';

describe('PastCyclesComponent', () => {
  let component: PastCyclesComponent;
  let fixture: ComponentFixture<PastCyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastCyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




]