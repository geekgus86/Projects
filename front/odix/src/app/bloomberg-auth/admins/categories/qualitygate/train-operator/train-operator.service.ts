import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainOperatorService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
  }

  public getStations(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/module/getStations`;
    return this.httpClient.get(url);
  }

  getUsers(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/getUsers`;
    return this.httpClient.get(url);
  }

  getTrainedUsers(): Observable<any> {
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/getTrainedUsers`;
    return this.httpClient.get(url);
  }

  editTrainedUser(idTraining: any, idStation: any, opPosition: any){
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/editTrainedUser/${idTraining}/${idStation}/${opPosition}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  createTrainedUser(idUser: any, idStation: any, opPosition: any){
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/createTrainedUser/${idUser}/${idStation}/${opPosition}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }

  deleteTrainedUser(idTraining: any){
    const url = `https://i40appgatewaydev.westus.cloudapp.azure.com/qg/user/deleteTrainedUser/${idTraining}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(
        catchError(() => of(this.errorMessage))
      );
  }
  
}
