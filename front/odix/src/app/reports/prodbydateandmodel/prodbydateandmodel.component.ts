import { Component, OnInit } from '@angular/core';
import { Helper } from '@app/shared/helper';
import { ReportsService } from '@app/reports/reports.service';

@Component({
  selector: 'app-prodbydateandmodel',
  templateUrl: './prodbydateandmodel.component.html',
  styleUrls: ['./prodbydateandmodel.component.scss']
})
export class ProdbydateandmodelComponent implements OnInit {
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
    this.reportsService.getProductionByDateAndModel(data.code, data.startDate, data.endDate)
      .subscribe(res => {
        this.display = "none";
        this.values = res;
      });
  }

}
