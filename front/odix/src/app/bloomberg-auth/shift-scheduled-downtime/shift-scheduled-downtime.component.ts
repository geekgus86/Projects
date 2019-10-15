
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { LineScheduleDowntimeService } from './shift-scheduled-downtime.service';


@Component({
  selector: 'app-shift-scheduled-downtime',
  templateUrl: './shift-scheduled-downtime.component.html',
  styleUrls: ['./shift-scheduled-downtime.component.scss']
})
export class ShiftScheduledDowntimeComponent implements OnInit {
  columnGrids: any;
  rowData: any;

  dataLine:any; 
  dataLineDescription= new Array();
  
  dataSettings= new Array();
  allField= new Array();
  idField= new Array();
  result:any;

  Action:string;
  ID:number;
  Shift_ID:number;
  Hour:number;
  Goal:number;

  constructor(private lDService:LineScheduleDowntimeService) {  
    this.columnGrid();
    this.loadData();
    this.settings();

    this.isHour("adap");
  }

  ngOnInit() {}

  settings(){

    /*ALL Fiel*/
    // this.allField.push("Line");
    this.allField.push("Shift");
    this.allField.push("Hour");
    this.allField.push("DownMinutes");
    this.allField.push("Goal");
    this.dataSettings.push(this.allField);
    
    /*Fiel editing */
    this.idField.push("idLine");
    this.dataSettings.push(this.idField);

    /*Setting Button */
    var displayBtnNew = "block"
    this.dataSettings.push(displayBtnNew);
    
}


  columnGrid(){
    this.columnGrids = [
      {headerName: 'Line',colId:"idLine", field: 'Line',filter: "agTextColumnFilter",cellEditor: "agSelectCellEditor", editable: false,  cellEditorParams: { values:  this.dataLineDescription } },
      {headerName: 'Shift', field: 'Shift',filter: "agTextColumnFilter", editable: false},
      {headerName: 'Hour', field: 'Hour',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Downtime Minutes', field: 'DownMinutes',filter: "agTextColumnFilter", editable: false},
      {headerName: 'Meta de Linea', field: 'Goal',filter: "agTextColumnFilter", editable: true},
      {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019' } }
    ];
  }


  loadData() {
    this.lDService.getShiftScheduleDowntime() 
    .subscribe(res => {
      console.log("***** load data *****");
      console.log(res);
      this.rowData =res.ScheduleDowntime;
      this.dataLine =res.Line;
      this.loadDescription();
    });
  }


  loadDescription(){
    this.dataLine.forEach((element: any) => {
      this.dataLineDescription.push(element.Name);
    });
}


findDescriptionIdByDesc(params:any, desc:any){
  return params.find((x:any) => x.Name === desc);
}

eventapp(params:any){

  let objdataLine = this.findDescriptionIdByDesc(this.dataLine,params.data.Line);

  if(objdataLine !==undefined )
    this.Shift_ID=objdataLine.ID;
    
  this.Action = params.Action
  this.ID=params.data.ID;               //param edit
  this.Hour=params.data.Hour;           //param edit
  this.Goal=params.data.Goal;           //param edit(Meta de Linea)

  console.log("     /*Execute "+this.Action+"*/       ");
  console.log(params.data);
  
  if(this.isNum(this.Hour) && this.isNum(this.Goal) ){
    this.postData();
  }else{
    console.log("Datos inalidos");
  }

}


postData(){
  this.result= new Array();
  this.lDService.editData(this.Action,this.ID,this.Shift_ID,this.Hour,this.Goal) 
  .subscribe(res => {
    if(res.error=="true")
      alert(res.msj);
    this.loadData();

  });

}


isNum(params:any) {
  if($.isNumeric(params) || params ==null){
    return true;
  }else{
    return false;
  }
}

isHour(params:any) {

  if( $.isNumeric(params) || params !==null  ){
    console.log(params );
    console.log($.isNumeric(params) );
    return true;
  }else{
    return false;
  }
}


}

