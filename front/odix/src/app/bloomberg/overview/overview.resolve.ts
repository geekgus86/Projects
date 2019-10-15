import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OverviewService } from '@app/bloomberg/overview/overview.service';
import { forkJoin } from 'rxjs';
import { Helper } from '@app/shared/helper';


@Injectable()
export class OverviewResolver implements Resolve<any> {

  helper: Helper;
  

  constructor(private overviewService: OverviewService) { }


  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const plantName = route.params['plantName'];
    const machineName = route.params['machineName'];
    // machineName = 'APO_EnsambleDTL1-DTL1';

    this.helper = new Helper();
    const now = new Date();
    // now.setDate(now.getDate() - 1);
    const date = this.helper.dateProcessingWithDashFormat(now);

    const response = forkJoin([
      this.overviewService.getLineHourlyProductionByDate(machineName, date, plantName),
      this.overviewService.getMainLineKPIs(machineName, date, plantName),
      this.overviewService.getLinesMenu(machineName, plantName)
    ]);

    return response;
  }



}
