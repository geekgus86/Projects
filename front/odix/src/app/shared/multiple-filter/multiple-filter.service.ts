import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MultipleFilterService {
  errorMessage: string;
  private plantApiName: string

  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== MULTIPLE FILTER SERVICE ==============");
    this.errorMessage = 'Error, could not load data from API :-(';
    let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
    this.plantApiName = NamePlantApi[plantName];
  }

  getAssetIDNameByParentId(assetID: number): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/AssetIDNameByParentID/516
    const url = `${this.plantApiName}/AssetIDNameByParentID/${assetID}`;

    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }

  getShifts(EnnID: number): Observable<any> {
    // http://igrwapo03:8080/ApiApodaca/Shifts/516
    const url = `${this.plantApiName}/Shifts/${EnnID}`;
    return this.httpClient
      .cache()
      .get<any>(url)
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of(this.errorMessage))
      );
  }
}
