import { Component, OnInit } from '@angular/core';
import { DefectsService } from './defects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.scss']
})
export class DefectsComponent implements OnInit {
  objData:any;
  Name_code:string
  ope : string;
  //str.split(" ");

  typeReport:string;
  code:string;

  constructor(private route: ActivatedRoute,private DS: DefectsService) { 
  

    this.typeReport = this.route.snapshot.paramMap.get('typeReport');  
    this.code = this.route.snapshot.paramMap.get('code');  
    console.log("Code" + this.code);
    if(this.code.split("M110").length > 1)
    {
      this.ope = "110";
    }else
    {
      this.ope = "35";
    }
    
    if(this.typeReport == "defects"){
      this.GetTop5Defects(this.code);
      // SLP_BMW_RAC_M035
      // SLP_BMW_RAC_M110
    }else if(this.typeReport == "defectsline"){
      this.GetTop5DefectsLine(this.code);
      // SLP_BMW_RAC
    }

  }

  ngOnInit() {
  }


  GetTop5Defects(code:string){
    this.DS.GetTop5Defects(code) 
    .subscribe(res => {
      this.loadData(res);
    });
  }

  GetTop5DefectsLine(code:string){
    this.DS.GetTop5DefectsLine(code) 
    .subscribe(res => {
      this.loadData(res);
    });
  }
  

  loadData(res:any  ){
    this.objData= new Array();
    this.objData =res;
    this.Name_code = "Top 5 Defectos - "+ res.Name

    console.log(" ********************** DATA **********************");
    console.log("typeReport = " + this.typeReport);
    console.log("code = " + this.code);
    console.log(this.objData);
    console.log(" ********************** DATA **********************");

  }


}
