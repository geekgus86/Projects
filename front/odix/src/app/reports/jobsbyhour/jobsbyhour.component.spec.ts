import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsbyhourComponent } from '@app/reports/jobsbyhour/jobsbyhour.component';

describe('JobsbyhourComponent', () => {
  let component: JobsbyhourComponent;
  let fixture: ComponentFixture<JobsbyhourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsbyhourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsbyhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
