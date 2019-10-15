import {Component, OnInit} from '@angular/core';
import { ReportsService } from '@app/reports/reports.service';
import { Helper } from '@app/shared/helper';
import * as $  from 'jquery';
import { Months } from '@app/globalEnum';
import { AssetsID } from '@app/globalEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cycletimesmonthlydata',
  templateUrl: './cycletimesmonthlydata.component.html',
  styleUrls: ['./cycletimesmonthlydata.component.scss']
})
export class CycletimesmonthlydataComponent implements OnInit {
  helper: Helper;

  AssetID:number;
  AreaAssetID:number;
  LineAssetID:number;
  EnnID:number;

  Month: string;
  Year:number;
  Code: string;
  AllENN: string;
  
  Cycletime:number
  NameENN: string;

  arrayArea: any;
  arrayLinea: any;
  arrayENN: any;

  private values: any;
  arrayDate: any;
  arrayModels: any;
  arrayNameStation: any;

  dataMonthNames: any;
  IgnoreCyclesTime: any;
  arrayStatistic: any;
  display:string = "none";
  isData:boolean= true;
  private stationsCopy: any;
  private originalStations: any;
  private datesUnique: any;
  private modelsUnique: any;

  constructor(private reportsService: ReportsService, router: Router) {
    let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
    this.AssetID = (+AssetsID[plantName]);
  }

  ngOnInit() {
    this.AllENN = "No";
    this.Month= this.monthName();
    this.Year= this.year();
    this.IgnoreCyclesWithCyclesTime();
    this.getArea();
    this.stationsCopy = [];
    this.originalStations = [];
  }

  onAreaChange(value: number ): void {
    this.AreaAssetID = value;
    this.getLine();
  }

  onLineChange(value: number): void {
      this.LineAssetID= value;

      var cd = this.arrayLinea.filter(function (el:any) {
        return (el.ID === (+value) );
      });

      this.Code =cd[0].Code;
      this.Code = this.Code.trim();
      this.getENN();
  }

  onEnnChange(value: number): void {
      this.EnnID= value;
      this.NameENN= $("#IDENN option[value="+value+"]").text(); 
      this.GetCycleTimeMonthlyData();
  }

  onSelectMonth(value: string): void {
    this.Month= value;
    this.GetCycleTimeMonthlyData();
  }

  onSelectYear(value: number): void {
    this.Year= value;
  }

  onSelectAllENN(value: string): void {
    this.AllENN= value;
    this.GetCycleTimeMonthlyData();
  }

  onSelectIgnoreCycles(value: number): void {
    this.Cycletime= value;
    this.GetCycleTimeMonthlyData();
  }

  getArea(): void {
    this.reportsService.getAreaAssetIDNameByParentId(this.AssetID)
    .subscribe(res => {
      this.arrayArea = res.Values;
      this.AreaAssetID= this.arrayArea[0].ID
      this.getLine();
    });
  }

  getLine(): void {
    this.reportsService.getLineAssetIDNameByParentId(this.AreaAssetID)
    .subscribe(res => {
      this.arrayLinea = res.Values;
      if(this.arrayLinea.length!=0){

        this.LineAssetID= this.arrayLinea[this.arrayLinea.length-1].ID;
        this.Code = this.arrayLinea[this.arrayLinea.length-1].Code; //"LENSDT1";  //"APO_EnsambleDSL1-DSL1"
        this.getENN();

      }else{

        this.initialize();

      }

    });

  }

  getENN(): void {
      this.reportsService.getEnnAssetIDNameByParentId(this.LineAssetID)
      .subscribe(res => {
        this.arrayENN = res.Values;
        if(this.arrayENN.length!=0){

          this.EnnID= this.arrayENN[0].ID;
          this.GetCycleTimeMonthlyData();  //21

        }else{

          this.initialize();

        }

      });

  }

