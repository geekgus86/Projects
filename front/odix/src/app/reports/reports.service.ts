import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Alert } from 'selenium-webdriver';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ReportsService{
  errorMessage: string;
  private plantApiName:string;

  constructor(private httpClient: HttpClient, router: Router) {
    console.log("================ REPORT SERVICE ===============");
    this.errorMessage = 'Error, could not load data from API :-(';
    //this.path = this.router.url;
    let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
    this.plantApiName = NamePlantApi[plantName];
  }
  
  getProductionJobsPerHour(code: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.plantApiName}/ProductionJobsByHour/${code}/${startDate}/${endDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }
  
  getProductionAverageJPH(code: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.plantApiName}/ProductionAverageJPH/${code}/${startDate}/${endDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getProductionAverage(code: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.plantApiName}/ProductionAverage/${code}/${startDate}/${endDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getProductionDuplicates(code: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.plantApiName}/GetProductionDuplicates/${code}/${startDate}/${endDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getProductionByDateAndModel(code: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.plantApiName}/ProductionByDateAndModel/${code}/${startDate}/${endDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getProductionList(code: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.plantApiName}/ProductionList/${code}/${startDate}/${endDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getOverCycleTimeDataTypes(code: string, type: number): Observable<any> {
    const url = `${this.plantApiName}/OverCycleTimeDataTypes/${code}/${type}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getShifts(id: number,date:string): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/Shifts/1/2018-09-03
    const url = `${this.plantApiName}/Shifts/${id}/${date}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getAreaAssetIDNameByParentId(AssetID: number): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/AssetIDNameByParentID/516
    const url = `${this.plantApiName}/AssetIDNameByParentID/${AssetID}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getLineAssetIDNameByParentId(AreaAssetID: number): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/AssetIDNameByParentID/516
    const url = `${this.plantApiName}/AssetIDNameByParentID/${AreaAssetID}`;


    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getEnnAssetIDNameByParentId(EnnID: number): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/AssetIDNameByParentID/516
    const url = `${this.plantApiName}/AssetIDNameByParentID/${EnnID}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getStationAssetIDNameByParentId(stationID: number): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/AssetIDNameByParentID/516
    const url = `${this.plantApiName}/AssetIDNameByParentID/${stationID}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getCycleTimeDataByModel(LineAssetID: number, startDate: string, endDate: string, idShift: number): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/CycleTimeDataByModel/261/2018-06-13/2018-08-30
    const url = `${this.plantApiName}/CycleTimeDataByModel/${LineAssetID}/${startDate}/${endDate}/${idShift}`;
    // alert(url);
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getCycleTimeByDate(code: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.plantApiName}/CycleTimeByDate/${code}/${startDate}/${endDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }


  getCycleTimeMonthlyData(EnnID:number ,Month:string ,Year:number, LineName:string, AllENN:string, Cycletime:number): Observable<any> {
    //igrwapo03:8080/ApiApodaca/CycleTimeMonthlyData/54/Mayo/2018/DTL1/No/20
    const url = `${this.plantApiName}/CycleTimeMonthlyData/${EnnID}/${Month}/${Year}/${LineName}/${AllENN}/${Cycletime}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

}
