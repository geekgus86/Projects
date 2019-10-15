import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdbydateandmodelComponent } from '@app/reports/prodbydateandmodel/prodbydateandmodel.component';

describe('ProdbydateandmodelComponent', () => {
  let component: ProdbydateandmodelComponent;
  let fixture: ComponentFixture<ProdbydateandmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdbydateandmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdbydateandmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
