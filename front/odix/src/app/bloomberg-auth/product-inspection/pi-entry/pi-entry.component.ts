import { Component, OnInit } from '@angular/core';
import { PiEntryService } from './pi-entry.service';

@Component({
  selector: 'app-pi-entry',
  templateUrl: './pi-entry.component.html',
  styleUrls: ['./pi-entry.component.scss']
})
export class PiEntryComponent implements OnInit {
  lines: any;
  shifts: any;
  options:any;
  groups: any;
  types: any;
  descriptions = new Array();

  alertDataSuccess: boolean;
  alertDataComboboxes: boolean;
  alertDataNoDataToEdit: boolean;
  alertDataError: boolean;

  postJSON: any[];
  metadata: any = "METADATA";
  entries: any = "ENTRIES";

  gridApi: any;
  gridColumnApi:any;
  gridApi2: any;
  gridColumnApi2:any;
  gridApi3: any;
  gridColumnApi3:any;

  lineModel: any;
  shiftModel: any;
  groupModel: any;
  dateModel: any;
  typeModel: any;

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

  rowData: any;
  rowData2: any;
  rowData3: any;

  columnDefs: any;
  columnDefs2: any;
  columnDefs3: any;

  constructor(private piEntryService: PiEntryService) { }

  ngOnInit() {
    this.loadComboboxes();
    this.rowData = [];
    this.rowData2 = [];
    this.rowData3 = [];
  }

  loadComboboxes() {
    this.piEntryService.getComboboxes() 
    .subscribe(res => {
      var resultado:any = res;
      
      this.lines =resultado.Lines;
      this.shifts =resultado.Shifts;
      this.options =resultado.Options;
      this.types =resultado.Type;
    });
  }

  onChangeGroup(newValue:any) {
    if(this.dateModel != undefined && this.shiftModel != undefined && this.typeModel != undefined && this.lineModel != undefined){
      this.loadGrids();
    }
  }

  onChangeLine(newValue:any) {
    this.lines.forEach((element:any) => {

      if(element.ID == newValue){
        this.groups = element.WorkGroup;
      }
    });

    if(this.dateModel != undefined && this.shiftModel != undefined && this.typeModel != undefined && this.groupModel != undefined){
      this.loadGrids();
    }
  }

  onChangeDate(newValue:any) {
    if(this.lineModel != undefined && this.shiftModel != undefined && this.typeModel != undefined && this.groupModel != undefined){
      this.loadGrids();
    }
  }

  onChangeShift(newValue:any) {
    if(this.lineModel != undefined && this.dateModel != undefined && this.typeModel != undefined && this.groupModel != undefined){
      this.loadGrids();
    }
  }

  onChangeType(newValue:any) {
    if(this.lineModel != undefined && this.dateModel != undefined && this.shiftModel != undefined && this.groupModel != undefined){
      this.loadGrids();
    }
  }

