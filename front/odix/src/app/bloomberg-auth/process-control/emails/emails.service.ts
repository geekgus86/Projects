import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmailsService {

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

  public getEmails(): Observable<any> {
    const url = `/ApiApodaca/ProcessControlAllEmails`;
    console.log("ProcessControlAllEmails url = "+url);
    return this.httpClient.get(url);
   }

  public insertEmail(action:any,ID:any,groupID:any,email:any,statusID:any): Observable<any> {
    const url = `/ApiApodaca/SetProcessControlEmailXRef/`;
    console.log("SetProcessControlEmailXRef url = "+url);
    //return this.httpClient.post(url,this.httpOptions);
    return this.httpClient
      .cache()
      .post<any>(url,  {
        "Action": ""+action+"",
        "ID": ID,
        "EmailGroup_ID": groupID,
        "Email": ""+email+"",
        "Status": statusID
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  public updateEmail(ID:any,groupID:any,email:any,statusID:any): Observable<any> {
    const url = `/ApiApodaca/SetUpdateProcessControlEmailXRef/`;
    console.log("SetUpdateProcessControlEmailXRef url = "+url);
    //return this.httpClient.post(url,this.httpOptions);
    return this.httpClient
      .cache()
      .post<any>(url,  {
          "ID": ID,
          "GroupID": groupID,
          "Email": ""+email+"",
          "Status":statusID
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  public deleteEmail(ID:any): Observable<any> {
    const url = `/ApiApodaca/SetDeleteProcessControlEmailXRef/`;
    console.log("SetDeleteProcessControlEmailXRef url = "+url);
    //return this.httpClient.post(url,this.httpOptions);
    return this.httpClient
      .cache()
      .post<any>(url,  {
          "ID": ID
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }
}
