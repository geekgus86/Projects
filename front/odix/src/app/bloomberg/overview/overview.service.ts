import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Helper } from '../../shared/helper';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  errorMessage: string;
  helper: Helper;

  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== OVERVIEW SERVICE =============");
    //this.plantApiName = NamePlantApi['apodaca'];
    this.helper = new Helper();
    this.errorMessage = 'Error, could not load data from API';
    
   }
  
  getLineHourlyProductionByDate(code: string, date: string, plantName: string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];
    const url = `${plantApiName}/LineHourlyProductionByDate/${code}/${date}`;
    return this.httpClient.get(url)
  }

  getMainLineKPIs(code: string, date: string, plantName: string): Observable<any> {
    
    let plantApiName = NamePlantApi[plantName];
    const url = `${plantApiName}/MainLineKPIs/${code}/${date}`;
    return this.httpClient.get(url)
  }

  /*getSecondMenu(code: string, plantName: string): Observable<any> {
    
    let plantApiName = NamePlantApi[plantName];
    const url = `${plantApiName}/MainLineByType/${code}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }*/
  

  public getShifts(id:number,date:string, plantName: string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];
    if(date == "" || date === undefined )
    {
      const now = new Date();
      var dt = this.helper.dateProcessingWithDashFormat(now);
      date = dt;
      // console.log("set date "+date);
    }
    const url = `${plantApiName}/Shifts/${id}/${date}`;
    // console.log("url  = "+ url);
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }


  getQualityDefectsTop5(code: string, date: string, plantName: string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];
    const url = `${plantApiName}/GetQualityDefectsTop5/${code}/${date}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }


  getQualityDefectsFlowOutScrap(code: string, date: string, plantName: string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];
    const url = `${plantApiName}/GetQualityDefectsFlowOutScrap/${code}/${date}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getQualityContention(code: string, date: string, plantName: string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];
    const url = `${plantApiName}/GetQualityContention/${code}/${date}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getLinesMenu(code: string, plantName: string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];
    const url = `${plantApiName}/MainLineByType/${code}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

}
