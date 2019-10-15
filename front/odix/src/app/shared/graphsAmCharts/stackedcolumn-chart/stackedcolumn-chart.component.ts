import { Component, OnInit,Input,AfterViewInit } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-stackedcolumn-chart',
  templateUrl: './stackedcolumn-chart.component.html',
  styleUrls: ['./stackedcolumn-chart.component.scss']
})
export class StackedcolumnChartComponent implements OnInit,AfterViewInit {
  @Input() data: any;
  @Input() stackedcolumnchart: string;
  @Input() lenguaje: string;

  open:string;
  progress:string;
  late:string;

  mexico:string;
  brazil:string;
  usa:string;
  answered:string;
  Effective:string;
  PastDue:string;

  AudAnswered:string;
  AudEffective:string;
  AudPastDue:string;


  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.titleAmchart();
    this.paintChart();
  }

  ngAfterViewInit(){
    this.paintChart();
  }

  paintChart(){
    if(this.stackedcolumnchart == "charQualityNotificationsPais" || this.stackedcolumnchart == "charQualityNotificationsPlanta" ){
      this.QualityNotifications();
      
    }else if(this.stackedcolumnchart == "charCarsCountry" || this.stackedcolumnchart == "charCarsPlant" ){
      this.cars();
    }
  }


  QualityNotifications(){

    for (var i in this.data) {
      if (this.data[i].lugar == "Brasil" || this.data[i].lugar == "Brazil") {
        this.data[i].lugar = this.brazil;
      }
      if (this.data[i].lugar == "Mexico" || this.data[i].lugar == "México") {
        this.data[i].lugar = this.mexico;
      }
    }

    var chart = this.AmCharts.makeChart(this.stackedcolumnchart, {
    "type": "serial",
    "balloon": {
      "adjustBorderColor": false,
      "horizontalPadding": 10,
      "verticalPadding": 8,
      "color": "#ffffff"
    },
      "legend": {
          "autoMargins": false,
          "borderAlpha": 0.2,
          "equalWidths": false,
          "horizontalGap": 10,
          "markerSize": 10,
          "useGraphSettings": true,
          "valueAlign": "left",
          "valueWidth": 0,
          "position": "bottom", 
          "align": "center",
          "color": "#ffffff", 

      },
        "dataProvider": this.data,
      // "dataProvider": [{
      //     "abierto": 2.0,
      //     "late": 2.5,
      //     "lugar": "a1",
      //     "progreso": 2.1,
      // }, {
      //     "abierto": 2.9,
      //     "late": 2.7,
      //     "lugar":  "a2",
      //     "progreso": 2.2,
      // }, {
      //     "abierto": 3.8,
      //     "late": 2.9,
      //     "lugar":  "a3",
      //     "progreso": 2.4,
      // }],

      "valueAxes": [{
          "stackType": "regular",
          "axisAlpha": 0.3,
          "gridAlpha": 0
      }],
      
      "graphs": [
       
        {
          "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
          "lineColor": "#0A828B", 
          "fillAlphas": 0.8,
          "labelText": "[[value]]",
          "lineAlpha": 0.3,
          "title": this.open,
          "type": "column",
         "color": "#000000",
          "valueField": "abierto"
      }, {
        "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
         "lineColor": "#b0de09",
          "fillAlphas": 0.8,
          "labelText": "[[value]]",
          "lineAlpha": 0.3,
          "title": this.progress,
          "type": "column",
          "color": "#000000",
          "valueField": "progreso"
      },
      {
          "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
          "lineColor": "#40ED9A",
          "fillAlphas": 0.8,
          "labelText": "[[value]]",
          "lineAlpha": 0.3,
          "title": this.late,
          "type": "column",
        "color": "#000000",
          "valueField": "late"
      }],
      "categoryField": "lugar",
      "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha": 0,
          "gridAlpha": 0,
          "position": "left"
      },
      "color": "#ffffff",
  
  });


  }



  
  cars(){

    for (var i in this.data) {
      if (this.data[i].lugar == "Brasil" || this.data[i].lugar == "Brazil") {
        this.data[i].lugar = this.brazil;
      }
      if (this.data[i].lugar == "Mexico" || this.data[i].lugar == "México") {
        this.data[i].lugar = this.mexico;
      }
    }



    var chart = this.AmCharts.makeChart(this.stackedcolumnchart, {
    "type": "serial",
    "balloon": {
      "adjustBorderColor": false,
      "horizontalPadding": 10,
      "verticalPadding": 8,
      "color": "#ffffff"
    },
      "legend": {
          "autoMargins": false,
          "borderAlpha": 0.2,
          "equalWidths": false,
          "horizontalGap": 10,
          "markerSize": 10,
          "useGraphSettings": true,
          "valueAlign": "left",
          "valueWidth": 0,
          "position": "bottom", 
          "align": "center",
          "color": "#ffffff", 
      },
        "dataProvider": this.data,
      // "dataProvider": [{
      //   "Id": 1,
      //   "Answered": 20,
      //   "InProcess": 50,
      //   "name": "Mexico"
      // }, {
      //   "Id": 2,
      //   "Answered": 20,
      //   "InProcess": 50,
      //   "name": "Brasil"
      // }],
      "valueAxes": [{
          "stackType": "regular",
          "axisAlpha": 0.3,
          "gridAlpha": 0
      }],

      "graphs": [
        {
          "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
          "lineColor": "#01b8aa", 
          "fillAlphas": 0.8,
          "labelText": "[[value]]",
          "lineAlpha": 0.3,
          "title": this.answered,
          "type": "column",
         "color": "#000000",
          "valueField": "Answered"
      }, 
    //   {
    //     "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
    //     // "lineColor": "#0bc9bb", 
    //     "fillAlphas": 0.8,
    //     "labelText": "[[value]]",
    //     "lineAlpha": 0.3,
    //     "title": this.Effective,
    //     "type": "column",
    //    "color": "#000000",
    //     "valueField": "Effective"
    // },
    {
      "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
       "lineColor": "#0a828b",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": this.PastDue,
        "type": "column",
        "color": "#000000",
        "valueField": "PastDue"
    },
    {
        "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
         "lineColor": "#c5de19",
          "fillAlphas": 0.8,
          "labelText": "[[value]]",
          "lineAlpha": 0.3,
          "title": this.progress,
          "type": "column",
          "color": "#000000",
          "valueField": "InProcess"
      }
      // ,{
      //     "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
      //      "lineColor": "#a7caa3",
      //       "fillAlphas": 0.8,
      //       "labelText": "[[value]]",
      //       "lineAlpha": 0.3,
      //       "title": this.AudAnswered,
      //       "type": "column",
      //       "color": "#000000",
      //       "valueField": "AudAnswered"
      //   },
      //   {
      //     "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
      //      "lineColor": "#FF9966",
      //       "fillAlphas": 0.8,
      //       "labelText": "[[value]]",
      //       "lineAlpha": 0.3,
      //       "title": this.AudEffective,
      //       "type": "column",
      //       "color": "#000000",
      //       "valueField": "AudEffective"
      //   },
      //   {
      //     "balloonText": "[[title]]<br><span style='font-size:14px;'><b>[[value]]</b>  </span>",
      //      "lineColor": "#66FF66",
      //       "fillAlphas": 0.8,
      //       "labelText": "[[value]]",
      //       "lineAlpha": 0.3,
      //       "title": this.AudPastDue,
      //       "type": "column",
      //       "color": "#000000",
      //       "valueField": "AudPastDue"
      //   }
    ],
      "categoryField": "Name",
      "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha": 0,
          "gridAlpha": 0,
          "position": "left"
      },
      "color": "#ffffff",
  
  });


  }

  titleAmchart(){
    if(this.lenguaje=="es"){
      this.open = "Abierto";
      this.progress = "En progreso";
      this.late="Retrasado";
      this.mexico="México";
      this.brazil="Brasil";
      this.usa="USA";
      this.answered ="Contestado"
      this.Effective = "Eficaz"
      this.PastDue ="Atrasado"
      this.AudAnswered ="Auditoria Contestado"
      this.AudEffective ="Auditoria Eficaz"
      this.AudPastDue ="Auditoria Atrasado"
    }else{
      this.open = "Open";
      this.progress = "In progress";
      this.late="Late";
      this.mexico="Mexico";
      this.brazil="Brazil";
      this.usa="USA";
      this.answered ="Answered"
      this.Effective = "Effective"
      this.PastDue ="Past Due"
      this.AudAnswered ="Audit Answered"
      this.AudEffective ="Audit Effective"
      this.AudPastDue ="Audit Past Due"

    }
  }

}
