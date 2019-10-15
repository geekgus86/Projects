
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProcessService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    
    getListLayout(code: string, LayoutType: string): Observable<any> {
        let plantApiName = "/ApiApodaca"
        const url = `${plantApiName}/ProcessControlLayout/${code}/${LayoutType}`;
        return this.httpClient.get(url)
    }

    getDetail(code: string, LayoutType: string): Observable<any> {
        let plantApiName = "/ApiApodaca"
        const url = `${plantApiName}/ProcessControlLayout/${code}/${LayoutType}`;
        return this.httpClient.get(url)
    }

    ProcessControlChart(Parameter_Id: number, LayoutType: string,FromDate:string,ToDate:string): Observable<any> {
        // http://igrwapo03:8080/ApiApodaca/ProcessControlChart/1/PROCESS/null/null
        let plantApiName = "/ApiApodaca"
        const url = `${plantApiName}/ProcessControlChart/${Parameter_Id}/${LayoutType}/${FromDate}/${ToDate}`;
        return this.httpClient.get(url)
    }

    
    ProcessControlAllChart(code: string, LayoutType: string,FromDate:string,ToDate:string): Observable<any> {
        let plantApiName = "/ApiApodaca"
        // http://igrwapo03:8080/ApiApodaca/ProcessControlAllChart/APO_PinturaToyota-PINTL2-Tanque1/PROCESS/null/null
        const url = `${plantApiName}/ProcessControlAllChart/${code}/${LayoutType}/${FromDate}/${ToDate}`;
        return this.httpClient.get(url)

    }




      
}