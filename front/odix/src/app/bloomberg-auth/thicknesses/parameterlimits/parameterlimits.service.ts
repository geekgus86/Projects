import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class parameterlimits {


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    

    public getparameterlimits(): Observable <any> {
        //http://igrwapo03:8080/ApiApodaca/ProductInspectionParameterLimit
        const url = `/ApiApodaca/ProductInspectionParameterLimit`;
        return this.httpClient.get(url);
    }




    public editData(Action:string,ID:number,Parameters_ID:number,MinValue:number,MaxValue:number,Email:string,ModifiedBy:string): Observable<any> {
        const url = `/ApiApodaca/SetProductInspectionParameterLimit/`;
        console.log(url);
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": ID,
              "Parameters_ID": ""+Parameters_ID+"",
              "MinValue": MinValue,
              "MaxValue": MaxValue,
              "Email": ""+Email+"",
              "ModifiedBy": ""+ModifiedBy+""
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
      }



}