import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnLineMixComponent } from './column-line-mix.component';

describe('ColumnLineMixComponent', () => {
  let component: ColumnLineMixComponent;
  let fixture: ComponentFixture<ColumnLineMixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnLineMixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnLineMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
