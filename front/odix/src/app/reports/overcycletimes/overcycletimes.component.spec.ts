import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvercycletimesComponent } from '@app/reports/overcycletimes/overcycletimes.component';

describe('OvercycletimesComponent', () => {
  let component: OvercycletimesComponent;
  let fixture: ComponentFixture<OvercycletimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvercycletimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvercycletimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
