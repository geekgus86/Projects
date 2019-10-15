import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, HostListener, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MttrFormingService } from './mttr-forming.service';
import { Subject } from 'rxjs/Subject';
import { Helper } from '@app/shared/helper';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mttr-forming',
  templateUrl: './mttr-forming.component.html',
  styleUrls: ['./mttr-forming.component.scss']
})
export class MttrFormingComponent {
  dataMttr = new Array();
  assets = new Array();
  departments = new Array();
  startAt: String;
  endAt: String;
  asset: String;
  combats: String;
  types: String;
  nrSelect:string = "1" 
  objMtt:any;
  loader : any = false;
  plantName: string;
  tittle:string
  assistances:any;
  timeStart:string;
  timeEnd:string;
  maxDate:any;
  minDate:any;
  numZone:any;
  startday:any;
  endDay:any;
  sliderMin = 0;
  sliderMax = 0;
  maxSlider = 100;
  texMinutes = "Minutos";
  textEvents = "Eventos";
  textRecurrence = "Recurrencia";
  selectedDate = 0;
  presition={"precision": 0};
  constructor(private service:MttrFormingService, private route: ActivatedRoute,
    @Inject(LOCALE_ID) public locale: string, public translateService: TranslateService) {
    this.plantName = this.route.snapshot.paramMap.get('plantName');
    
    this.translateService.use('es-MX');
    if(this.plantName == "apodaca"){
      this.translateService.use('es-MX');
      this.startday = 0;
      this.endDay = 1;
    }
    
    if(this.plantName == "etown"){
      this.translateService.use('en-US');
      this.startday = -1;
      this.endDay = 0;
    }
    this.objMtt = {};
    this.objMtt.startAt = "";
    this.objMtt.endAt = "";
    this.objMtt.assetID = this.nrSelect;
    this.objMtt.combat = "2,3,4,5";
    this.objMtt.type = "Days";
    this.objMtt.plant = this.plantName;
  }
    scrollableMtta = false;
    scrollableMttr = false;
    scrollableMtbf = false;
    scrollableMttrByTools = false;
    scrollableMtti = false;
    scrollableMttrFault = false;
    scrollableMtbfFault = false;

  ngOnInit() {
    this.translateService.stream('Minutes').subscribe((text:string) => {this.texMinutes = text });
    this.translateService.stream('Eventos').subscribe((text:string) => {this.textEvents = text });
    this.translateService.stream('Recurrencia').subscribe((text:string) => {this.textRecurrence = text });
    this.getDateZone();
    this.setMaxDate();
    this.getAssets();
    this.getDepartments();
  }

  refreshMtt(){
    this.loader = true;
    this.getMtta();
    this.getMttr();
    this.getMtbf();
  }

  refresMttAll(){
    this.refreshMtt();
    this.getPresition();
    this.getMtti();
    this.getMttrByTools();
    this.getMttrFault();
    this.getMtbfFault();
    this.getAssitance();
  }

  setSliderMin(slider:any){
    this.sliderMin = slider.value;
    if(Number(slider.value) > Number(this.sliderMax)){
      this.sliderMax = slider.value;
    }
    this.setSlider();
  }

  setSliderMax(slider:any){
    this.sliderMax = slider.value;
    if(Number(this.sliderMin) > Number(slider.value)){
      this.sliderMin = slider.value;
    }
    this.setSlider();
  }

  onDateSelection(value: Date[]): void {
    if (value != null) {
      this.objMtt.startAt = this.setZoneHour(value[0], this.timeStart, this.startday);
      this.objMtt.endAt = this.setZoneHour(value[1], this.timeEnd, this.endDay ) ;
      this.refresMttAll();
      this.selectedDate = 4;
    }
  }

  setCapitalize(s:string){
    if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }

  getPlant(){
    return this.plantName.charAt(0).toUpperCase() + this.plantName.slice(1);
  }

  getAssets(){
    this.service.getAssets(this.plantName).subscribe(res => {
      this.assets = new Array();
      this.assets = res;
      this.tittle = this.getPlant() + " / " + res[0].name;
    });
  }

  getDateZone(){
    this.service.getDateZone(this.objMtt).subscribe(res => {
      this.timeStart = res.startAt.split(" ")[1].substring(0, 8);
      this.timeEnd = res.endAt.split(" ")[1].substring(0, 8);
      this.numZone = res.numZone;
      this.maxSlider = res.sliderMax;
      this.getSevenDays();
    });
  }

