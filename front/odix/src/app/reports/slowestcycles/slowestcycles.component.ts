import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@app/reports/reports.service';
import { Helper } from '@app/shared/helper';

@Component({
  selector: 'app-slowestcycles',
  templateUrl: './slowestcycles.component.html',
  styleUrls: ['./slowestcycles.component.scss']
})
export class SlowestcyclesComponent implements OnInit {
  helper: Helper;
  values: any;
  code: string;
  date: string;
  areaName: string;
  LineName: string;
  display:string = "none";
  
  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.initialProcessing();
  }

  initialProcessing(): void {
    this.code = 'APO_EnsambleDTL1-DTL1';
    this.helper = new Helper();
    const now = new Date();
    this.date = '2018-08-20';
    /*this.reportsService.getOverCycleTimeDataTypes(this.code, 2)
    .subscribe(res => {
      this.values = res;
    });*/
  }

  getData(data: any): void {
    this.display = "block";
    this.reportsService.getOverCycleTimeDataTypes(data.code, 2)
      .subscribe(res => {
        this.display = "none";
        this.values = res;
      });
  }

}
