import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpAssignmentService {

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

  public getIpAssignments(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/ip/getIPAddress`;
    return this.httpClient.get(url);
  }

  public createIpAssignment(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/ip/createIPAddress`;

    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  public editIpAssignment(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/ip/editIPAddress`;

    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  deleteIpAddressAssignment(id:any){
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/ip/deleteIPAddress/${id}`;   
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }
  


    
}