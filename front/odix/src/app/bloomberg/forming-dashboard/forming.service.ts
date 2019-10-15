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
export class FormingService {

  helper: Helper;
  date : string;

  apiURL: string = 'http://i40appgateway.eastus.cloudapp.azure.com/global/apiGlobal/v1/forming'

  constructor(private http: HttpClient, router: Router) {
    console.log("=============== FORMING SERVICE ================");
  }

  public getLastProductiveDay(plantName:string): Observable<any> {

    const url = this.apiURL+"lastProductiveDay/";
    console.log("Estoy aquí antes de hacer get con url "+ url);
     return this.http.get(url).pipe(shareReplay(1));

  }

  public getAll(type:number): Observable<any> {
    const url = this.apiURL+`/all/${type}/`;
    return this.http.get(url).pipe(shareReplay(1)); 
  }

  public getAsset(): Observable<any> {
    const url = this.apiURL+`/asset/`;
    return this.http.get(url).pipe(shareReplay(1));
  }

}
