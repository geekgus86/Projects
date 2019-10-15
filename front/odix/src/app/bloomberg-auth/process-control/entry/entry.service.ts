import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

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

  public getComboboxes(): Observable<any> {
    const url = `/ApiApodacaTest/ProcessControlEntries`;
    console.log("ProcessControlEntries url = "+url);
    return this.httpClient.get(url);
  }

  public getGridInformation(asset:any,date:any,shift:any, workgroup:any): Observable<any> {
    const url = `/ApiApodacaTest/ProcessControlEntries/${asset}/${date}/${shift}/${workgroup}`;
    console.log("ProcessControlEntries url = "+url);
    return this.httpClient.get(url);
  }

  public saveData(postJSON:any): Observable<any> {
    const url = `/ApiApodacaTest/SetProcessControlEntries/`;
    console.log("/SetProcessControlEntries url = "+url);
    //return this.httpClient.post(url,this.httpOptions);
    return this.httpClient
      .cache()
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }


}
