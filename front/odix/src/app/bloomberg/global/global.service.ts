import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  public getGlobalPlants(): Observable <any> {
     //return this.http.get('assets/json/globalPlants.json');
    const url = `http://i40appgateway.eastus.cloudapp.azure.com/auth/api/production/getGlobalProductionRates`;
    return this.http.get(url); //http://squweli01:8080/fbx4/assets/json/globalPlants.json
  }

  public getAllProductionRates(loction:any): Observable <any> {
      //http://i40appgateway.eastus.cloudapp.azure.com/auth/api/production/getAllProductionRates/SaltilloMX
      const url = `http://i40appgateway.eastus.cloudapp.azure.com/auth/api/production/getAllProductionRates/${loction}`;
      // console.log("getAllProductionRates = "+url);
      return this.http.get(url);
    
  }
  
  public getMarkers(): Observable <any> {
    //return this.http.get('assets/json/markers.json');
    const url = `http://i40appgateway.eastus.cloudapp.azure.com/auth/api/production/getAreasMarker`;
    return this.http.get(url); 
  }
 
  public getFramesByShiftAndHour(over:string): Observable <any> {
    // http://i40appgateway.eastus.cloudapp.azure.com/auth/api/overview/getFramesByShiftAndHour/Overview_Saltillo_Chrysler_D2DJ
   const url = `http://i40appgateway.eastus.cloudapp.azure.com/auth/api/overview/getFramesByShiftAndHour/${over}`;
   return this.http.get(url); 

  }

  public getShiftValuesByLine(over:string): Observable <any> {
    //http://i40appgateway.eastus.cloudapp.azure.com/auth/api/overview/getShiftValuesByLine/Overview_Saltillo_Chrysler_D2DJ
    const url = `http://i40appgateway.eastus.cloudapp.azure.com/auth/api/overview/getShiftValuesByLine/${over}`;
  //  console.log("getShiftValuesByLine = "+url);
    return this.http.get(url); 
  }

  public getQualityNotificationsPais(): Observable <any> {
    const url = `http://gpmappora2-k.metalsa.mx:7020/ApiRestOdix/api/notificaciones/porpais`;
    return this.http.get(url); 
  }

  
  public getQualityNotificationsPlanta(): Observable <any> {
    const url = `http://gpmappora2-k.metalsa.mx:7020/ApiRestOdix/api/notificaciones/porplanta`;
    return this.http.get(url); 
  }

  public getQualityNotificationsTopTen(): Observable <any> {
    const url = `http://gpmappora2-k.metalsa.mx:7020/ApiRestOdix/api/notificaciones/topten`;
    return this.http.get(url); 
  }


  public getPais(): Observable <any> {
    const url = `http://gpmtest1-c.grupoproeza.com.mx:7062/cars-rest/api/v1/integration/getDataByCountry`;
    return this.http.get(url); 
  }

  public getPlanta(): Observable <any> {
    const url = `http://gpmtest1-c.grupoproeza.com.mx:7062/cars-rest/api/v1/integration/getDataByPlant`;
    return this.http.get(url); 
  }

  
  public getList(tipo_:string,fecha_:string ,fecha_fin_:string): Observable<any> {
    var data = this.http.post('http://gpmtest1-c.grupoproeza.com.mx:7062/cars-rest/viewReporte/getAllFiltros/',
    {
      tipo: tipo_,
      fecha: fecha_,
      fecha_fin: fecha_fin_
    }
    );
    return data;
  }

  
}