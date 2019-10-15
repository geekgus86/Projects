import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {

  errorMessage: string;
  private plantApiName: string;
  private url = "http://i40appgateway.eastus.cloudapp.azure.com/global/";
  constructor(private httpClient: HttpClient, router: Router) {
    console.log("============== DASHBOARD SERVICE ===============");
    this.errorMessage = 'Error, could not load data from API';
    //let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
    
  }
  
  GetEmbeddedReport(name: string): Observable<any> {
    const url = `${this.url}apiGlobal/v1/pb/get/${name}/`;
    console.log(url);
    return this.httpClient
      .get<any>(url)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }
}
