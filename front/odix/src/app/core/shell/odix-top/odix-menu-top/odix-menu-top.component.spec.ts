import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdixMenuTopComponent } from './odix-menu-top.component';

describe('OdixMenuTopComponent', () => {
  let component: OdixMenuTopComponent;
  let fixture: ComponentFixture<OdixMenuTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdixMenuTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdixMenuTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
