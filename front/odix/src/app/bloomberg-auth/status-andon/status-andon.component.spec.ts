import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAndonComponent } from './status-andon.component';

describe('StatusAndonComponent', () => {
  let component: StatusAndonComponent;
  let fixture: ComponentFixture<StatusAndonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusAndonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAndonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
