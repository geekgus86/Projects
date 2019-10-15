
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class parameters {

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
        // http://igrwapo03:8080/ApiApodaca/ProductInspectionParameters
        const url = `/ApiApodaca/ProductInspectionParameters`;
        // const url = `/ApiApodacaTest/ProductInspectionParameters`;
        return this.httpClient.get(url);
    }


  
   
    

    public editData( Action:string,ID:number,Asset_ID:number,Parameter:string,GreenMinValue:number,GreenMaxValue:number,GreenComparisonType:string,YellowMinValue:number,YellowMaxValue:number,YellowComparisonType:string,RedMinValue:number,RedMaxValue:number,RedComparisonType:string,Criticity:string,Email:string): Observable<any> {
        // const url = `/ApiApodaca/SetProductInspectionParameters/`;
        const url = `/ApiApodacaTest/SetProductInspectionParameters/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": ID,
              "Asset_ID": Asset_ID,
              "Parameter": ""+Parameter+"",
              "GreenMinValue": GreenMinValue,
              "GreenMaxValue": GreenMaxValue,
              "GreenComparisonType": ""+GreenComparisonType+"",
              "YellowMinValue": YellowMinValue,
              "YellowMaxValue": YellowMaxValue,
              "YellowComparisonType": ""+YellowComparisonType+"",
              "RedMinValue": RedMinValue,
              "RedMaxValue": RedMaxValue,
              "RedComparisonType": ""+RedComparisonType+"",
              "Criticity": ""+Criticity+"",
              "Email": ""+Email+"",
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
      }

      
}