import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PowerbiService } from '@app/bloomberg/powerbi/powerbi.service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

import * as po from 'powerbi-client';


@Component({
  selector: 'app-dashboard',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.scss']
})

export class PowerbiComponent implements OnInit {

  dashboardName: string;
  nameUser : string;

  constructor(private _Activatedroute:ActivatedRoute, private dashboardService: PowerbiService)
  {
    console.log("============ DASHBOARD COMPONENT =============");
  }
  
  ngOnInit() {

       var map : { [key:string]:string; } = {};
        //this.dashboardService.GetDescriptions().subscribe(data => {
            /*for (var i = 0; i < data.map.length; ++i) {
              map[data.map[i].name] = data.map[i].description;
            }*/

                this._Activatedroute.params.subscribe((params: Params) => {

                this.dashboardName  = params['dashboardName'];
                this.nameUser = map[params['dashboardName']];

                this.dashboardService.GetEmbeddedReport(this.dashboardName).subscribe(model => {
                  this.nameUser = model.descripcion;

                  var accessToken = model.token;

                  var embedUrl = model.embedUrl;

                  var embedReportId = model.idReport;


                  var models = window['powerbi-client'].models;

                  var edgar = {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: true
          
                  };

                  const config = {
                      type: 'report',
                      tokenType: models.TokenType.Embed,
                      accessToken: accessToken,
                      settings: {},
                      embedUrl: embedUrl,
                      id: embedReportId,
                      permissions: models.Permissions.All,
                  };


                  

                  var reportContainer = $('#reportContainer')[0];

                  const powerbi = new po.service.Service(po.factories.hpmFactory, po.factories.wpmpFactory, po.factories.routerFactory);

                  powerbi.reset(reportContainer);

                  var report = powerbi.embed(reportContainer, config);

                  report.off("loaded");

                });

              });

        //});

  }
}