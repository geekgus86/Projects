import { Component, OnInit } from '@angular/core';
import { Helper } from '@app/shared/helper';
import { ReportsService } from '@app/reports/reports.service';

@Component({
  selector: 'app-prodduplicates',
  templateUrl: './prodduplicates.component.html',
  styleUrls: ['./prodduplicates.component.scss']
})
export class ProdDuplicatesComponent implements OnInit {

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
    /*this.reportsService.getProductionDuplicates(this.code, this.date, this.date)
    .subscribe(res => {
      this.values = res;
    });*/
  }

  getData(data: any): void {
    this.display = "block";
    this.reportsService.getProductionDuplicates(data.code, data.startDate, data.endDate)
      .subscribe(res => {
        this.display = "none";
        this.values = res;
      });
  }

}
