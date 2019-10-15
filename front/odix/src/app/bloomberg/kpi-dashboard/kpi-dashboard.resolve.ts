
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { KpiDashboardService } from '@app/bloomberg/kpi-dashboard/kpi-dashboard.service';

import { Helper } from '@app/shared/helper';


@Injectable()
export class KpiDashboardResolver implements Resolve<any> {
    // Estos dos datos lo debo ajustar a que sea despachado por servicio
    asset:string ="1";
    tool:string = "Todas";
    helper: Helper;

    minDate: any = "lastProductionDay"; //lastProductionDay
    maxDate: any = "lastProductionDay"; //lastProductionDay

    constructor(private service: KpiDashboardService) {
      console.log("=============== KPI STAMPING RESOLVE ================");
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getKpiStampingAllIndicators(route.params['plantName'], this.minDate,this.maxDate,this.asset,this.tool);

    }

}
