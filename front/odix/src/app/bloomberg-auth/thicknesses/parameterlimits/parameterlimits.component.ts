import { Component, OnInit,ViewChild } from '@angular/core'; //test ViewChild 
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { parameterlimits } from './parameterlimits.service';
// import "ag-grid-enterprise";

@Component({
  selector: 'app-parameterlimits',
  templateUrl: './parameterlimits.component.html',
  styleUrls: ['./parameterlimits.component.scss']
})
export class ParameterlimitsComponent implements OnInit {


  /*data */
  columnGrids: any;
  rowData: any;
 
 /*parameter UPDATE DELETE */
  Action:string
  ID:number
  Parameters_ID:number;
  MinValue:number
  MaxValue:number
  Email:string
  ModifiedBy:string

  result:any;
  dataSettings= new Array();
  allField= new Array();
  idField= new Array();
  constructor(private modalService: NgbModal,private parameterlimits: parameterlimits) { 
    this.columnGrid();
    this.loadData();
    this.settings()
  }

  ngOnInit() {}

  settings(){

    /*ALL Fiel*/
    this.allField.push("Parameter");
    this.allField.push("MinValue");
    this.allField.push("MaxValue");
    this.allField.push("Email");
    this.dataSettings.push(this.allField);
    
    /*Fiel editing */
    this.idField.push("idAsset");
    this.idField.push("idGreenComparisonType");
    this.idField.push("idYellowComparisonType");
    this.idField.push("idRedComparisonType");
    this.dataSettings.push(this.idField);

    /*Setting Button */
    var displayBtnNew = "none"
    this.dataSettings.push(displayBtnNew);

  }


  columnGrid(){
    this.columnGrids = [
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
    console.log("***** load data *****");
    this.parameterlimits.getparameterlimits() 
    .subscribe(res => {
      this.rowData =res.ParameterLimit;
    });

  }

  eventapp(params:any){
  
    this.Action = params.Action
    this.ID=params.data.ID;
    this.Parameters_ID=params.data.Parameters_ID;
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
  this.parameterlimits.editData(this.Action,this.ID,this.Parameters_ID,this.MinValue,this.MaxValue,this.Email,this.ModifiedBy) 
  .subscribe(res => {
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

 isNum(params:any) {
  if($.isNumeric(params) || params ==null){
    return true;
  }else{
    return false;
  }
}

isFloat(params:any) {
  if($.isNumeric(params.value) || params.value ==null){
    return false;
  }else{
    return true;
  }
}



} 

