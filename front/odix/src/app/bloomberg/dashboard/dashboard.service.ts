import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  errorMessage: string;
  private plantApiName: string;
  
  constructor(private httpClient: HttpClient, router: Router) {
    console.log("============== DASHBOARD SERVICE ===============");
    this.errorMessage = 'Error, could not load data from API';
    let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
    this.plantApiName = NamePlantApi[plantName];
  }
  
  GetEmbeddedReport(name: string): Observable<any> {
    const url = `${this.plantApiName}/GetEmbeddedReport/${name}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }
  
  GetDescriptions(){
    const url = `${this.plantApiName}/GetDescriptions/`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }
}