  getPresition(){
    this.service.getPresition(this.objMtt).subscribe(res => {
      this.presition = res;
    });
  }

  getDepartments(){
    this.service.getDepartments(this.objMtt).subscribe(res => {
      this.departments = new Array();
      this.departments = res;
    });
  }

  setSlider(){
    this.objMtt.minMin = this.sliderMin;
    this.objMtt.minMax = this.sliderMax;
    this.getMttrFault();
  }

  setAsset(asset:any){
    var text = asset.options[asset.selectedIndex].text;
    this.objMtt.assetID = asset.value;
    this.tittle = this.getPlant() + " / " + text;
    this.refresMttAll();
  }

  setCombat(){
    this.objMtt.combat = "";
    let elements = new Array();

    let element1 = <HTMLInputElement> document.getElementById("combat1");
    if (element1.checked) { elements.push("2") }

    let element2 = <HTMLInputElement> document.getElementById("combat2");
    if (element2.checked) { elements.push("3") }

    let element3 = <HTMLInputElement> document.getElementById("combat3");
    if (element3.checked) { elements.push("4") }

    let element4 = <HTMLInputElement> document.getElementById("combat4"); 
    if (element4.checked) { elements.push("5") }

    this.objMtt.combat = elements.join(",");
    this.refreshMtt();
  }

  setMaxDate(){
    var stDate = new Date();
    stDate.setDate(stDate.getDate() - 90);
    this.minDate = stDate;
    this.maxDate = new Date();
  }

  lastsevenDays(time:string, day:any){
    var stDate = new Date();
    stDate.setDate(stDate.getDate() - 7);
    return this.setZoneHour(stDate, time, day);
  }

  setZoneHour(date: Date, time:string, day:any){
    let dateT = this.dateFormatYYYYDDMM(date, time);
    let setDate = new Date(dateT);
    setDate.setHours(setDate.getHours() + this.numZone);
    setDate.setDate(setDate.getDate() + day);
    dateT = this.dateFormatYYYYDDMM(setDate, null);
    return dateT;
  }

  dateFormatYYYYDDMM(date: Date, time:string): string {
    let month = (date.getMonth() + 1).toString();
    if (month.length !== 2) {
      month = '0' + month;
    }
    if(time == null){
      time = date.toString().substring(16, 25);
    }
    const day = date.toString().substring(8, 10);
    let dateT = date.getFullYear().toString() + '-' + month + '-' + day + " " + time;

    return  dateT
  }

  getToday(){
    var date = new Date();
    var day = 1;
    if(this.plantName == "apodaca"){
      day = 1;
    }
    date.setDate(date.getDate() - day);
    return date;
  }

  getThisYear(){
    this.setCleanCalendar();
    var date = this.getToday();
    var startAt = new Date(date.getFullYear(), 0, 1);
    var endAt = date; //new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.objMtt.startAt = this.setZoneHour(startAt, this.timeStart, this.startday);
    this.objMtt.endAt = this.setZoneHour(endAt, this.timeEnd, this.endDay);
    this.objMtt.type = "Months";
    this.refresMttAll();
    this.selectedDate = 3;
  }

  getThisMonth(){
    this.setCleanCalendar();
    var date = this.getToday();
    var startAt = new Date(date.getFullYear(), date.getMonth(), 1);
    var endAt = date; //new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.objMtt.startAt = this.setZoneHour(startAt, this.timeStart, this.startday);
    this.objMtt.endAt = this.setZoneHour(date, this.timeEnd,this.endDay);
    this.objMtt.type = "Days";
    this.refresMttAll();
    this.selectedDate = 2;
  }

  getSevenDays(){
    this.setCleanCalendar();
    var today = this.getToday();
    this.objMtt.startAt = this.lastsevenDays(this.timeStart, this.startday);
    this.objMtt.endAt = this.setZoneHour(today, this.timeEnd, this.endDay);
    this.objMtt.type = "Days";
    this.refresMttAll();
    this.selectedDate = 1;
  }

  setCleanCalendar(){
    $("#datapickerId").val("");
  }

