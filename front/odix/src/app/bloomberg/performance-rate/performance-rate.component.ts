import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceRateService } from './performance-rate.service';
import { Subject } from 'rxjs/Subject';
import { Helper } from '@app/shared/helper';
import * as Rx from 'rxjs/Rx';
import { AmChartsDirective } from '@amcharts/amcharts3-angular';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'performance-rate',
  templateUrl: './performance-rate.component.html',
  styleUrls: ['./performance-rate.component.scss']
})
export class PerformanceRateComponent implements OnInit, OnDestroy {
  plantName: string;
  joinedStations: any[];
  processList: any[];
  lineList: any[];
  groupList: any[];
  mostCriticalStations: any[];
  ennList: any[];
  filter: any;
  filterData:any;
  helper:Helper;
  fechaInicial:[Date,Date];
  graphData: any;
  lastUpdateDate: string;
  framesLostLimit = 0;
  topFive: any = [];
  ennFilter = '';
  acHidden = true;
  acNotFound = true;
  topColors = ['#F43A18','#F56F23','#F8921C','#2B44B1','#127BE6', '#148007'];
  stationListCombo: any= [];
  stationListData: any=[];
  acParam:any;
  searchParam= '';
  load = false;
  selectedRange = -1;
  sub:any;
  scrollable = false;
  //OPCIONES DATEPICKER
  maxDate: Date;
  minDate: Date;
  linePlaceHolder: any;
  processPlaceholder: any;
  constructor( private route: ActivatedRoute, private performanceService: PerformanceRateService, private AmCharts: AmChartsService, private ref: ChangeDetectorRef) {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.helper = new Helper();
    var d = new Date();
    this.minDate.setMonth(this.minDate.getMonth()-8);
    this.fechaInicial = [this.primerDia(d), d];
    this.filter = {
      "process": null, 
      "line": null, 
      "group": null, 
      "date": ['2019-03-05', '2019-03-05'], 
      "data": "clean",
      "nbt": ""
    };
  }

  ngOnInit() {
    this.load = true;
    this.plantName = this.route.snapshot.paramMap.get('plantName');
    //console.log(this.plantName);
    this.performanceService.getFilters().
    subscribe(res => {
      //console.log("REsupESTA DE FILTROS: ");
      //console.log(res);
      this.load = false;
      this.filterData = res;
      this.initFilters();
      this.autoUpdate();
    });
  }

  autoUpdate(){
    this.sub = Observable.interval(71000).takeWhile(() => true).subscribe(() => {
      var calDate = this.fechaInicial[1];
      var now = new Date();
      calDate.setHours(0,0,0,0);
      now.setHours(0,0,0,0);
      if(calDate.getTime()==now.getTime()){
        this.performSearch();
      }
    });
  }

  initFilters(){
    this.processList = this.filterData['Process'];
    this.processList = this.filterData['Process'].filter((pro:any) => pro.Code == 'DT');
    this.filter.process = this.processList[0].Code;
    this.loadLineCombo();
  }

  loadLineCombo(){
    this.processList.forEach((proc: any) => {
      if(proc.Code == this.filter.process){
        this.processPlaceholder =proc.Description;
      }
    });
    this.lineList = this.filterData['Line'].filter((linea: any) => linea.CodeParent==this.filter.process);
    this.filter.line = this.lineList[0].Code;
    this.linePlaceHolder = this.lineList[0].Description;
    this.ennList = this.filterData['NBT'].filter((nbt: any) => nbt.CodeParent==this.filter.line);
    this.ennFilter = 'all';
    this.loadGroupCombo();
  }

  loadGroupCombo(){
    this.groupList = this.filterData['Group'].filter((grupo: any) => (grupo.CodeParent==this.filter.line) || (grupo.CodeParent==null));
    //console.log(this.filter.group = this.groupList);
    this.filter.group = "BOTH";
    this.performSearch();
  }

