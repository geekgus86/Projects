import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupsService {

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'applicationx/jsonxx'
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;


  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
  }

  public getWorkgroups(): Observable<any> {
    const url = `/ApiApodaca/ProcessControlWorkGroups`;
    return this.httpClient.get(url);
   }


   public editData( Action:string,ID:number,Line_ID:number,WorkGroup:string): Observable<any> {
    const url = `/ApiApodaca/SetProcessControlWorkGroups/`;
    return this.httpClient
      .cache()
      .post<any>(url,  {
          "Action": ""+Action+"",
          "ID": ID,
          "Asset_ID": Line_ID,
          "WorkGroup": ""+WorkGroup+"",
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }



}
