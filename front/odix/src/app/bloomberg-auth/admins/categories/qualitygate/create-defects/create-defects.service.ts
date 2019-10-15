import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateDefectsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
  }

  updateDefect(idDefect: any, defectCode: any, defectDescription: any, status: any){
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/editDefect/${idDefect}/${defectCode}/${defectDescription}/${status}`;   
    console.log('url')
    console.log(url)  
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  createDefect(idFamily: any, defectCode: any, defectDescription: any){
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/createDefect/${idFamily}/${defectCode}/${defectDescription}`; 
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  getFamilies(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/getFamilies`;
    return this.httpClient.get(url);
  }

  getDefects(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/getDefects`;
    return this.httpClient.get(url);
  }

  createFamily(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/inspection/createFamily`;

    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

}
