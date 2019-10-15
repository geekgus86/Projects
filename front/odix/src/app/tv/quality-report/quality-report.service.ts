import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class qualityService {

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;
  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== QUALITY SERVICE =============");
    this.errorMessage = 'Error, could not load data from API';
  }

  GetQualityWelding(params:string): Observable<any> {
    // http://igrwslp01/ApiSLP/GetQualityWelding/SLP_BMW_RAC_M035
    // http://igrwslp01/ApiSLP/GetQualityWelding/SLP_BMW_RAC_M110
    const url = `http://igrwslp01/ApiSLP/GetQualityWelding/${params}`;
    return this.httpClient.get(url)
  }

  GetTimeRepaired(params:string): Observable<any> {
    // http://igrwslp01/ApiSLP/GetTimeRepaired/SLP_BMW_RAC_M035
    // http://igrwslp01/ApiSLP/GetTimeRepaired/SLP_BMW_RAC_M110
    const url = `http://igrwslp01/ApiSLP/GetTimeRepaired/${params}`;
    return this.httpClient.get(url)
  }

}
