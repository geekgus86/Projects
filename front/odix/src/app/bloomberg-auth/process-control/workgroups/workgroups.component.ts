
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { WorkgroupsService } from './workgroups.service';


@Component({
  selector: 'app-workgroups',
  templateUrl: './workgroups.component.html',
  styleUrls: ['./workgroups.component.scss']
})
export class WorkgroupsComponent implements OnInit {

  columnGrids: any;
  rowData:any;


  Action:string;
  ID:number;
  Line_ID:number;
  WorkGroup:string;


  dataLine:any
  dataLineDescription= new Array();
  // dataWorkGroupDescription= new Array();
  
  dataSettings= new Array();
  allField= new Array();
  idField= new Array();

  result:any;
  

  constructor(private modalService: NgbModal,private workgroupsService: WorkgroupsService) { 
    this.columnGrid();
    this.loadData();
    this.settings();
  }

  ngOnInit() {}


  settings(){

    /*ALL Fiel*/
    this.allField.push("Line");
    this.allField.push("workgroup");
    this.dataSettings.push(this.allField);
    
    /*Fiel editing */
    this.idField.push();
    this.dataSettings.push(this.idField);

    /*Setting Button */
    var displayBtnNew = "block"
    this.dataSettings.push(displayBtnNew);
    
}


columnGrid(){

  this.columnGrids = [
    {headerName: 'Line', field: 'Line', filter: "agTextColumnFilter", editable: true, cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.dataLineDescription }},
    {headerName: 'Workgroup', field: 'WorkGroup',filter: "agTextColumnFilter", editable: true },
    {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019' } }
  ];

}


  loadData() {
    this.workgroupsService.getWorkgroups() 
    .subscribe(res => {    
      this.rowData =res.WorkGroup;
      this.dataLine =res.Line;
      this.loadDescription();
    });
  }


  loadDescription(){
    this.dataLine.forEach((element: any) => {
      this.dataLineDescription.push(element.Description);
    });
      
    // this.rowData.forEach((element: any) => {
    //   this.dataWorkGroupDescription.push(element.WorkGroup);
    // });

  }

  findDescriptionIdByDesc(params:any, desc:any){
    return params.find((x:any) => x.Description === desc);
  }

  eventapp(params:any){
  
    let objDataLine = this.findDescriptionIdByDesc(this.dataLine,params.data.Line);

    this.Action = params.Action
    this.ID=params.data.ID;
    this.Line_ID=objDataLine.ID;
    this.WorkGroup=params.data.WorkGroup;


    console.log("     /*Execute "+this.Action+"*/       ");
    console.log(params.data);
      
    if(  params.data.Line !==undefined && params.data.WorkGroup !==undefined ){
      this.postData();
    }else{
      console.log("Datos inalidos ");
    }

  
  }


  postData(){
    this.result= new Array();
    
    this.workgroupsService.editData(this.Action,this.ID,this.Line_ID,this.WorkGroup) 
    .subscribe(res => {
      var object = new Object();
      object['error'] = res.error;
      object['id'] = res.id;
      object['last_update'] = res.last_update;
      object['msj'] = res.msj;
      object['type'] = res.type;
      object['email'] = "";
      this.result = object;
      
    });

  }

  
}

