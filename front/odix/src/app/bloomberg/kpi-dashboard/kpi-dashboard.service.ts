import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { Helper } from '@app/shared/helper';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class KpiDashboardService{

  helper: Helper;
  date : string;

  apiURL: string;
  

  constructor(private http: HttpClient, router: Router) {
    console.log("=============== KPI STAMPING SERVICE ================");
    this.helper = new Helper();
  }

  public getUrl(plantName:string){

    if(plantName == "apodaca")
    {
        this.apiURL = "http://i40appgateway.eastus.cloudapp.azure.com/kpi-apo/api/v1/kpi/";
    }else if(plantName == "etown"){
        this.apiURL = "http://i40appgateway.eastus.cloudapp.azure.com/kpi-et/api/v1/kpi/";
    }


    //this.apiURL = "http://localhost:8080/kpi-forming/api/v1/kpi/";
    return this.apiURL;
  }

  public getLastProductiveDay(plantName:string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];


    const url = this.getUrl(plantName)+`${plantName}/lastProductiveDay/`;
    return this.http.get(url).pipe(shareReplay(1));//(`${plantName}/lastProductiveDay/`)

  }

  public getAssets(plantName:string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];

      // const now = new Date();
      // this.date = this.helper.dateProcessingWithDashFormat(now);
    
    const url = this.getUrl(plantName)+`${plantName}/assets/`;
    return this.http.get(url).pipe(shareReplay(1)); //(`${plantName}/assets/`)

  }

  public getTools(plantName:string, startDate:string, endDate:string,  asset:string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];

      // const now = new Date();
      // this.date = this.helper.dateProcessingWithDashFormat(now);
      const url = this.getUrl(plantName)+`${plantName}/tools/${startDate}/${endDate}/${asset}`;

     return this.http.get(url).pipe(shareReplay(1)); //(`${plantName}/tools/${startDate}/${endDate}/${asset}`)

  }

  public getKpiStampingPrimaryInd(plantName:string, startDate:string, endDate:string,  asset:string, tool:string ): Observable<any> {

    const url = this.getUrl(plantName)+`${plantName}/stamping-primary/${startDate}/${endDate}/${asset}/${tool}/`
    return this.http.get(url).pipe(shareReplay(1));
  }

  public getKpiStampingDowntime(plantName:string, startDate:string, endDate:string,  asset:string, tool:string ): Observable<any> {

    const url = this.getUrl(plantName) + `${plantName}/downtimes/${startDate}/${endDate}/${asset}/${tool}/`;

    return this.http.get(url).pipe(shareReplay(1));
  }
  public getKpiStampingChangeOver(plantName:string, startDate:string, endDate:string,  asset:string, tool:string ): Observable<any> {

    const url = this.getUrl(plantName) + `${plantName}/changeover/${startDate}/${endDate}/${asset}/${tool}/`;

    return this.http.get(url).pipe(shareReplay(1));
  }
  public getKpiStampingProductivity(plantName:string, startDate:string, endDate:string,  asset:string, tool:string ): Observable<any> {

    const url = this.getUrl(plantName) + `${plantName}/hxh/${startDate}/${endDate}/${asset}/${tool}/`;

    return this.http.get(url).pipe(shareReplay(1));
  }

  public getKpiStampingAllIndicators(plantName:string, startDate:string, endDate:string,  asset:string, tool:string ): Observable<any[]> {
    console.log("Llamando inicializador:");
    let primary = this.getKpiStampingPrimaryInd(plantName,startDate,endDate, asset, tool);
    let secondary = this.getKpiStampingDowntime(plantName,startDate,endDate, asset, tool);
    let assets = this.getAssets(plantName);
    let lastProductiveDay = this.getLastProductiveDay(plantName);
    let tools = this.getTools(plantName,startDate,endDate, asset);

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([primary, secondary,assets,lastProductiveDay,tools]);
  }

}

