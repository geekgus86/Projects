import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoplantComponent } from '@app/shared/mapPlants/apoplant/apoplant.component';

describe('ApoplantComponent', () => {
  let component: ApoplantComponent;
  let fixture: ComponentFixture<ApoplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
