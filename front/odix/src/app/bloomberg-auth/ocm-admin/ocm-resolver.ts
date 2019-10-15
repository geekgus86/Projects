import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OcmServiceService } from './ocm-service.service';



@Injectable()
export class OcmResolver implements Resolve<any> {

    constructor(private service: OcmServiceService) {
        console.log("=============== OCM RESOLVER =============")
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.ocm();
    }



}
