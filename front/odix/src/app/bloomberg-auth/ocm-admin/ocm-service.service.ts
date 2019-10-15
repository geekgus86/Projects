import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Helper } from '@app/shared/helper';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJNZXRhbHNhQXBwIiwic3ViIjoibm9lLm9qZWRhQG1ldGFsc2EuY29tIiwidXNlclZhYyI6IlNQWCIsIm5hbWUiOiJPamVkYS1Sb2RyJUMzJUFEZ3VleiUyQytTci4rTm8lQzMlQTkrK0dyZWdvcmlvIiwiaXNzIjoibWV0YWxzYS5jb20iLCJleHAiOjE1ODYxNDYzODAsImlhdCI6MTU0NDU0NjM4MCwiY29vcmRpbmF0b3JFbWFpbCI6IiIsInVzZXJzIjpbeyJwZXJzb25JZCI6MTU1NjksImNvb3JkaW5hZG9ySWQiOiJPamVkYS1Sb2Ryw61ndWV6LCBTci4gTm_DqSAgR3JlZ29yaW8iLCJ1c3VhcmlvUG9ydGFsIjoiTk9KRURBIiwibG9jYXRpb24iOiIxIiwicm9sZXMiOlt7ImFwcElkIjoxLCJyb2xlcyI6IjEifSx7ImFwcElkIjoxLCJyb2xlcyI6IjIifSx7ImFwcElkIjoxLCJyb2xlcyI6IjE4In0seyJhcHBJZCI6MSwicm9sZXMiOiIxNSJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiMTQifSx7ImFwcElkIjoxLCJyb2xlcyI6IjQxIn0seyJhcHBJZCI6MSwicm9sZXMiOiI1MSJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiNTYifSx7ImFwcElkIjoxLCJyb2xlcyI6IjU3In0seyJhcHBJZCI6MSwicm9sZXMiOiI1OCJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiMTYifSx7ImFwcElkIjoxLCJyb2xlcyI6IjQxIn0seyJhcHBJZCI6MSwicm9sZXMiOiI1MSJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiNTYifSx7ImFwcElkIjoxLCJyb2xlcyI6IjU3In0seyJhcHBJZCI6MSwicm9sZXMiOiI1OCJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiNDEifSx7ImFwcElkIjoxLCJyb2xlcyI6IjUxIn0seyJhcHBJZCI6MSwicm9sZXMiOiI1NiJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiNTcifSx7ImFwcElkIjoxLCJyb2xlcyI6IjU4In0seyJhcHBJZCI6MSwicm9sZXMiOiI1NSJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiMTYifSx7ImFwcElkIjoxLCJyb2xlcyI6IjM3In0seyJhcHBJZCI6MSwicm9sZXMiOiI1NSJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiMzcifSx7ImFwcElkIjoxLCJyb2xlcyI6IjE2In0seyJhcHBJZCI6MSwicm9sZXMiOiIxNiJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiNjUifSx7ImFwcElkIjoxLCJyb2xlcyI6IjY2In0seyJhcHBJZCI6MSwicm9sZXMiOiI2NSJ9LHsiYXBwSWQiOjEsInJvbGVzIjoiNjYifV19XSwiY291bnRyeUlkIjowfQ.MWQIJUq68sJCrpYadvIKRFc-qXrqQ4eMjiB9tPASqE67rvlcg52VC8u8iOHVC-eAqRBUmlpqDWUVQSydQoXQzWbGNyiVc77c2wHI_DtOBfdcDkF4Bd7f5mAPWzqw9VoPQ2Lx1pJhgMhwFFTUCaH9ThVi7dBdcKGM63DAqSrmuN0'
  })
};*/

@Injectable({
  providedIn: 'root'
})

export class OcmServiceService {

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;
  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== OCM SERVICE =============");
    this.errorMessage = 'Error, could not load data from API';
  }




  ocm(): Observable<any> {
    const url = 'http://igrwapo03:8080/ApiApodaca/OCM/OperationalCostMonitor';
    return this.httpClient.get(url)
  }

  spx(idUEN:string): Observable<any> {
    const url = `http://igrwapo03:8080/ApiApodaca/OCM/GetAllByUEN/${idUEN}`;
    return this.httpClient.get(url)
  }
  public editData(Action:string,ID:number,UEN:string,Proceso:string,Linea:string,Grupo:string,EQE:string,Enn:string,Description:string,CC:string): Observable<any> {
    const url = `/ApiApodaca/OCM/SetOperationalCostMonitor/`;
    return this.httpClient
      .cache()
      .post<any>(url,  {
          "Action": ""+Action+"",
          "ID": ID,
          "UEN": ""+UEN+"",
          "PROCESO": ""+Proceso+"",
          "LINEA": ""+Linea+"",
          "GRUPO": ""+Grupo+"",
          "EQE": ""+EQE+"",
          "ENN": ""+Enn+"",
          "DESCRIPCION": ""+Description+"",
          "CC": ""+CC+"",
        }, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

}