  GetCycleTimeMonthlyData(){
    // console.log("this.EnnID="+this.EnnID+" this.Month="+this.Month+" this.Year="+this.Year+" this.LineName="+this.Code+" this.AllENN="+this.AllENN+" this.Cycletime="+this.Cycletime);
    this.display = "block";
    
    if(this.EnnID !=undefined  && this.Month !=undefined && this.Year !=undefined &&  this.Code !=undefined && this.AllENN !=undefined && this.Cycletime !=undefined ){
      this.reportsService.getCycleTimeMonthlyData(this.EnnID ,this.Month,this.Year, this.Code, this.AllENN, this.Cycletime)
      .subscribe(res => {
        this.values = res;

        this.isData =true;
        this.display = "none";
        if(this.values.STATIONS[0].name == "No data"){

          this.initialize();
          this.isData =false;

        }else{

            let valuesCopy = this.values.STATIONS;
            this.stationsCopy = valuesCopy.slice();
            this.originalStations = valuesCopy.slice();
            this.loadUniqueDatesAndModel();
            this.loadArrayStation();
            this.calculateStatistic(valuesCopy);
        }
      });
    }
  }

  loadUniqueDatesAndModel(){
      this.datesUnique = [];
      this.modelsUnique = [];
      for (let i = 0; i < this.originalStations.length; i++){
          this.datesUnique.push(this.originalStations[i].date);
          this.modelsUnique.push(this.originalStations[i].model);
      }

      this.datesUnique = Array.from(new Set(this.datesUnique));
      this.modelsUnique = Array.from(new Set(this.modelsUnique));
      this.loadArrayDate();
      this.loadArrayModels();
  }

  onFilterDate(event: any): void {
    let list = document.querySelectorAll(`#listDate > div > input`);
    let listModel = document.querySelectorAll(`#listModel > div > input`);
    let checked = event.path[0].checked;
    let value = event.target.value.concat("T00:00:00");
    this.enableDisableCheckBoxAll(list);
      if (event.target.value == "0"){
        if (!checked)
            this.deleteItemToArray(0);
        else{
            this.addItemsToArray(0);
            this.findDisableCheckBox(listModel, false);
        }

        this.enableDisableCheckBox("0", list, [], checked);

    }else{
        if (!checked){
            this.deleteItemToArray(value);
            if (!this.checkInfExistItemInArray(value, this.stationsCopy)){
                this.calculateStatistic(this.stationsCopy);
            }
        }else{
            this.addItemsToArray(value);
        }
    }
  }

  onFilterModel(event:any): void {
    let list = document.querySelectorAll(`#listModel > div > input`);
    let listDate = document.querySelectorAll(`#listDate > div > input`);
    let checked = event.path[0].checked;
    this.enableDisableCheckBoxAll(list);
    if (event.target.value == "0"){
        if (!checked)
            this.deleteItemToArray(0);
        else {
            this.addItemsToArray(0);
            this.findDisableCheckBox(listDate, true);
        }

        this.enableDisableCheckBox("0", list, [], checked);
    }else{
        if (!checked){
            this.deleteItemToArray(event.target.value);
            if (!this.checkInfExistItemInArray(event.target.value, this.stationsCopy))
                this.calculateStatistic(this.stationsCopy);
            else
                this.onFilterModel(event);
        }else{
            this.addItemsToArray(event.target.value);
        }
    }
  }

  deleteItemToArray(valueSearch:any){
    if (valueSearch != 0){
        for(let i=0; i<this.stationsCopy.length;i++ ) {
            if (this.stationsCopy[i].date.indexOf(valueSearch) !==-1 || this.stationsCopy[i].model.indexOf(valueSearch) !== -1){
                this.stationsCopy.splice(i,1);
            }
        }
    } else{

        this.stationsCopy.splice(0, this.stationsCopy.length);

    }

    if (!this.checkInfExistItemInArray(valueSearch, this.stationsCopy)){
        this.calculateStatistic(this.stationsCopy);
    } else{
        this.deleteItemToArray(valueSearch);
    }
  }

  addItemsToArray(valueSearch:any){
    let valuesAdd = [];
    if (valueSearch != 0){
        for (let i = 0; i < this.originalStations.length; i++){
            if (this.originalStations[i].date.indexOf(valueSearch) !==-1 || this.originalStations[i].model.indexOf(valueSearch) !== -1){
                valuesAdd.push(this.originalStations[i]);
            }
        }
        this.stationsCopy.push(...valuesAdd);
    } else {
        this.stationsCopy = [];
        this.stationsCopy = this.originalStations.slice();
    }

    this.calculateStatistic(this.stationsCopy);
  }

