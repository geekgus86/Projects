import { Component, OnInit } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { TranslateService } from '@ngx-translate/core';
// New imports
import * as c3 from 'c3';
import { Helper } from '../../shared/helper';
import { OverviewService } from './overview.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { fadeInContent } from '@angular/material';

import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash'
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  today:any;
  helper: Helper;
  date: string;
  dateAux: string = "Select a Date";
  code: string;
  hxhResult: any;
  shift: number;
  shiftArray: any;
  todayActive: boolean;
  yesterdayActive: boolean;
  otherActive: boolean;
  maxDate: Date;
  resolver: any;
  nameLinea : string;
  plantName: string;
  machineName: string;
  arrayShift: any;
  isToday: boolean;
  chart: AmChart;
  panelControl : any;
  DefectsTop5: any;
  DefectsFlowOutScrap: any;
  Contention: any;

  NameArea:any;
  Code:any;

  oeeCaption: any;
  jphCaption: any;
  cycleTimeCaption: any;
  hourCaption: any;
  flowOutScrapCaption: any;
  contentionsCaption: any;
  defectsTop5Caption: any;
  dailyProductionRateCaption: any;
  
  Hour: string;
  zonahoraria: string =" (CT)";
  ScheduleTime:string;

  ProductionTarget:string;
  ActualProduction:string;
  PotentialProduction:string;
  lenguaje:string;

  onDestroy$ = new Subject<void>();
  
  goalCycle : any;
  cycleTime : any;
  colorCycletimes : any;
  imgCycle : string;

  jph : any;
  jphGoal : any;
  colorJPH : any;
  imgJph : string;
  lines : any; 
  Asset_ID:number;
  linkJPH:number;
  linkCTM:number;
  

  constructor(private overviewService: OverviewService, private route: ActivatedRoute,private AmCharts: AmChartsService, private wowService: NgwWowService,private calendarService: BsLocaleService, private translateService: TranslateService) {
    console.log("=============== OVERVIEW COMPONENT =============")
    defineLocale('es', esLocale); 
    defineLocale('en', enGbLocale); 
    this.resolver = this.route.snapshot.data.resolver;
    this.helper = new Helper();
    this.panelControl = this.resolver[0];
    this.NameArea = this.resolver[0].AREANAME;
    this.nameLinea = this.resolver[0].NAME_DESCRIPTION;
    this.Code = this.resolver[0].NAME;
    this.plantName = this.route.snapshot.paramMap.get('plantName');
    const now = new Date();
    this.today = this.helper.dateProcessingWithDashFormat(now);
    this.lines = this.resolver[2];
    this.Asset_ID =this.resolver[1].Asset_ID;

  }
  test(){

  }

  ngOnInit() {
    this.isToday = true;
    this.todayActive = true;
    this.yesterdayActive = false;
    this.otherActive = false;
    this.maxDate = new Date();
    const now = new Date();
    this.date = this.helper.dateProcessingWithDashFormat(now);
    this.code = this.route.snapshot.paramMap.get('machineName');
    this.machineName = this.code;

    this.GetQualityDefectsTop5();
    this.GetQualityDefectsFlowOutScrap();
    this.GetQualityContention();
    this.initShift();

    this.wowService.init();
    this.changeLanguage();
    this.obserableJson();

    /*this.overviewService.getSecondMenu(this.code,this.plantName).subscribe(res => {
        console.log(res);
    });*/
  }

  ngOnDestroy(){
    this.onDestroy$.next();
  }

  changeLanguage():void{
    this.calendarService.use((this.translateService.currentLang.indexOf('es') >= 0) ? 'es' : 'en')
    this.titleAmchart((this.translateService.currentLang.indexOf('es') >= 0) ? 'es' : 'en')
    
    this.translateService.onLangChange
      .subscribe((event: any) => {
        event && this.calendarService.use((event.lang.indexOf('es') >= 0) ? 'es' : 'en' );
        this.titleAmchart( (event.lang.indexOf('es') >= 0) ? 'es' : 'en'  );
        this.ngBulletChart(this.resolver[1].JPH);
        
    });
  }

  titleAmchart(lenguaje:string){
    this.lenguaje =lenguaje;
    if(lenguaje=="es"){
      this.ProductionTarget = "Produccion objetivo";
      this.ActualProduction = "Producción actual";
      this.PotentialProduction="Producción potencial";
    }else{
      this.ProductionTarget = "Production Target";
      this.ActualProduction = "Actual Production";
      this.PotentialProduction ="Potential Production";
    }
}

  reLoadShift(): void {

    this.overviewService.getShifts(this.Asset_ID,this.date, this.plantName) 
    .subscribe(res => {

      //Load select option shift 
      this.arrayShift = res.SHIFTS;  

      //Get Max id Shift 
      if (this.shift === undefined || this.shift  === null ){ 
          this.shift = res.SHIFTS.reduce(function(max:any, x:any) { return (x.id > max) ? x.id : max; }, 0); //Get Maximum Id
      }
        
     //Entra cuendo no existe el shift que se busca
      if(this.arrayShift.map(function(d:any) { return d['id']; }).indexOf(+this.shift) === -1){ 
        this.shift = this.arrayShift[0].id;
      }
      
      this.reloadOnInit();
    });

  }



  initShift(): void {
    this.overviewService.getShifts(this.Asset_ID,"", this.plantName)  
    .subscribe(res => { 
      this.arrayShift = res.SHIFTS;
      var  maxId = res.SHIFTS.reduce(function(max:any, x:any) { return (x.id > max) ? x.id : max; }, 0); //Get Maximum Id
      this.shift = maxId;

      this.hxhResult = this.resolver[0];
      this.shiftArray = this.buildShiftArray(this.hxhResult.VALUES, this.shift);
      this.buildCharts(this.resolver[1]);
      this.ngBulletChart(this.resolver[1].JPH);
      this.hourCaption = this.resolver[0].CAPTION;
      //  this.getInfoFromAPI();
    });

  }




  reloadOnInit(){
    this.GetQualityDefectsTop5();
    this.GetQualityDefectsFlowOutScrap();
    this.GetQualityContention();
    this.getInfoFromAPI();
  }


  onTodayClick(): void {
    this.isToday = false;
    this.todayActive = true;
    this.yesterdayActive = false;
    this.otherActive = false;
    const now = new Date();
    this.date = this.helper.dateProcessingWithDashFormat(now);
    this.reLoadShift();
    
    $('#fc').val("");
    this.dateAux= "Select a Date";
  }

  onYesterdayClick(): void {
    this.isToday = false;
    this.todayActive = false;
    this.yesterdayActive = true;
    this.otherActive = false;
    $('#fc').val("");
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.date = this.helper.dateProcessingWithDashFormat(date);
    this.reLoadShift();
  }

  onDateSelection(date: Date): void {

    this.todayActive = false;
    this.yesterdayActive = false;
    this.otherActive = true;

    this.date = this.helper.dateProcessingWithDashFormat(date);
    const now = new Date();
    var tdy = this.helper.dateProcessingWithDashFormat(now);
    if(this.date == tdy){
      this.isToday = true;
    }

    this.dateAux = this.date;
    this.reLoadShift();
  }

  onShiftChange(value: any): void {
    this.shift = value.id;
    this.reloadOnInit();
  }

  getInfoFromAPI(): void {

    const response = forkJoin([
      this.overviewService.getLineHourlyProductionByDate(this.code, this.date, this.plantName),
      this.overviewService.getMainLineKPIs(this.code, this.date, this.plantName)
    ]);

    response.subscribe(res => {
      this.hxhResult = res[0];
        this.shiftArray = this.buildShiftArray(this.hxhResult.VALUES, this.shift);
        this.buildCharts(res[1]);
        this.ngBulletChart(res[1].JPH);
        this.Hour = res[1].HOUR;
        this.Hour =this.Hour+this.zonahoraria;
    });
  }

  

  buildShiftArray(data: any, shift: number): any {
    const array = new Array();
    data.forEach((element: any) => {
      if (element.shift === Number(shift)) {
        array.push(element);
      }
    });
    return array;
  }





  

  ngBulletChart(data:any){ 

    var ProductionTarget = data[0].PQTarget +data[1].PQTarget
    var ActualProduction = data[0].PQActual + data[1].PQActual
    var PotentialProduction = data[0].PQExpected+ data[1].PQExpected

    let widthBullet:number = ProductionTarget;
    if(ProductionTarget < PotentialProduction){
      widthBullet = PotentialProduction;
    }

    this.chart = this.AmCharts.makeChart( "chartdiv1", {
      "type": "serial",
      "addClassNames": true,
      "theme": "light",
      "autoMargins": false,
      "marginLeft": 30,
      "marginRight": 8,
      "marginTop": 10,
      "marginBottom": 26,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },
      "legend": {
        "useGraphSettings": true,
        "position": "top", //bottom
        "align": "center",
        "color": "#ffffff", //Color Text legend 
      },
        "dataProvider": [ {
          "category": "",
          "ActualProduction": ActualProduction,
          "PotentialProduction": PotentialProduction, //Line 
          "ProductionTarget": ProductionTarget,
        } ],
        "valueAxes": [ {
          "maximum": widthBullet , //Limite value x //Nota: se suma + 100 para 
          "stackType": "regular",
          "gridAlpha": 0
        } ],
        "startDuration": 1,
        "graphs": [
        {
          // "balloonText": "<span style='font-size:12px;'>[[title]] [[category]]:<br><span style='font-size:14px;'>[[value]]</span> [[additional]]</span>",
          "balloonText":"", //valor tooltip
          // "title": "Production Target",
          "title": this.ProductionTarget+": "+ProductionTarget,
          "fillAlphas": 0.8,
          "lineColor": "#0a828b",
          "showBalloon": true,
          "type": "column",
          "valueField": "ProductionTarget",
          "legendValueText": " ", //value cursor 
        },  {
          // "title": "Actual Production",
          "title":  this.ActualProduction+": "+ActualProduction,
          // "balloonText": "<span style='font-size:12px;'>[[title]] [[category]]:<br><span style='font-size:14px;'>[[value]]</span> [[additional]]</span>",
          "balloonText":"",
          "clustered": false,
          "columnWidth": 0.3,
          "fillAlphas": 1,
          "lineColor": "#00e292",
          "stackable": false,
          "type": "column",
          "valueField": "ActualProduction",
          "legendValueText": " ", //value cursor 
          
        }
        ,
        {
          "title": this.PotentialProduction+": "+PotentialProduction,
          // "title": "Potential Production",
          "balloonText": "",
          "columnWidth": 0.5,
          "lineColor": "#40b3bc",
          "lineThickness": 1,
          "noStepRisers": true, //barra mas larga 
          // "stackable": false,
          // "showBalloon": true,
          "type": "step",
          "valueField": "PotentialProduction",
          "legendValueText": " ", //value cursor 
        } 
      ],
        "rotate": true,
        "columnWidth": 0.5,
        "categoryField": "category",
        "categoryAxis": {
          "gridAlpha": 0,
          "position": "left"
        },
         "color": "#ffffff",
          "chartCursor": {
            "cursorAlpha": 0.02,
            "cursorColor":"#4a4e56", //color barra de se seleccion de cada grafica 
            "fullWidth":true,
            "valueBalloonsEnabled": false, //mostrar todo los tooltip
            "zoomable": false
          },
        
      } );


  }





  buildCharts(data: any) {
    const cycletimesCaption = new Array();
    this.goalCycle = 0;
    data.CYCLETIMES.forEach((element: any) => {
      if (Number(element.Shift) === Number(this.shift)) {
        this.linkCTM = element.Link;
        this.cycleTime = element.Target;
        this.goalCycle = element.Goal;
        cycletimesCaption.push(element.Caption);
        //this.colorCycletimes = element.Color;
        this.colorCycletimes = "cycleTimesGraphic wow fadeInLeft dark-box-3 " + element.Color;

        if(element.Color == "g-onGoal")
        {
          this.imgCycle = "assets/images/overview/goal-arrow.svg";

        }else if(element.Color == "g-medium")
        {
          this.imgCycle = "assets/images/overview/medium-arrow.svg";
        }else{
          this.imgCycle = "assets/images/overview/delayed-arrow.svg";
        }
      }
    });

    this.cycleTimeCaption = cycletimesCaption[0];

    /*const cycletimesChart = c3.generate({
      bindto: '#chart-10',
      data: {
        columns: [ cycletimes ],
        type: 'gauge',
      },
      gauge: {
               label: {
                   format: function(value: any, ratio: any) {
                       return value;
                   },
                   show: true // to turn off the min/max labels.
               },
            min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
            max: goal, // 100 is default
            units: '',
            width: 39 // for adjusting arc thickness
            },
      color: {
        pattern: [ColorCycletimes], // the three color levels for the percentage values.
        threshold: {
          //            unit: 'value', // percentage is default
          //            max: 200, // 100 is default
          values: []
        }
      },
      size: {
        width: 230,
        height: 180
      },
      legend: {
        hide: true
      }
    });*/
    //const jph = ['JPH'];
    this.jphGoal = 0;
    const jphc = new Array();
    const dprc = new Array();
    data.JPH.forEach((element: any) => {
      if (Number(element.Shift) === Number(this.shift)) {
        this.linkJPH = element.Link;
        this.jph = element.JPH_Total;
        this.jphGoal = element.Target;
        jphc.push(element.TargetJPHCaption);
        dprc.push(element.DailyProductionRateCaption);
        this.colorJPH = element.Color;
        if(this.colorJPH == "g-onGoal")
        {
          this.imgJph = "assets/images/overview/goal-arrow.svg";

        }else if(this.colorJPH == "g-medium")
        {
          this.imgJph = "assets/images/overview/medium-arrow.svg";
        }else{
          this.imgJph = "assets/images/overview/delayed-arrow.svg";
        }
        
        
      }
    });

    this.jphCaption = jphc[0];
    this.dailyProductionRateCaption = dprc[0];


    /*const area2 = c3.generate({
      bindto: '#area-2',
      data: {
        columns: [ jph ],
        type: 'gauge',
      },
      gauge: {
               label: {
                   format: function(value: any, ratio: any) {
                       return value;
                   },
                   show: true // to turn off the min/max labels.
               },
            min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
            max: jhpGoal, // 100 is default
            units: '',
            width: 39 // for adjusting arc thickness
            },
      color: {
        // pattern: [colorJPH], // the three color levels for the percentage values.
        pattern: [colorJPH], // the three color levels for the percentage values.
        threshold: {
          //            unit: 'value', // percentage is default
          //            max: 200, // 100 is default pep pe
          values: []
        }
      },
      size: {
        width: 230,
        height: 180
      },
      legend: {
        hide: true
      }
    });*/




    const oee = new Array();
    const qr = new Array();
    const pr = new Array();
    const oa = new Array();
    const oeec = new Array();




    data.KPI.forEach((element: any) => {
      if (Number(element.Shift) === Number(this.shift)) {
        oee.push(element.OEE);
        oee.push(element.OEEcolor);
        qr.push(element.QR);
        qr.push(element.QRcolor);
        pr.push(element.PR);
        pr.push(element.PRcolor);
        oa.push(element.OA);
        oa.push(element.OAcolor);
        oeec.push(element.OEECaption);
      }
    });


    

    if (oee.length === 0) {
      return;
    }

    var oee2 = ( oee[0] == 0 ) ? 0 : (100 - oee[0])  ;
    var qr2 = ( qr[0] == 0 ) ? 0 : (100 - qr[0])  ;
    var pr2 = ( pr[0] == 0 ) ? 0 : (100 - pr[0])  ;
    var oa2 = ( oa[0] == 0 ) ? 0 : (100 - oa[0])  ;

    this.oeeCaption = oeec[0];

    
    const oeeChart = c3.generate({
      bindto: '#donut-chart-oee',
      data: {
        columns: [
          ['OEE', oee[0]   ],
          ['', oee2 ],
          // ['OEE', oee[0]-100],
        ],
           type: 'donut',
        // type: 'gauge',
      },
      color: {
        pattern: [ oee[1],'#465866', ]
      },
      size: {
        width: 210,
        height: 200
      },
      legend: {
        hide: true
      },
      donut: {
          title: oee[0]
      }
    });



    const qrChart = c3.generate({
      bindto: '#donut-chart-qr',
      data: {
        columns: [
          ['QR', qr[0]],
          ['', qr2 ],

        ],
        type: 'donut',
      },
      color: {
        pattern: [ qr[1],'#465866' ]
      },
      size: {
        width: 210,
        height: 180
      },
      legend: {
        hide: true
      },
      donut: {
          title: qr[0]
      }
    });


    const prChart = c3.generate({
      bindto: '#donut-chart-pr',
      data: {
        columns: [
          ['PR', pr[0]],
          ['', pr2 ] ,

        ],
        type: 'donut',
      },
      color: {
        pattern: [ pr[1] ,'#465866']
      },
      size: {
        width: 210,
        height: 180
      },
      legend: {
        hide: true
      },
      donut: {
          title: pr[0]
      }

    });


    const oaChart = c3.generate({
      bindto: '#donut-chart-oa',
      data: {
        columns: [
          ['OA', oa[0]],
          ['', oa2 ],

        ],
        type: 'donut',
      },
      color: {
        pattern: [ oa[1],'#465866' ]
      },
      size: {
        width: 210,
        height: 180
      },
      legend: {
        hide: true
      },
      donut: {
          title: oa[0]
      }

    });


  }



  GetQualityDefectsTop5(){
    this.overviewService.getQualityDefectsTop5(this.code,this.date, this.plantName)
    .subscribe(res => {
      this.DefectsTop5 = res.Defects;
      //this.barchar_QualityDefectsTop5();
      this.defectsTop5Caption = res.Caption;
    });
  }


  GetQualityDefectsFlowOutScrap(){
    this.overviewService.getQualityDefectsFlowOutScrap(this.code,this.date, this.plantName)
    .subscribe(res => {
      this.DefectsFlowOutScrap = res.Defects;
      //this.barchar_DefectsFlowOutScrap();
      this.flowOutScrapCaption = res.Caption;
      // console.log( 'flowOutScrapCaption: ' + res.Caption);
    });
  }


  GetQualityContention(){
    this.overviewService.getQualityContention(this.code,this.date, this.plantName)
    .subscribe(res => {
      this.Contention = res.Contentions;
      //this.barchar_ualityContention();
      this.contentionsCaption = res.Caption;
      // console.log( 'contentionsCaption: ' + res.Caption);
    });
  }


  obserableJson(){
    var start = true;

    var update;
    var actualValue:any;
    var update2;
    var actualValue2:any;
    var update3;
    var actualValue3:any;
    var update4;
    var actualValue4:any;

    var remoteJSON:any;
    var localJSON:any;
    var remoteJSON2:any;
    var localJSON2:any;
    var remoteJSON3:any;
    var localJSON3:any;
    var remoteJSON4:any;
    var localJSON4:any;

    let obs = Rx.Observable.interval(5000).takeUntil(this.onDestroy$);
    obs.subscribe(value => {
    
      if(this.date ==this.today ){ //Exec only today

        const response = forkJoin([
          this.overviewService.getLineHourlyProductionByDate(this.code, this.date, this.plantName),
          this.overviewService.getMainLineKPIs(this.code, this.date, this.plantName)
        ]);

        response.subscribe(res => {

            if(start){
              this.hxhResult = res[0];
              this.shiftArray = this.buildShiftArray(this.hxhResult.VALUES, this.shift);
              this.Hour = res[1].HOUR;
              this.Hour =this.Hour+this.zonahoraria;
              this.buildCharts(res[1]);
              this.ngBulletChart(res[1].JPH);
              this.GetQualityDefectsTop5();
              this.GetQualityDefectsFlowOutScrap();
              this.GetQualityContention();

              actualValue = res[1].CYCLETIMES;
              update = res[1].CYCLETIMES;
              actualValue2 = res[1].JPH;
              update2 = res[1].JPH;
              actualValue3 = res[1].KPI;
              update3 = res[1].KPI;
              actualValue4 = res[0].VALUES;
              update4 =  res[0].VALUES;
              
              start = false;
            }else{
              update =  res[1].CYCLETIMES;
              update2 =  res[1].JPH;
              update3 =  res[1].KPI;
              update4 =  res[0].VALUES;
            }

            //compare 
            remoteJSON = actualValue,
            localJSON = update;
            remoteJSON2 = actualValue2,
            localJSON2 = update2;
            remoteJSON3 = actualValue3,
            localJSON3 = update3;
            remoteJSON4 = actualValue4,
            localJSON4 = update4;

            var compare = (_.isEqual(remoteJSON, localJSON) );
            var compare2 = (_.isEqual(remoteJSON2, localJSON2) );
            var compare3 = (_.isEqual(remoteJSON3, localJSON3) );
            var compare4 = (_.isEqual(remoteJSON4, localJSON4) );

            if (!compare || !compare2 || !compare3 || !compare4  )  {
              start= true;
            }
          
   


        });

      }

    });

  }
  
  onDateShiftChange(value: any): void {
    this.shift = value.shiftId;
    this.date = value.serviceDate;
    this.ScheduleTime = value.ScheduleTime;
    this.reloadOnInit();
  }
  
}


