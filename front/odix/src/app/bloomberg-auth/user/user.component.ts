import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  Action:string
  Id:number
  Email:string
  Name:string
  Rol:string

  result:any;
  dataRol:any;
  userRoles:any;

  gridApi: any;
  gridColumnApi:any;
  columnGrids: any;
  rowData:any;

  display:string= "list";
  textBtn:string= "Add user";

  constructor(private service:UserService) {
    this. columnGrid();
    // this.loadUser();
   }
  ngOnInit() {}


  columnGrid(){
    this.columnGrids = [
      {
        headerName: "User",
        field: "user",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        editable: true
      },
      {headerName: 'Email', field: 'email',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Roles', field: 'roles',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Location', field: 'location',filter: "agTextColumnFilter", editable: true},
    ];
  }


  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadUserRoles();
  }

  loadRol() {
    this.service.getRol() 
    .subscribe(res => {
      console.log("***** load Rol *****");

      this.rowData  = [{
        "Id": 1,
        "email": "", //add  email
        "rolees": "CycleTimeGoalAdmin",
      }, {
        "Id": 2,
        "email": "", //add email
        "rolees": "DownTimeEdditingAdmin",
      }, {
        "Id": 3,
        "email": "", //add email
        "rolees": "LineGoalEditting",
      }
    ]
  
      console.log(res);
      console.log(this.dataRol);
      // this.dataRol =res.rol;
    });

  }


  loadUser() {
    this.service.getUser() 
    .subscribe(res => {
      console.log("***** load User *****");

        this.rowData  = [{
          "Id": 1,
          "Email": "",//add email 
          "Name": "",
        }, {
          "Id": 2,
          "Email": "",//add email 
          "Name": "",
        }, {
          "Id": 3,
          "Email": "",//add email 
          "Name": "",
        }
      ]

      console.log(this.dataRol );
      // this.dataRol =res.user;
    });
  }

  loadUserRoles() {
    this.service.getUser() 
    .subscribe(res => {
      console.log("***** load User *****");
   
        this.rowData  = [{
          "Id": 1,
          "user": "",
          "email": "", //add email 
          "roles": "",
          "location": "",
        }, {
          "Id": 2,
          "user": "",
          "email": "",//add email 
          "roles": "admin",
          "location": "",
        }, {
          "Id": 3,
          "user": "",
          "email": "",//add email 
          "roles": "admin",
          "location": "Apodaca",
        }
      ]

      console.log(" User Roles" );
      console.log(this.userRoles );
    });
  }



  addUser(){
    this.result= new Array();
    this.service.addUser(this.Action,this.Id,this.Email,this.Name) 
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


  addRol(){
    this.result= new Array();
    this.service.addRol(this.Action,this.Id,this.Rol) 
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


  asignateRol(){
    this.result= new Array();
    this.service.asignateRol(this.Action,this.Id,this.Email,this.Name) 
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


  onFirstDataRendered(params:any) {
    params.api.sizeColumnsToFit();
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter($("#quickFilter").val());
  }

  showDiv(){

    if(this.display=="list"){
      $("#aggrid").fadeOut(1000);
      $("#containerNew").fadeIn(1000);
      this.display="newData"
    }else{
      $("#containerNew").fadeOut(1000);
      $("#aggrid").fadeIn(1000);
      this.display="list"

    }
    


    

  }

  onBtExport(){
    
  }

  onRemoveSelected(){
    
  }

}