  findDisableCheckBox(list:NodeListOf<any>, isConcat:boolean){
      let disabledValues:any = [];
      [].forEach.call(list, function (element:any) {
          if (!element.checked){
              let value = (isConcat)?element.value.concat("T00:00:00"):element.value;
              disabledValues.push(value);
          }
      });
      for (let value of disabledValues) {
          this.deleteItemToArray(value);
      }
  }

  enableDisableCheckBox(valueSearch:string,list:NodeListOf<any>, valuesFound:any, checked: boolean){
      [].forEach.call(list, function (element:any) {
          if (valuesFound.length > 0){
              for (let item of valuesFound){
                  if (item != null && item != 'undefined'){
                      if (item['model'] == element.value && item['date'].includes(valueSearch) || item['model'].includes(valueSearch)){
                          element.checked = checked;
                      }
                  }
              }
          }else{
              element.checked = checked;
          }
      });
  }

  enableDisableCheckBoxAll(list:NodeListOf<any>){
      let enabled = 0;
      let disabled = 0;
      [].forEach.call(list, function (element:any) {
        disabled = (!element.checked)?disabled+1:disabled;
        enabled = (element.checked)?enabled+1:enabled;
      });
      if (enabled == 1)
          list.item(0).checked = false;
      else if (disabled == 1)
          list.item(0).checked = true;
  }

  checkInfExistItemInArray(value:any, array: any): boolean{
      for(let i=0; i< array.length; i++ ) {
          if (array[i].date.indexOf(value) !== -1 || array[i].model.indexOf(value) !== -1) {
              return true;
          }
      }
      return false;
  }

  calculateStatistic(valuesCopy:Array<propertyCycleTimesMonthlyData>){
    this.arrayStatistic = [];

    //filter all property for station
    let filterStation = [];

    //result for property
  //  let arrayCycleTime;// = new Array();  //property CycleTime
    let arrayFaultTime = [];  //property FaultTime

    //  console.log(valuesCopy);
    //  console.log(filterStation);



    for (let i=0; i< this.arrayNameStation.length; i++) {
      let arrayCycleTime = [];
      let NameStation = this.arrayNameStation[i]

      //Filter stations
       filterStation = valuesCopy.filter(function (el) {
        return (el.name === NameStation );
      });

      for (let y=0; y< filterStation.length; y++) {
         arrayCycleTime.push(filterStation[y].cycleTime )
      }

      for (let z=0; z< filterStation.length; z++) {
        arrayFaultTime.push(filterStation[z].faultTime )
      }

      if (filterStation.length !=0 ){ //check


        let sumCycleTime  =arrayCycleTime.reduce((a, b) => a + b, 0);
        let sumFaultTime  =arrayFaultTime.reduce((a, b) => a + b, 0);
        
        let countFT = this.countNotZero(arrayFaultTime);

        let ENN      =  this.NameENN;
        let Station  = filterStation[0].name

        let Median   = this.median(arrayCycleTime);
        
        Median = parseFloat(Median.toFixed(2));

        let Average = this.mean(arrayCycleTime);
        Average = parseFloat(Average.toFixed(2));

        let TCDS_Seg =  this.standardDeviation(arrayCycleTime);
        TCDS_Seg = parseFloat(TCDS_Seg.toFixed(2));

        let MTBF_Mins = (((sumCycleTime + sumFaultTime)/countFT)/60);
        MTBF_Mins = parseFloat(MTBF_Mins.toFixed(2));

        let MTTR_Mins =  ((this.mean(arrayFaultTime))/60);
        MTTR_Mins = parseFloat(MTTR_Mins.toFixed(2));

        let MTTR_DS_Mins =  ((this.standardDeviation(arrayFaultTime))/60);
        MTTR_DS_Mins = parseFloat(MTTR_DS_Mins.toFixed(2));

        let CycleTime_Seg = sumCycleTime
        CycleTime_Seg = parseFloat(CycleTime_Seg.toFixed(2));

        let FaultTime_Seg = sumFaultTime
        FaultTime_Seg = parseFloat(FaultTime_Seg.toFixed(2));

        let FaultTime_Events = countFT;
        FaultTime_Events = parseFloat(FaultTime_Events.toFixed(2));
        
        
        var object = new Object();
        object['ENN'] = ENN
        object['Station'] == Station;
        object['Median'] = Median;
        object['Average'] = Average;
        object['TCDS Seg'] = TCDS_Seg;
        object['MTBF Mins'] = MTBF_Mins;
        object['MTTR Mins'] = MTTR_Mins;
        object['MTTR DS Mins'] = MTTR_DS_Mins;
        object['CycleTime Seg'] = CycleTime_Seg;
        object['FaultTime Seg'] = FaultTime_Seg;
        object['FaultTime Events'] = FaultTime_Events;
        this.arrayStatistic.push(object);


      }

    }

  }

