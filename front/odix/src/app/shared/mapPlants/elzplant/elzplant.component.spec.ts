import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElzplantComponent } from '@app/shared/mapPlants/elzplant/elzplant.component';

describe('ApoplantComponent', () => {
  let component: ElzplantComponent;
  let fixture: ComponentFixture<ElzplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElzplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElzplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
