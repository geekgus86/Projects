import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateOperatorService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
  }

  public getUser(name: string): Observable<any> {
    const url =`http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/user/registered/${name}`;
    return this.httpClient.get(url);
  }

  public getPlants(): Observable<any> {
    const url =`http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/location`;
    return this.httpClient.get(url);
  }

  public createUser(postJSON :any): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/createUser`;

    return this.httpClient
      .post<any>(url, postJSON, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  public updateUser(idUser: any, status: any, idRol: any): Observable<any>{
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/editUser/${idUser}/${status}/${idRol}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  public getUsers(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/getUsers`;
    return this.httpClient.get(url);
  }

  public getRoles(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/getRoles`;
    return this.httpClient.get(url);
  }

  

}
