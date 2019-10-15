import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  errorMessage: string;
  //urlG = 'http://localhost:8080/admin';
  urlG = 'http://i40appmaster.eastus.cloudapp.azure.com:8083/admin';
  constructor(private httpClient: HttpClient, router: Router) {
    console.log("=============== ADMIN USER SERVICE =============");
    this.errorMessage = 'Error, could not load data from API';
   }
  
  getPlants(): Observable<any> {
    const url =`${this.urlG}/api/location`;
    return this.httpClient.get(url);
  }

  getUser(name: string): Observable<any> {
    const url =`${this.urlG}/api/user/${name}`;
    return this.httpClient.get(url);
  }

  getRegistered(): Observable<any> {
    const url = `${this.urlG}/api/user/registered`;
    return this.httpClient.get(url);
  }

  saveAppUser(user: any): Observable<any> {
    const url = `${this.urlG}/api/user/addAppUser`;
    return this.httpClient.post(url,user);
  }

  deleteUser(user: any): Observable<any> {
    const url = `${this.urlG}/api/user/deleteUser`;
    return this.httpClient.post(url,user);
  }

  validateAD(email: string): Observable<any> {
    const url =`${this.urlG}/api/v1/usuario/validarAD`;
    return this.httpClient.post(url,{usuario: email});
  }
 
  getLocations(): Observable<any> {
    const url =`${this.urlG}/api/asset/locations`;
    return this.httpClient.get(url);
  }

  getLang(name: string): Observable<any> {
    const url =`${this.urlG}/api/location/lang/${name}`;
    return this.httpClient.get(url);
  }

  

}
