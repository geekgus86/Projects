
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TeamsService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
        this.errorMessage = 'Error, could not load data from API';
    }


    public getTeams(idAsset:number,plantName:string): Observable <any> {
      if(idAsset==-1){
        const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team/location/${plantName}`;
        return this.httpClient.get(url);
      }else{
        const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team/asset/${idAsset}`;
        return this.httpClient.get(url);
      }
    }
    

    public getTeam(id:number): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team/${id}`;
      return this.httpClient.get(url);
    }
    
    public getArea(): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/escalation/type`;
      return this.httpClient.get(url);
    }

    public getAsset(plantName:string): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/asset/location/${plantName}`;
      return this.httpClient.get(url);
    }

    public getIssue(id:number): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/issueType/asset/${id}`;
      return this.httpClient.get(url);
    }
    
    

    public getRegla(idArea:number): Observable <any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/escalation/rule/type/${idArea}`;
      return this.httpClient.get(url);
    }

    
    public deleteMultiple(ids: Set<number>): Observable<any> {
      let send = Array.from(ids).join(',');
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team/delete/`;
      return this.httpClient.post(url, "[" + send + "]", this.httpOptions);
    }

    
    public delete(id:number): Observable<any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team/${id}`;
      return this.httpClient.delete(url);
    }

    public activate(id:number): Observable<any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team/activate`;
      return this.httpClient.post(url,{id: id});
    }

    getUser(name: string): Observable<any> {
      // const url =`http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/user/${name}`;
      const url =`http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/user/registered/${name}`;
      return this.httpClient.get(url);

    }


    
    public save( obj: any ): Observable<any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team`;
      console.log("obj adap");
      console.log(obj);
      console.log("obj adap");

      return this.httpClient
        .cache()
        .post<any>(url,  {
          "userId": obj.userId,
          // "escalationTypeId": obj.escalationTypeId,
          "escalationRuleId": obj.escalationRuleId,
          // "assetID": obj.idAsset,
          "assets": obj.assets,
          "issueTypeId": obj.issueTypeId,
          }, this.httpOptions)
        .pipe(
          catchError(() => of(this.errorMessage))
        );
  }




    public update(obj:any): Observable<any> {
      const url = `http://i40appmaster.eastus.cloudapp.azure.com:8083/admin/api/team`;
      return this.httpClient
        .cache()
        .put<any>(url,  {
            "id": obj.id,
            "userId": obj.userId,
            // "escalationTypeId": escalationTypeId,
            "escalationTypeId": obj.escalationTypeId,
            "escalationRuleId": obj.escalationRuleId,
            "assetID": obj.assetID,
            "issueTypeId": obj.issueTypeId,
          }, this.httpOptions)
        .pipe(
          catchError((e) => of(e))
        );
      }



      
}