import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperatorViewService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
  }

  public getAllActiveDefects(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/getActiveDefects`;
    return this.httpClient.get(url);
   }

  public getModulesByBadge(badge:any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/module/getModulesByUser/${badge}`;
    //const url = `http://10.196.29.213:8080/qg/module/getModulesByUser/${badge}`;
    return this.httpClient.get(url);
  }

   public saveInspection(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/saveInspection`;
    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
   }
}
