import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@app/reports/reports.service';
import { Helper } from '@app/shared/helper';

@Component({
  selector: 'app-prodaveragejph',
  templateUrl: './prodaveragejph.component.html',
  styleUrls: ['./prodaveragejph.component.scss']
})
export class ProdaveragejphComponent implements OnInit {
  helper: Helper;
  values: any;
  code: string;
  date: string;
  areaName: string;
  LineName: string;
  display:string = "none";

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
  }

  getData(data: any): void {
    this.display = "block";
    this.reportsService.getProductionAverageJPH(data.code, data.startDate, data.endDate)
      .subscribe(res => {
        this.display = "none";
        this.values = res;
      });
  }

}
