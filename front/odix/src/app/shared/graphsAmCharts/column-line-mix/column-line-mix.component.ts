import { Component, OnInit,Input } from '@angular/core';
import { AmChartsService} from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-column-line-mix',
  templateUrl: './column-line-mix.component.html',
  styleUrls: ['./column-line-mix.component.scss']
})
export class ColumnLineMixComponent implements OnInit {

  @Input() nameColumnChart: string;
  @Input() objData: any;
  @Input() Title: string;
  @Input() stggraphs: any;
  constructor(private AmCharts: AmChartsService) {
  }

  colorType : string;
  titleAxis : string;

  ngOnInit() {
    if (this.nameColumnChart == "TimeRepaired"){
      this.colorType = "#008f39";
      this.titleAxis = "SEG / PIEZA"
    }else{
      this.colorType = "#FF0000";
      this.titleAxis = " % OK";
    }
  }

  ngOnChanges() {
    this.paintChart()
  }

  ngAfterViewInit(){
    this.paintChart()
  }

  paintChart(){
    if(this.nameColumnChart != undefined ){
      // console.log("******* Component AMCHART *******");
      // console.log(this.nameColumnChart);
      console.log("Check2");
      console.log(this.objData);
      this.contentions();
    }
  }
 
  contentions(){
    var chart = this.AmCharts.makeChart( this.nameColumnChart, {
      "type": "serial",
      "addClassNames": true,
      "theme": "light",
      "autoMargins": false,
      "marginLeft": 30,
      "marginRight": 8,
      "marginTop": 10,
      "marginBottom": 100,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },
      "legend": {
        "useGraphSettings": true,
        "position": "bottom", //top
        "align": "right",
        "color": "#ffffff", //Color Text legend 
        "fontSize": 30,
       
      },
      "dataProvider":
      this.objData.Values,

      // "dataProvider": [{
      //     "Target": 2.0,
      //     "late": 2.5,
      //     "Piece": "a1",
      //     "Fixed": 2.1,
      // }, {
      //     "Target": 2.9,
      //     "late": 2.7,
      //     "Piece":  "a2",
      //     "Fixed": 2.2,
      // }, {
      //     "Target": 3.8,
      //     "late": 2.9,
      //     "Piece":  "a3",
      //     "Fixed": 2.4,
      // }],

      
      "valueAxes": [ {
        "axisAlpha": 0,
        "position": "left"
        ,"gridColor": "4A4E56",
        "gridAlpha": 0.2,
        "dashLength": 0,
        //"title" : this.titleAxis,
        "minimum": 0,
        "strictMinMax": true,
        "maximum" : 100
      } 
    ],
      "startDuration": 1,
      "graphs": [ 
      {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        // "fillColorsField": "ReleaseColor",
        "fillColorsField": "#01b8aa",
        "fillAlphas": 1,
        // "title": "Release",
        "title":  this.stggraphs[0] ,
        "type": "column",
        "valueField": "Target",
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
        "bulletColor": "#ffffff",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "lineAlpha": 1,
        "title": this.stggraphs[1] ,
        "valueField": "Value",
        "dashLengthField": "dashLengthLine",
        "lineColor": this.colorType,
      } 
   

    ],
    
      "categoryField": "Piece",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0,
        "position": "left",
        //"labelRotation":20, 
        "textAlign" : "right",
        "fontSize" : 20,
      },
      "color": "#ffffff",


    } );

  }








}