$(document).ready(function(){


  $(window).scroll(function(){
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed'), sticky.removeClass('navigation-spacer'), $(".first-ov-row").css("margin-top", "68px");
    else sticky.removeClass('fixed'), sticky.addClass('navigation-spacer'), $(".first-ov-row").css("margin-top", "0px");
  });


//   $(window).scroll(function(){
//     var stickyPlant = $('.stickyPlant'),
//         scroll = $(window).scrollTop();

//     if (scroll >= 100) stickyPlant.addClass('fixedPlant'), stickyPlant.removeClass('navigation-spacer'), $(".first-ov-row").css("margin-top", "68px"), $('.upper__navigation').css('color', '#fff'), $('.upper__navigation--current-line').css('background', 'none');
//     else stickyPlant.removeClass('fixedPlant'), $(".first-ov-row").css("margin-top", "0px"), $('.upper__navigation').css('color', '#0A828B'), $('.upper__navigation--current-line').css('background', '#04464B');
//   });

//  });

$(window).scroll(function(){
  var stickyPlant = $('.stickyPlant'),
      scroll = $(window).scrollTop();

  if (scroll >= 45) $(".touch").css("margin-top", "85px");
  else $(".touch").css("margin-top", "45px");
});

});






/*$(document).ready(function(){

  setTimeout(() => {
    $('.g-onGoal > div > .arrow-i').attr("src","assets/images/overview/goal-arrow.svg");
    $('.g-medium > div > .arrow-i').attr("src","assets/images/overview/medium-arrow.svg");
    $('.g-delayed > div > .arrow-i').attr("src","assets/images/overview/delayed-arrow.svg");
  }, 500);

})*/





