
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { CyclesTimesGoalsService } from './cycletimes-goals.service';

@Component({
  selector: 'app-cycletimes-goals',
  templateUrl: './cycletimes-goals.component.html',
  styleUrls: ['./cycletimes-goals.component.scss']
})
export class CycletimesGoalsComponent implements OnInit {
  columnGrids: any;
  rowData: any;

  dataSettings= new Array();
  allField= new Array();
  idField= new Array();

  dataActive:any;
  dataActiveDescription:any;

  Action:any;
  ID:any;
  Goal:any;
  Active:any;
  Tolerance:any;

  result:any;
  
  constructor(private cyclesTimesGoalsService : CyclesTimesGoalsService) {
    this.columnGrid();
    this.settings();
    this.loadData();

  }

  ngOnInit() {
  }

  settings(){

    /*ALL Fiel*/
    this.allField.push();
    this.dataSettings.push(this.allField);
    
    /*Fiel editing */
    this.idField.push();
    this.dataSettings.push(this.idField);

    /*Setting Button */
    var displayBtnNew = "none"
    this.dataSettings.push(displayBtnNew);
    
}


  columnGrid(){
    this.columnGrids = [
      {headerName: 'Line', field: 'Line',filter: "agTextColumnFilter", editable: true},
      {headerName: 'ENN', field: 'ENN',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Station', field: 'Station',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Model', field: 'Model',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Goal', field: 'Goal',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Tolerance', field: 'Tolerance',filter: "agTextColumnFilter", editable: true,cellClassRules: {'rag-red': this.isFloat }},
      {headerName: 'Active',colId:"idActive", field: 'ActiveDescription',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: true,  cellEditorParams: { values:  this.dataActiveDescription }  },
      {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019' } }
    ];
  }

  loadData() {
    this.cyclesTimesGoalsService.getCycleTimeGoals() 
    .subscribe(res => {
      console.log("***** load data *****");
      console.log(res);
      this.rowData =res.CycleTimeGoals;
      this.dataActive =res.Active;
      this.loadDescription();
    });
  }

  loadDescription(){
    this.dataActiveDescription = new Array();
    this.dataActive.forEach((element: any) => {
      this.dataActiveDescription.push(element.Description);
    });
    console.log("**************************************");
    console.log(this.dataActiveDescription);
  }

  findDescriptionIdByDesc(params:any, desc:any){
    return params.find((x:any) => x.Description === desc);
  }

  eventapp(params:any){
  
    let objDataActive = this.findDescriptionIdByDesc(this.dataActive,params.data.Active);

    this.Action = params.Action
    this.ID=params.data.ID;
    this.Goal=params.data.Goal;
    this.Active=params.data.Active;
    this.Tolerance=params.data.Tolerance;

    console.log("     /*Execute "+this.Action+"*/       ");
    console.log(params.data);
    
    if(this.isNum(this.Tolerance) ){
      this.postData();
    }else{
      console.log("Datos inalidos ");
    }

  
  }


  postData(){

    this.result= new Array();
    this.cyclesTimesGoalsService.editData(this.Action,this.ID,this.Goal,this.Active,this.Tolerance) 
    .subscribe(res => {
      var object = new Object();
      object['error'] = res.error;
      object['id'] = res.id;
      object['last_update'] = res.last_update;
      object['msj'] = res.msj;
      object['type'] = res.type;
      object['email'] = "";
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
