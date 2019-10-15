import { Route as ngRoute, Routes } from '@angular/router';

import { ShellComponent } from '@app/core/shell/shell.component';
import { OdixShellComponent } from '@app/core/shell/odix/odix-shell.component';
import { OdixTopComponent } from '@app/core/shell/odix-top/odix-top.component';

// import { BloombergAuthRoutingModule } from '@app/bloomberg-auth/bloomberg-routing.module';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Route} The new route using shell as the base.
   */
  static withShell(routes: Routes): ngRoute {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      //canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }

  static withOdixShell(routes: Routes): ngRoute {
    return {
      path: '',
      component: OdixShellComponent,
      children: routes,
      //canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }

  static withOdixTop(routes: Routes): ngRoute {
    return {
      path: '',
      component: OdixTopComponent,
      children: routes,
      //canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }

  //adap 
  // static withBloombersAuShell(routes: Routes): ngRoute {
  //   return {
  //     path: '',
  //     component: BloombergAuthRoutingModule,
  //     children: routes,
  //     canActivate: [AuthenticationGuard],
  //     // Reuse ShellComponent instance when navigating between child views
  //     data: { reuse: true }
  //   };
  // }


}
