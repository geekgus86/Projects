import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleFilterComponent } from '@app/shared/multiple-filter/multiple-filter.component';

describe('MultipleFilterComponent', () => {
  let component: MultipleFilterComponent;
  let fixture: ComponentFixture<MultipleFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