  loadGrids(){
    this.piEntryService.getGridInformation(this.lineModel,this.dateModel,this.shiftModel,this.typeModel, this.groupModel) 
    .subscribe(res => {
     
      this.rowData = res.InfoTable1;
      this.rowData2 = res.InfoTable2;
      this.rowData3 = res.InfoTable3;

      this.checkColumnsVisibility(this.rowData)
      this.loadDescription();

      this.firstHour = res.InfoTable1[0].Hour1.Hour;
      this.secondHour = res.InfoTable1[0].Hour2.Hour;
      this.thirdHour = res.InfoTable1[0].Hour3.Hour;
      this.fourthHour = res.InfoTable1[0].Hour4.Hour;
      this.fifthHour = res.InfoTable1[0].Hour5.Hour;
      this.sixthHour = res.InfoTable1[0].Hour6.Hour;
      this.seventhHour = res.InfoTable1[0].Hour7.Hour;
      this.eighthHour = res.InfoTable1[0].Hour8.Hour;
      
      this.columnDefs = [
        {headerName: 'Asset', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'AssetDescription', suppressMovable: true},
        {headerName: 'Reference', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'ParameterDescription', suppressMovable: true},
        {headerName: this.firstHour, singleClickEdit:true, editable: this.isFirstEnabled, hide: this.isFirstHourHidden, field: 'Hour1.Value', suppressMovable: true},
        {headerName: this.secondHour, singleClickEdit:true, editable: this.isSecondEnabled, hide: this.isSecondHourHidden, field: 'Hour2.Value', suppressMovable: true},
        {headerName: this.thirdHour, singleClickEdit:true, editable: this.isThirdEnabled, hide: this.isThirdHourHidden, field: 'Hour3.Value', suppressMovable: true},
        {headerName: this.fourthHour, singleClickEdit:true, editable: this.isFourthEnabled, hide: this.isFourthHourHidden, field: 'Hour4.Value', suppressMovable: true},
        {headerName: this.fifthHour, singleClickEdit:true, editable: this.isFifthEnabled, hide: this.isFifthHourHidden, field: 'Hour5.Value', suppressMovable: true},
        {headerName: this.sixthHour, singleClickEdit:true, editable: this.isSixthEnabled, hide: this.isSixthHourHidden, field: 'Hour6.Value', suppressMovable: true},
        {headerName: this.seventhHour, singleClickEdit:true, editable: this.isSeventhEnabled, hide: this.isSeventhHourHidden, field: 'Hour7.Value', suppressMovable: true},
        {headerName: this.eighthHour, singleClickEdit:true, editable: this.isEighthEnabled, hide: this.isEighthHourHidden, field: 'Hour8.Value', suppressMovable: true}
      ];

    this.columnDefs2 = [
      {headerName: 'Asset', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'AssetDescription', suppressMovable: true},
      {headerName: 'Parameter', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'ParameterDescription', suppressMovable: true},
      {headerName: this.firstHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorFirstHour, editable: this.isFirstEnabled, hide: this.isFirstHourHidden, field: 'Hour1.Value', suppressMovable: true},
      {headerName: this.secondHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorSecondHour, editable: this.isSecondEnabled, hide: this.isSecondHourHidden, field: 'Hour2.Value', suppressMovable: true},
      {headerName: this.thirdHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorThirdHour, editable: this.isThirdEnabled, hide: this.isThirdHourHidden, field: 'Hour3.Value', suppressMovable: true},
      {headerName: this.fourthHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorFourthHour, editable: this.isFourthEnabled, hide: this.isFourthHourHidden, field: 'Hour4.Value', suppressMovable: true},
      {headerName: this.fifthHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorFifthHour, editable: this.isFifthEnabled, hide: this.isFifthHourHidden, field: 'Hour5.Value', suppressMovable: true},
      {headerName: this.sixthHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorSixthHour, editable: this.isSixthEnabled, hide: this.isSixthHourHidden, field: 'Hour6.Value', suppressMovable: true},
      {headerName: this.seventhHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorSeventhHour, editable: this.isSeventhEnabled, hide: this.isSeventhHourHidden, field: 'Hour7.Value', suppressMovable: true},
      {headerName: this.eighthHour, singleClickEdit:true, valueSetter: this.valueSetter, cellStyle: this.getColorEighthHour, editable: this.isEighthEnabled, hide: this.isEighthHourHidden, field: 'Hour8.Value', suppressMovable: true}
    ];

  this.columnDefs3 = [
    {headerName: 'Asset', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'AssetDescription', suppressMovable: true},
    {headerName: 'Parameter', cellStyle: {'font-weight': 'bold', color: '#000000', backgroundColor: '#68a2ff'}, field: 'ParameterDescription', suppressMovable: true},
    {headerName: this.firstHour, singleClickEdit:true, editable: this.isFirstEnabled, hide: this.isFirstHourHidden, field: 'Hour1.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true},
    {headerName: this.secondHour, singleClickEdit:true, editable: this.isSecondEnabled, hide: this.isSecondHourHidden, field: 'Hour2.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true},
    {headerName: this.thirdHour, singleClickEdit:true, editable: this.isThirdEnabled, hide: this.isThirdHourHidden, field: 'Hour3.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true},
    {headerName: this.fourthHour, singleClickEdit:true, editable: this.isFourthEnabled, hide: this.isFourthHourHidden, field: 'Hour4.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true},
    {headerName: this.fifthHour, singleClickEdit:true, editable: this.isFifthEnabled, hide: this.isFifthHourHidden, field: 'Hour5.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true},
    {headerName: this.sixthHour, singleClickEdit:true, editable: this.isSixthEnabled, hide: this.isSixthHourHidden, field: 'Hour6.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true},
    {headerName: this.seventhHour, singleClickEdit:true, editable: this.isSeventhEnabled, hide: this.isSeventhHourHidden, field: 'Hour7.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true},
    {headerName: this.eighthHour, singleClickEdit:true, editable: this.isEighthEnabled, hide: this.isEighthHourHidden, field: 'Hour8.ValueDescription', cellEditor: "agSelectCellEditor", cellEditorParams: { values: this.descriptions }, suppressMovable: true}
  ];
      
    });
  }

  loadDescription(){
    this.options.forEach((element: any) => {
      this.descriptions.push(element.Description);
    });
  }
    
  findDescriptionIdByDesc(desc:any){
    return this.options.find((x:any) => x.Description === desc);
  }

  onGridReady(params:any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  onGridReady2(params:any){
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  onGridReady3(params:any){ 
    this.gridApi3 = params.api;
    this.gridColumnApi3 = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  onCellValueChanged(params:any){
    var rowDataIndex;
    var headerColumnName;
    console.log(params)
    if(params.newValue != params.oldValue){
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

  onCellValueChanged2(params:any){
    var rowDataIndex;
    var headerColumnName;
    console.log(params)
    if(Number(params.newValue) != params.oldValue){
      rowDataIndex = params.rowIndex;
      headerColumnName = params.colDef.headerName;

      if(this.rowData2[rowDataIndex].Hour1.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour1.Edited = 1;
      if(this.rowData2[rowDataIndex].Hour2.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour2.Edited = 1;
      if(this.rowData2[rowDataIndex].Hour3.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour3.Edited = 1;
      if(this.rowData2[rowDataIndex].Hour4.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour4.Edited = 1;
      if(this.rowData2[rowDataIndex].Hour5.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour5.Edited = 1;
      if(this.rowData2[rowDataIndex].Hour6.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour6.Edited = 1;
      if(this.rowData2[rowDataIndex].Hour7.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour7.Edited = 1;
      if(this.rowData2[rowDataIndex].Hour8.Hour == headerColumnName)
        this.rowData2[rowDataIndex].Hour8.Edited = 1;
    }
  }

  onCellValueChanged3(params:any){
    var rowDataIndex;
    var headerColumnName;
    console.log(params)
    if(params.newValue != params.oldValue){
      rowDataIndex = params.rowIndex;
      headerColumnName = params.colDef.headerName;
      var descriptionObj: any = this.findDescriptionIdByDesc(params.newValue);

      if(this.rowData3[rowDataIndex].Hour1.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour1.Edited = 1;
        this.rowData3[rowDataIndex].Hour1.ValueID = descriptionObj.ID;
      }
      if(this.rowData3[rowDataIndex].Hour2.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour2.Edited = 1;
        this.rowData3[rowDataIndex].Hour2.ValueID = descriptionObj.ID;
      }
      if(this.rowData3[rowDataIndex].Hour3.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour3.Edited = 1;
        this.rowData3[rowDataIndex].Hour3.ValueID = descriptionObj.ID;
      }
      if(this.rowData3[rowDataIndex].Hour4.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour4.Edited = 1;
        this.rowData3[rowDataIndex].Hour4.ValueID = descriptionObj.ID;
      }
      if(this.rowData3[rowDataIndex].Hour5.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour5.Edited = 1;
        this.rowData3[rowDataIndex].Hour5.ValueID = descriptionObj.ID;
      }
      if(this.rowData3[rowDataIndex].Hour6.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour6.Edited = 1;
        this.rowData3[rowDataIndex].Hour6.ValueID = descriptionObj.ID;
      }
      if(this.rowData3[rowDataIndex].Hour7.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour7.Edited = 1;
        this.rowData3[rowDataIndex].Hour7.ValueID = descriptionObj.ID;
      }
      if(this.rowData3[rowDataIndex].Hour8.Hour == headerColumnName){
        this.rowData3[rowDataIndex].Hour8.Edited = 1;
        this.rowData3[rowDataIndex].Hour8.ValueID = descriptionObj.ID;
      }
    }
  }

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

saveInfo(){
  this.postJSON = [];

  // Iterating on first grid
  this.rowData.forEach((row:any) => {
    if(row.Hour1.Edited == 1){
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour1.Value,
        Hour: row.Hour1.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
    if(row.Hour2.Edited == 1){
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour2.Value,
        Hour: row.Hour2.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
    if(row.Hour3.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour3.Value,
        Hour: row.Hour3.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
    if(row.Hour4.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour4.Value,
        Hour: row.Hour4.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
    if(row.Hour5.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour5.Value,
        Hour: row.Hour5.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
    if(row.Hour6.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour6.Value,
        Hour: row.Hour6.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
    if(row.Hour7.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour7.Value,
        Hour: row.Hour7.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
    if(row.Hour8.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour8.Value,
        Hour: row.Hour8.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.metadata
      });
    }
  });

  // Iterating on second grid
  this.rowData2.forEach((row:any) => {
    if(row.Hour1.Edited == 1){
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour1.Value,
        Hour: row.Hour1.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour2.Edited == 1){
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour2.Value,
        Hour: row.Hour2.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour3.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour3.Value,
        Hour: row.Hour3.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour4.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour4.Value,
        Hour: row.Hour4.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour5.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour5.Value,
        Hour: row.Hour5.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour6.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour6.Value,
        Hour: row.Hour6.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour7.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour7.Value,
        Hour: row.Hour7.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour8.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour8.Value,
        Hour: row.Hour8.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
  });

   // Iterating on third grid
   this.rowData3.forEach((row:any) => {
    if(row.Hour1.Edited == 1){
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour1.ValueID,
        Hour: row.Hour1.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour2.Edited == 1){
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour2.ValueID,
        Hour: row.Hour2.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour3.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour3.ValueID,
        Hour: row.Hour3.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour4.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour4.ValueID,
        Hour: row.Hour4.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour5.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour5.ValueID,
        Hour: row.Hour5.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour6.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour6.ValueID,
        Hour: row.Hour6.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour7.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour7.ValueID,
        Hour: row.Hour7.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
    if(row.Hour8.Edited == 1){ 
      this.postJSON.push({
        Asset_Id: row.AssetID,
        Line_Id: Number(this.typeModel),
        Date: this.dateModel,
        Shift: Number(this.shiftModel),
        WorkGroup_Id: Number(this.groupModel),
        Parameter_Id: String(row.ParameterID),
        Value: row.Hour8.ValueID,
        Hour: row.Hour8.Hour,
        Email: "rodrigo.martinez02@metalsa.com",
        InfoTable: this.entries
      });
    }
  });

  console.log("POST JSON")
  console.log(this.postJSON)
  console.log("ROW DATA 3")
  console.log(this.rowData3)
  if(this.postJSON.length != 0 && this.lineModel != undefined && this.dateModel != undefined && this.shiftModel != undefined && this.groupModel != undefined && this.typeModel != undefined){
    var error: any;  
    this.piEntryService.saveData(this.postJSON) 
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
    if(this.lineModel == undefined || this.dateModel == undefined || this.shiftModel == undefined || this.groupModel == undefined || this.typeModel == undefined)
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

  // Iterating on second grid
  this.rowData2.forEach((row:any) => {
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
      row.Hour5.Edited = 0;
    }
    if(row.Hour5.Edited == 1){ 
      row.Hour6.Edited = 0;
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

  // Iterating on third grid
  this.rowData3.forEach((row:any) => {
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
