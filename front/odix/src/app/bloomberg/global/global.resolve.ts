import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '@app/bloomberg/global/global.service';



@Injectable()
export class GlobalResolver implements Resolve<any> {

    constructor(private service: GlobalService) {}


    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getGlobalPlants();
    }



}
