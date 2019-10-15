import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from '@app/core/logger.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(route: any, state: any): boolean {
     if (this.authenticationService.isAuthenticated()) {
       return true;
     }
     console.log(state.url);
     console.log("this.authenticationService.isAuthenticated()");
     console.log(this.authenticationService.isAuthenticated());
     log.debug('Not authenticated, redirecting...');
     sessionStorage.setItem('attemptedRoute', state.url);
     console.log("Check");
     console.log(state.url);
    // this.router.navigate(['/login'], { replaceUrl: true });
    this.router.navigate(['/login']);


    return false;
  
  }

}
