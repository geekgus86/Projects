import { Component, OnInit } from '@angular/core';
import { qualityService } from './quality-report.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quality-report',
  templateUrl: './quality-report.component.html',
  styleUrls: ['./quality-report.component.scss']
})
export class QualityReportComponent implements OnInit {

  qualityWelding: any;
  timeRepaired: any;
  objData: any;
  
  Title: string;
  nameColumnChart:string = null;
  typeReport:string;
  code:string;
  // titlegraphs:string;
  
  stggraphs: any;

  ope : string;
  ope1 : string;

  constructor(private route: ActivatedRoute,private QS: qualityService) { 
    this.typeReport = this.route.snapshot.paramMap.get('typeReport');  
    this.code = this.route.snapshot.paramMap.get('code');  
    if(this.typeReport == "qualityWelding"){
      this.GetQualityWelding(this.code);
      // code = SLP_BMW_RAC_M035
      // code = SLP_BMW_RAC_M110
    }else if(this.typeReport == "timeRepaired"){
      this.GetTimeRepaired(this.code);
    // code = SLP_BMW_RAC_M035
    // code =SLP_BMW_RAC_M110
    }

  }

  ngOnInit() {
  }

  GetQualityWelding(code:string){
    this.qualityWelding = new Array();
    this.stggraphs = new Array();
    this.QS.GetQualityWelding(code) 
    .subscribe(res => {
      if(code.split("M110").length > 1)
      {
        this.ope1 = "110";
      }else
      {
        this.ope1 = "35";
      }
      this.qualityWelding = res;
      this.nameColumnChart = "QualityWelding"
      this.stggraphs.push("Total cordones OP." +this.ope1)
      this.stggraphs.push("%OK")
      this.loadData(res);
    });
  }

  
  GetTimeRepaired(code:string){
    this.timeRepaired = new Array();
    this.stggraphs = new Array();
    this.QS.GetTimeRepaired(code) 
    .subscribe(res => {
      if(code.split("M110").length > 1)
      {
        this.ope = "110";
      }else
      {
        this.ope = "35";
      }
      this.timeRepaired=res;
      this.nameColumnChart = "TimeRepaired"
      this.stggraphs.push("TIEMPO DE REPARACION OP."+this.ope)
      this.stggraphs.push("Objetivo(SEG)")
      this.loadData(res);
    });
  }




  loadData(res:any  ){
    this.objData= new Array();
    this.objData =res;

    console.log(" **********************  DATA  **********************");
    console.log("typeReport = " + this.typeReport);
    console.log("code = " + this.code);
    console.log(this.objData);

    if(this.typeReport == "timeRepaired"){
      this.Title = "Tiempo de reparación - " +this.objData.Name 
    }else
    {
      this.Title = "% Soldadura OK - " +this.objData.Name 
    }
    
    console.log(" **********************  DATA   **********************");

  }


}
