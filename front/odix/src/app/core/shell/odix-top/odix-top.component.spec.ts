import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdixTopComponent } from './odix-top.component';

describe('OdixTopComponent', () => {
  let component: OdixTopComponent;
  let fixture: ComponentFixture<OdixTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdixTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdixTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
