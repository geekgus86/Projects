import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDefectsComponent } from './create-defects.component';

describe('CreateDefectsComponent', () => {
  let component: CreateDefectsComponent;
  let fixture: ComponentFixture<CreateDefectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDefectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
