import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAssignmentComponent } from './ip-assignment.component';

describe('IpAssignmentComponent', () => {
  let component: IpAssignmentComponent;
  let fixture: ComponentFixture<IpAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
