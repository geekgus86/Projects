import { Component, OnInit, NgZone } from '@angular/core';
import { AdministrativeService } from './administrative.service';
import { Helper } from '@app/shared/helper';
import { AmChartsService} from '@amcharts/amcharts3-angular';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// import * as pdfMake from 'pdfmake/build/pdfmake.js';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-administrative',
  templateUrl: './administrative.component.html',
  styleUrls: ['./administrative.component.scss']
})
export class AdministrativeComponent implements OnInit {

  arrayAsset:any
  arrayInspector:any;
  arrayShift:any;
  arrayQuickReport = new Array();
  arrayMasterInformation = new Array();

  arrayDefectParetos:any;
  arrayDefectByCordon:any;
  
  AssetId:number;
  codeAsset:string; 
  shiftId:number;
  inspectorId:number;


  StartDate:string;
  EndDate:string;
  helper: Helper;
  bsRangeValue: Date[];
  maxDate: Date;

  lenguaje:string;

    
  TitleDefectParetos:string
  TitleDefectCordon:string

  display:string = "none";

  constructor(private administrativeService: AdministrativeService, private AmCharts: AmChartsService) { 
    this.helper = new Helper();

  }


  ngOnInit() {
    this.maxDate = new Date();
    this.bsRangeValue = [new Date(), new Date()];
    this.getAsset();
    this.getInspector();

  }


  getAsset(): void {
    this.arrayAsset = new Array();
    this.administrativeService.getAsset(3)
    .subscribe(res => {
      this.arrayAsset = res.Values;
      this.AssetId= this.arrayAsset[0].ID
      this.codeAsset =this.arrayAsset[0].Code.trim();
      this.getShift()
      console.log("***** getAsset *****")
      console.log(res)
    });
  }

  getInspector(): void {
    this.arrayInspector = new Array();
    this.administrativeService.getInspector()
    .subscribe(res => {
        this.arrayInspector = res;
        this.inspectorId= this.arrayInspector[0].ID
        console.log("***** getInspector *****")
        console.log(res)
    });
  }


  getShift(): void {
    this.arrayShift = new Array();
    this.administrativeService.getShift(this.AssetId,this.StartDate)
    .subscribe(res => {
      this.arrayShift = res.SHIFTS;
      this.shiftId= this.arrayShift[0].id
      console.log("***** getShift *****")
      console.log(res)
      this.getAllReport()
      this
    });
  }


 //REPORT Quick Report
  getQuickReport(): void {
      this.arrayQuickReport = new Array();
      this.administrativeService.getQuickReport(this.codeAsset,this.StartDate,this.EndDate,this.shiftId,this.inspectorId )
      .subscribe(res => {
        console.log("*** Report QuickReport ***")
        console.log(res)
        res.Values.forEach((element: any) => {
          var object = new Object();
          object['Cantidad Producida'] = element.QuantityProduction
          object['Cordones OK'] = element.SeamOK;
          object['Cordones NOK'] = element.SeamNOK;
          object['Porcentaje OK'] = element.PercentageOK;
          object['Procentaje NOK'] = element.PercentageNOK;
          object['Promedio de Reparacion (seg)'] = element.AverageRepaired;
          this.arrayQuickReport.push(object);
        });


      });
  }


 //REPORT Master Information
 getMasterInformation(): void {
   this.display = "block";
   this.arrayMasterInformation = new Array();
     this.administrativeService.getMasterInformation(this.codeAsset,this.StartDate,this.EndDate,this.shiftId,this.inspectorId )
     .subscribe(res => {
       console.log("*** Report MasterInformation ***")
       console.log(res)
         res.Values.forEach((element: any) => {
           var object = new Object();
           object['Fecha'] = element.Date
           object['Turno'] = element.Shift;
           object['Auditor'] = element.Auditor;
           object['Estacion'] = element.Station;
           object['Id'] = element.ID;
           object['Posición'] = element.Position;
           object['Operación'] = element.Operation;
           object['Cordon'] = element.Seam;
           object['Defecto'] = element.Defect;
           this.arrayMasterInformation.push(object);
         });
         this.display = "none";
     });

 }


  //Graph Dedects Paretos
  getDefectParetos(): void {
      this.arrayDefectParetos = new Array();
      this.administrativeService.getDefectParetos(this.codeAsset,this.StartDate,this.EndDate )
      .subscribe(res => {
        console.log("Graph DefectParetos")
        console.log(res)
        this.arrayDefectParetos = res.Values;
        this.TitleDefectParetos = "Pareto Defectos de Soldadura - "+res.Name
        this.chartDefectParetos();
      });
  }


