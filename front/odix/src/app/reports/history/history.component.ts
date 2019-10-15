import { Component, OnInit } from '@angular/core';
import { Helper } from '@app/shared/helper';
import { ReportsService } from '@app/reports/reports.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  helper: Helper;
  values: any;
  result: any;
  areaName: string;
  LineName: string;
  display:string = "none";
  isData:boolean= true;


  constructor(private reportsService: ReportsService) { }

  ngOnInit() {

  }

  getData(data: any): void {
    this.display = "block";
     this.result = new Array<CycleTimeByDate>();

    this.reportsService.getCycleTimeByDate(data.code, data.startDate, data.endDate)
      .subscribe(res => {
        this.values = res;
        this.display = "none";

      this.isData =true;
      if (this.values.ENNs[0].model == "No Model" ){
         this.isData =false;
      }

        res.ENNs.forEach((element: any) => {

          let CycleTimeByDt = new CycleTimeByDate();
          CycleTimeByDt.blockedtime      = element.blockedtime;     
          CycleTimeByDt.clamptime        = element.clamptime;    
          CycleTimeByDt.cycletime        = element.cycletime;    
          CycleTimeByDt.datetime         = element.datetime;   
          CycleTimeByDt.enn              = element.enn             ;
          CycleTimeByDt.errorincounttime = element.errorincounttime;
          CycleTimeByDt.faulttime        = element.faulttime       ;
          CycleTimeByDt.hour             = element.hour            ;
          CycleTimeByDt.loadtime         = element.loadtime        ;
          CycleTimeByDt.minute           = element.minute          ;
          CycleTimeByDt.model            = element.model           ;
          CycleTimeByDt.nocounttime      = element.nocounttime     ;
          CycleTimeByDt.processtime      = element.processtime     ;
          CycleTimeByDt.proddate         = element.proddate        ;
          CycleTimeByDt.shift            = element.shift           ;
          CycleTimeByDt.starvedtime      = element.starvedtime     ;
          CycleTimeByDt.station          = element.station         ;
          CycleTimeByDt.unclamptime      = element.unclamptime     ;
          CycleTimeByDt.unloadtime       = element.unloadtime      ;
          CycleTimeByDt.week             = element.week            ;
          this.result.push(CycleTimeByDt);
          });

        // console.log("this.values");
        // console.log(this.result);
        // console.log("this.values");
        
      });
      
  }

}


class CycleTimeByDate{
  blockedtime: number;
  clamptime:  number;
  cycletime:  number;
  datetime: Date; 
  enn:  number;
  errorincounttime:  number;
  faulttime:  number;
  hour:  number;
  loadtime:  number;
  minute:  number;
  model: string;
  nocounttime:  number;
  processtime:  number;
  proddate: Date;
  shift:  number;
  starvedtime:  number;
  station: string
  unclamptime:  number;
  unloadtime:  number;
  week:  number;
}
