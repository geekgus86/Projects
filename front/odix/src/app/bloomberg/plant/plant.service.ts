import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Helper } from '@app/shared/helper';
import { NamePlantApi } from '@app/globalEnum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PlantService{

  helper: Helper;
  date : string;

  constructor(private http: HttpClient, router: Router) {
    console.log("=============== PLANT SERVICE ================");
    this.helper = new Helper();
  }

  public getShifts(id:number, date:string, plantName:string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];
    if(date == "" || date === undefined )
    {
      const now = new Date();
      var dt = this.helper.dateProcessingWithDashFormat(now);
      date = dt;
      // console.log("set date "+date);
    }
    return this.http.get(`${plantApiName}/Shifts/${id}/${date}/`);
  }


  public getPlant(dateP: string, shift: string, plantName:string): Observable<any> {
    let plantApiName = NamePlantApi[plantName];

    if(dateP == "")
    {
      const now = new Date();
      this.date = this.helper.dateProcessingWithDashFormat(now);
     return this.http.get(`${plantApiName}/PlantLayout/${this.date}/${shift}`)

    }else
    {
      return this.http.get(`${plantApiName}/PlantLayout/${dateP}/${shift}`)
    }
  }
}

