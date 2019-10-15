import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusAndonService {

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

  public getComboboxes(assetID: any): Observable<any> {
    const url = `/ApiApodacaTest/AndonStatus/${assetID}`;
    console.log("AndonStatus url = "+url);
    return this.httpClient.get(url);
  }

  public changeSwitchState(assetID:any,code:any): Observable<any> {
    const url = `/ApiApodacaTest/SetAndonStatus/`;
    console.log("SetAndonStatus url = "+url);
    //return this.httpClient.post(url,this.httpOptions);
    var json;
    json = {
      "Asset_id": assetID,
      "Code": ""+code+""
      };
      console.log(json)
    return this.httpClient
      .cache()
      .post<any>(url,  {
        "Asset_id": assetID,
        "Code": ""+code+""
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

}
