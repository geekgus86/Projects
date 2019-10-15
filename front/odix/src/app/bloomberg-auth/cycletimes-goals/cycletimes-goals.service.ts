
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class CyclesTimesGoalsService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    

    public getCycleTimeGoals(): Observable <any> {
        // http://igrwapo03:8080/ApiApodaca/CycleTimeGoalss
        const url = `/ApiApodaca/CycleTimeGoals`;
        return this.httpClient.get(url);
    }

    
    
    public editData( Action:string,ID:number,Goal:string,Active:number,Tolerance:number): Observable<any> {
        // http://igrwapo03:8080/ApiApodaca/SetCycleTimeGoals
        const url = `/ApiApodaca/SetCycleTimeGoals/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": ID,
              "Goal": ""+Goal+"",
              "Active": Active,
              "Tolerance": Tolerance,
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
      }

      
}