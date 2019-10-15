import { Component, OnInit } from '@angular/core';
import { EntryService } from './entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  alertDataSuccess: boolean;
  alertDataComboboxes: boolean;
  alertDataNoDataToEdit: boolean;
  alertDataError: boolean;

  postJSON: any[];

  lineModel: any;
  shiftModel: any;
  groupModel: any;
  dateModel: any;

  firstHour: any;
  secondHour: any;
  thirdHour: any;
  fourthHour: any;
  fifthHour: any;
  sixthHour: any;
  seventhHour: any;
  eighthHour: any;

  isFirstHourHidden: boolean;
  isSecondHourHidden: boolean;
  isThirdHourHidden: boolean;
  isFourthHourHidden: boolean;
  isFifthHourHidden: boolean;
  isSixthHourHidden: boolean;
  isSeventhHourHidden: boolean;
  isEighthHourHidden: boolean;

  lines: any;
  shifts: any;
  groups: any;
  gridApi: any;
  gridColumnApi:any;

  columnDefs: any;
  rowData: any;
  constructor(private entryService:EntryService) { }

  ngOnInit() {
    this.loadComboboxes();
    this.rowData = [];
    console.log(this.rowData.length + ' is the number of fucks I give');
  }

  onCellValueChanged(params:any){
    var rowDataIndex;
    var headerColumnName;
    
    if(Number(params.newValue) != params.oldValue){
      rowDataIndex = params.rowIndex;
      headerColumnName = params.colDef.headerName;

      if(this.rowData[rowDataIndex].Hour1.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour1.Edited = 1;
      if(this.rowData[rowDataIndex].Hour2.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour2.Edited = 1;
      if(this.rowData[rowDataIndex].Hour3.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour3.Edited = 1;
      if(this.rowData[rowDataIndex].Hour4.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour4.Edited = 1;
      if(this.rowData[rowDataIndex].Hour5.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour5.Edited = 1;
      if(this.rowData[rowDataIndex].Hour6.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour6.Edited = 1;
      if(this.rowData[rowDataIndex].Hour7.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour7.Edited = 1;
      if(this.rowData[rowDataIndex].Hour8.Hour == headerColumnName)
        this.rowData[rowDataIndex].Hour8.Edited = 1;
    }
  }

  loadComboboxes() {
    this.entryService.getComboboxes() 
    .subscribe(res => {
      this.lines =res.Lines;
      this.shifts =res.Shifts;
    });
  }

  loadGrid(){
    this.entryService.getGridInformation(this.lineModel,this.dateModel,this.shiftModel, this.groupModel) 
    .subscribe(res => {
      this.rowData = res.InfoTable;

      this.checkColumnsVisibility(this.rowData)

      this.firstHour = res.InfoTable[0].Hour1.Hour;
      this.secondHour = res.InfoTable[0].Hour2.Hour;
      this.thirdHour = res.InfoTable[0].Hour3.Hour;
      this.fourthHour = res.InfoTable[0].Hour4.Hour;
      this.fifthHour = res.InfoTable[0].Hour5.Hour;
      this.sixthHour = res.InfoTable[0].Hour6.Hour;
      this.seventhHour = res.InfoTable[0].Hour7.Hour;
      this.eighthHour = res.InfoTable[0].Hour8.Hour;
      
      this.columnDefs = [
        {headerName: 'Asset', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'AssetDescription', suppressMovable: true},
        {headerName: 'Parameter', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'ParameterDescription', suppressMovable: true},
        {headerName: this.firstHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isFirstEnabled, hide: this.isFirstHourHidden, cellStyle: this.getColorFirstHour, field: 'Hour1.Value', suppressMovable: true},
        {headerName: this.secondHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isSecondEnabled, hide: this.isSecondHourHidden, cellStyle: this.getColorSecondHour, field: 'Hour2.Value', suppressMovable: true},
        {headerName: this.thirdHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isThirdEnabled, hide: this.isThirdHourHidden, cellStyle: this.getColorThirdHour, field: 'Hour3.Value', suppressMovable: true},
        {headerName: this.fourthHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isFourthEnabled, hide: this.isFourthHourHidden, cellStyle: this.getColorFourthHour, field: 'Hour4.Value', suppressMovable: true},
        {headerName: this.fifthHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isFifthEnabled, hide: this.isFifthHourHidden, cellStyle: this.getColorFifthHour, field: 'Hour5.Value', suppressMovable: true},
        {headerName: this.sixthHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isSixthEnabled, hide: this.isSixthHourHidden, cellStyle: this.getColorSixthHour, field: 'Hour6.Value', suppressMovable: true},
        {headerName: this.seventhHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isSeventhEnabled, hide: this.isSeventhHourHidden, cellStyle: this.getColorSeventhHour, field: 'Hour7.Value', suppressMovable: true},
        {headerName: this.eighthHour, singleClickEdit:true, valueSetter: this.valueSetter, editable: this.isEighthEnabled, hide: this.isEighthHourHidden, cellStyle: this.getColorEighthHour, field: 'Hour8.Value', suppressMovable: true}
    ];
      
    });
  }

 valueSetter(params: any) {
  // Value is legit - set it and signal the value has been changed/set
  if(params.newValue >= params.data.MinValue && params.newValue <= params.data.MaxValue){  
    var field = params.colDef.field;

    if(field == "Hour1.Value")
      params.data.Hour1.Value = params.newValue;
    if(field == "Hour2.Value")
      params.data.Hour2.Value = params.newValue;
    if(field == "Hour3.Value")
      params.data.Hour3.Value = params.newValue;
    if(field == "Hour4.Value")
      params.data.Hour4.Value = params.newValue;
    if(field == "Hour5.Value")
      params.data.Hour5.Value = params.newValue;
    if(field == "Hour6.Value")
      params.data.Hour6.Value = params.newValue;
    if(field == "Hour7.Value")
      params.data.Hour7.Value = params.newValue;
    if(field == "Hour8.Value")
      params.data.Hour8.Value = params.newValue;

    return true
  }
  // Illegal value - signal no change
  return false;
}

//------------------------------------------------------------------------------Cell colors 
  getColorFirstHour(params:any){
    
    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour1.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour1.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour1.Value);

    if(params.data.Hour1.Value != null){
      if(params.data.Hour1.Value == ''){
        if(params.data.Hour1.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }

      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour1.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }

  getColorSecondHour(params:any){
    
    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour2.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour2.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour2.Value);

    if(params.data.Hour2.Value != null){
      if(params.data.Hour2.Value == ''){
        if(params.data.Hour2.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }

      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour2.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }

  getColorThirdHour(params:any){
    
    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour3.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour3.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour3.Value);

    if(params.data.Hour3.Value != null){
      if(params.data.Hour3.Value == ''){
        if(params.data.Hour3.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }
        
      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour3.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }

  getColorFourthHour(params:any){
    
    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour4.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour4.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour4.Value);

    if(params.data.Hour4.Value != null){
      if(params.data.Hour4.Value == ''){
        if(params.data.Hour4.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }

      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour4.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }

  getColorFifthHour(params:any){

    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour5.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour5.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour5.Value);

    if(params.data.Hour5.Value != null){
      if(params.data.Hour5.Value == ''){
        if(params.data.Hour5.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }

      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour5.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }

  getColorSixthHour(params:any){
    
    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour6.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour6.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour6.Value);

    if(params.data.Hour6.Value != null){
      if(params.data.Hour6.Value == ''){
        if(params.data.Hour6.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }

      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour6.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }

  getColorSeventhHour(params:any){
    
    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour7.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour7.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour7.Value);

    if(params.data.Hour7.Value != null){
      if(params.data.Hour7.Value == ''){
        if(params.data.Hour7.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }

      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour7.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }

  getColorEighthHour(params:any){
    
    var re = /x/gi; 
    var expressionDelayed:any = params.data.Delayed;
    var expressionMedium:any = params.data.Medium;
    var expressionOnGoal:any = params.data.OnGoal;

    expressionDelayed = expressionDelayed.replace(re,params.data.Hour8.Value);
    expressionMedium = expressionMedium.replace(re,params.data.Hour8.Value);
    expressionOnGoal = expressionOnGoal.replace(re,params.data.Hour8.Value);

    if(params.data.Hour8.Value != null){
      if(params.data.Hour8.Value == ''){
        if(params.data.Hour8.Enable == 1){
          return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
        }
      }

      if(eval(expressionDelayed))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#f4755f'};
      
      else if(eval(expressionMedium))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffda47'};
      
      else if(eval(expressionOnGoal))
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#73ed61'};
    }

    else{
      if(params.data.Hour8.Enable == 1)
        return {'font-weight': 'bold', color: '#000000', backgroundColor: '#ffffff'};
    }     
  }
  
//------------------------------------------------------------------------------Cell colors

 

//------------------------------------------------------------------------------Column visible

  checkColumnsVisibility(table:any){

    if(table[0].Hour1.Visible == 1)
      this.isFirstHourHidden = false;
    else  
      this.isFirstHourHidden = true;
    
    if(table[0].Hour2.Visible == 1)
      this.isSecondHourHidden = false;
    else  
      this.isSecondHourHidden = true;
    
    if(table[0].Hour3.Visible == 1)
      this.isThirdHourHidden = false;
    else  
      this.isThirdHourHidden = true;
    
    if(table[0].Hour4.Visible == 1)
      this.isFourthHourHidden = false;
    else  
      this.isFourthHourHidden = true;

    if(table[0].Hour5.Visible == 1)
      this.isFifthHourHidden = false;
    else  
      this.isFifthHourHidden = true;
    
    if(table[0].Hour6.Visible == 1)
      this.isSixthHourHidden = false;
    else  
      this.isSixthHourHidden = true;

    if(table[0].Hour7.Visible == 1)
      this.isSeventhHourHidden = false;
    else  
      this.isSeventhHourHidden = true;

    if(table[0].Hour8.Visible == 1)
      this.isEighthHourHidden = false;
    else  
      this.isEighthHourHidden = true;
  }
//------------------------------------------------------------------------------Column visible

//------------------------------------------------------------------------------Enable for editing
  isFirstEnabled(params:any){
    if(params.data.Hour1.Enable == 1)
      return true
    else 
      return false;
  }
  isSecondEnabled(params:any){
    if(params.data.Hour2.Enable == 1)
      return true
    else 
      return false;
  }
  isThirdEnabled(params:any){
    if(params.data.Hour3.Enable == 1)
      return true
    else 
      return false;
  }
  isFourthEnabled(params:any){
    if(params.data.Hour4.Enable == 1)
      return true
    else 
      return false;
  }
  isFifthEnabled(params:any){
    if(params.data.Hour5.Enable == 1)
      return true
    else 
      return false;
  }
  isSixthEnabled(params:any){
    if(params.data.Hour6.Enable == 1)
      return true
    else 
      return false;
  }
  isSeventhEnabled(params:any){
    if(params.data.Hour7.Enable == 1)
      return true
    else 
      return false;
  }
  isEighthEnabled(params:any){
    if(params.data.Hour8.Enable == 1)
      return true
    else 
      return false;
  }
//------------------------------------------------------------------------------Enable for editing

  onGridReady(params:any){
   
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    
  }

  onChangeLine(newValue:any) {
    this.lines.forEach((element:any) => {

      if(element.ID == newValue){
        this.groups = element.WorkGroup;
      }
    });

    if(this.dateModel != undefined && this.shiftModel != undefined && this.groupModel != undefined){
      this.loadGrid();
    }
  }

  onChangeDate(newValue:any) {
    if(this.lineModel != undefined && this.shiftModel != undefined && this.groupModel != undefined){
      this.loadGrid();
    }
  }

  onChangeShift(newValue:any) {
    if(this.lineModel != undefined && this.dateModel != undefined && this.groupModel != undefined){
      this.loadGrid();
    }
  }

  onChangeGroup(newValue:any) {
    if(this.lineModel != undefined && this.dateModel != undefined && this.shiftModel != undefined){
      this.loadGrid();
    }
  }

  saveInfo(){
    this.postJSON = [];

    this.rowData.forEach((row:any) => {
      if(row.Hour1.Edited == 1){
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour1.Hour,
          Value: Number(row.Hour1.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
      if(row.Hour2.Edited == 1){
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour2.Hour,
          Value: Number(row.Hour2.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
      if(row.Hour3.Edited == 1){ 
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour3.Hour,
          Value: Number(row.Hour3.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
      if(row.Hour4.Edited == 1){ 
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour4.Hour,
          Value: Number(row.Hour4.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
      if(row.Hour5.Edited == 1){ 
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour5.Hour,
          Value: Number(row.Hour5.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
      if(row.Hour6.Edited == 1){ 
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour6.Hour,
          Value: Number(row.Hour6.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
      if(row.Hour7.Edited == 1){ 
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour7.Hour,
          Value: Number(row.Hour7.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
      if(row.Hour8.Edited == 1){ 
        this.postJSON.push({
          Asset_Id: row.AssetID,
          Date: this.dateModel,
          Shift: Number(this.shiftModel),
          WorkGroup_Id: Number(this.groupModel),
          Parameter_Id: row.ParameterID,
          Hour: row.Hour8.Hour,
          Value: Number(row.Hour8.Value),
          Email: "rodrigo.martinez02@metalsa.com"
        });
      }
    });

    console.log("POST JSON")
    console.log(this.postJSON)
    console.log("ROW DATA")
    console.log(this.rowData)
    if(this.postJSON.length != 0 && this.lineModel != undefined && this.dateModel != undefined && this.shiftModel != undefined && this.groupModel != undefined){
        this.entryService.saveData(this.postJSON) 
      .subscribe(res => {
        var object = new Object();
        object['error'] = res.Error;
        console.log("EL ERROR TRAE")
        console.log(object['error'])
        if(object['error'] == "false"){
          this.alertDataSuccess = true;
          this.resetEditedFields();
        }
        else{
          this.alertDataError = true;
        }
        object['id'] = res.id;
        object['last_update'] = res.last_update;
        object['msj'] = res.msj;
        object['type'] = res.type;
      });
    }
    else{
      if(this.postJSON.length == 0)
        this.alertDataNoDataToEdit = true;
      if(this.lineModel == undefined || this.dateModel == undefined || this.shiftModel == undefined || this.groupModel == undefined)
        this.alertDataComboboxes = true;
    }
  }

  resetEditedFields(){
    // Iterating on first grid
    this.rowData.forEach((row:any) => {
      if(row.Hour1.Edited == 1){
        row.Hour1.Edited = 0;
      }
      if(row.Hour2.Edited == 1){
        row.Hour2.Edited = 0;
      }
      if(row.Hour3.Edited == 1){ 
        row.Hour3.Edited = 0;
      }
      if(row.Hour4.Edited == 1){ 
        row.Hour4.Edited = 0;
      }
      if(row.Hour5.Edited == 1){ 
        row.Hour5.Edited = 0;
      }
      if(row.Hour6.Edited == 1){ 
        row.Hour6.Edited = 0;
      }
      if(row.Hour7.Edited == 1){ 
        row.Hour7.Edited = 0;
      }
      if(row.Hour8.Edited == 1){ 
        row.Hour8.Edited = 0;
      }
    });
  }

}
