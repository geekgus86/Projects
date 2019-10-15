
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ToolService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }
    

    public getTool(idAsset:number): Observable <any> {
      // const url = `https://api-admin.azurewebsites.net/api/tool/asset/${idAsset}`;
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/tool/asset/${idAsset}`;
      return this.httpClient.get(url);
    }

    public getToolsByLocation(location:string): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/tool/location/${location}`;

      return this.httpClient.get(url);
    }

    public getAsset(plantName:string): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/asset/location/${plantName}`;
      return this.httpClient.get(url);
    }

    public delete(id:number): Observable<any> {
      // const url = `https://api-admin.azurewebsites.net/api/tool/${id}`;
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/tool/${id}`;

      return this.httpClient.delete(url);
    }

    public deleteMultiple(ids: Set<number>): Observable<any> {
      let send = Array.from(ids).join(',');
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/tool/delete/`;
      return this.httpClient.post(url, "[" + send + "]", this.httpOptions);
    }

    public save( saveObj: any ): Observable<any> {
      //public save( descTool:string,designSpeed:number,jobNumber:number,toolType:number,noRollo:number,PzPerStroke:number,active:string,assetId:number): Observable<any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/tool/`;
      return this.httpClient
        .cache()
        .post<any>(url,  {
          "descTool": "" + saveObj.descTool + "",
          "designSpeed": saveObj.designSpeed,
          "jobNumber": saveObj.jobNumber,
          "toolType": saveObj.toolType,
          "noRollo": saveObj.noRollo,
          "pzPerStroke": saveObj.pzPerStroke,
          "assets": saveObj.assets,
          "location": saveObj.location
          }, this.httpOptions)
        .pipe(
          catchError(() => of(this.errorMessage))
        );
  }


   public update(editObj: any): Observable<any> {
        const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/tool/`;
        return this.httpClient
          .cache()
          .put<any>(url,  {
            "id": editObj.id,
            "descTool": "" + editObj.descTool + "",
            "designSpeed": editObj.designSpeed,
            "jobNumber": editObj.jobNumber,
            "toolType": editObj.toolType,
            "noRollo": editObj.noRollo,
            "pzPerStroke": editObj.pzPerStroke
            }, this.httpOptions)
          .pipe(
            catchError(() => of(this.errorMessage))
          );
    }

    public getUsers(plantName:string): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/asset/location/${plantName}`;
      return this.httpClient.get(url);
    }


    public active(id: number): Observable<any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/tool/activate/${id}`;
      return this.httpClient
        .cache()
        .put<any>(url,  {
          "id": id
          }, this.httpOptions)
        .pipe(
          catchError(() => of(this.errorMessage))
        );
  }


      
}