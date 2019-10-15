import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PcbAssemblyService {

  errorMessage: string;

  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== PCB SERVICE =============");
    this.errorMessage = 'Error, could not load data from API';
    
   }
  
  getProductionPlan(date: string): Observable<any> {
    const url = `http://lh-progress-met:8094/SIPAPO/rest/SIPAPOService/BancoTrabajo?pDomain=APODACA&pSite=114315&pLine=LENSDT1&pFchFin=${date}&prPart=*`;
    return this.httpClient.get(url);
  }

}
