
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class LineGoalsEditingService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    

    public getLineGoalEditing(): Observable <any> {
        // http://igrwapo03:8080/ApiApodaca/ProductionGoalValues
        const url = `/ApiApodaca/ProductionGoalValues`;
        return this.httpClient.get(url);
    }


    public editData( Action:string,ID:number,Value:string): Observable<any> {
        const url = `/ApiApodaca/SetProductionGoalValues/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": ID,
              "Parameter": ""+Value+"",
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
      }

      
}