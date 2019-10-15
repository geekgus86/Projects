import { Component, OnInit } from '@angular/core';
import { Helper } from '@app/shared/helper';
import { ReportsService } from '@app/reports/reports.service';

@Component({
  selector: 'app-prodaverage',
  templateUrl: './prodaverage.component.html',
  styleUrls: ['./prodaverage.component.scss']
})
export class ProdaverageComponent implements OnInit {

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
    this.reportsService.getProductionAverage(data.code, data.startDate, data.endDate)
      .subscribe(res => {
        this.display = "none";
        this.values = res;
      });
  }

}
