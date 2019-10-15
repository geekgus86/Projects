import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdaveragejphComponent } from '@app/reports/prodaveragejph/prodaveragejph.component';

describe('ProdaveragejphComponent', () => {
  let component: ProdaveragejphComponent;
  let fixture: ComponentFixture<ProdaveragejphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdaveragejphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdaveragejphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
