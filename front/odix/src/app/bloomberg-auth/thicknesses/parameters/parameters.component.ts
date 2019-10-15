import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { parameters } from './parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
  columnGrids: any;
  rowData: any;

  dataAsset: any;
  dataAssetDescription= new Array();
  dataCriticity:any;
  dataCriticityDescription= new Array();
  dataOperation:any;
  dataOperationDescription= new Array();

  dataSettings= new Array();
  allField= new Array();
  idField= new Array();
  

  modalReference: any;
  closeResult: string;


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
  
  result:any;

  constructor(private modalService: NgbModal,private parameters: parameters) { 
    this.columnGrid();
    this.loadData();
    this.settings();
  }

  ngOnInit() {}
  
  settings(){

      /*ALL Fiel*/
      // this.allField.push("Asset");
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
      {headerName: 'Name',colId:"idAsset", field: 'Asset',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: false,  cellEditorParams: { values:  this.dataAssetDescription }  },
      {headerName: 'Parameters', field: 'Parameter',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Green Min Value', field: 'GreenMinValue',filter: "agTextColumnFilter", editable: true,valueSetter: this.value1Setter  },
      {headerName: 'Green Max Value', field: 'GreenMaxValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Green Comparison Type',colId:"idGreenComparisonType", field: 'GreenComparisonType',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: false,cellEditorParams: { values:  this.dataOperationDescription }},
      {headerName: 'Yellow Min Value', field: 'YellowMinValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Yellow Max Value', field: 'YellowMaxValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Yellow Comparison Type',colId:"idYellowComparisonType", field: 'YellowComparisonType',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: false,cellEditorParams: { values:  this.dataOperationDescription }},
      {headerName: 'Red Min Value', field: 'RedMinValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Red Max Value', field: 'RedMaxValue',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Red Comparison Type',colId:"idRedComparisonType", field: 'RedComparisonType',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: false,cellEditorParams: { values:  this.dataOperationDescription } },
      {headerName: 'Criticity', field: 'Criticity',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: true,width:160,cellEditorParams: { values:  this.dataCriticityDescription } },
      {headerName: 'Email', field: 'Email',filter: "agTextColumnFilter", editable: false},
      {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019' },cellClassRules: {'rag-red': this.isFloat } }
    ];
  }



  

value1Setter(params: any) {
  console.log("valores");
  console.log(params.newValue);
  console.log(params);

  // if($.isNumeric(params.newValue) || params.newValue ==null){
  //   console.log("valores");
  //   console.log(params.newValue);
  //   console.log(params);


  //   if(params.colDef.field == "GreenMinValue")
  //     params.data.GreenMinValue = params.newValue;
  //   if(params.colDef.field == "GreenMaxValue")
  //     params.data.GreenMaxValue = params.newValue;
  //     return true;
  // }else{
  //   return false;
  // }

  // console.log("params")
  // console.log(params)


  //  console.log(params.colDef.field)
  //  var field = params.colDef.field;

  //  if(field == "GreenMinValue")
  //   params.data.GreenMinValue = params.newValue;

  //  return true
 

 // Illegal value - signal no change
//  return false;
}

  loadData() {
    this.parameters.getparameter() 
    .subscribe(res => {
      console.log("***** load data *****");
      console.log(res);
      this.rowData =res.Parameters;
      this.dataAsset =res.Tanks;
      this.dataCriticity = res.Criticity;
      this.dataOperation = res.Operators;
      this.loadDescription();
    });
  }


  loadDescription(){
      this.dataAsset.forEach((element: any) => {
        this.dataAssetDescription.push(element.Description);
      });
      this.dataCriticity.forEach((element: any) => {
        this.dataCriticityDescription.push(element.Description);
      });
      this.dataOperation.forEach((element: any) => {
        this.dataOperationDescription.push(element.Description);
      });

      console.log("valores ");
      console.log(this.dataAssetDescription);
  }


  findDescriptionIdByDesc(params:any, desc:any){
      return params.find((x:any) => x.Description === desc);
  }

 eventapp(params:any){
  
    let objDataAsset = this.findDescriptionIdByDesc(this.dataAsset,params.data.Asset);
    let ObjCriticity = this.findDescriptionIdByDesc(this.dataCriticity,params.data.Criticity);
    let objDataOperation1 = this.findDescriptionIdByDesc(this.dataOperation,params.data.GreenComparisonType);
    let objDataOperation2 = this.findDescriptionIdByDesc(this.dataOperation,params.data.YellowComparisonType);

    this.Action = params.Action
    this.ID=params.data.ID;
    this.Asset_ID=objDataAsset.ID;
    this.Parameter=params.data.Parameter;
    this.GreenMinValue=params.data.GreenMinValue;
    this.GreenMaxValue=params.data.GreenMaxValue;
    this.GreenComparisonType=objDataOperation1.ID;
    this.YellowMinValue=params.data.YellowMinValue;
    this.YellowMaxValue=params.data.YellowMaxValue;
    this.YellowComparisonType=objDataOperation2.ID;
    this.RedMinValue=params.data.RedMinValue;
    this.RedMaxValue=params.data.RedMaxValue;
    this.RedComparisonType=params.data.RedComparisonType;
    this.Criticity=ObjCriticity.ID;
    this.Email=""; //add 

    console.log("     /*Execute "+this.Action+"*/       ");
    console.log(params.data);
    
    if(this.isNum(this.GreenMinValue) && this.isNum(this.GreenMaxValue) && this.isNum(this.YellowMinValue) && this.isNum(this.YellowMaxValue) && this.isNum(this.RedMinValue) && this.isNum(this.RedMaxValue)){
      // this.postData();
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

