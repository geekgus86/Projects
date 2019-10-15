import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WorldWidePlantsService {

  constructor(private http: HttpClient) { }
  public getWorldWidePlants(): Observable<any> {
    return this.http.get('assets/json/worldWidePlants.json');
    // return this.http.get('./../../assets/json/worldWidePlants.json');
  }

}
