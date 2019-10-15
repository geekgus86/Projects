import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@app/reports/reports.service';
import { Helper } from '@app/shared/helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobsbyhour',
  templateUrl: './jobsbyhour.component.html',
  styleUrls: ['./jobsbyhour.component.scss']
})
export class JobsbyhourComponent implements OnInit {
  helper: Helper;
  values: any;
  code: string;
  date: string;
  AreaName: string;
  Code: string;
  display:string = "none";

  constructor(private reportsService: ReportsService, private route: ActivatedRoute) {

    this.AreaName = this.route.snapshot.paramMap.get('NameArea');
    this.Code = this.route.snapshot.paramMap.get('Code');

   }

  ngOnInit() {

  }



  getData(data: any): void {
    this.display = "block";
    this.reportsService.getProductionJobsPerHour(data.code, data.startDate, data.endDate)
      .subscribe(res => {
        this.display = "none";
        this.values = res;
        console.log("valores ad");
        console.log(this.values);
      });
  }

}
