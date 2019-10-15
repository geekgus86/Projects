import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@app/reports/reports.service';
import { Helper } from '@app/shared/helper';

@Component({
  selector: 'app-prodlist',
  templateUrl: './prodlist.component.html',
  styleUrls: ['./prodlist.component.scss']
})
export class ProdlistComponent implements OnInit {
  helper: Helper;
  values: any;
  code: string;
  date: string;
  areaName: string;
  LineName: string;
  display:string = "none";

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.helper = new Helper();
  }

  getData(data: any): void {
    this.display = "block";
    this.reportsService.getProductionList(data.code, data.startDate, data.endDate)
      .subscribe(res => {
        this.display = "none";
        this.values = res;

        console.log("duplicates ");
        console.log(this.values);
        
      });
  }

}
