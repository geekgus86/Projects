import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtPageComponent } from '@app/shared/extpage/extpage.component';


describe('EmbedwebComponent', () => {
  let component: ExtPageComponent;
  let fixture: ComponentFixture<ExtPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
