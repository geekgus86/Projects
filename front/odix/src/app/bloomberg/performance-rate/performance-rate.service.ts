import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PerformanceRateService {

  errorMessage: string;

  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== LINE MONITOR SERVICE =============");
    this.errorMessage = 'Error, could not load data from API';
    
   }
  
  getFilters(): Observable<any> {
    const url = `http://igrwapo03:8080/ApiApodaca/PR/PerformanceRateLOV/ALL/ALL`;
    return this.httpClient.get(url);
  }

  getGraphs(startDate: string, endDate: string, line: string, group: string, data: string): Observable<any> {
    const url =`http://igrwapo03:8080/ApiApodaca/PR/PerformanceRateInfo/${line}/${startDate}/${endDate}/${group}/${data}`;
    return this.httpClient.get(url);
  }
}
