import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { NamePlantApi } from '@app/globalEnum';
import { Router, ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'applicationx/jsonxx'
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;
  private plantApiName: string;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
    console.log("============= MENU SERVICE ============");
    this.errorMessage = 'Error, could not load data from API';
  }
  
  public getMenu(): Observable<any> {
    this.plantApiName = NamePlantApi[this.router.routerState.snapshot.root.children[0].children[0].params['plantName']];
    var url = `${this.plantApiName}/Menu`;
    return this.httpClient.get(url);
   }

  sendSuggestion(msj: string,nameBrowser:string): Observable<any> {
    // console.log(msj);
    // console.log(nameBrowser);
    const url = `/ApiApodaca/suggestion/`;
    return this.httpClient
      .cache()
      .post<any>(url,  {
          "Msj": ""+msj+"",
          "User": 0,
          "Browser":""+nameBrowser+""
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

}
