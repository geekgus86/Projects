import { Component, OnInit, NgZone, Inject, LOCALE_ID , Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AmChartsService } from '@amcharts/amcharts3-angular';

import { KpiDashboardService } from '@app/bloomberg/kpi-dashboard/kpi-dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '@app/shared/helper';
import { Router } from '@angular/router';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import { TranslateService } from '@ngx-translate/core';
//import { OdixHeaderService } from '@app/core/shell/odix/header/odix-header.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-kpi-dashboard',
  templateUrl: './kpi-dashboard.component.html',
  styleUrls: ['./kpi-dashboard.component.scss']
})
export class KpiDashboardComponent implements OnInit {

  expandedFull: boolean = false;
  helper: Helper;

  // Datos de indicadores y gráficas
  //kpi : any;
  primaryIndicatorData: any;
  secondaryIndicatorData: any;
  downtimeData: any;
  changeoverData: any;
  changeOverNew :any;
  changeOverNewArray : any;
  productivityData: any;
  // Nombre de planta
  plantName: string;
  prensa : string;
  // Último día productivo
  lastProductiveDay: any;

  //Variables para el componente de fecha
  maxDate: Date;
  minDate: Date;
  filter: any;
  filterData:any;
  fechas:Date[];

  //Variables para fechas entre componentes
  fechasComp:Date[];

  // Datos para prensas
  press: string;
  pressOptions: any;

  // Datos para herramientas
  tool: string;
  toolOptions: any;

  showTool:string;
  showToolFake : string = "0";
  showPress:string;
  showDate:string;

  greenIndicatorColor:any = "#008A00";
  redIndicatorColor:any = "#D31D00";
  blueIndicatorColor:any = "#0099ED";
  opColor:any = "#002FEE";
  mttoColor:any = "#FF1F00";
  htasColor:any = "#3D8735";
  calColor:any = "#B3B3B3";
  logColor:any = "#FF8126";

  strokesIndicatorStyle:any = this.greenIndicatorColor;
  oaxprIndicatorStyle:any = this.greenIndicatorColor;
  downtimeIndicatorStyle:any = this.greenIndicatorColor;
  changeoverIndicatorStyle:any = this.greenIndicatorColor;

  expandedTitle:any;
  maxDateFake : any;

  //LEYENDA HORA POR HORA
  hbhLegend: boolean = false;

  //LOADER
  loader : any = false;
  llamadas = [false, false, false, false];
  inputFormat : string;
  dataDateFormatGraph : string;
  herramienta : string;

  /*MTTR*/
  alto : string;
  bajo : string;
  errorCode : string;
  cantidad : string;


  ballonTextCO1 = "";
  ballonTextCO2 = "";
  ballonTextCO3 = "";
 

  ballonTextMTTR1 = "";
  ballonTextMTTR2 = "";
  ballonTextMTTR3 = "";

  
  ballonTextHXH1 = "";
  ballonTextHXH2 = "";
  ballonTextHXH3 = "";
  ballonTextHXH4 = "";


  constructor(private AmCharts: AmChartsService, private route: ActivatedRoute,
    private kpiService: KpiDashboardService, private router: Router, private datePipe:DatePipe,
    @Inject(LOCALE_ID) public locale: string, public translateService: TranslateService) {
    console.log("===============  KPI DASHBOARD COMPONENT ===============");
    //console.log(this.route.snapshot.data)
    this.primaryIndicatorData = this.route.snapshot.data.kpi[0];
    
    this.secondaryIndicatorData = this.route.snapshot.data.kpi[1]; //Disponibilidad
    this.pressOptions = this.route.snapshot.data.kpi[2];
    if(!this.press)
      this.press = this.pressOptions[0].id;
    this.lastProductiveDay = this.route.snapshot.data.kpi[3].lastProductiveDay;
    this.toolOptions = this.route.snapshot.data.kpi[4];
    this.tool = "todas";
    
    

    this.plantName = this.route.snapshot.paramMap.get('plantName');
    if(this.plantName == "apodaca"){
      this.inputFormat = 'DD/MM/YYYY';
      this.dataDateFormatGraph = "YYYY-MM-DD"; //actual apodaca.
      this.translateService.use('es-MX');
      this.ballonTextCO1 = "Herramienta";
      this.ballonTextCO2 = "Afectaciones Changeover";
      this.ballonTextCO3 = "Minútos por area";
      
      this.ballonTextMTTR1 = "Max MTTR";
      this.ballonTextMTTR2 = "Min MTTR";
      this.ballonTextMTTR3 = "Número de eventos";

      

      this.ballonTextHXH1 = "Hora";
      this.ballonTextHXH2 = "Golpes Totales";
      this.ballonTextHXH3 = "Golpes Potenciales";
      this.ballonTextHXH4 = "Herramientas";
     
    
      
      
     
    }else if(this.plantName == "etown"){
      this.inputFormat = 'MM/DD/YYYY';
      this.dataDateFormatGraph = "YYYY-MM-DD";
      this.translateService.use('en-US');
      this.ballonTextCO1 = "Tool";
      this.ballonTextCO2 = "ChangeOver Downtime";
      this.ballonTextCO3 = "Minutes per area";

      this.ballonTextMTTR1 = "MTTR Max";
      this.ballonTextMTTR2 = "MTTR Min";
      this.ballonTextMTTR3 = "Number of Events";

      this.ballonTextHXH1 = "Hour";
      this.ballonTextHXH2 = "Total Strokes";
      this.ballonTextHXH3 = "Potential Stroke";
      this.ballonTextHXH4 = "Tools";
      
     
    }




    
    this.prensa = this.route.snapshot.paramMap.get('prensa');

    this.helper = new Helper();

    // Inicializar data para el componente de fecha
    this.updateComponenteFecha(1);
    this.getAssets();
    this.updateShows();
  }

