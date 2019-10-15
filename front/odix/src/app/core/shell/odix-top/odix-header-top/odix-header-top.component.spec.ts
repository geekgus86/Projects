import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdixHeaderTopComponent } from './odix-header-top.component';

describe('OdixHeaderTopComponent', () => {
  let component: OdixHeaderTopComponent;
  let fixture: ComponentFixture<OdixHeaderTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdixHeaderTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdixHeaderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