  resizeWidthElement(num:number, elem:string, siz:any){
    num = num < 7 ? 9 : num;
    let sty = "width:" + String(num * siz) + "%;";
    var element = document.getElementById(elem);
    element.setAttribute("style", sty);
  }

  getMtta(){
    this.service.getMtta(this.objMtt).subscribe(res => {
      res = this.setCounter(res);
      //CHANGE THE VALUE BELOW TO 11 IF SOMETHING GOES WRONG
      this.resizeWidthElement(res.length, "mtta", 12);
      this.graficCenter(res,"mtta");
      this.loader = false;
    });
  }

  getMttr(){
    this.service.getMttr(this.objMtt).subscribe(res => {
      res = this.setCounter(res);
      this.resizeWidthElement(res.length, "mttr", 12);
      this.graficCenter(res, "mttr");
    });
  }

  getMtbf(){
    this.service.getMtbf(this.objMtt).subscribe(res => {
      res = this.setCounter(res);
      this.resizeWidthElement(res.length, "mtbf", 12); //15.12
      this.graficCenter(res, "mtbf");
    });
  }

  getMttrByTools(){
    this.service.getMttrByTools(this.objMtt).subscribe(res => {
      res = this.setCounter(res);
      this.scrollableMttrByTools = (res.length >= 8);
      this.mttrTool(res);
    });
  }

  getMtti(){
    this.service.getMtti(this.objMtt).subscribe(res => {
      res = this.setCounter(res);
      this.resizeWidthElement(res.length, "mtti", 11.12);
      this.mtti(res);
    });
  }

  getMttrFault(){
    this.service.getMttrFault(this.objMtt).subscribe(res => {
      res = this.setCounter(res);
      this.scrollableMttrFault = (res.length) >= 8;
      this.mttrFail(res);
    });
  }

  getMtbfFault(){
    this.service.getMtbfFault(this.objMtt).subscribe(res => {
      res = this.setCounter(res);
      this.scrollableMtbfFault = (res.length >= 8);
      this.mtbfFail(res);
    });
  }

  getAssitance(){
    this.service.getAssitance(this.objMtt).subscribe(res => {
      this.setAssitances(res);
    });
  }

  setAssitances(res:any){
    this.assistances = res;

  }

  setCounter(res:any){
    for (var i = 0; i < res.length; i++) {
      res[i].evt = res[i].events;
      res[i].counter = i;
      res[i].year = this.setCapitalize(res[i].year);
      res[i].productiveDay = this.setCapitalize(res[i].productiveDay);
    }
    return res; 
  }

  graficCenter(res:any, graficId:any){
    var depart =this.departments;
    let that = this;
    res = this.formatDateString(res);
    am4core.ready(function() {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      // Create chart instance
      var chart = am4core.create(graficId, am4charts.XYChart);
      // Add data
      chart.data = res;
      // Create category axis
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "year";
      categoryAxis.renderer.opposite = false;
      categoryAxis.renderer.minGridDistance = 24;
      
      // Create value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = that.texMinutes;
      valueAxis.renderer.minLabelPosition = 0.01;
      valueAxis.renderer.minGridDistance = 24;
      depart.forEach(function (value:any){
        var series1 = chart.series.push(new am4charts.LineSeries());
        var nameDepartments = that.translateDep(value.descIssueType).toLowerCase();
        series1.dataFields.valueY = nameDepartments;
        series1.dataFields.categoryX = "year";
        series1.name = nameDepartments;
        series1.stroke = am4core.color(value.color);
        series1.strokeWidth = 3;
        series1.bullets.push(new am4charts.CircleBullet());
        series1.tooltipText = "{name}: {valueY} " + that.texMinutes;
        series1.legendSettings.valueText = "{valueY}";
        series1.visible  = false;


      });
      // Add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";
      // Add legend
      chart.legend = new am4charts.Legend();
      chart.responsive.enabled = true;
    }); // end am4core.ready()

    
  }

  formatPercentage(percen:any){
    
    if(isNaN(percen)){
      percen = 0.0
    }

    if(!Number.isInteger(percen)){
      percen = percen.toFixed(2)
    }

    return percen;

  }

  formatDateString(res:any, y="year"){
    let year = "";
    if(this.plantName != "etown"){
      return res;
    }
    for (var i = 0; i < res.length; i++) {
      year = res[i][y].split("-")
      if(year.length > 1){
        res[i][y] = year[1] + "-" + year[0];
      }
    
    }
    return res; 
  }

