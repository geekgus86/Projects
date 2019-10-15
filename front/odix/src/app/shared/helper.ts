
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenCredentials } from './model/TokenCredentials'
import * as jwt_decode from 'jwt-decode';

export class Helper {
  // properties
  http: HttpClient;

  constructor() {
  }

  // functions
  dateProcessingWithDashFormat(date: Date): string {
    if(!date){date = new Date();}
    let month = (date.getMonth() + 1).toString();
    if (month.length !== 2) {
      month = '0' + month;
    }
    const day = date.toString().substring(8, 10);
    return date.getFullYear().toString() + '-' + month + '-' + day;
  }

  // functions
  getDateWithoutTimeZone(date: Date): Date {
    console.log("Probando1");
    //console.log(date.getTimezoneOffset()/60);
    //console.log(date.getHours());
    console.log(date);
    date.setHours(date.getHours()-date.getTimezoneOffset()/60);
    
    //console.log(date);
    return date;
  }

  dateFormatDDMMYYY(date: Date): string {
    let month = (date.getMonth() + 1).toString();
    if (month.length !== 2) {
      month = '0' + month;
    }
    const day = date.toString().substring(8, 10);
    return day + '-' + month + '-' +  date.getFullYear().toString();
  }

  dateFormat_slash_DDMMYYY(date: Date): string {
    let month = (date.getMonth() + 1).toString();
    if (month.length !== 2) {
      month = '0' + month;
    }
    const day = date.toString().substring(8, 10);
    return day + '/' + month + '/' +  date.getFullYear().toString();
  }

  getTokenCredentials(): TokenCredentials[]{
    let savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
    let credenciales = savedCredentials && JSON.parse(savedCredentials);
    let token = (credenciales && credenciales.token);
    var tkCredentials: TokenCredentials[] = [];
    if (!token || token.length <= 0) {return;}
    let decoded: any = jwt_decode(token);
    /*for (let data of decoded.data) { Para el momento 07/03/2019 no se tiene data en el token
        var cred = new TokenCredentials();
        cred.plantId = data.plant.plantId;
        cred.plantName = data.plant.plantName;
        cred.country = data.plant.country;
        cred.rolId = data.rol.rolId;
        cred.rolName = data.rol.rolName;
        cred.rolDescription = data.rol.rolDescription;
        tkCredentials.push(cred);
    }*/
    return tkCredentials;
  }

  getAssetsJson(): Observable<any> {
    return this.http
      .cache()
      .get<any>('./../../assets/json/assets.json')
      .pipe(
        // map((body: any) => body.value),
        catchError(() => of('Error, could not load data from assets JSON'))
      );
  }
}
