import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MttrFormingService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  url:any;
  urlAdmin:any;
  errorMessage: string;
  constructor(private httpClient: HttpClient) {
    this.errorMessage = 'Error, could not load data from API';
    //this.url = "http://localhost:8081";
    //this.url = "http://i40appmasterdev.westus.cloudapp.azure.com"
    this.url = "http://i40appgateway.eastus.cloudapp.azure.com"
    this.urlAdmin = "http://i40appgateway.eastus.cloudapp.azure.com"
  }

  public getUrl(plant:any){
    let tmpUrl = this.url;
    if(plant == "apodaca"){
      //tmpUrl = "http://localhost:8081/mttr-api";
      tmpUrl += "/mttr-api-apo";
    }
    if(plant == "etown"){
      //tmpUrl = "http://localhost:8081/mttr-api";
      tmpUrl += "/mttr-api-et";
    }
    return tmpUrl;
  }

  public getPresition(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/get_presition";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getAssets(planName:string): Observable <any> {
    let short = planName == "apodaca" ? "apo" : "et";
    const fullUrl = this.urlAdmin + "/kpi-"+short+"/api/v1/kpi/"+planName+"/assets"
    return this.httpClient.get(fullUrl);
  }

  public getDepartments(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/departments"
    return this.httpClient.get(fullUrl);
  }

  public getDateZone(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/get_dates"
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getMttrByTools(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/mttrbytool"
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getMtta(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/mtta";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getMtbf(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/mtbf";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getMttr(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/mttr";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getMtti(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/mtti";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getMttrFault(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/mttrfault";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getMtbfFault(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/mtbffault";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

  public getAssitance(body:any): Observable <any> {
    const fullUrl = this.getUrl(body.plant) + "/reports/api/v1/assistances";
    return this.httpClient.post(fullUrl, body, this.httpOptions);
  }

} 