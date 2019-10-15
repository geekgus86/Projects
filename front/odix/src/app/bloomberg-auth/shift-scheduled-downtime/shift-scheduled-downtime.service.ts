
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class LineScheduleDowntimeService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    

    public getShiftScheduleDowntime(): Observable <any> {
        //http://igrwapo03:8080/ApiApodaca/ShiftScheduleDowntime
        const url = `/ApiApodaca/ShiftScheduleDowntime`;
        return this.httpClient.get(url);
    }

    
    public editData( Action:string,ID:number,Shift_ID:number,Hour:number,Goal:number): Observable<any> {
        const url = `/ApiApodaca/SetShiftScheduleDowntime/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": ID,
              "Shift_ID": Shift_ID,
              "Hour": Hour,
              "Goal": Goal,
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
      }

      
}