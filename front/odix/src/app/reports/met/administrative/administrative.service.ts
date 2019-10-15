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

export class AdministrativeService{
  errorMessage: string;
  private plantApiName:string;

  constructor(private httpClient: HttpClient, router: Router) {
    console.log("================ REPORT SERVICE ===============");
    this.errorMessage = 'Error, could not load data from API :-(';
    //this.path = this.router.url;
    let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
    this.plantApiName = NamePlantApi[plantName];
  }
  
  getAsset(AssetID: number): Observable<any> {
    const url = `${this.plantApiName}/AssetIDNameByParentID/${AssetID}`; 
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );

  }

  getInspector(): Observable<any> {
    const url = `${this.plantApiName}/GetInspector/`; 
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );

  }


  getShift(AssetID:number,startDate: string,): Observable<any> {
    const url = `${this.plantApiName}/Shifts/${AssetID}/${startDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );

  }

  getQuickReport(codeAsset:string,startDate: string,EndDate:string,shiftId:number,inspectorId:number): Observable<any> {
    const url = `${this.plantApiName}/GetQuickReport/${codeAsset}/${startDate}/${EndDate}/${shiftId}/${inspectorId}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  
  getMasterInformation(codeAsset:string,startDate: string,EndDate:string,shiftId:number,inspectorId:number): Observable<any> {
    const url = `${this.plantApiName}/GetMasterInformation/${codeAsset}/${startDate}/${EndDate}/${shiftId}/${inspectorId}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getDefectParetos(codeAsset:string,startDate: string,EndDate:string): Observable<any> {
    const url = `${this.plantApiName}/GetDefectParetos/${codeAsset}/${startDate}/${EndDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }
  
  
  getDefectByCordon(codeAsset:string,startDate: string,EndDate:string): Observable<any> {
    const url = `${this.plantApiName}/GetDefectByCordon/${codeAsset}/${startDate}/${EndDate}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }





  

}
