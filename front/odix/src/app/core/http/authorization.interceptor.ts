import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Adds authorization header to request.
 */

 @Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
  const credenciales = savedCredentials && JSON.parse(savedCredentials);
  const authReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + (credenciales && credenciales.token)
    })
  });

  return next.handle(authReq);
}
}