  performSearch(){
    this.load = true;
    this.topColors = ['#F43A18','#F56F23','#F8921C','#2B44B1','#127BE6', '#148007'];
    this.topFive = [];
    this.framesLostLimit = 0;
    //console.log("Parámetros: ");
    //console.log(this.filter);
    if(this.filter.process == null ) {return;}
    this.performanceService.getGraphs(this.filter.date[0],this.filter.date[1],
      this.filter.line,this.filter.group,this.filter.data).
    subscribe(res => {
      //console.log("REsupESTA DE GRÁFICAS: 1 ");
      //console.log(res);
      this.highlightDateOption();
      this.load = false;
      this.lastUpdateDate = res.LastUpdateDate;
      this.graphData = res;
      this.mostCriticalStations = res.MostCriticalStations;
      //GRÁFICAS
      let datFrameLost = this.generateChartDataFramesLost(res.FramesLostByNBT);
      let graphsFrameLost = this.generateGraphElementFramesLost(res.FramesLostByNBT);
      let datLineBalance = res.ProductionLineBalance;

      this.frames1(datFrameLost,graphsFrameLost,this.framesLostLimit);
      this.frames2(datLineBalance,false);
      this.frames3(datLineBalance,false);
      this.loadAllStations();
    });
  }

  performSearchBy(days: number){
    var yest = new Date();
    yest.setDate(yest.getDate()-1);
    var stDate = new Date();
    var enDate = new Date();
    stDate.setDate(stDate.getDate()-days);
    enDate = (days == 1) ? stDate : enDate;
    enDate = (days == 7) ? yest : enDate;
    this.filter.date  = [this.helper.dateProcessingWithDashFormat(stDate), this.helper.dateProcessingWithDashFormat(enDate)];
    this.fechaInicial = [stDate,enDate];
  }

  filterByEnn(highlight: boolean){
    let res = this.graphData;
    let datLineBalance = res.ProductionLineBalance;
    this.frames2(datLineBalance,highlight);
    this.frames3(datLineBalance,highlight);
    if(!highlight){
      this.searchParam = '';
    }
  }

  comboSearch(event: any){
    this.acHidden = false;
    this.acNotFound = true;
    this.stationListCombo = this.stationListData.filter((el:any) => el.Station.toUpperCase().includes(this.searchParam.toUpperCase()));
    //console.log(this.stationListCombo);
    if(this.stationListCombo && this.stationListCombo.length <= 0){
      this.acNotFound = false;
      this.acHidden = true;
    }
  }

  closeOptions(){
    setTimeout(() => {
      this.acHidden = true;
      this.acNotFound = true;
    }, 200);
  }

  selectOptionCombo(val:any){
    //console.log("Estoy entrando aqui");
    //console.log(val);
    this.searchParam = val.Station;
    this.acParam = val;
    this.acHidden = true;
    this.acNotFound = true;
    this.graphData.ProductionLineBalance.forEach((enn:any) => {
      enn.BalanceStations.forEach((st:any) => {
        //console.log("Mi valor es: ");
        //console.log(st.Station);
        if(val.Station == st.Station.split("DT1-").pop()){
          this.ennFilter = enn.NBT;
          this.filterByEnn(true);
          return;
        }
      });
    });

  }

  loadAllStations(){
    this.stationListData = [];
    this.graphData.ProductionLineBalance.forEach((enn:any) => {
      enn.BalanceStations.forEach((st:any) => {
        st.Station = st.Station.split("DT1-").pop();
        this.stationListData.push(st);
      });
    });
  };

  onDateSelection(value: Date): void {
    if (value != null) {
      this.filter.date  = [this.helper.dateProcessingWithDashFormat(value[0]), this.helper.dateProcessingWithDashFormat(value[1])];
      this.performSearch();
    }
  }

  highlightDateOption(){
    var init = this.fechaInicial[0];
    var end = this.fechaInicial[1];
    var now = new Date();
    var yest = new Date();
    var seven = new Date();
    now.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    init.setHours(0,0,0,0);
    yest.setHours(0,0,0,0);
    seven.setHours(0,0,0,0);
    yest.setDate(yest.getDate()-1);
    seven.setDate(seven.getDate()-7);
    this.selectedRange = ((init.getTime() == now.getTime()) && (end.getTime() == now.getTime())) ? 0 
    : ((init.getTime() == yest.getTime()) && (end.getTime() == yest.getTime())) ? 1 
    : ((init.getTime() == seven.getTime()) && (end.getTime() == yest.getTime())) ? 7 : -1;
  }

  clickCriticalStations(st: any, index: any){
    this.load = true;
    setTimeout(() => {
      this.load = false;
    }, 1000);
    console.log("Entre en 1 split");
    this.selectOptionCombo({"Station": this.splitStation(st.Station)});
  }

  changeLineCombo(){
    console.log("Entre en 2 split");
    this.linePlaceHolder = this.filter.line.split("DT1-").pop();
    this.loadGroupCombo();
  }

