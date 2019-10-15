import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdaverageComponent } from '@app/reports/prodaverage/prodaverage.component';

describe('ProdaverageComponent', () => {
  let component: ProdaverageComponent;
  let fixture: ComponentFixture<ProdaverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdaverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdaverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
