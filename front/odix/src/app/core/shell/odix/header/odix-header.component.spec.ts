import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { MockAuthenticationService } from '@app/core/authentication/authentication.service.mock';
import { I18nService } from '@app/core/i18n.service';
import { OdixHeaderComponent } from '@app/core/shell/odix/header/odix-header.component';

describe('OdixHeaderComponent', () => {
  let component: OdixHeaderComponent;
  let fixture: ComponentFixture<OdixHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot()
      ],
      declarations: [OdixHeaderComponent],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        I18nService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdixHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
