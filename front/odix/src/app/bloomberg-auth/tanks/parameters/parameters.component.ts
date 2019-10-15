import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { parameters } from './parameters.service';


@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})


export class TanksParametersComponent implements OnInit {


  dataSettings= new Array();
  allField= new Array();
  idField= new Array();
  

  columnGrids:any;
  rowData:any;

  /*Parameter service post */
  Action:string;
  ID:number;
  Asset_ID:number;
  Parameter:string;
  GreenMinValue:number;
  GreenMaxValue:number;
  GreenComparisonType:string;
  YellowMinValue:number;
  YellowMaxValue:number;
  YellowComparisonType:string;
  RedMinValue:number;
  RedMaxValue:number;
  RedComparisonType:string;
  Criticity:string;
  Email:string;
  assetObj:any;
  criticityObj:any;
  idReturn:any;
  lastUpdateReturn:any;

  dataAsset:any;
  dataCriticity:any;
  dataOperation:any;

  TanksDataDescription= new Array();
  CriticityDataDescription= new Array();
  OperatorsDataDescription= new Array();

  result:any;


constructor(private parameters: parameters) { 
  this.columnGrid();
  this.loadData();
  this.settings();
}

ngOnInit() {}

settings(){


    /*ALL Fiel*/
    this.allField.push("idAsset");
    this.allField.push("Parameter");
    this.allField.push("GreenMinValue");
    this.allField.push("GreenMaxValue");
    this.dataSettings.push(this.allField);
    
    /*Fiel editing */
    this.idField.push("idAsset");
    this.idField.push("idGreenComparisonType");
    this.idField.push("idYellowComparisonType");
    this.idField.push("idRedComparisonType");
    this.dataSettings.push(this.idField);

    /*Setting Button */
    var displayBtnNew = "block"
    this.dataSettings.push(displayBtnNew);

}

columnGrid(){

  this.columnGrids = [
    {headerName: 'Name',colId:"idAsset", field: 'Asset',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: false,  cellEditorParams: { values: this.TanksDataDescription }  },
    {headerName: 'Parameters', field: 'Parameter',filter: "agTextColumnFilter", editable: true},
    {headerName: 'Green Min Value', field: 'GreenMinValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
    {headerName: 'Green Max Value', field: 'GreenMaxValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
    {headerName: 'Green Comparison Type',colId:"idGreenComparisonType", field: 'GreenComparisonType',filter: "agTextColumnFilter", editable: true,cellEditor: "agSelectCellEditor",cellEditorParams: { values: this.OperatorsDataDescription } },
    {headerName: 'Yellow Min Value', field: 'YellowMinValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
    {headerName: 'Yellow Max Value', field: 'YellowMaxValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
    {headerName: 'Yellow Comparison Type',colId:"idYellowComparisonType", field: 'YellowComparisonType',filter: "agTextColumnFilter", editable: true,cellEditor: "agSelectCellEditor",cellEditorParams: { values: this.OperatorsDataDescription } },
    {headerName: 'Red Min Value', field: 'RedMinValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
    {headerName: 'Red Max Value', field: 'RedMaxValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
    {headerName: 'Red Comparison Type',colId:"idRedComparisonType", field: 'RedComparisonType',filter: "agTextColumnFilter", editable: true,cellEditor: "agSelectCellEditor",cellEditorParams: { values: this.OperatorsDataDescription } },
    {headerName: 'Criticity', field: 'Criticity',filter: "agTextColumnFilter", editable: true,cellEditor: "agSelectCellEditor",cellEditorParams: { values: this.CriticityDataDescription } },
    {headerName: 'Email', field: 'Email',filter: "agTextColumnFilter", editable: false},
    {headerName: 'a_LastUpdated', field: 'a_LastUpdated',filter: "agTextColumnFilter", editable: false},
    {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019',paddingleft: 25 } }
  ];

}

loadData() {

  this.parameters.getparameter() 
  .subscribe(res => {
      this.rowData =res.Parameters;
      this.dataAsset =res.Tanks;
      this.dataCriticity =res.Criticity;
      this.dataOperation =res.Operators;
      this.loadDescription();
  });

}


loadDescription(){

  this.dataAsset.forEach((element: any) => {
    this.TanksDataDescription.push(element.Description);
  });

  this.dataCriticity.forEach((element: any) => {
    this.CriticityDataDescription.push(element.Description);
  });

  this.dataOperation.forEach((element: any) => {
    this.OperatorsDataDescription.push(element.Description);
  });

}



  eventapp(params:any){
    let objDataAsset = this.findDescriptionIdByDesc(this.dataAsset,params.data.Asset);
    let ObjCriticity = this.findDescriptionIdByDesc(this.dataCriticity,params.data.Criticity);
    let objDataOperation1 = this.findDescriptionIdByDesc(this.dataOperation,params.data.GreenComparisonType);

    this.ID=params.data.ID;
    this.Asset_ID=objDataAsset.ID;
    this.Parameter=params.data.Parameter;
    this.GreenMinValue=params.data.GreenMinValue;
    this.GreenMaxValue=params.data.GreenMaxValue;
    this.GreenComparisonType=params.data.GreenComparisonType;
    this.YellowMinValue=params.data.YellowMinValue;
    this.YellowMaxValue=params.data.YellowMaxValue;
    this.YellowComparisonType=params.data.YellowComparisonType;
    this.RedMinValue=params.data.RedMinValue;
    this.RedMaxValue=params.data.RedMaxValue;
    this.RedComparisonType=params.data.RedComparisonType;
    this.Criticity=ObjCriticity.ID;
    this.Email=""; //add email


    console.log("     /*Execute "+this.Action+"*/       ");
    console.log(params.data);
    
    if(this.isNum(this.GreenMinValue) && this.isNum(this.GreenMaxValue) && this.isNum(this.YellowMinValue) && this.isNum(this.YellowMaxValue) && this.isNum(this.RedMinValue) && this.isNum(this.RedMaxValue)){
      this.postData();
    }else{
      console.log("Datos inalidos ");
    }

  }



  postData(){
    this.result= new Array();
    this.parameters.editData(this.Action,this.ID,this.Asset_ID,this.Parameter,this.GreenMinValue,this.GreenMaxValue,this.GreenComparisonType,this.YellowMinValue,this.YellowMaxValue,this.YellowComparisonType,this.RedMinValue,this.RedMaxValue,this.RedComparisonType,this.Criticity,this.Email) 
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


  findDescriptionIdByDesc(params:any, desc:any){
    return params.find((x:any) => x.Description === desc);
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