  clickGraph(event: any){
    
    let opt = this.joinedStations[event.target.index]
    //event.item.dataContext['piv']
    /*console.log("Aqui antes de llamar");
    console.log(opt.Station);*/
    console.log("Entre en 3 split");
    this.selectOptionCombo({"Station": this.splitStation(opt.Station)});
    this.ref.detectChanges();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  generateChartDataFramesLost(frames: any){
    var first = true;
    var elementos:any = [];
    this.joinedStations = [];
    frames.forEach((nbt: any) => {
      var container: any = [];
      container["NBT"] = nbt.NBT;
      container["elcolor"] = "#6D7080";
      nbt.Stations.forEach((st: any) => {
        container["piv"] = st.Station;
        this.joinedStations.push(st);
        container[st.Station] = st.LostFrames;
        this.topFive.push(st.LostFrames);
        if (first) {
          this.framesLostLimit+= st.LostFrames;
        }
      });
      first = false;
      elementos.push(container);
    });
    
    return elementos;
  }

  sortNumber(a:number,b:number) {
    return a - b;
  }

  primerDia(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
  }

  fDate(date: Date): string {
    let month = (date.getMonth() + 1).toString();
    if (month.length !== 2) {
      month = '0' + month;
    }
    const day = date.toString().substring(8, 10);
    return day + '-' + month + '-' +  date.getFullYear().toString();
  }

  orderManRule(data: any){
    return data.sort((val: any,val2: any) => {
      if (val.ManufacturingRule > val2.ManufacturingRule) {
        return -1;
      }
      if (val.ManufacturingRule < val2.ManufacturingRule) {
        return 1;
      }
      return 0;
    });
  }


  generateGraphElementFramesLost(frames: any){
    var elementos:any = [];
    var pieceColor = "#484A55";
    var topValues = this.topFive.sort(this.sortNumber).reverse().slice(0,6);
    //console.log(topValues);
    frames.forEach((nbt: any) => {
      nbt.Stations.forEach((st: any) => {
        let indice = topValues.indexOf(st.LostFrames);
        pieceColor = (indice >= 0) ? this.topColors[indice] : "#484A55";
        elementos.push({
          "alphaField": "alpha",
          "balloonText": " <table cellspacing='0' cellpadding='0' class='tooltipContainer tool2'> <tr> <td class='property'> NBT: </td><td class='value'> [[category]] </td></tr><tr> <td class='property'> Station: </td><td class='value'> [[title]] </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[value]] </td></tr></table>",
          "fillAlphas": 1,
          "lineColor": pieceColor,
          "lineColorField": "elcolor",
          "title": this.splitStation(st.Station),
          "type": "column",
          "valueField": st.Station,
          "dashLengthField": "dashLengthColumn",
        });
      });
    });
    return elementos;
  }

  frames1(data:any,graphs:any,maximo:any){
    var chart = this.AmCharts.makeChart( "frames1", {
      "type": "serial",
      "addClassNames": true,
      "theme": "dark",
      "autoMargins": false,
      "marginLeft": 30,
      "marginRight": 8,
      "marginTop": 10,
      "marginBottom": 26,
      "fontSize": 17,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#e8e8e8",
        "fillColor": "#0e0f13",
        "borderThickness": .5,
        "cornerRadius": 2,
      },
      "dataProvider": data,
      "valueAxes": [ {
        "reversed" : false,
        "stackType": "regular",
        "axisAlpha": 0,
        "position": "left",
        "maximum": maximo,
      } ],
      "startDuration": 1,
      "graphs": graphs,
      "categoryField": "NBT",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0,
        "minVerticalGap":20
      },
      "export": {
        "enabled": true
      }
    } );
    chart.addListener("clickGraphItem",this.clickGraph.bind(this));
  }

  splitStation(value: String){
    //console.log("Ando en splitStation"); 
    //console.log(value); 
    let station = value.split("DT1-").pop();
    //console.log(station);
    /*if(station.length > 1){
      station.shift();
    }*/
    return station;
    
  }

  frames2(model: any,highlight: boolean){
    this.scrollable = false;
    var data = model;
    if(!this.ennFilter.includes('all')){
      data = model.filter((st: any) => st.NBT == this.ennFilter);
      data = data[0] && data[0].BalanceStations;
    }else{
      data = data.map((el: any) => el.BalanceStations);
      data = [].concat.apply([], data);
    }
    var dataFinal:any[] = [];
    var maximo = 0;
    data && data.forEach((el:any) => {
      var sum = (el.LRT+el.Variation);
      maximo = ( sum> maximo) ? sum : maximo;
      if((!highlight) || (this.acParam && this.acParam.Station == el.Station)){
        el['elAlpha'] = 1;
      } else {
        el['elAlpha'] = 0.3;
      }
      if(el.Station){
        el.Station = this.splitStation(el.Station)
      }
      dataFinal.push(el);
    });
    
    //WIDTH DE REGLAS DE MANOFACTURA
    if(dataFinal.length > 20){
      this.scrollable = true;
      $('#frames2').css('width', '100%');
      $('.amchart-container-2').css('width', '100%');
    }
    if(dataFinal.length >= 23){
      this.scrollable = true;
      $('.amchart-container-2').css('width', '102.5%');
      $('#frames2').css('width', '100%');
    }
    if(dataFinal.length > 30){
      this.scrollable = true;
      $('#frames2').css('width', '100%');
      $('.amchart-container-2').css('width', '100%');
    }
    if(dataFinal.length <= 8){
      this.scrollable = true;
      $('.amchart-container-2').css('width', '101%');
    }
    if(dataFinal.length == 9){
      this.scrollable = true;
      $('.amchart-container-2').css('width', '99.5%');
    }
    if(dataFinal.length == 10){
      this.scrollable = true;
      $('.amchart-container-2').css('width', '108%');
      $('#frames2').css('width', '100%');
    }
    if(dataFinal.length > 60){
      this.scrollable = true;
      $('.amchart-container-2').css('width', '198%');
      $('#frames2').css('width', '200%');
      $('#frames3').css('width', '200%');
    } else{
      $('#frames2').css('width', '100%');
      $('#frames3').css('width', '100%');
    }

    dataFinal = this.orderManRule(dataFinal);
    this.manufactureTest(dataFinal);
    var chart = this.AmCharts.makeChart( "frames2", {
      "type": "serial",
      "addClassNames": true,
      "theme": "dark",
      "autoMargins": false,
      "marginLeft": 30,
      "marginRight": 8,
      "marginTop": 10,
      "marginBottom": 26,
      "fontSize": 14,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#e8e8e8",
        "fillColor": "#484A55",
        "borderThickness": .5,
        "cornerRadius": 2,
      },
      "dataProvider": dataFinal,
      "valueAxes": [ {
        "stackType": "regular",
        "axisAlpha": 0,
        "position": "left",
        "maximum": maximo
      } ],
      "startDuration": 0,
      "graphs": [{
        "alphaField": "elAlpha",
        "balloonText": "<table cellspacing='0' cellpadding='0' class='tooltipContainer'> <tr> <td class='property'> Station: </td><td class='value'> [[Station]] </td></tr><tr> <td class='property'> Manufacturing Rule: </td><td class='value'> [[ManufacturingRule]] </td></tr><tr> <td class='property'> LRT: </td><td class='value'> [[LRT]] sec </td></tr><tr> <td class='property'> Variation: </td><td class='value'> [[Variation]] sec </td></tr><tr> <td class='property'> MeanCT: </td><td class='value'> [[MeanCT]] sec </td></tr><tr> <td class='property'> Median: </td><td class='value'> [[Median]] sec </td></tr><tr> <td class='property'> Cycle time goal: </td><td class='value'> [[CycleTimeGoal]] sec </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[LossPR]] </td></tr></table>",
        "title": "LRT",
        "type": "column",
        "valueField": "LRT",
        // "dashLengthField": "dashLengthColumn",
        // "lineThickness": "10",
        "lineColor": "#2B44B1"
      },{
        "alphaField": "elAlpha",
        "balloonText": "<table cellspacing='0' cellpadding='0' class='tooltipContainer'> <tr> <td class='property'> Station: </td><td class='value'> [[Station]] </td></tr><tr> <td class='property'> Manufacturing Rule: </td><td class='value'> [[ManufacturingRule]] </td></tr><tr> <td class='property'> LRT: </td><td class='value'> [[LRT]] sec </td></tr><tr> <td class='property'> Variation: </td><td class='value'> [[Variation]] sec </td></tr><tr> <td class='property'> MeanCT: </td><td class='value'> [[MeanCT]] sec </td></tr><tr> <td class='property'> Median: </td><td class='value'> [[Median]] sec </td></tr><tr> <td class='property'> Cycle time goal: </td><td class='value'> [[CycleTimeGoal]] sec </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[LossPR]] </td></tr></table>",
        "lineColor": "#484A55",
        "title": "Variation",
        "type": "column",
        "valueField": "Variation",
        "dashLengthField": "dashLengthColumn"
      }, {
        "id": "graph1",
        "stackable": false,
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px; font-weight: 800'>[[value]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#eeeeee",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "type": "line",
        "lineAlpha": 1,
        "title": "MeanCT",
        "valueField": "MeanCT",
      }, {
        "id": "graph3",
        "stackable": false,
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px; font-weight: 800'>[[value]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "type": "line",
        "lineAlpha": 1,
        "title": "Median",
        "valueField": "Median",
      },{
        "id": "graph2",
        "stackable": false,
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px; font-weight: 800'>[[value]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "type": "line",
        "lineAlpha": 1,
        "title": "Cycle time goal",
        "valueField": "CycleTimeGoal",
      }],
      "categoryField": "Station",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0,
        //"labelRotation": 90,
      },
      "export": {
        "enabled": true
      }
    } );
    chart.addListener("clickGraphItem", (e:any) =>{
      //console.log(e);
      this.filterByEnn(false);
    });
  }

  frames3(model: any, highlight: boolean){
    var dataFinal:any[] = [];
    var data = model;
    if(!this.ennFilter.includes('all')){
      data = model.filter((st: any) => st.NBT == this.ennFilter);
      data = data[0] && data[0].DeviationStations;
    }else{
      data = data.map((el: any) => el.DeviationStations);
      data = [].concat.apply([], data);
    }
    var maximo = 0;
    data && data.forEach((el:any) => {
      let sum = el.Load + el.Clamp + el.Process +el.UnClamp + el.UnLoad;
      maximo = (sum>maximo) ? sum : maximo;
      if((!highlight) || (this.acParam && this.acParam.Station == el.Station)){
        el['elAlpha'] = 1;
      }else{
        el['elAlpha'] = 0.3;
      }
      if(el.Station){
        el.Station = this.splitStation(el.Station)
      }
      dataFinal.push(el);
    });
    dataFinal = this.orderManRule(dataFinal);
    var chart = this.AmCharts.makeChart( "frames3", {
      "type": "serial",
      "addClassNames": true,
      "theme": "dark",
      "autoMargins": false,
      "marginLeft": 30,
      "marginRight": 8,
      "marginTop": 10,
      "marginBottom": 26,
      "fontSize": 14,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#e8e8e8",
        "fillColor": "#0e0f13",
        "borderThickness": .5,
        "cornerRadius": 2,
      },
      "dataProvider": dataFinal,
      "valueAxes": [ {
        "stackType": "regular",
        "axisAlpha": 0,
        "position": "left",
        "maximum": maximo,
      } ],
      "startDuration": 1,
      "graphs": [{
        "alphaField": "elAlpha",
        "balloonText": "<table cellspacing='0' cellpadding='0' class='tooltipContainer tool3'> <tr> <td class='property'> Station: </td><td class='value'> [[Station]] </td></tr><tr> <td class='property'> σ<sup>2</sup> Load: </td><td class='value'> [[Load]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Clamp: </td><td class='value'> [[Clamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Process: </td><td class='value'> [[Process]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unclamp: </td><td class='value'> [[UnClamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unload: </td><td class='value'> [[UnLoad]] sec </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[LossPR]] </td></tr></table>",
        "fillAlphas": 1,
        "lineColor": "#efb745",
        "title": "Load",
        "type": "column",
        "valueField": "Load",
        "dashLengthField": "dashLengthColumn"
      },{
        "alphaField": "elAlpha",
        "balloonText": "<table cellspacing='0' cellpadding='0' class='tooltipContainer tool3'> <tr> <td class='property'> Station: </td><td class='value'> [[Station]] </td></tr><tr> <td class='property'> σ<sup>2</sup> Load: </td><td class='value'> [[Load]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Clamp: </td><td class='value'> [[Clamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Process: </td><td class='value'> [[Process]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unclamp: </td><td class='value'> [[UnClamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unload: </td><td class='value'> [[UnLoad]] sec </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[LossPR]] </td></tr></table>",
        "fillAlphas": 1,
        "lineColor": "#e46941",
        "title": "Clamp",
        "type": "column",
        "valueField": "Clamp",
        "dashLengthField": "dashLengthColumn"
      }, {
        "alphaField": "elAlpha",
        "balloonText": "<table cellspacing='0' cellpadding='0' class='tooltipContainer tool3'> <tr> <td class='property'> Station: </td><td class='value'> [[Station]] </td></tr><tr> <td class='property'> σ<sup>2</sup> Load: </td><td class='value'> [[Load]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Clamp: </td><td class='value'> [[Clamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Process: </td><td class='value'> [[Process]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unclamp: </td><td class='value'> [[UnClamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unload: </td><td class='value'> [[UnLoad]] sec </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[LossPR]] </td></tr></table>",
        "fillAlphas": 1,
        "lineColor": "#8acb41",
        "title": "Process",
        "type": "column",
        "valueField": "Process",
        "dashLengthField": "dashLengthColumn"
      }, {
        "alphaField": "elAlpha",
        "balloonText": "<table cellspacing='0' cellpadding='0' class='tooltipContainer tool3'> <tr> <td class='property'> Station: </td><td class='value'> [[Station]] </td></tr><tr> <td class='property'> σ<sup>2</sup> Load: </td><td class='value'> [[Load]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Clamp: </td><td class='value'> [[Clamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Process: </td><td class='value'> [[Process]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unclamp: </td><td class='value'> [[UnClamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unload: </td><td class='value'> [[UnLoad]] sec </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[LossPR]] </td></tr></table>",
        "fillAlphas": 1,
        "lineColor": "#4c8d28",
        "title": "Unclamp",
        "type": "column",
        "valueField": "UnClamp",
        "dashLengthField": "dashLengthColumn"
      }, {
        "alphaField": "elAlpha",
        "balloonText": "<table cellspacing='0' cellpadding='0' class='tooltipContainer tool3'> <tr> <td class='property'> Station: </td><td class='value'> [[Station]] </td></tr><tr> <td class='property'> σ<sup>2</sup> Load: </td><td class='value'> [[Load]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Clamp: </td><td class='value'> [[Clamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Process: </td><td class='value'> [[Process]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unclamp: </td><td class='value'> [[UnClamp]] sec </td></tr><tr> <td class='property'> σ<sup>2</sup> Unload: </td><td class='value'> [[UnLoad]] sec </td></tr><tr> <td class='property'> Loss PR: </td><td class='value'> [[LossPR]] </td></tr></table>",
        "fillAlphas": 1,
        "lineColor": "#3949d8",
        "title": "Unload",
        "type": "column",
        "valueField": "UnLoad",
        "dashLengthField": "dashLengthColumn"
      }],
      "categoryField": "Station",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
      },
      "export": {
        "enabled": true
      }
    } );
  }

  manufactureTest(data: any){
    
    //console.log(data.length);
    var rules:any = [];
    rules["1"]= 0;
    rules["2"]= 0;
    rules["3"]= 0;
    rules["4"]= 0;
    rules["5"]= 0;
    data.forEach((element: any) => {
      rules[element.ManufacturingRule.toString()] = rules[element.ManufacturingRule.toString()]+1;
    });
    var chart = this.AmCharts.makeChart("manu", {
      "type": "serial",
      "theme": "dark",
      "legend": {
          "horizontalGap": 10,
          "maxColumns": 1,
          "position": "right",
      "useGraphSettings": true,
      "markerSize": 10
      },
      "dataProvider": [{
          "year": 2003,
          "mr5": rules["5"],
          "mr4": rules["4"],
          "mr3": rules["3"],
          "mr2": rules["2"],
          "mr1": rules["1"],
      }],
      "valueAxes": [{
          "stackType": "regular",
          "axisAlpha": 0.5,
          "gridAlpha": 0
      }],
      "graphs": [{
          "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
          "fillAlphas": 0.8,
          "labelText": "5",
          "lineAlpha": 0.3,
          "title": "mr5",
          "type": "column",
          "color": "#000000",
          "valueField": "mr5"
      }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "4",
        "lineAlpha": 0.3,
        "title": "mr4",
        "type": "column",
		    "color": "#000000",
        "valueField": "mr4"
    }, {
      "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
      "fillAlphas": 0.8,
      "labelText": "3",
      "lineAlpha": 0.3,
      "title": "mr3",
      "type": "column",
      "color": "#000000",
      "valueField": "mr3"
    }, {
      "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
      "fillAlphas": 0.8,
      "labelText": "2",
      "lineAlpha": 0.3,
      "title": "mr2",
      "type": "column",
      "color": "#000000",
      "valueField": "mr2"
    }, {
      "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
      "fillAlphas": 0.8,
      "labelText": "1",
      "lineAlpha": 0.3,
      "title": "mr1",
      "type": "column",
      "color": "#000000",
      "valueField": "mr1"
    }],
      "rotate": true,
      "categoryField": "year",
      "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha": 0,
          "gridAlpha": 0,
          "position": "left"
      },
      "export": {
        "enabled": true
       }
  });
  }


}
