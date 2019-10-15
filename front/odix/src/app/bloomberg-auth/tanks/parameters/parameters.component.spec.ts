import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TanksParametersComponent } from './parameters.component';


describe('ParametersComponent', () => {
  let component: TanksParametersComponent;
  let fixture: ComponentFixture<TanksParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TanksParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TanksParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

