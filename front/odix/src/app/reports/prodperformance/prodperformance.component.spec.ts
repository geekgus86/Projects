import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdperformanceComponent } from '@app/reports/prodperformance/prodperformance.component';

describe('ProdperformanceComponent', () => {
  let component: ProdperformanceComponent;
  let fixture: ComponentFixture<ProdperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