   updateShows(){
    
    if(this.pressOptions){
      if(this.press == "todas"){
        this.showPress = "Todas";
      }else{
        this.showPress = this.pressOptions.find((p: { id: string; name: string}) => p.id == this.press).name;
      }
    }

    if(this.toolOptions){
      if(this.tool == "todas"){
        //this.showTool = "Todas";
        //this.herramienta = "Herramienta";
        this.showToolFake = "0";
        this.translateService.stream('Herramientas').subscribe((text:string) => {this.herramienta = text });
        this.translateService.stream('Todas').subscribe((text:string) => {this.showTool = text });
      }else{
        //this.herramienta = "Herramienta";
        this.translateService.stream('Herramienta').subscribe((text:string) => {this.herramienta = text });
        this.showToolFake = this.toolOptions.find((p: { id: string; name: string}) => p.id == this.tool).name;
      }
    }

    if(this.fechas){
      if(this.helper.dateProcessingWithDashFormat(this.fechas[0]) == this.helper.dateProcessingWithDashFormat(this.fechas[1])){
        if(this.plantName == "apodaca")
        {
          this.showDate = this.datePipe.transform(this.fechas[0], 'dd-MMM-yyyy');

        }else if(this.plantName == "etown"){

          this.showDate = this.datePipe.transform(this.fechas[0], 'MMM-dd-yyyy');
        }
        
      }else{
        if(this.plantName == "apodaca")
        {
          this.showDate = `${this.datePipe.transform(this.fechas[0], 'dd-MMM-yyyy')} - ${this.datePipe.transform(this.fechas[1], 'dd-MMM-yyyy')}`;

        }else if(this.plantName == "etown"){

          this.showDate = `${this.datePipe.transform(this.fechas[0], 'MMM-dd-yyyy')} - ${this.datePipe.transform(this.fechas[1], 'MMM-dd-yyyy')}`;
        }
        
      }
    }

   }

