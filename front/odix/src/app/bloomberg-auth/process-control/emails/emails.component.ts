import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { EmailsService } from './emails.service';


@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {

  columnGrids: any;
  rowData: any;

  Action:string;
  ID:number;
  EmailGroup_ID:number;
  Email:string;
  Status:number;

  dataDescription = new Array();
  description = new Array();
  dataStatus = new Array();
  statusDescription = new Array();

  
  dataSettings= new Array();
  idField= new Array();
  allField= new Array();
  result:any;
  
  constructor(private modalService: NgbModal, private emailsService: EmailsService) { 
    this.columnGrid();
    this.loadData();
    this.settings();
    
  }


  settings(){
    /*ALL Fiel*/
    this.allField.push("Description");
    this.allField.push("Email");
    this.allField.push("ActiveStatus");
    this.dataSettings.push(this.allField);
    
    /*Fiel editing */
    this.idField.push();
    this.dataSettings.push(this.idField);

    /*Setting Button */
    var displayBtnNew = "block"
    this.dataSettings.push(displayBtnNew);

  }

  ngOnInit() { }

  columnGrid(){
    this.columnGrids = [
      {headerName: 'Description', field: 'Description', filter: "agTextColumnFilter", editable: true, cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.description }},
      {headerName: 'Email', field: 'Email',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Active Status', field: 'ActiveStatus', filter: "agTextColumnFilter", editable: true, cellEditor: "agSelectCellEditor", cellEditorParams: { values: ["Yes", "No"] }},
      {headerName: "Action",field: "value",cellRenderer: "cellButton", colId: "params",suppressFilter: true,suppressSorting:true,width: 200,cellStyle: { backgroundColor: '#0f1019' } }
    ];
  }

  loadData() {
    this.emailsService.getEmails() 
    .subscribe(res => {
      this.rowData =res.Emails;
      this.dataDescription =res.Descriptions;
      this.dataStatus =res.Status;
      this.loadDescription();
    });
  }

  
  loadDescription(){
    this.dataDescription.forEach((element: any) => {
      this.description.push(element.Description);
    });
    this.dataStatus.forEach((element: any) => {
      this.statusDescription.push(element.Description);
    });
  }


  findDescriptionIdByDesc(params:any, desc:any){
    return params.find((x:any) => x.Description === desc);
  }


  eventapp(params:any){
    
    let objDescription = this.findDescriptionIdByDesc(this.dataDescription,params.data.Description);
    let ObjStatus = this.findDescriptionIdByDesc(this.dataStatus,params.data.ActiveStatus);


    this.Action = params.Action
    this.ID=params.data.ID;
    this.EmailGroup_ID=objDescription.ID;
    this.Email=params.data.Email;
    this.Status=ObjStatus.ID;

    if(this.isEmal(this.Email) && params.data.Description !==undefined && params.data.ActiveStatus !==undefined  ){
      this.postData();
    }else{
      console.log("Datos inalidos ");
    }
  }

  postData(){
    this.result= new Array();
    this.emailsService.insertEmail(this.Action,this.ID,this.EmailGroup_ID,this.Email,this.Status) 
    .subscribe(res => {
      console.log("res-----------");
      console.log(res);
      console.log("res-----------");

      var object = new Object();
      object['error'] = res.Error;
      object['id'] = res.Id;
      object['last_update'] = res.Last_update;
      object['msj'] = res.Msj;
      object['type'] = res.Type;
      object['email'] = this.Email;
      this.result.push(object);

      console.log("this.result------------");
      console.log(this.result);
    });
  }


  isEmal(email:string):boolean{
    return  true ;
  }

}
