
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    

    public getRol(): Observable <any> {
        const url = `/ApiApodaca/ProcessControlParameters`;
        return this.httpClient.get(url);
    }

    public getUser(): Observable <any> {
        const url = `/ApiApodaca/ProcessControlParameters`;
        return this.httpClient.get(url);
    }

    public addRol( Action:string,Id:number,rol:string): Observable<any> {
        const url = `/ApiApodaca/SetProcessControlParameters/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": Id,
              "GreenComparisonType": ""+rol+"",
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
    }


    public addUser( Action:string,Id:number,Email:string,Name:string): Observable<any> {
        const url = `/ApiApodaca/SetProcessControlParameters/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": Id,
              "Parameter": ""+Email+"",
              "GreenComparisonType": ""+Name+"",
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
    }

    public asignateRol( Action:string,Id:number,Email:string,Name:string): Observable<any> {
        const url = `/ApiApodaca/SetProcessControlParameters/`;
        return this.httpClient
          .cache()
          .post<any>(url,  {
              "Action": ""+Action+"",
              "ID": Id,
              "Parameter": ""+Email+"",
              "GreenComparisonType": ""+Name+"",
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
    }


      
}