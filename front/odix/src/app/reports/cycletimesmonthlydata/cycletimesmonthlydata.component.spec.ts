import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycletimesmonthlydataComponent } from '@app/reports/cycletimesmonthlydata/cycletimesmonthlydata.component';

describe('CycletimesmonthlydataComponent', () => {
  let component: CycletimesmonthlydataComponent;
  let fixture: ComponentFixture<CycletimesmonthlydataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycletimesmonthlydataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycletimesmonthlydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
