import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DashboardService } from '@app/bloomberg/dashboard/dashboard.service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

import * as po from 'powerbi-client';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  dashboardName: string;
  nameUser : string;

  constructor(private _Activatedroute:ActivatedRoute, private dashboardService: DashboardService)
  {
    console.log("============ DASHBOARD COMPONENT =============");
  }
  
  ngOnInit() {

       var map : { [key:string]:string; } = {};
        this.dashboardService.GetDescriptions().subscribe(data => {
            for (var i = 0; i < data.map.length; ++i) {
              map[data.map[i].name] = data.map[i].description;
            }

                this._Activatedroute.params.subscribe((params: Params) => {

                this.dashboardName  = params['dashboardName'];
                this.nameUser = map[params['dashboardName']];

               
                this.dashboardService.GetEmbeddedReport(this.dashboardName).subscribe(model => {

                  var accessToken = model.Token;

                  var embedUrl = model.EmbedUrl;

                  var embedReportId = model.IdReport;


                  var models = window['powerbi-client'].models;


                  var config = {
                      type: 'report',
                      tokenType: models.TokenType.Embed,
                      accessToken: accessToken,
                      embedUrl: embedUrl,
                      id: embedReportId,
                      permissions: models.Permissions.All/*,
                      filters : [
                        new models.BasicFilter(
                        {
                            table: 'CycleTimeDataPowerBI',
                            column: 'NameArea'
                        },
                         'All', ["Toyota"])
                      ]*/
                  };

                  var reportContainer = $('#reportContainer')[0];

                  const powerbi = new po.service.Service(po.factories.hpmFactory, po.factories.wpmpFactory, po.factories.routerFactory);

                  powerbi.reset(reportContainer);

                  var report = powerbi.embed(reportContainer, config);

                  report.off("loaded");

                });

              });

        });

  }
}
