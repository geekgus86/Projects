import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcmAdminComponent } from './ocm-admin.component';

describe('OcmAdminComponent', () => {
  let component: OcmAdminComponent;
  let fixture: ComponentFixture<OcmAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcmAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
