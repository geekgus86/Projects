import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateItemsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
  }

  public getStations(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/module/getStations`;
    return this.httpClient.get(url);
  }

  public getItems(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/module/getInspectionPoints/2`;
    return this.httpClient.get(url);
  }

  public getFamilies(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/getFamilies`;
    return this.httpClient.get(url);
  }

  public createInspectionPoint(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/createInspectionPoint`;

    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  public updateInspectionPoint(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/editInspectionPoint`;

    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }
}