  ngOnInit() {
    this.backgroundIndicatorCharts("miniHistoricStrokes","stroke");
    this.backgroundIndicatorCharts("miniHistoricOaxpr","oaxpr");
    this.backgroundIndicatorCharts("miniHistoricVCD","vsd");
    this.backgroundIndicatorCharts("miniHistoricVSD","vsd");
    this.backgroundIndicatorCharts("miniHistoricDowntime","downtime");
    this.getKpiInfo(false);
    this.updateShows();
    this.maxDateFake = new Date();

    
    
    /*this.translateService.get('Todas').subscribe((translated: string) => {
      console.log(translated);
    });*/
   
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateStylesIndicators();
      this.barDowntimeByDeparment();
      this.barDowntimeByTool();
      this.downtimeByMTTRArea();
    });
  }

  updateStylesIndicators(){
    if(this.primaryIndicatorData.strokesNumber >= this.primaryIndicatorData.strokeGoal){
      this.strokesIndicatorStyle = this.greenIndicatorColor;
    }else{
      this.strokesIndicatorStyle = this.redIndicatorColor;
    }
    if(this.primaryIndicatorData.oaxpr >= this.primaryIndicatorData.oaxprGoal ){
      this.oaxprIndicatorStyle =  this.greenIndicatorColor;
    }else{
      this.oaxprIndicatorStyle =  this.redIndicatorColor;
    }
    if(this.secondaryIndicatorData.dt <= this.secondaryIndicatorData.dtGoal){
      this.downtimeIndicatorStyle = this.greenIndicatorColor;
    }else{
      this.downtimeIndicatorStyle = this.redIndicatorColor;
    }
  }


  pressChanged(event:any){
    
    
    this.getTools();
  }

  revisarClick(event:any){
    this.loader = true;
    this.llamadas = [false, false, false, false];
    this.updateShows();
    this.getKpiInfo();
  }

  loaderValidation(servicio:number){
    this.llamadas[servicio] = true;
    var flag = true;
    this.llamadas.forEach(ser => {
      if(!ser){
        flag = false;
      }
    });
    if(flag){
      this.loader = false;
    }
  }

  getTools(): void {
    
    
    

    this.kpiService.getTools( this.plantName,this.helper.dateProcessingWithDashFormat(this.fechasComp[0]),this.helper.dateProcessingWithDashFormat(this.fechasComp[1]), this.press)
    .subscribe(res => {
      
      
      this.toolOptions = res;
      //if(!this.tool)
      this.tool = "todas";
      this.updateShows();
      // this.fillArrays();
      // this.Updatefecha();
    });
  }

  formatNum(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getAssets(): void {
    this.kpiService.getAssets(this.plantName)
    .subscribe(res => {
      
      
      /*this.pressOptions = res.filter((e:any) => {
          console.log("cuando entro");
          if(e.name != null )
          return this.plantName.includes('apodaca') ? e.name.includes('chuler') : !e.name.includes('chuler');
      });*/

      this.pressOptions = res;
      this.press = this.pressOptions[0].id;
      this.getTools();
    });
  }

  updateComponenteFecha(type : any ){
    
    // Inicializando el rango de fechas con el último día productivo.
    this.minDate = new Date();
    this.maxDate = new Date();

    if(type == 1){
      
      var parts = this.lastProductiveDay.split('-');
      this.maxDate = new Date(parts[0], parts[1] - 1, parts[2]);
      
      this.fechas = [this.maxDate, this.maxDate];
      this.fechasComp = [this.maxDate, this.maxDate];

    }

    this.minDate.setFullYear(this.maxDate.getFullYear()-1);

  }

  onDateSelection(value: Date[]): void {
  
    if (value != null) {
      
      this.fechasComp = [value[0], value[1]];
      this.getTools();
    }
  }

  getKpiInfo(indicators:any = true): void {

    if(indicators){
      this.kpiService.getKpiStampingPrimaryInd(this.plantName,this.helper.dateProcessingWithDashFormat(this.fechas[0]),this.helper.dateProcessingWithDashFormat(this.fechas[1]), this.press,this.tool)
      .subscribe(res => {
        
        //console.log(res);
        this.primaryIndicatorData = res;
        this.updateStylesIndicators();

        this.backgroundIndicatorCharts("miniHistoricStrokes","stroke");
        this.backgroundIndicatorCharts("miniHistoricOaxpr","oaxpr");
        this.backgroundIndicatorCharts("miniHistoricVCD","vcd");
        this.backgroundIndicatorCharts("miniHistoricVSD","vsd");
        this.loaderValidation(0);
      });
      this.kpiService.getKpiStampingDowntime(this.plantName,this.helper.dateProcessingWithDashFormat(this.fechas[0]),this.helper.dateProcessingWithDashFormat(this.fechas[1]), this.press,this.tool)
      .subscribe(res => {
        
        this.secondaryIndicatorData = res;
        this.updateStylesIndicators();
        this.backgroundIndicatorCharts("miniHistoricDowntime","downtime");
        this.barDowntimeByDeparment();
        this.barDowntimeByTool();
        this.downtimeByMTTRArea();
        this.loaderValidation(1);
        //this.backgroundIndicatorCharts("miniHistoricChangeover","changeover");
      });
      this.kpiService.getKpiStampingChangeOver(this.plantName,this.helper.dateProcessingWithDashFormat(this.fechas[0]),this.helper.dateProcessingWithDashFormat(this.fechas[1]), this.press,this.tool)
        .subscribe(res => {
          
          this.changeOverNew = res;
          this.changeOverNewArray = this.changeOverNew.events;
          if( this.changeOverNew.average <= this.changeOverNew.goal){
          
            this.changeoverIndicatorStyle = this.greenIndicatorColor;
          }else{
            
            this.changeoverIndicatorStyle = this.redIndicatorColor;
          }
          this.barCOPorDepartamento();
          this.backgroundIndicatorCharts("miniHistoricChangeover","changeover");
          this.stackCOByTools();
          this.loaderValidation(2);
          //this.barDowntimeByDeparment();
          //this.stackDowntimeByDeparment();
          //this.barDowntimeByTool();
          //this.stackDowntimeByTool();
          //this.downtimeByMTTRArea();
        });
        this.kpiService.getKpiStampingProductivity(this.plantName,this.helper.dateProcessingWithDashFormat(this.fechas[0]),this.helper.dateProcessingWithDashFormat(this.fechas[1]), this.press,this.tool)
        .subscribe(res => {
          console.log("getKpiStampingProductivity: ");
          
          this.productivityData = res;
          this.productivityChart();
          this.loaderValidation(3);
        });
    }else{
        this.kpiService.getKpiStampingChangeOver(this.plantName,this.helper.dateProcessingWithDashFormat(this.fechas[0]),this.helper.dateProcessingWithDashFormat(this.fechas[1]), this.press,this.tool)
        .subscribe(res => {
          console.log("getKpiStampingChangeOver: ");
          this.changeOverNew = res;
          this.changeOverNewArray = this.changeOverNew.events;
          if( this.changeOverNew.average <= this.changeOverNew.goal){
            
            this.changeoverIndicatorStyle = this.greenIndicatorColor;
          }else{
            
            this.changeoverIndicatorStyle = this.redIndicatorColor;
          }
          this.barCOPorDepartamento();
          this.backgroundIndicatorCharts("miniHistoricChangeover","changeover");
          this.stackCOByTools();
        });
        this.kpiService.getKpiStampingProductivity(this.plantName,this.helper.dateProcessingWithDashFormat(this.fechas[0]),this.helper.dateProcessingWithDashFormat(this.fechas[1]), this.press,this.tool)
        .subscribe(res => {
          
          this.productivityData = res;
          this.productivityChart();
        });
    }
  }

  changeOverAverageHistoric(id:any = "changeOverAverageHistoric"){
    var chart = this.AmCharts.makeChart( id, {
      "type": "serial",
      "theme": "none",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "dataDateFormat": "YYYY-MM-DD",
      "valueAxes": [ {
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth": true
      } ],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [ {
        "id": "g1",
        "balloon": {
          "drop": true,
          "adjustBorderColor": false,
          "color": "#ffffff",
          "type": "smoothedLine"
        },
        "fillAlphas": 0.2,
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      } ],
      "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha": 0,
        "zoomable": false,
        "valueZoomable": true,
        "valueLineAlpha": 0.5
      },
      "valueScrollbar": {
        "autoGridCount": true,
        "color": "#000000",
        "scrollbarHeight": 50
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      },
      "dataProvider": this.secondaryIndicatorData.changeover.history
    } );
  }




  // GRAFICAS DE DOWNTIME
  barDowntimeByDeparment(id:any = "barDowntimeByDeparment"){


    

    // Themes begin
     am4core.useTheme(am4themes_animated);
     am4core.useTheme(am4themes_dark);
     // Themes end

     // Create chart instance
     var chart = am4core.create(id, am4charts.XYChart);
     chart.maskBullets = false;
     chart.numberFormatter.numberFormat = "#.#";


    

     // Add data
     chart.data =  this.secondaryIndicatorData.afectacionPorDepartamento;

     console.log("Mis datos");
     console.log(this.secondaryIndicatorData.afectacionPorDepartamento);


     

    var coloresDepartamento = {"OP":"#002FEE","MTO":"#FF1F00","HTA":"#3D8735", "CAL": "#B3B3B3", "LOG": "#FF8126", "QTY":"#B3B3B3", "TLN": "#3D8735", "MNT": "#FF1F00", "PRO": "#002FEE"};


     // Create axes
     var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
     categoryAxis.dataFields.category = "departmen";
     categoryAxis.renderer.minGridDistance = 1;
    //  categoryAxis.renderer.grid.template.location = 0;

     var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
     valueAxis.renderer.inside = false;
     valueAxis.renderer.labels.template.disabled = false;
     valueAxis.min = 0;
     valueAxis.extraMax = 0.1;
     valueAxis.calculateTotals = true;


     // Create series
     function createSeries(field: any, name: any,index:any, color : any) {

       // Set up series
       var series = chart.series.push(new am4charts.ColumnSeries());
       series.name = name;
       series.dataFields.valueY = field;
       series.dataFields.categoryX = "departmen";
       series.fill = am4core.color(color);
       //series.columns.template.fill = am4core.color(color);;
       //series.columns.template.stroke = am4core.color("white");;

       //series.sequencedInterpolation = true;

       // Make it stacked
       var errorCode = field.split('::')[1];
       field = field.replace(".", "");
       series.stacked = true;

      //  series.columns.template.adapter.add("fill", (fill, target)=>{
      //   return chart.colors.getIndex(index);
      // })

       // Configure columns
       series.columns.template.width = am4core.percent(60);
       series.columns.template.tooltipHTML = "<div class='tooltip1'> <span>&bull;</span> % Downtime:{meta."+field+".DOWNTIME} <br> <span>&bull;</span> Downtime Minutes:{meta."+field+".MINUTOS} <br> <span>&bull;</span> Quantity:{meta."+field+".CANTIDAD} <br> <span>&bull;</span> Error code: " + errorCode + "</div>";
       //series.columns.template.tooltipText = "Downtime: {meta."+field+".MINUTOS}    \n   Downtimes minutes: {meta."+field+".DOWNTIME} \n Quantity: {meta."+field+".CANTIDAD}";//"[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

       return series;
     }

    //let colores =  ["#DC6A67","#8068DC","#67B6DC","#DCD267","#A0DD67"];


    let i = 0;
    let procesada = false;
    chart.data.forEach((element,index) => {
      i++;
      Object.keys(element).forEach(key => {
        if(key.includes(element["departmen"]+"::",0)){
          procesada = true;
        }
        if(key =="meta"  && !procesada){
          Object.keys(element["meta"]).forEach(keyMeta => {
            if(keyMeta.includes(element["departmen"]+"::",0)){
              return;
            }
            var nuevoKey = element["departmen"]+"::"+keyMeta.replace(".", "");
            element["meta"][nuevoKey] = element["meta"][keyMeta];
            chart.data[index][key] = element["meta"];
            delete element["meta"][keyMeta];
          });
        }

        if(key != "departmen" && key !="meta" && key !="none" && !procesada){
          var nuevoKey = element["departmen"]+"::"+key
          element[nuevoKey] = element[key];
          chart.data[index] = element;
          delete element[key];
          key = nuevoKey;
        }

        if(key != "departmen" && key !="meta" && key !="none"){
           createSeries(key, key,i, coloresDepartamento[element["departmen"]]);
        }
      });

    });
    


     // Create series for total
     var totalSeries = chart.series.push(new am4charts.ColumnSeries());
     totalSeries.dataFields.valueY = "none";
     totalSeries.dataFields.categoryX = "departmen";
     totalSeries.stacked = true;
     totalSeries.hiddenInLegend = true;
     totalSeries.columns.template.strokeOpacity = 0;

     var totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
     totalBullet.dy = -20;
     totalBullet.label.text = "{valueY.total}%";
     totalBullet.label.hideOversized = false;
     totalBullet.label.fontSize = 9;
     totalBullet.label.background.fill = totalSeries.stroke;
     totalBullet.label.background.fillOpacity = 0;
     totalBullet.label.padding(5, 10, 5, 10);

     chart.events.on("beforedatavalidated", function(ev) {
      chart.data.sort(function(a:any, b:any) {
           var totalA = 0;
           Object.keys(a).forEach(key => {
             if(key != "departmen" && key !="meta"){
                totalA += a[key];
             }
           });
           
           var totalB = 0;
           Object.keys(b).forEach(key => {
             if(key != "departmen" && key !="meta"){
              totalB += b[key];
             }
           });
        return totalB-totalA;
      });
    });


    
  }

    downtimeByMTTRArea(id:any = "miniDowntimeMTTR"){
     


      this.AmCharts.addInitHandler( function( chart ) {
        console.log("HOLA");
        console.log(chart);
        // Check if `orderByField` is set
        if ( chart.orderByField === undefined || chart.orderByField === null) {
          // Nope - do nothing
          return;
        }

        if ( chart.dataProvider === undefined || chart.dataProvider === null) {
          // Nope - do nothing
          return;
        }

        // Re-order the data provider
        chart.dataProvider.sort( function( a:any, b:any ) {
          if ( a[ chart.orderByField ] > b[ chart.orderByField ] ) {
            return -1;
          } else if ( a[ chart.orderByField ] == b[ chart.orderByField ] ) {
            return 0;
          }
          return 1;
        } );

      }, [ "serial" ] );

      var maxi = 0;

    var dataP = this.secondaryIndicatorData.mttr? this.secondaryIndicatorData.mttr:[];

    //if(id == "timeCOByDeparment"){

     // maxi = 0;

      for (var i in dataP) {

        if (dataP[i].mttr > maxi) {

          maxi = dataP[i].mttr;

        }

      //}

      maxi *= 1.1;

    }
      /*var texto = "";
      if(this.translateService.currentLang == 'en-US'){
        texto = "<div class='tooltip1'> <span>&bull;</span> Max MTTR: [[dtMax]] <br> <span>&bull;</span> Min MTTR: [[dtMin]] <br> <span>&bull;</span> Error Code: [[listErrorCode]] <br> <span>&bull;</span> Total Downtimes: [[minutes]] <br> <span>&bull;</span> Cantidad de eventos: [[events]] </div>";
      }else{
        texto = "<div class='tooltip1'> <span>&bull;</span> MTTR Mín: [[dtMax]] <br> <span>&bull;</span> MTTR Max: [[dtMin]] <br> <span>&bull;</span> Código de error: [[listErrorCode]] <br> <span>&bull;</span> Total Downtimes: [[minutes]] <br> <span>&bull;</span> Cantidad de eventos: [[events]] </div>";
      }*/
      //texto = this.translateService.get("Max MTTR");
      
      //this.translateService.stream('Max MTTR').subscribe((text:string) => {this.alto = text });

      console.log("EdgarLeal");
      console.log(this.secondaryIndicatorData.mttr);

      var chart = this.AmCharts.makeChart( id, {
        "type": "serial",
        "theme": "light",
        "color": "#FFFFFF",
        "orderByField": "mttr",
        "dataProvider": this.secondaryIndicatorData.mttr,
        "gridAboveGraphs": true,
        "startDuration": 1,
        "valueAxes": [{
            "axisAlpha": 0,
            "gridAlpha": 0.1,
            "labelsEnabled": true,
            "strictMinMax" : true,
            "maximum" : maxi
        }],
        "graphs": [ {
          "balloonText": "<div class='tooltip1'> <span>&bull;</span> "+this.ballonTextMTTR1+": [[dtMax]] <br> <span>&bull;</span> "+this.ballonTextMTTR2+": [[dtMin]] <br> <span>&bull;</span> Error Code: [[listErrorCode]] <br> <span>&bull;</span> Total Downtimes: [[minutes]] <br> <span>&bull;</span> "+this.ballonTextMTTR3+": [[events]] </div>",
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "labelText": "[[mttr]] Min",
          "type": "column",
          "valueField": "mttr",
          "colorField": "color"
        } ],
        "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": true
        },
        "categoryField": "shortDesc",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0,
          "tickPosition": "start",
          "tickLength": 20
        },
        "export": {
          "enabled": true
        },
        "balloon": {
          "adjustBorderColor": true,
          "color": "#000000",
          "fillColor": "transparent",
          "borderAlpha": 0,
          "borderColor": "#000000"
        }

      } );

    }

    barDowntimeByTool(id:any = "barDowntimeByTool"){

      this.stackDowntimeByTool(id);
      
    }


    stackDowntimeByTool(id:any = "stackDowntimeByTool"){
     

     // Themes begin
     am4core.useTheme(am4themes_animated);
     am4core.useTheme(am4themes_dark);
     // Themes end

     // Create chart instance
     var chart = am4core.create(id, am4charts.XYChart);
     chart.maskBullets = false;
     chart.numberFormatter.numberFormat = "#.#";


    

     // Add data
     chart.data =  this.secondaryIndicatorData.afectacionPorHerramienta;

     chart.colors.list = [
      am4core.color("#DC6A67"),
      am4core.color("#8068DC"),
      am4core.color("#67B6DC"),
      am4core.color("#DCD267"),
      am4core.color("#A0DD67")
    ];


     // Create axes
     var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
     categoryAxis.dataFields.category = "descTool";
     categoryAxis.renderer.minGridDistance = 1;
    //  categoryAxis.renderer.grid.template.location = 0;

     var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
     valueAxis.renderer.inside = false;
     valueAxis.renderer.labels.template.disabled = false;
     valueAxis.min = 0;
     valueAxis.extraMax = 0.1;
     valueAxis.calculateTotals = true;


     // Create series
     function createSeries(field: any, name: any,index:any) {

       // Set up series
       var series = chart.series.push(new am4charts.ColumnSeries());
       series.name = name;
       series.dataFields.valueY = field;
       series.dataFields.categoryX = "descTool";
       series.fill = chart.colors.getIndex(index-1);
       //series.columns.template.fill = am4core.color(color);;
       //series.columns.template.stroke = am4core.color("white");;

       //series.sequencedInterpolation = true;

       // Make it stacked
       var errorCode = field.split('::')[1];
       field = field.replace(".", "");
       series.stacked = true;

      //  series.columns.template.adapter.add("fill", (fill, target)=>{
      //   return chart.colors.getIndex(index);
      // })

       // Configure columns
       series.columns.template.width = am4core.percent(60);
       series.columns.template.tooltipHTML = "<div class='tooltip1'> <span>&bull;</span> % Downtime:{meta."+field+".DOWNTIME} <br> <span>&bull;</span> Downtime Minutes:{meta."+field+".MINUTOS} <br> <span>&bull;</span> Quantity:{meta."+field+".CANTIDAD} <br> <span>&bull;</span> Error code: " + errorCode + "</div>";
       //series.columns.template.tooltipText = "Downtime: {meta."+field+".MINUTOS}    \n   Downtimes minutes: {meta."+field+".DOWNTIME} \n Quantity: {meta."+field+".CANTIDAD}";//"[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

       return series;
     }

    //let colores =  ["#DC6A67","#8068DC","#67B6DC","#DCD267","#A0DD67"];


    let i = 0;
    let procesada = false;
    
    chart.data.forEach((element,index) => {
      i++;
      Object.keys(element).forEach(key => {
        if(key.includes(element["descTool"]+"::",0)){
          procesada = true;
        }
        if(key =="meta"  && !procesada){
          Object.keys(element["meta"]).forEach(keyMeta => {
            if(keyMeta.includes(element["descTool"]+"::",0)){
              return;
            }
            var nuevoKey = element["descTool"]+"::"+keyMeta.replace(".", "")
            element["meta"][nuevoKey] = element["meta"][keyMeta];
            chart.data[index][key] = element["meta"];
            delete element["meta"][keyMeta];
          });
        }

        if(key != "descTool" && key !="meta"&& key !="none" && !procesada){
          var nuevoKey = element["descTool"]+"::"+key
          element[nuevoKey] = element[key];
          chart.data[index] = element;
          delete element[key];
          key = nuevoKey;
        }

        if(key != "descTool" && key !="meta"&& key !="none"){
           createSeries(key, key,i);
        }
      });

    });
    


     // Create series for total
     var totalSeries = chart.series.push(new am4charts.ColumnSeries());
     totalSeries.dataFields.valueY = "none";
     totalSeries.dataFields.categoryX = "descTool";
     totalSeries.stacked = true;
     totalSeries.hiddenInLegend = true;
     totalSeries.columns.template.strokeOpacity = 0;

     var totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
     totalBullet.dy = -20;
     totalBullet.label.text = "{valueY.total}%";
     totalBullet.label.hideOversized = false;
     totalBullet.label.fontSize = 9;
     totalBullet.label.background.fill = totalSeries.stroke;
     totalBullet.label.background.fillOpacity = 0;
     totalBullet.label.padding(5, 10, 5, 10);

     chart.events.on("beforedatavalidated", function(ev) {
      chart.data.sort(function(a:any, b:any) {
           var totalA = 0;
           Object.keys(a).forEach(key => {
             if(key != "descTool" && key !="meta"){
                totalA += a[key];
             }
           });
           
           var totalB = 0;
           Object.keys(b).forEach(key => {
             if(key != "descTool" && key !="meta"){
              totalB += b[key];
             }
           });
        return totalB-totalA;
      });
    });

  }




 // GRAFICAS DE CHANGEOVER
  barCOPorDepartamento(id:any = "timeCOByDeparment" ){
    

    this.AmCharts.addInitHandler( function( chart ) {

      // Check if `orderByField` is set
      if ( chart.orderByField === undefined ) {
        // Nope - do nothing
        return;
      }

      if ( chart.dataProvider === undefined || chart.dataProvider === null) {
        // Nope - do nothing
        return;
      }

      // Re-order the data provider
      chart.dataProvider.sort( function( a:any, b:any ) {
        if ( a[ chart.orderByField ] > b[ chart.orderByField ] ) {
          return -1;
        } else if ( a[ chart.orderByField ] == b[ chart.orderByField ] ) {
          return 0;
        }
        return 1;
      } );

    }, [ "serial" ] );


    var maxi = 0;

    var dataP = this.changeOverNew.tiempoCoPorDepartamento? this.changeOverNew.tiempoCoPorDepartamento:[];

    //if(id == "timeCOByDeparment"){

     // maxi = 0;

      for (var i in dataP) {

        if (dataP[i].average > maxi) {

          maxi = dataP[i].average;

        }

      //}

      maxi *= 1.1;

    }



    var chart = this.AmCharts.makeChart( id, {
      "type": "serial",
      "theme": "light",
      "color": "#FFFFFF",
      "dataProvider": this.changeOverNew.tiempoCoPorDepartamento,
      "gridAboveGraphs": true,
      "startDuration": 1,
      "orderByField": "average",
      "valueAxes": [{
          "axisAlpha": 0,
          "gridAlpha": 0.1,
          "labelsEnabled": true,
          "strictMinMax" : true,
          "maximum" : maxi
      }],
      "graphs": [ {
        //"balloonText": "[[category]]: <b>[[value]]</b>",
        "balloonText": "<div class='tooltip1'> <span>&bull;</span> Changeover time: [[minutes]] <br><span>&bull;</span> Changeover minutes: [[value]] <br><span>&bull;</span> Quantity of changeover: [[event]]",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "labelText": "[[average]] Min",
        "type": "column",
        "valueField": "average",
        "colorField": "color",
      } ],
      "balloon": {
        "fillColor": "transparent",
        "borderThickness": "0",
        "borderAlpha": "0",
        "textAlign": "left",
        "maxWidth": 280
      },
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "description",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20
      },
      "export": {
        "enabled": true
      }

    } );

  }

  stackCOByTools(id:any = "timeCOByTools"){
     

     // Themes begin
     am4core.useTheme(am4themes_animated);
     //am4core.useTheme(am4themes_dark);
     // Themes end

     // Create chart instance
     var chart = am4core.create(id, am4charts.XYChart);
     chart.maskBullets = false;
     chart.numberFormatter.numberFormat = "#.#";

     // Add data
     chart.data =  this.changeOverNew.changeoverPorHerramienta;

     console.log("Changeover by tools");
     console.log(this.changeOverNew.changeoverPorHerramienta);

     // Create axes
     var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
     categoryAxis.dataFields.category = "toolId";
     categoryAxis.renderer.minGridDistance = 1;
    //  categoryAxis.renderer.grid.template.location = 0;

     var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
     valueAxis.renderer.inside = false;
     valueAxis.renderer.labels.template.disabled = false;
     valueAxis.min = 0;
     valueAxis.extraMax = 0.1;
     valueAxis.calculateTotals = true;

     // Create series
     function createSeries(field: any, name: any, total : any, cLor : any, ballonTextCO1 : any, ballonTextCO2 : any, ballonTextCO3 : any) {

       // Set up series
       var series = chart.series.push(new am4charts.ColumnSeries());
       series.name = name;
       series.dataFields.valueY = field;
       series.dataFields.categoryX = "toolId";
       //series.sequencedInterpolation = true;
       //series.columns.template.fill =  am4core.color("{meta."+field+".color}");
       // Make it stacked
       series.stacked = true;

       // Configure columns
       series.columns.template.width = am4core.percent(60);
       series.columns.template.tooltipHTML = "<div class='tooltip1'> <span>&bull;</span> "+ ballonTextCO1 +" : {toolId} <br/> <span>&bull;</span> "+ballonTextCO2+" :{meta."+field+".CANTIDAD} <br> <span>&bull;</span> "+ballonTextCO3+":{meta."+field+".TIEMPO} <br> <span>&bull;</span> Total:"+total+"</div>";

       //series.columns.template.tooltipText = "Downtime: {meta."+field+".MINUTOS}    \n   Downtimes minutes: {meta."+field+".DOWNTIME} \n Quantity: {meta."+field+".CANTIDAD}";//"[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
        series.columns.template.fill = am4core.color(cLor);
        series.columns.template.stroke = am4core.color(cLor);

       return series;
     }

   

    

    let i = 0;
    let procesada = false;
    chart.data.forEach((element,index) => {
      i++;
      let total = element["total"];
      Object.keys(element).forEach(key => {
        if(key.includes(element["toolId"]+"::",0)){
          procesada = true;
        }

        Object.keys(element["meta"]).forEach(keyMeta => {
          if(keyMeta.includes(element["toolId"]+"::",0)){
            return;
          }
          var nuevoKey = element["toolId"]+"::"+keyMeta
          element["meta"][nuevoKey] = element["meta"][keyMeta];
          chart.data[index]["meta"] = element["meta"];
          delete element["meta"][keyMeta];
        });

        if(key != "toolId" && key !="meta" && key !="total" && key !="none" && !procesada){
          var nuevoKey = element["toolId"]+"::"+key
          element[nuevoKey] = element[key];
          chart.data[index] = element;
          delete element[key];
          key = nuevoKey;
        }

        if(key != "toolId" && key !="meta" && key !="total" && key !="none"){
           createSeries(key, key,total, element["meta"][key]["COLOR"], this.ballonTextCO1, this.ballonTextCO2, this.ballonTextCO3);
        }
      });

    });

    

     var totalSeries = chart.series.push(new am4charts.ColumnSeries());
     totalSeries.dataFields.valueY = "none";
     totalSeries.dataFields.categoryX = "toolId";
     totalSeries.stacked = true;
     totalSeries.hiddenInLegend = true;
     totalSeries.columns.template.strokeOpacity = 0;

     var totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
     totalBullet.dy = -20;
     totalBullet.label.text = "{valueY.total} Min";
     totalBullet.label.hideOversized = false;
     totalBullet.label.fontSize = 9;
     totalBullet.label.background.fill = totalSeries.stroke;
     totalBullet.label.background.fillOpacity = 0;
     totalBullet.label.padding(5, 10, 5, 10);


     chart.events.on("beforedatavalidated", function(ev) {
      chart.data.sort(function(a:any, b:any) {
           var totalA = 0;
           Object.keys(a).forEach(key => {
             if(key != "toolId" && key !="meta" && key !="total" && key !="none"){
                totalA += a[key];
             }
           });
           
           var totalB = 0;
           Object.keys(b).forEach(key => {
             if(key != "toolId" && key !="meta" && key !="total" && key !="none"){
              totalB += b[key];
             }
           });
        return totalB-totalA;
      });
    });

  }


  productivityChart(id:any = "productivityChart"){

   
    var max = 1000;
    var dataP = this.productivityData? this.productivityData.graphicData:[];
    if(id == "productivityChart"){
      max = 0;
        // find data maximum:
        //var min = dataP[0].value;
        for (var i in dataP) {
          if (dataP[i].value > max) {
              max = dataP[i].value;
          }
          dataP[i].tools = dataP[i].tools.slice(0, -1);
        }
        max *= 1.2;
        // set axes max based on value above:
    }

    var chart = this.AmCharts.makeChart( "productivityChart", {
      "type": "serial",
      "theme": "light",
      "color": "#FFFFFF",
      "dataProvider": dataP,
//[{"date": "5:00", "value":"12","color":this.redIndicatorColor,"tools":"21323"},{"date": "6:00", "value":"12","color":this.blueIndicatorColor},{"date": "7:00", "value":"12","color":this.redIndicatorColor},{"date": "8:00", "value":"12","color":this.redIndicatorColor},],
      "valueAxes": [ {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0,
        "labelsEnabled": false,
        "maximum" : max,
        "strictMinMax" : true
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        //"balloonText": "Hora: [[category]]: <br> Golpes Totales: [[value]] </br> Golpes Potenciales: [[goals]] <br> Herramientas: [[tools]]",
      
        "balloonText": "<div class='tooltip1'><span>&bull;</span> "+this.ballonTextHXH1+":  [[date]] <br> <span>&bull;</span> "+this.ballonTextHXH2+": [[value]]</br> <span>&bull;</span>  "+this.ballonTextHXH3+": [[goal]] <br> <span>&bull;</span>  "+this.ballonTextHXH4+": <p>[[tools]]</p></div>",
        "fillAlphas": 1,
        "lineAlpha": 0,
        "labelText": "[[value]]",
        //"labelPosition": "inside",
        "labelFunction":function(value:any, valueText:any,valueAxis:any){
          return value.dataContext.value;
        },
        "axisColor":"",
        "type": "column",
        "valueField": "value",
        "colorField": "color",
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "date",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 1,
        "tickPosition": "start",
        "tickLength": 20
      },
      
      "export": {
        "enabled": true
      },
      "balloon": {
        "adjustBorderColor": true,
        "color": "#000000",
        "fillColor": "transparent",
        "borderAlpha": 0,
        "borderColor": "#000000"
      }

    } );


  }

  backgroundIndicatorCharts(id:any = "miniHistoricStrokes",type:any){

    //this.expandedHistory(this.primaryIndicatorData.strokesHistory, "strokes", id);

    let chartData:any;

    if(type == "downtime"){
        chartData = this.secondaryIndicatorData.downtimePorHerramientaHistoric;
        type = "downtime";
    }else if(type =="changeover"){
      
        type = "value";
        chartData = this.changeOverNew.historic;
    }else{
      if(this.primaryIndicatorData)
         chartData = this.primaryIndicatorData.historic;
    }


    var chart = this.AmCharts.makeChart( id, {
      "type": "serial",
      "theme": "none",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      //"dataDateFormat": "YYYY-MM-DD",
      "dataProvider": chartData,
      "valueAxes": [ {
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth": true
      } ],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [ {
        "id": "g1",
        "fillAlphas": 0.2,
        "valueField": type,
        //"balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      } ],
      "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha": 0,
        "zoomable": false,
        "valueZoomable": true,
        "valueLineAlpha": 0.5
      },
      "valueScrollbar": {
        "autoGridCount": true,
        "color": "#000000",
        "scrollbarHeight": 50
      },
      "categoryField": "dayProduction",
      "categoryAxis": {
        "dataDateFormat": "YYYY-MM-DD",
        "minPeriod": "DD",
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      }
    } );
  }

  expandirGraficaHistory(event:any, data:any, type:any, id:any = "expanded"){
    this.expandedFull = !this.expandedFull;
      setTimeout(() => {
        this.expandedHistory(data, type, id);
      }, 300);
  }

  expandedHistory(data:any, type:any, id:any = "expanded"){

      var chartData = data;// this.primaryIndicatorData.strokesHistory; //generateChartData();

      var aux = "";
      var axesTitle  = "";
      var ballonText = "";

       if(type=="stroke"){
         //axesTitle = "Golpes";
         ballonText = "<div style='margin:5px; font-size:19px;'>Golpes:<b>[[value]]</b></div>";
         //this.expandedTitle = "Número de Golpes";
         this.translateService.stream('Número de golpes').subscribe((text:string) => {
           this.expandedTitle = text;
           axesTitle = text;

          });
          ballonText = "<div style='margin:5px; font-size:19px;'>"+axesTitle+":<b>[[value]]</b></div>";
        }
       if(type=="oaxpr"){
         
         this.translateService.stream('Porcentaje').subscribe((text:string) => {
            axesTitle = text;
         });

         ballonText = "<div style='margin:5px; font-size:19px;'>"+axesTitle+":<b>[[value]]%</b></div>";
         this.expandedTitle = "OAxPR";
         //this.translateService.stream('OAxPR').subscribe((text:string) => {this.expandedTitle = text });
         aux = "%";

        }
       if(type=="vcd"){
         //axesTitle = "Velocidad";
         this.translateService.stream('Velocidad').subscribe((text:string) => {
          axesTitle = text;

         });

         ballonText = "<div style='margin:5px; font-size:19px;'>"+axesTitle+":<b>[[value]]</b></div>";
         //this.expandedTitle = "Velocidad con demora";
         this.translateService.stream('VCD').subscribe((text:string) => {this.expandedTitle = text });

        }
       if(type=="vsd"){
        this.translateService.stream('Velocidad').subscribe((text:string) => {
          axesTitle = text;

         });

         ballonText = "<div style='margin:5px; font-size:19px;'>"+axesTitle+":<b>[[value]]</b></div>";
         //this.expandedTitle = "Velocidad sin demora";
         this.translateService.stream('VSD').subscribe((text:string) => {this.expandedTitle = text });

        }
       if(type=="downtime"){
         
         this.translateService.stream('% Downtime').subscribe((text:string) => {axesTitle = text });

         ballonText = "<div style='margin:5px; font-size:19px;'>"+axesTitle+":<b>[[value]]</b></div>";
         this.expandedTitle = "Downtime";

        }
       if(type=="changeover"){
        this.translateService.stream('Tiempo').subscribe((text:string) => {
          axesTitle = text;
         });
         type = "value";
         ballonText = "<div style='margin:5px; font-size:19px;'>"+axesTitle+":<b>[[value]] Min</b></div>";
         //this.expandedTitle = "MINUTOS C/O PROMEDIO";
         this.translateService.stream('MINUTOS C/O PROMEDIO').subscribe((text:string) => {this.expandedTitle = text });
        }

      

      if(chartData == null){
        chartData = [];
      }

      var chart = this.AmCharts.makeChart(id, {
          "path": "assets/images/amcharts3/",
          //"pathToImages": "http://cdn.amcharts.com/lib/3/images/", // required for grips
          "type": "serial",
          "dataDateFormat": "YYYY-MM-DD",
          "theme": "light",
          "marginRight": 80,
          "dataProvider": chartData?chartData:[],
          "color": "#FFFFFF",
          "valueAxes": [{
              "position": "left",
              "title": axesTitle,
          }],
          "graphs": [{
              "id": "g1",
              "fillAlphas": 0.4,
              "valueField": type,
               "balloonText": ballonText,
          }],
          "chartScrollbar": {
              "graph": "g1",
              "scrollbarHeight": 80,
              "backgroundAlpha": 0,
              "selectedBackgroundAlpha": 0.1,
              "selectedBackgroundColor": "#888888",
              "graphFillAlpha": 0,
              "graphLineAlpha": 0.5,
              "selectedGraphFillAlpha": 0,
              "selectedGraphLineAlpha": 1,
              "autoGridCount": true,
          },
          "chartCursor": {
              "categoryBalloonDateFormat": "DD MMMM",//"JJ:NN, DD MMMM",
              "cursorPosition": "mouse"
          },
          "categoryField": "dayProduction",
          "categoryAxis": {
            "dataDateFormat": "YYYY-MM-DD",
              "minPeriod": "DD",
              "autoWrap": true,
              //"parseDates": true,
          },
          "export": {
              "enabled": true,
               "dateFormat": "YYYY-MM-DD",
               "dataDateFormat": "YYYY-MM-DD",
          }
      });

      //Remueve los Labels de Scrollbar X de
      $('g').each(function() {
        if($(this).css('touch-action') == 'none')
        {
          $(this).addClass('textoGraficaAreaExpandida');
        }
        });

      chart.addListener("dataUpdated", zoomChart);
      zoomChart();

      function zoomChart() {
          chart.zoomToIndexes(0 , chartData.length );
      }
  }

  // GRAFICA DE PRODUCTIVIDAD
  productivityChartExpanded(id:any = "productivityChartExpanded"){

 

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(id, am4charts.XYChart);

    // Add data
    chart.data = this.productivityData? this.productivityData.graphicData:[];

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      // if (target.dataItem && target.dataItem.index & 2 == 2) {
      //   return dy + 25;
      // }
      return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";



    series.name = "Golpes";
    series.columns.template.tooltipHTML =
    "<div class='tooltip1'><span>&bull;</span> "+this.ballonTextHXH1+": {categoryX} <br> <span>&bull;</span> "+this.ballonTextHXH2+": {valueY}</br> <span>&bull;</span>  "+this.ballonTextHXH3+": {goal} <br> <span>&bull;</span>  "+this.ballonTextHXH4+": <p>{tools}</p></div>";
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.background.strokeWidth = 0;

// "[bold] Golpes por hora - {categoryX}[/] \n Golpes Totales: [bold]{valueY}[/] \n Golpes Potenciales: [bold] {goal}[/] \n Herramienta: [bold]{tools}[/]"
    series.columns.template.fillOpacity = .8;

    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "color";
    series.tooltip.background.strokeOpacity = 0;
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 0;

    let legend = new am4charts.Legend();
    legend.parent = chart.chartContainer;

    legend.background.fill = am4core.color("#000");
    legend.background.fillOpacity = 0.05;
    legend.width = 120;
    legend.align = "center";
   
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.marginLeft = 0;


  }

  expandirGrafica(event:any, data:any, grafica:any){
    console.log("expandirGrafica");
      this.expandedFull = !this.expandedFull;
      setTimeout(() => {
        //this.expanded(data);

        if(grafica == "downtimeMTTR1"){
          //this.expandedTitle = "Minutos MTTR Por area";
          this.translateService.stream('MINUTOS MTTR POR ÁREA').subscribe((text:string) => {this.expandedTitle = text });
          this.downtimeByMTTRArea("expanded"); //ojo

        }
        if(grafica == "stackDowntimeByDeparment"){
          //this.expandedTitle = "Afectación por departamento";
          this.translateService.stream('AFECTACIÓN POR DEPARTAMENTO').subscribe((text:string) => {this.expandedTitle = text });
          this.barDowntimeByDeparment("expanded");
        }
        if(grafica == "stackDowntimeByTool"){
          //this.expandedTitle = "Afectación por herramienta";
          this.translateService.stream('AFECTACIÓN POR HERRAMIENTA').subscribe((text:string) => {this.expandedTitle = text });
          this.stackDowntimeByTool("expanded");
        }
        if(grafica == "barCOPorDepartamento"){
          //this.expandedTitle = "Tiempo C/O por departamento";
          this.translateService.stream('TIEMPO C/O POR DEPARTAMENTO').subscribe((text:string) => {this.expandedTitle = text });
          this.barCOPorDepartamento("expanded");
        }
        if(grafica == "stackCOByTools"){
          //this.expandedTitle = "C/O por herramienta";
          this.translateService.stream('C/O POR HERRAMIENTA').subscribe((text:string) => {this.expandedTitle = text });
          this.stackCOByTools("expanded");
        }
        if(grafica == "productivityChartExpanded"){ //productivityChartExpanded
          //this.expandedTitle = "Hora Por Hora";
          this.translateService.stream('HORA POR HORA').subscribe((text:string) => {this.expandedTitle = text });
          this.productivityChartExpanded("expanded");
          this.hbhLegend = true;
        } else{
          this.hbhLegend = false;
        }
      }, 300);
  }

}
