import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { cellButton } from "./cell-button.component";
import { arrayExpression } from 'babel-types';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {
  @Input() objData:any;
  @Input() objColumnGrids:any;
  @Input() result:any;
  @Input() setting:any;
  @Output() event: EventEmitter<any> = new EventEmitter();

  /*Setting ag-grid */
  gridApi: any;
  gridColumnApi:any;


  gridOptions:any;
  rowSelection: any;
  editType: any;
  
  /*Data ag-grid */
  columnDefs: any;
  rowData: any;
  


  //button
  frameworkComponents:any;
  context:any; ///cechar

  /* */
  textButton:string="Delete";
  idReturn:any;
  newData:any;
  columnName= new Array();
  columnId= new Array();
  allFiel= new Array();

  clickButton:Boolean = false;
  ID:number;
  Action:string;
  dataMultiRemoved:any;
  Email:any="";
  
  displayBtnNew:string;
  isNew:boolean = true;  
  constructor() { 
    this.settingAgGrid ();
  }

  ngOnInit() {}

  ngOnChanges() {
    // this.settingAgGrid();
    this.loadData();
    this.updateRow();
  }

  loadData(){

    if(this.objData!== undefined && this.objColumnGrids!==undefined &&  this.setting!==undefined ){
        this.columnDefs = this.objColumnGrids;
        this.rowData = this.objData;
        this.allFiel = this.setting[0];
        this.columnId = this.setting[1];
        this.displayBtnNew = this.setting[2];
        $("#btnNew").css("display", this.displayBtnNew);
    }
  }


  settingAgGrid(){
    this.rowSelection = "multiple";
    this.editType = "fullRow";

    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: this.rowData,
      rowSelection: 'multiple',
      enableFilter: true,
      enableColResize: true,
    };
    
    this.context = { componentParent: this };
    this.frameworkComponents = {
      cellButton: cellButton
    };

  }


  onGridReady(params:any){
    if(this.objData!== undefined && this.objColumnGrids!==undefined ){
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    }
  }

  
  onAddRow() {
    if(this.isNew){

      this.columnId.forEach((element: any) => {
        this.gridOptions.columnApi.getColumn(element).getColDef().editable = true;
      });

      this.rowData.splice(0, 0, {}  );
      this.gridOptions.api.setRowData(this.gridOptions.rowData)
      this.onBtStartEditing();
      this.textButton="Save";
      $("#button0").text(this.textButton);
      $("#button0").css('background-color','#176318');
    }
    this.isNew =false;
  }

  onBtStartEditing() {
    this.gridApi.setFocusedCell(0, "", 0);
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: this.allFiel[0],
      rowPinned: 0,
      keyPress: 0,
      charPress: 0
    });

  }





  btnAction(values:any) {
    this.isNew =true;
    this.clickButton = true;
    if(this.textButton==="Delete"){
      this.ID= values.data.ID;
      this.Action="DELETE"
      const data = {
        data: values.data,
        Action: this.Action
      };
      this.event.emit(data);
      var selectedData2 =new Array();
      selectedData2.push(values.data);
      var res = this.gridOptions.api.updateRowData({remove: selectedData2});
    }
    
    this.gridApi.stopEditing();
  }

  rowEditingStarted(data:any){
    if(this.textButton!="Save"){
      this.textButton="Update";
      $("#button"+data.rowIndex).css({background: '#848a25', border: '#848a25' });
    }
    $("#button"+data.rowIndex).text(this.textButton);
  }


  rowEditingStopped(params: any): void {
    console.log("     /*row editing stopped*/       ");
    this.isNew =true;
  
    if(this.clickButton){
  
      if(this.textButton == "Save"){
        this.Action="INSERT"
      }if(this.textButton == "Update"){
        this.Action="UPDATE"
      }if(this.textButton == "Delete"){
        this.textButton="Delete"
      }

      const data = {
        data: params.data,
        Action: this.Action
      };
      this.event.emit(data);
  
    }else{
  
      if(this.textButton == "Save"){
        this.rowData.splice(0, 1);
        this.gridOptions.api.setRowData(this.gridOptions.rowData)
      }
  
    }
  
    this.textButton="Delete"
    $("#button"+params.rowIndex).text(this.textButton);
    this.clickButton= false;

    this.columnId.forEach((element: any) => {
      this.gridOptions.columnApi.getColumn(element).getColDef().editable = false;
    });

    $("#button"+params.rowIndex).css('background-color','');
  
  }



  onSelectionChanged(params:any){
      this.dataMultiRemoved = this.gridApi.getSelectedRows();
      if(this.dataMultiRemoved.length > 3 ){
        $("#btnMultiRemov").css("display", "block");
      }else{
        $("#btnMultiRemov").css("display", "none");
      }
  
      // console.log("     /*Selection Changed*/     ");
      // console.log(this.dataMultiRemoved );
      
   }


  updateRow(){
    
    if(this.result!==undefined){
      if(this.result.type == "INSERT" ){
        if(this.result.error == "false" ){
          let rowToUpdate = [];
          let rowNode = this.gridApi.getRowNode(0);
          let data = rowNode.data;
          data.ID = this.result.id;
          // data.Email = this.Email;
          // data.a_LastUpdated = this.result['last_update'];
          rowToUpdate.push(data);
          this.gridOptions.api.updateRowData({update: rowToUpdate});
        }else{
          alert(this.result.msj);
          this.rowData.splice(0, 1);
          this.gridOptions.api.setRowData(this.gridOptions.rowData)
        }

        
      }


    }

  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter($("#quickFilter").val());
  }

  onBtExport() {
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'TanksParameters'
    };
    this.gridApi.exportDataAsCsv(params);
  }

  /*removed rows */
  onRemoveSelected() {
      var selectedData = this.gridApi.getSelectedRows();
      var res = this.gridApi.updateRowData({ remove: selectedData });
      this.dataMultiRemoved.forEach((element:any) => {
        this.Action="DELETE";
        this.ID=element.ID;

        const dataInfo = {
          ID: this.ID,
        };

        const data = {
          data: dataInfo,
          Action: this.Action
        };
        this.event.emit(data);
        


    });

  }








}



