import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Helper } from '../helper';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LineMonitorService {

  errorMessage: string;
  helper: Helper;

  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== LINE MONITOR SERVICE =============");
    this.helper = new Helper();
    this.errorMessage = 'Error, could not load data from API';
    
   }
  
  getStationsLayout(plant: string, date: string, line: string): Observable<any> {
    const url = `http://igrwapo03:8080/ApiApodaca/RealTimeMonitorLayout/APO_EnsambleDTL1-DTL1-ENN8`;
    return this.httpClient.get(url);
  }

  getProductionReport(plant: string, date: string, line: string, station: string): Observable<any> {
    //const url = `http://i40appgateway.eastus.cloudapp.azure.com/auth/api/app/getProductionReport/${plant}/${line}/${station}`;
    const url =`http://igrwapo03:8080/ApiApodaca/RealTimeMonitorReportByStation/APO_EnsambleDTL1-DTL1-ENN8-${station}`;
    return this.httpClient.get(url);
  }

  getInformationTable(plant: string, date: string, line: string): Observable<any> {
    //const url = `http://i40appgateway.eastus.cloudapp.azure.com/auth/api/app/getProductionReport/${plant}/${line}/${station}`;
    const url ="http://igrwapo03:8080/ApiApodaca/RealTimeReportByENN/APO_EnsambleDTL1-DTL1-ENN8";
    return this.httpClient.get(url);
  }

  

}
