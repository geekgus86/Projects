
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ParameterlimitsService } from './parameterlimits.service';


@Component({
  selector: 'app-parameterlimits',
  templateUrl: './parameterlimits.component.html',
  styleUrls: ['./parameterlimits.component.scss']
})
export class ProcessParameterlimitsComponent implements OnInit {
  columnGrids: any;
  rowData: any;

  dataSettings= new Array();
  allField= new Array();
  idField= new Array();

  Action:string;
  ID:number;
  Paramter_ID:number;
  MinValue:number;
  MaxValue:number;
  Email:string;
  ModifiedBy:string;
  
  result:any;

  constructor(private modalService: NgbModal,private parameterlimitsService: ParameterlimitsService) { 
    this.columnGrid();
    this.loadData();
    this.settings();
  }

  ngOnInit() {}
  
  settings(){

      /*ALL Fiel*/
      this.allField.push("Parameters_ID");
      this.allField.push("Parameter");
      this.allField.push("MinValue");
      this.allField.push("MaxValue");
      this.dataSettings.push(this.allField);
      
      /*Fiel editing */
      this.idField.push("");
      this.dataSettings.push(this.idField);
  
      /*Setting Button */
      var displayBtnNew = "none"
      this.dataSettings.push(displayBtnNew);
      
  }


  columnGrid(){
    this.columnGrids = [
      {headerName: 'Parameters_ID', field: 'Parameters_ID',filter: "agTextColumnFilter", editable: false},
      {headerName: 'Parameter', field: 'Parameter',filter: "agTextColumnFilter", editable: false},
      {headerName: 'Min Value', field: 'MinValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Max Value', field: 'MaxValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Email', field: 'Email',filter: "agTextColumnFilter", editable: false},
      {headerName: 'Modified By', field: 'ModifiedBy',filter: "agTextColumnFilter", editable: false},
      {headerName: 'Last Update', field: 'a_LastUpdated',filter: "agTextColumnFilter", editable: false},
      {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019' } }
    ];

  }


  loadData() {
    this.parameterlimitsService.getparameter() 
    .subscribe(res => {
      console.log("***** load data *****");
      console.log(res);
      this.rowData =res.Parameters;
    });
  }


 eventapp(params:any){
    this.Action = params.Action
    this.ID=params.data.ID;
    this.MinValue=params.data.MinValue;
    this.MaxValue=params.data.MaxValue;
    this.Email=""; //add email
    this.ModifiedBy=""; //add email

    console.log("     /*Execute "+this.Action+"*/       ");
    console.log(params.data);
    
    if(this.isNum(this.MinValue) && this.isNum(this.MaxValue) ){
      this.postData();
    }else{
      console.log("Datos inalidos ");
    }

  
  }



  postData(){
    this.result= new Array();
    
    this.parameterlimitsService.editData(this.Action,this.ID,this.Paramter_ID,this.MinValue,this.MaxValue,this.Email,this.ModifiedBy) 
    .subscribe(res => {
      console.log("res");
      console.log(res);
      var object = new Object();
      object['error'] = res.error;
      object['id'] = res.id;
      object['last_update'] = res.last_update;
      object['msj'] = res.msj;
      object['type'] = res.type;
      object['email'] = this.Email;
      this.result.push(object);
    });

  }


  isFloat(params:any) {
    if($.isNumeric(params.value) || params.value ==null){
      return false;
    }else{
      return true;
    }
  }

  isNum(params:any) {
    if($.isNumeric(params) || params ==null){
      return true;
    }else{
      return false;
    }
  }


}


