import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from '@app/core/shell/shell.component';
import { OdixShellComponent } from '@app/core/shell/odix/odix-shell.component';
import { HeaderComponent } from '@app/core/shell/header/header.component';
import { OdixHeaderComponent } from '@app/core/shell/odix/header/odix-header.component';
import { RouteReusableStrategy } from '@app/core/route-reusable-strategy';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';
import { I18nService } from '@app/core/i18n.service';
import { HttpService } from '@app/core/http/http.service';
import { HttpCacheService } from '@app/core/http/http-cache.service';
import { ApiPrefixInterceptor } from '@app/core/http/api-prefix.interceptor';
import { AuthorizationInterceptor } from '@app/core/http/authorization.interceptor';
import { ErrorHandlerInterceptor } from '@app/core/http/error-handler.interceptor';
import { CacheInterceptor } from '@app/core/http/cache.interceptor';
import { MenuComponent } from '@app/core/shell/menu/menu.component';
import { OdixMenuComponent } from '@app/core/shell/odix/menu/odix-menu.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { OdixTopComponent } from './shell/odix-top/odix-top.component';
import { OdixHeaderTopComponent } from './shell/odix-top/odix-header-top/odix-header-top.component';
import { OdixMenuTopComponent } from './shell/odix-top/odix-menu-top/odix-menu-top.component';
//import { OdixHeaderService } from './shell/odix/header/odix-header.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    NgbModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    OdixHeaderComponent,
    ShellComponent,
    OdixShellComponent,
    MenuComponent,
    OdixMenuComponent,
    OdixTopComponent,
    OdixHeaderTopComponent,
    OdixMenuTopComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    ApiPrefixInterceptor,
    AuthorizationInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
   // OdixHeaderService,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
