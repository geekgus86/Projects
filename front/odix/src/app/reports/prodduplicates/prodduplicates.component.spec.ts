import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDuplicatesComponent } from '@app/reports/prodduplicates/prodduplicates.component';;

describe('JobsbyhourComponent', () => {
  let component: ProdDuplicatesComponent;
  let fixture: ComponentFixture<ProdDuplicatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdDuplicatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdDuplicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
