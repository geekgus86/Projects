import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DefectsService {

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;
  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== DEFECTS SERVICE =============");
    this.errorMessage = 'Error, could not load data from API';
  }

  GetTop5Defects(params:string): Observable<any> {
    const url = `http://igrwslp01/ApiSLP/GetTop5Defects/${params}`;
    return this.httpClient.get(url)
  }

  GetTop5DefectsLine(params:string): Observable<any> {
    const url = `http://igrwslp01/ApiSLP/GetTop5DefectsLine/${params}`;
    return this.httpClient.get(url)
  }



}
