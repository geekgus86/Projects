
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class ParameterlimitsService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    

    public getparameter(): Observable <any> {
        // const url = `/ApiApodacaTest/ProcessControlParameterLimit`;
        const url = `/ApiApodaca/ProcessControlParameterLimit`;
        return this.httpClient.get(url);
    }

    public editData( Action:string,ID:number,Paramter_ID:number,MinValue:number,MaxValue:number,Email:string,ModifiedBy:string): Observable<any> {
        const url = `/ApiApodaca/SetProcessControlParameterLimit/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": ID,
              "Paramter_ID": Paramter_ID,
              "MinValue": MinValue,
              "MaxValue": MaxValue,
              "Email": ""+Email+"",
              "ModifiedBy": ""+ModifiedBy+"",
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
      }

      
}