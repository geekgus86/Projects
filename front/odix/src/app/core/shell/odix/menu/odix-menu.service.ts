import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OdixMenuService {

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'applicationx/jsonxx'
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    console.log("=========== ODIX MENU ==========")
    this.errorMessage = 'Error, could not load data from API';
  }

  public getMenu(): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/Menu
    const url = 'http://i40appgateway.eastus.cloudapp.azure.com/auth/api/app/getMenus/MenuOdixPrincipal';
    console.log("getMenu url = "+url);
    return this.httpClient.get(url);
   }

  sendSuggestion(msj: string,nameBrowser:string): Observable<any> {
    // console.log(msj);
    // console.log(nameBrowser);
    const url = `/ApiApodaca/suggestion/`;
    return this.httpClient
      .cache()
      .post<any>(url,  {
          "Msj": ""+msj+"",
          "User": 0,
          "Browser":""+nameBrowser+""
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

}