  getDefectByCordon(): void {
    this.arrayDefectByCordon = new Array();
    this.administrativeService.getDefectByCordon(this.codeAsset,this.StartDate,this.EndDate )
    .subscribe(res => {
      console.log("Graph DefectByCordon")
      console.log(res)
        this.TitleDefectCordon = "Defectos x Cordon - "+ res.Name
        res.Values.forEach((element: any) => {
          this.arrayDefectByCordon.push({
            Seam: element.Seam,
            QuantityDefect: element.QuantityDefect,
            label:(element.Operation != null) ? element.Operation : ""+ "    "+ (element.Seam != null) ? element.Seam : "",
          });
        });
        this.chartDefectByCordon();
    });
  }
  

  onAssetChange(AssetId: number): void {
    var cd = this.arrayAsset.filter(function (el:any) {
      return (el.ID === (+AssetId) );
    });
    this.codeAsset =cd[0].Code;
    this.codeAsset = this.codeAsset.trim();
    this.AssetId= AssetId;
    this.getShift();
  }



  onInspectorChange(value: number): void {
    this.inspectorId= value;
    this.getAllReport()
  }


  onShiftChange(value: number): void {
    this.shiftId= value;
    this.getAllReport()
  }

  

  onDateSelection(value: Date): void {
    if (value != null) {
      this.StartDate = this.helper.dateProcessingWithDashFormat(value[0]);
      this.EndDate = this.helper.dateProcessingWithDashFormat(value[1]);
      this.getAllReport()
    }

  }

  getAllReport(){

    if(this.codeAsset!= undefined && this.shiftId!= undefined && this.inspectorId!= undefined){
      this.getQuickReport();      // Report Quick Report
      this.getMasterInformation() // Report Master Information
    }


    if(this.codeAsset!= undefined){
      this.getDefectParetos();    // Graph Defect Paretos 
    }
    this.getDefectByCordon();   // Graph Defect Cordon 
  


  }




  chart1:any;
  chartDefectParetos(){

    am4core.useTheme(am4themes_animated);
    this.chart1 = am4core.create("testAmchart4-1", am4charts.XYChart);
    this.chart1.data = this.arrayDefectParetos
    
    // Add data
    // chart.data = [{
    //   "Name": "USA",
    //   "Total": 2025
    // }, {
    //   "Name": "China",
    //   "Total": 1882
    // }, {
    //   "Name": "Japan",
    //   "Total": 1809
    // }, {
    //   "country": "Germany",
    //   "visits": 1322
    // }];

    // Create axes

    let categoryAxis = this.chart1.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.rotation = 310;

    let valueAxis = this.chart1.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = this.chart1.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "Total";
    series.dataFields.categoryX = "Name";
    series.name = "Total";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;


  }

  chart2:any;
  chartDefectByCordon(){

    am4core.useTheme(am4themes_animated);

    this.chart2 = am4core.create("testAmchart4-2", am4charts.XYChart);
    this.chart2.data = this.arrayDefectByCordon

    // Add data
    // chart.data = [{
    //   "label": "USA",
    //   "QuantityDefect": 2025
    // }, {
    //   "label": "Falta de relleno(FR)",
    //   "QuantityDefect": 1882
    // }, {
    //   "label": "Falta de \nrelleno(ASD)",
    //   "QuantityDefect": 1809
    // }];

    // Create axes

    let categoryAxis = this.chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "label";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = this.chart2.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = this.chart2.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "QuantityDefect";
    series.dataFields.categoryX = "label";
    series.name = "QuantityDefect";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;


  }

  // ExportPDF(){

  //   var doc:any = {
  //     pageSize: "A4",
  //     pageOrientation: "portrait",
  //     pageMargins: [30, 30, 30, 30],
  //     content: []
  //   };


  //   doc.content.push({
  //     text: "Reporte Rápido",
  //     fontSize: 20,
  //     bold: true,
  //     margin: [0, 20, 0, 15]
  //   });

    
  //   doc.content.push({
  //     text: "Reporte Detallado",
  //     fontSize: 20,
  //     bold: true,
  //     margin: [0, 20, 0, 15]
  //   });



  //   doc.content.push({
  //     text: this.TitleDefectParetos,
  //     fontSize: 20,
  //     bold: true,
  //     margin: [0, 20, 0, 15]
  //   });

  //   var TitleDefectCordon = this.TitleDefectCordon
  //   var chart2 = this.chart2


  //   this.chart1.exporting.getImage("png").then(function(char1:any) {
      
  //     doc.content.push({
  //       image: char1, //
  //       width: 530
  //     });

  //     doc.content.push({
  //       text: TitleDefectCordon,
  //       fontSize: 20,
  //       bold: true,
  //       margin: [0, 20, 0, 15]
  //     });



  //     chart2.exporting.getImage("png").then(function(char2C:any) {

  //       doc.content.push({
  //         image: char2C, 
  //         width: 530
  //       });

  //       pdfMake.createPdf(doc).download("ReporteAdministrativo.pdf");

  //     });



  //   });


  // }


}
