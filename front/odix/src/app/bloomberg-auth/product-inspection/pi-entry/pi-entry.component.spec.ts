import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiEntryComponent } from './pi-entry.component';

describe('PiEntryComponent', () => {
  let component: PiEntryComponent;
  let fixture: ComponentFixture<PiEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
