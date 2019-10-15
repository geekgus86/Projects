import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateModuleService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
  }

  public getEnabledInspectionPoints(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/module/getInspectionPoints/1`;
    return this.httpClient.get(url);
   }

   public getStations(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/module/getStations`;
    return this.httpClient.get(url);
   }

   public createModule(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/module/createModule`;

    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
   }
}