  median(numbers:any){

    let median = 0, numsLen = numbers.length;
    numbers.sort();

    if (
        numsLen % 2 === 0 // is even
    ) {
        // average of two middle numbers
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else { // is odd
        // middle number only
        median = numbers[(numsLen - 1) / 2];
    }

    return median
  }

  mean(numbers:any) {
    let total = 0, i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    let mean = total / numbers.length;
    return mean;
  }

  standardDeviation(values:any){
    let avg = this.mean(values);

    let squareDiffs = values.map(function(value:any){
      let diff = value - avg;
      return diff * diff;
    });

    let avgSquareDiff = this.mean(squareDiffs);

    return Math.sqrt(avgSquareDiff);
  }

  countNotZero(array:any) {
    for(let i=0; i<array.length;i++ )
    {
       if(array[i]==0)
       array.splice(i,1);
    }

    return array.length;
  }

  loadArrayDate() {
    this.helper = new Helper();
    this.arrayDate = [];
    //set property array date
    for (let i=0; i< this.datesUnique.length; i++) {
      let propertyCheck = new PropertyCheck();
      const date = new Date(this.datesUnique[i]);
      propertyCheck.date = this.helper.dateProcessingWithDashFormat(date);
      this.arrayDate.push(propertyCheck);
    }

    this.arrayDate.sort(function(a:any, b:any){
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  }

  loadArrayModels() {
    this.arrayModels = [];
    for (let i=0; i< this.modelsUnique.length; i++) {
        let propertyCheck = new PropertyCheck();
        propertyCheck.model = this.modelsUnique[i];
        this.arrayModels.push(propertyCheck);
    }

    this.arrayModels.sort(function(a:any, b:any){
        return +(a.model.attr > b.model.attr) || +(a.model.attr === b.model.attr) - 1;
    });
  }

  loadArrayStation() {
    this.arrayNameStation = [];
      //get distinct dates
      for (let i=0; i< this.values.STATIONS.length; i++) {
        if ( this.arrayNameStation.indexOf(this.values.STATIONS[i].name) === -1) {
          this.arrayNameStation.push(this.values.STATIONS[i].name);
        }
      }
  }

  monthName():string {
    this.dataMonthNames = [];
    let keysMonth = Object.keys(Months);
    for (let month in Months){
        let object   = new Month();
        object.value = Months[month];
        object.lbl = month;
        this.dataMonthNames.push(object);
    }
    let date = new Date();
    return Months[keysMonth[date.getMonth()]];
  }

  year():number {
    let d = new Date();
    return d.getFullYear();
  }

  IgnoreCyclesWithCyclesTime() {
    this.IgnoreCyclesTime = new Array();
    this.IgnoreCyclesTime = [1,2,3,4,5,6,7,8,9,10];
    this.Cycletime = 1;
  }

  initialize(){

    this.arrayStatistic = new Array<Object>();
    var object = new Object();
    object['ENN'] = 'No data';
    object['Station'] == 'No data';
    object['Median'] = 0;
    object['Average'] = 0;
    object['TCDS Seg'] = 0;
    object['MTBF Mins'] = 0;
    object['MTTR Mins'] = 0;
    object['MTTR DS Mins'] = 0;
    object['CycleTime Seg'] = 0;
    object['FaultTime Seg'] = 0;
    object['FaultTime Events'] = 0;
    this.arrayStatistic.push(object);

    this.arrayDate = [];
    this.arrayModels= [];
  }

}

class PropertyCheck{
  date:string;
  model:string;
}

class propertyCycleTimesMonthlyData{
  cycleTime:number;
  date:string
  faultTime:number;
  model:string;
  name:string;
  shift:number;
}

class Month{
  lbl:string;
  value:string;
}


