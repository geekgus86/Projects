import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { serverUrl } from '@env/environment';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    let url = request.url;
    
    if( url.indexOf('assets')  >= 0 ) {
      request = request.clone({ url: request.url });
    }
    else if(url.indexOf('https')>= 0 || url.indexOf('http')>= 0){
      request = request.clone({ url: request.url });

    }else{
      let ubication = request.url.split("Api")[1].split("/")[0].toLowerCase();
      request = request.clone({ url: serverUrl[ubication] + request.url });
    }
    
     return next.handle(request);	  


  }

}
