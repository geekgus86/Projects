import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {FormingService} from "./forming.service";
import { DatePipe } from '@angular/common'; 

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-forming-dashboard',
  templateUrl: './forming-dashboard.component.html',
  styleUrls: ['./forming-dashboard.component.scss']
})
export class FormingDashboardComponent implements OnInit {

  selectedRange : number ;
  private chart: am4charts.XYChart;
  adrian : number = 0;
  press : any;
  colors = new Array();

  constructor(private zone: NgZone, private formingServices : FormingService) { 

    this.selectedRange = 1;
    this.loader = true;
    formingServices.getAll(1).subscribe(res => {
      this.formingServices.getAsset().subscribe(data => {
        this.press = data;

        this.press.forEach((element: any)  => {
            this.colors[element.description] = element.color;
        });
        this.oaxpr(res.agrupadoOaxpr, this.colors);
        this.changeover(res.agrupadoChangeOver, this.colors);
        this.strokes(res.agrupadoStroke, this.colors);
      });
      this.loader = false;
    });

  }
  
  
  ngOnInit() {
    
  }

  performSelect(id : number){
    this.loader = true;
    this.selectedRange = id;
    this.formingServices.getAll(id).subscribe(res => {
      console.log(res);
      this.oaxpr(res.agrupadoOaxpr, this.colors);
      this.changeover(res.agrupadoChangeOver, this.colors);
      this.strokes(res.agrupadoStroke, this.colors);
      this.loader = false;
    });
  }


  oaxpr(data : any, colores : any){

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create("oaxpr", am4charts.XYChart);

    // Add data
    console.log(data);
    console.log("Que me llega");

    console.log(colores);
    console.log("Que me llega");
    chart.data = data;

    am4core.color("#ffffff");

    // Create category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.renderer.opposite = false;
    categoryAxis.renderer.minGridDistance = 70;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inversed = false;

    function createSeries(field: any, name: any,index:any) {
      console.log(field);
      console.log(colores[field]);
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "day";
      series.stroke = am4core.color(colores[field]);
      series.fill = am4core.color(colores[field])
      series.name = field;
      series.strokeWidth = 3;
      series.bullets.push(new am4charts.CircleBullet());
      series.tooltipHTML = "<div class='tooltipF'>"+ field+ ": {valueY}% </div>";
      series.legendSettings.valueText = "{valueY}";
      series.visible  = false;
      return series;
    }

   //let colores =  ["#DC6A67","#8068DC","#67B6DC","#DCD267","#A0DD67"];


   let i = 0;
   let procesada = false;
   //console.log("chart.data: ",chart.data);
   chart.data.forEach((element,index) => {

    console.log("element", element);
    var datePipe = new DatePipe("en-US");
    element["day"] = datePipe.transform(element["day"], 'MMM d');  //, y

    if(!procesada)
      Object.keys(colores).forEach(key => {
        //console.log("Antes de createSeries");
        //console.log(key);
        //if(key != "day" ){
          createSeries(key, key,i);
        //}

      });
    
    procesada = true;

   });

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    //Responsive
    chart.responsive.enabled = true;
  }

  changeover(data : any, colores : any){

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create("changeover", am4charts.XYChart);

    // Add data
    chart.data = data ; 

    am4core.color("#ffffff");

    // Create category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.renderer.opposite = false;
    categoryAxis.renderer.minGridDistance = 70;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inversed = false;
    valueAxis.title.text = "Minutes";
    function createSeries(field: any, name: any,index:any) {
      //console.log(field);
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "day";
      series.name = field;
      
      series.stroke = am4core.color(colores[field]);
      series.fill = am4core.color(colores[field])
      series.strokeWidth = 3;
      series.bullets.push(new am4charts.CircleBullet());
      series.tooltipHTML = "<div class='tooltipF'>"+ field+ ": {valueY} Min </div>";
      series.legendSettings.valueText = "{valueY}";
      series.visible  = false;
      return series;
    }

   //let colores =  ["#DC6A67","#8068DC","#67B6DC","#DCD267","#A0DD67"];


   let i = 0;
   let procesada = false;
   //console.log("chart.data: ",chart.data);
   chart.data.forEach((element,index) => {
    //console.log("element", element);
    var datePipe = new DatePipe("en-US");
    element["day"] = datePipe.transform(element["day"], 'MMM d');  //, y

    if(!procesada)
      Object.keys(colores).forEach(key => {
        
        //if(key != "day" ){
          createSeries(key, key,i);
        //}

      });
    
    procesada = true;

   });

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    //Responsive
    chart.responsive.enabled = true;
  }

  strokes(data : any , colores : any){

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create("strokes", am4charts.XYChart);

    // Add data
    chart.data = data ; 

    am4core.color("#ffffff");

    // Create category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.renderer.opposite = false;
    categoryAxis.renderer.minGridDistance = 70;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inversed = false;

    function createSeries(field: any, name: any,index:any) {
      //console.log(field);
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "day";
      series.name = field;
      series.stroke = am4core.color(colores[field]);
      series.fill = am4core.color(colores[field])
      series.strokeWidth = 3;
      series.bullets.push(new am4charts.CircleBullet());
      series.tooltipHTML = "<div class='tooltipF'>"+ field+ ": {valueY} </div>";
      series.legendSettings.valueText = "{valueY}";
      series.visible  = false;
      return series;
    }

   //let colores =  ["#DC6A67","#8068DC","#67B6DC","#DCD267","#A0DD67"];


   let i = 0;
   let procesada = false;
   //console.log("chart.data: ",chart.data);
   chart.data.forEach((element,index) => {
    var datePipe = new DatePipe("en-US");
    element["day"] = datePipe.transform(element["day"], 'MMM d');  //, y

    //console.log("element", element);
    if(!procesada)
      Object.keys(colores).forEach(key => {
        
        //if(key != "day" ){
          createSeries(key, key,i);
        //}

      });
    
    procesada = true;

   });
   
    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    //Responsive
    chart.responsive.enabled = true;

  }

  //Loader
  loader = false;

  fixedScroll = false;
  @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {
      var scrollOffset = event.srcElement.children[0].scrollTop;
      console.log("window scroll: ", scrollOffset);
      if(scrollOffset >= 50){
        this.fixedScroll = true;
      } else{
        this.fixedScroll = false;
      }
}

}
