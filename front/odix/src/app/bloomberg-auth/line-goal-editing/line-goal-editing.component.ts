import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { LineGoalsEditingService } from './line-goal-editing.service';


@Component({
  selector: 'app-line-goal-editing',
  templateUrl: './line-goal-editing.component.html',
  styleUrls: ['./line-goal-editing.component.scss']
})
export class LineGoalEditingComponent implements OnInit {
  columnGrids: any;
  rowData: any;

  dataSettings= new Array();
  allField= new Array();
  idField= new Array();
  
  Action:any;
  ID:any;
  Value:any;

  result:any;
  

  constructor(private lineGoalsEditingService:LineGoalsEditingService) { 
    this.columnGrid();
    this.loadData();
    this.settings();
  }

  ngOnInit() {
  }

    
  settings(){

    /*ALL Fiel*/
    this.allField.push("Line");
    this.allField.push("Value");
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
      {headerName: 'Line', field: 'Line',filter: "agTextColumnFilter", editable: false},
      {headerName: 'Line Goal', field: 'Value',filter: "agTextColumnFilter", editable: true},
      {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019' } }
    ];
  }

  loadData() {
    this.lineGoalsEditingService.getLineGoalEditing() 
    .subscribe(res => {
      console.log("***** load data *****");
      console.log(res);
      this.rowData =res.ProductionGoal;
    });
  }


  eventapp(params:any){
  
    this.Action = params.Action
    this.ID=params.data.ID;
    this.Value=params.data.Value;
    console.log("     /*Execute "+this.Action+"*/       ");
    console.log(params.data);
    this.postData();
  
  }

  
  postData(){
    this.result= new Array();
    
    this.lineGoalsEditingService.editData(this.Action,this.ID,this.Value) 
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





}
