import { Component, OnInit, Input ,OnChanges, AfterViewInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit,OnChanges, AfterViewInit {
  @Input() data: any;
  @Input() lenguaje: string;

  shift:string;
  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
   
  }

  ngAfterViewInit(){
    this.title();
    this.FramesByShiftAndHour();
  }

  ngOnChanges() {
    this.title();
    this.FramesByShiftAndHour();
  }

  FramesByShiftAndHour(){
    let dataFramesByShiftAndHour = Array();
    let graphsFramesByShiftAndHour = Array();

    if(this.data !==undefined ){



        this.data.forEach((value:any) => {
        var property = new  ptyFramesByShiftAndHour();
        if (value.aProductionShift === 1){
          property.ProductionShift1 = value.aProductionShift;
          property.count1=value.count;
          property.ProductionHour=value.aProductionHour;
        }
        if (value.aProductionShift === 2){
          property.ProductionShift2 = value.aProductionShift;
          property.count2=value.count;
          property.ProductionHour=value.aProductionHour;
        }
        if (value.aProductionShift === 3){
          property.ProductionShift3 = value.aProductionShift;
          property.count3=value.count;
          property.ProductionHour=value.aProductionHour;
        }
        dataFramesByShiftAndHour.push(property);
      })
  
      dataFramesByShiftAndHour.sort(function(obj1, obj2) {
        return obj1.ProductionHour - obj2.ProductionHour;
      });


      var data1  = dataFramesByShiftAndHour.filter(function (el:any) {
        return (el.ProductionShift1 === 1 );
      });
      var data2  = dataFramesByShiftAndHour.filter(function (el:any) {
        return (el.ProductionShift2 === 2 );
      });
      var data3  = dataFramesByShiftAndHour.filter(function (el:any) {
        return (el.ProductionShift3 === 3 );
      });


      if(data1.length > 0){
        var property = new  ptyGraphFramesByShiftAndHour();
        property.id="graph1";
        property.balloonText="<span style='font-size:12px;'>[[title]]  [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>";
        property.bullet="round";
        property.lineThickness=3;
        property.bulletSize=7;
        property.bulletBorderAlpha=1;
        property.bulletColor="#FFFFFF";
        property.useLineColorForBulletBorder=true;
        property.bulletBorderThickness=3;
        property.fillAlphas=0;
        property.lineAlpha=1;
        property.title=this.shift+"1";
        property.valueField="count1";
        property.dashLengthField="dashLengthLine";
        property.lineColor="#0A828B";
        graphsFramesByShiftAndHour.push(property);
      }

      if(data2.length > 0){
        var property = new  ptyGraphFramesByShiftAndHour();
        property.id="graph2";
        property.balloonText="<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>";
        property.bullet="round";
        property.lineThickness=3;
        property.bulletSize=7;
        property.bulletBorderAlpha=1;
        property.bulletColor="#FFFFFF";
        property.useLineColorForBulletBorder=true;
        property.bulletBorderThickness=3;
        property.fillAlphas=0;
        property.lineAlpha=1;
        property.title=this.shift+"2";
        property.valueField="count2";
        property.dashLengthField="dashLengthLine";
        property.lineColor="#40ED9A";
        graphsFramesByShiftAndHour.push(property);
      }

      if(data3.length > 0){
        var property = new  ptyGraphFramesByShiftAndHour();
        property.id="graph3";
        property.balloonText="<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>";
        property.bullet="round";
        property.lineThickness=3;
        property.bulletSize=7;
        property.bulletBorderAlpha=1;
        property.bulletColor="#FFFFFF";
        property.useLineColorForBulletBorder=true;
        property.bulletBorderThickness=3;
        property.fillAlphas=0;
        property.lineAlpha=1;
        property.title=this.shift+"3";
        property.valueField="count3";
        property.dashLengthField="dashLengthLine";
        graphsFramesByShiftAndHour.push(property);
      }


      // console.log("----RES----");
      // console.log(dataFramesByShiftAndHour);
      // console.log(graphsFramesByShiftAndHour);
      // console.log("----RES----");

    }

    this.linechart(dataFramesByShiftAndHour,graphsFramesByShiftAndHour);

  }

  linechart(dataFramesByShiftAndHour:any,graphsFramesByShiftAndHour:any){


    var chart = this.AmCharts.makeChart( "linechart", {
      "type": "serial",
      "addClassNames": true,
      // "theme": "light",
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
        "position": "bottom", //bottom
        "align": "left",
        "color": "#ffffff", //Color Text legend 
      },
      "dataProvider": dataFramesByShiftAndHour,
      "startDuration": 1,
      "graphs": graphsFramesByShiftAndHour
      ,
      "categoryField": "ProductionHour",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
      },
      "color": "#ffffff"
      
    });


  }


  title(){
    if(this.lenguaje=="es"){
      this.shift = "Turno";
    }else{
      this.shift = "Shift";
    }
  }




}


class ptyFramesByShiftAndHour{
  ProductionShift1:Number;
  ProductionShift2:Number;
  ProductionShift3:Number;
  count1:Number;
  count2:Number;
  count3:Number;
  ProductionHour:Number;
  
}

class ptyGraphFramesByShiftAndHour{
  id:String;
  balloonText:String;
  bullet:String;
  lineThickness:Number;
  bulletSize:Number;
  bulletBorderAlpha:Number;
  bulletColor:String;
  useLineColorForBulletBorder:boolean;
  bulletBorderThickness:Number;
  fillAlphas:Number;
  lineAlpha:Number;
  title:String;
  valueField:String;
  dashLengthField:String;
  lineColor:String;
}