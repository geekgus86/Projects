import { Component, OnInit } from '@angular/core';
import { Helper } from '@app/shared/helper';
import { ReportsService } from '@app/reports/reports.service';

@Component({
  selector: 'app-overcycletimes',
  templateUrl: './overcycletimes.component.html',
  styleUrls: ['./overcycletimes.component.scss']
})
export class OvercycletimesComponent implements OnInit {
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
    this.helper = new Helper();
    const now = new Date();
    // this.date = '2018-08-20';

  }

  getData(data: any): void {
    this.display = "block";
    this.reportsService.getOverCycleTimeDataTypes(data.code, 1)
      .subscribe(res => {
        this.display = "none";
        this.values = res;
      });
  }

}
