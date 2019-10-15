import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})

export class ColumnChartComponent implements OnInit, OnChanges {
  @Input() objData: any;
  @Input() objContention: any;
  @Input() objFlowOutsAndScrap: any;
  @Input() lenguaje: string;
  @Input() flowOutScrapCaption: any;
  @Input() contentionsCaption: any;
  @Input() defectsTop5Caption: any;
  

  Contention:string;
  Release:string;
  FlowOut:string;
  Scrap:string;

  constructor(private AmCharts: AmChartsService) {}

  ngOnInit() {
    this.titleAmchart();
    this.top5Defect();
    this.contentions();
    this.flowOutsScrap();
  }

  ngOnChanges() {
    this.titleAmchart();
    this.top5Defect();
    this.contentions();
    this.flowOutsScrap();
  }

  titleAmchart(){
    if(this.lenguaje=="es"){
      this.Contention = "Contención";
      this.Release = "Liberado";
      this.FlowOut="Defecto";
      this.Scrap="Chatarra";
    }else{
      this.Contention = "Contention";
      this.Release = "Release";
      this.FlowOut="FlowOut";
      this.Scrap="Scrap";
    }
}

  flowOutsScrap(){

    var chart = this.AmCharts.makeChart("divFlowOutsScrap", {
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
      "dataProvider":
      this.objFlowOutsAndScrap,
      "valueAxes": [ {
        "axisAlpha": 0,
        "position": "left"
        ,"gridColor": "4A4E56",
        "gridAlpha": 0.2,
        "dashLength": 0
      } 
    ],
      "startDuration": 1,
      "graphs": [ {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        // "fillColorsField": "FlowOutColor",
        "fillColorsField": "#40ED9A",
        "fillAlphas": 1,
        // "title": "FlowOut",
        "title": this.FlowOut,
        "type": "column",
        "valueField": "FlowOut",
        "dashLengthField": "dashLengthColumn",
        "lineColor": "#40ED9A",
      }, 
      {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        // "fillColorsField": "ScrapColor",
        "fillColorsField": "#01b8aa",
        "fillAlphas": 1,
        // "title": "Scrap",
        "title": this.Scrap,
        "type": "column",
        "valueField": "Scrap",
        "dashLengthField": "dashLengthColumn",
        "lineColor": "#01b8aa",
      }
    ],
      "categoryField": "Date",
      "dataDateFormat":"YYYY-MM-DD",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
      },
      "color": "#ffffff",
      
    } );

    
  }

 
  contentions(){
    var chart = this.AmCharts.makeChart( "divContentions", {
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
      "dataProvider":
      this.objContention,
      "valueAxes": [ {
        "axisAlpha": 0,
        "position": "left"
        ,"gridColor": "4A4E56",
        "gridAlpha": 0.2,
        "dashLength": 0
      } 
    ],
      "startDuration": 1,
      "graphs": [ {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        // "fillColorsField": "ContentionColor",
        "fillColorsField": "#40ED9A",
        "fillAlphas": 1,
        // "title": "Contention",
        "title": this.Contention,
        "type": "column",
        "valueField": "Contention",
        "dashLengthField": "dashLengthColumn",
        "lineColor": "#40ED9A",
      }, 
      {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        // "fillColorsField": "ReleaseColor",
        "fillColorsField": "#01b8aa",
        "fillAlphas": 1,
        // "title": "Release",
        "title":  this.Release ,
        "type": "column",
        "valueField": "Release",
        "dashLengthField": "dashLengthColumn",
        "lineColor": "#01b8aa",
      },

      
      {
        "id": "graph2",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#4A4E56",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "lineAlpha": 1,
        "title": "Total",
        "valueField": "Total",
        "dashLengthField": "dashLengthLine",
        "lineColor": "#4A4E56",
      } 
   

    ],
      "categoryField": "Date",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
      },
      "color": "#ffffff",


    } );

  }

  top5Defect(){


   /* */
   var chart = this.AmCharts.makeChart("columChart", {
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

    "dataProvider":
    this.objData,
    "valueAxes": [ {
      "axisAlpha": 0,
      "position": "left"
      ,"gridColor": "4A4E56",
      "gridAlpha": 0.2,
      "dashLength": 0


    } 
  ],
    "startDuration": 1,
    "graphs": [ {
      "alphaField": "alpha",
      "balloonText": "<span style='font-size:12px;'>[[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
      // "fillColorsField": "FlowOutColor",
      "fillColorsField": "#0A828B",
      "fillAlphas": 1,
      "title": "Quantity",
      "type": "column",
      "valueField": "Quantity",
      "dashLengthField": "dashLengthColumn",
      "lineColor": "#0A828B", 
    }, 
  
  ],
    "categoryField": "Defect",
    "dataDateFormat":"YYYY-MM-DD",
    "categoryAxis": {
      "gridPosition": "start",
      "axisAlpha": 0,
      "tickLength": 0
    },
    "color": "#ffffff",
    
  } );
  /* */


  /*
    var chart = this.AmCharts.makeChart( "columChart", {
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
   



      
      
      "dataProvider":   
        this.objData,
       "valueAxes": [ {
        "gridColor": "#00B5A7",
        "gridAlpha": 0.2,
        "axisAlpha": 0,
        // "dashLength": 0
        "position": "left"
      } ],
      
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'> [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        // "fillColorsField": "color",
        "fillColorsField": "#0A828B",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "Quantity",
        "lineColor": "#0A828B",


        "title": "Release",


        
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "Defect",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        // "tickPosition": "start",
        "tickLength": 20
      },
      "color": "#ffffff",



    
    } );

    */

  }


}


