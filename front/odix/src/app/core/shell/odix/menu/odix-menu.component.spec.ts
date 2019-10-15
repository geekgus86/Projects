import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdixMenuComponent } from '@app/core/shell/odix/menu/odix-menu.component';

describe('OdixMenuComponent', () => {
  let component: OdixMenuComponent;
  let fixture: ComponentFixture<OdixMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdixMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdixMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