  translateDep(dep:any){
    let depR="";
    switch(dep) { 
       case "Quality": { 
          depR = "Calidad"
          break; 
       } 
       case "Production": { 
          depR = "Operaciones"
          break; 
       } 
       case "Tooling": { 
          depR = "Herramientas"
          break; 
       } 
       case "Maintenance": { 
          depR = "Mantenimiento"
          break; 
       } 
       case "Logistics": { 
          depR = "Logistica"
          break; 
       } 
       default: { 
          depR = dep;
          break; 
       } 
    } 
    return depR;
  }

  mtti(res:any){
    var that = this;
    res = this.formatDateString(res, "productiveDay");
    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      // Create chart instance
      var chart = am4core.create("mtti", am4charts.XYChart);
      // Add data
      chart.data = res;

      
      // Create category axis
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "productiveDay";
      categoryAxis.renderer.opposite = false;
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.labels.template.dx = -20;
      
      // Create value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      //valueAxis.renderer.inversed = true;
      valueAxis.title.text = that.texMinutes;
      valueAxis.renderer.minLabelPosition = 0.01;
      valueAxis.renderer.minGridDistance = 30;
      
      // Create series
      var series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.valueY = "mtti";
      series1.dataFields.categoryX = "productiveDay";
      series1.name = "mtti";
      series1.strokeWidth = 3;
      series1.bullets.push(new am4charts.CircleBullet());
      series1.tooltipText = "{name}: {valueY} " + that.texMinutes;;
      series1.legendSettings.valueText = "{valueY}";
      series1.visible  = false;
      
      // Add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";
      
      // Add legend
      chart.legend = new am4charts.Legend();
      
      }); // end am4core.ready()
  }

  mttrTool(res:any){
    var that = this;
    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      
      // Create chart instance
      var chart = am4core.create("mttrTool", am4charts.XYChart);
      
      chart.colors.step = 2;
      chart.maskBullets = false;
      
      // Add data
      chart.data = res;

       // Create category axis
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "tool";
      categoryAxis.renderer.opposite = false;
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.labels.template.dx = -20;
      
      // Create value axis
     var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      distanceAxis.title.text = that.texMinutes;
      distanceAxis.renderer.grid.template.disabled = true;
      
      var durationAxis = chart.yAxes.push(new am4charts.ValueAxis());
      durationAxis.title.text = "Downtimes";
      durationAxis.renderer.labels.template.stroke = am4core.color("#FFC326");
      durationAxis.title.stroke = am4core.color("#FFC326");
      // durationAxis.baseUnit = "minute";
      // durationAxis.renderer.grid.template.disabled = true;
      durationAxis.renderer.opposite = true;
            
      var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
      latitudeAxis.renderer.grid.template.disabled = true;
      latitudeAxis.renderer.labels.template.disabled = true;
      
      var series1 = chart.series.push(new am4charts.ColumnSeries());
       series1.dataFields.valueY = "mttr";
       series1.dataFields.categoryX = "tool";
       series1.yAxis = distanceAxis;
       series1.name = "MTTR";
       series1.fill = am4core.color("#a1a1a1");
       series1.stroke = am4core.color("#a1a1a1");
       series1.tooltipText = "{valueY.value}";
       //series1.columns.template.fillOpacity = 0.7;
       series1.columns.template.propertyFields.strokeDasharray = "dashLength";
       //series1.columns.template.propertyFields.fillOpacity = "alpha";
       var disatnceState = series1.columns.template.states.create("hover");
       disatnceState.properties.fillOpacity = 0.9;


      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.valueY = "events";
      series2.dataFields.categoryX = "tool";
      series2.yAxis = durationAxis;
      series2.name = "events";
      series2.strokeWidth = 3;
      series2.stroke = am4core.color("#FFC326");
      series2.bullets.push(new am4charts.CircleBullet());
      series2.tooltipText = "{name}: {valueY} " + that.textEvents;
      series2.legendSettings.valueText = "{valueY}";
      series2.visible  = false;
      // Add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";
       //series.sequencedInterpolation = true;
    }); // end am4core.ready()
  }

  mttrFail(res:any){
    var that = this;
    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      // Create chart instance
      var chart = am4core.create("mttrFail", am4charts.XYChart);
      
      chart.colors.step = 2;
      chart.maskBullets = false;
      
      // Add data
      chart.data = res;
      
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "desc";
      categoryAxis.renderer.opposite = false;
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.labels.template.dx = -20;
      
      // Create value axis
       var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      distanceAxis.title.text = that.texMinutes;
      distanceAxis.renderer.grid.template.disabled = true;
      
      var durationAxis = chart.yAxes.push(new am4charts.ValueAxis());
      durationAxis.title.text = that.textRecurrence;
      durationAxis.renderer.labels.template.fill = am4core.color("#FFC326");
      durationAxis.renderer.labels.template.stroke = am4core.color("#FFC326");
      durationAxis.title.stroke = am4core.color("#FFC326");
      // durationAxis.baseUnit = "minute";
      // durationAxis.renderer.grid.template.disabled = true;
      durationAxis.renderer.opposite = true;
            
      var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
      latitudeAxis.renderer.grid.template.disabled = true;
      latitudeAxis.renderer.labels.template.disabled = true;
      
      var series1 = chart.series.push(new am4charts.ColumnSeries());
       series1.dataFields.valueY = "mttr";
       series1.dataFields.categoryX = "desc";
       series1.yAxis = distanceAxis;
       series1.name = "MTTR";
       series1.columns.template.propertyFields.fill = "color";
       series1.columns.template.propertyFields.stroke = "color";
       series1.tooltipText = "{valueY.value}";
       series1.columns.template.fillOpacity = 0.7;
       series1.columns.template.propertyFields.strokeDasharray = "dashLength";
       series1.columns.template.propertyFields.fillOpacity = "alpha";
       series1.columns.template.adapter.add("stroke", (stroke, target) => {
        return chart.colors.getIndex(target.dataItem.index);
      });
       var disatnceState = series1.columns.template.states.create("hover");
       disatnceState.properties.fillOpacity = 0.9;


      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.valueY = "events";
      series2.dataFields.categoryX = "desc";
      series2.yAxis = durationAxis;
      series2.name = "events";
      series2.strokeWidth = 3;
      series2.stroke = am4core.color("#FFC326");
      series2.bullets.push(new am4charts.CircleBullet());
      series2.tooltipText = "{name}: {valueY} " + that.textEvents;
      series2.legendSettings.valueText = "{valueY}";
      series2.visible  = true;

      // Add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";
      
    }); // end am4core.ready()
  }

  mtbfFail(res:any){
    var that = this;
    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      
      // Create chart instance
      var chart = am4core.create("mtbfFail", am4charts.XYChart);
      
      // Add data
      chart.data = res;
      
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "desc";
      categoryAxis.renderer.opposite = false;
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.labels.template.dx = -20;
      
      // Create value axis
       var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      distanceAxis.title.text = that.texMinutes;
      distanceAxis.renderer.grid.template.disabled = true;
      
            
      var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
      latitudeAxis.renderer.grid.template.disabled = true;
      latitudeAxis.renderer.labels.template.disabled = true;
      
      var series1 = chart.series.push(new am4charts.ColumnSeries());
       series1.dataFields.valueY = "mtbf";
       series1.dataFields.categoryX = "desc";
       series1.name = "MTBF";
       series1.columns.template.propertyFields.fill = "color";
       series1.columns.template.propertyFields.stroke = "color";
       //series1.tooltipText = "{events}: {mtbf} ";
       series1.columns.template.tooltipText  = "MTBF: {mtbf}\nEvents: {evt} ";
       //series1.fill = "color"
       series1.columns.template.fillOpacity = 0.7;
       series1.columns.template.propertyFields.strokeDasharray = "dashLength";
       series1.columns.template.propertyFields.fillOpacity = "alpha";
       var disatnceState = series1.columns.template.states.create("hover");
       disatnceState.properties.fillOpacity = 0.9;

       // Add chart cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";

      
    }); // end am4core.ready()
  }


  fixedScroll = false;
  @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {
      var scrollOffset = event.srcElement.children[0].scrollTop;
      //console.log("window scroll: ", scrollOffset);
      if(scrollOffset >= 50){
        this.fixedScroll = true;
      } else{
        this.fixedScroll = false;
      }
    }

}