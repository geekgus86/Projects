import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadereportComponent } from './loadereport.component';

describe('LoadereportComponent', () => {
  let component: LoadereportComponent;
  let fixture: ComponentFixture<LoadereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
