
import { Component, OnInit } from '@angular/core';
import { ProcessService } from './process.service';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { PText } from "./links.component";
import { Helper } from '@app/shared/helper';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  
  listCharts:any;

  frameworkComponents:any;
  context:any; ///cechar
  
  columnGrids: any;
  rowData:any;
  ProcessControlChartData:any;
  lineChart:any;

  Code:string = "APO_PinturaToyota-PINTL2";
  LayoutType:string = "PROCESS_CONTROL";
  listLayout:any;



  title:string;
  valueOnGoal:string;
  valueMedium:string;
  valueDelayed:string;

//date
  FromDate:string;
  ToDate:string;

  maxDate: Date;

  helper: Helper;
  bsRangeValue: Date[];

  ID:number;
  SourceType:string;
  code:string;

 
  chartDinamic:string;


  constructor(private service:ProcessService,private AmCharts: AmChartsService,private calendarService: BsLocaleService, ) { 
    this.helper = new Helper();

  }

  ngOnInit() {

    this.maxDate = new Date();
    this.bsRangeValue = [new Date(), new Date()];

    this.context = { componentParent: this };
    this.frameworkComponents = {
      PText: PText
    };

    this.getListLayout();
    this.columnG();
  }


  getListLayout(){
    this.listLayout= new Array();
    this.service.getListLayout(this.Code,this.LayoutType) 
    .subscribe(res => {
      this.listLayout =res.Layout;
      console.log(this.listLayout);
    });
  }

  process(code:any,SourceType:string){
    console.log(code);
    console.log(SourceType);
    this.rowData= new Array();
    this.service.getDetail(code,SourceType) 
    .subscribe(res => {
      this.rowData =res.Layout;

    });
  }

  columnG(){
    this.columnGrids = [
      {headerName: "Parameter",field: "Parameter",cellRenderer: "PText", colId: "params",suppressFilter: true,suppressSorting:true },
      {headerName: 'Value', field: 'Value',filter: "agTextColumnFilter", editable: true},
      {headerName: 'Captured', field: 'Captured',filter: "agTextColumnFilter", editable: true}
    ];
  
  }

  onFirstDataRendered(params:any) {
    params.api.sizeColumnsToFit();
  }

  getColor(calor:string) :string {

    if(calor=="Delayed"){
      return "#E51313"
    }else if(calor=="Medium"){
      return "#AFA800"
    }else if(calor=="OnGoal"){
      return "#54AB28"
    }
  }

  

  onCellValueChanged(){}

  btnActionRowGrid(values:any) {
    console.log("values");
    console.log(values.data);
    this.ID =values.data.Id;
    this.SourceType = values.data.SourceType;
    this.code = values.data.Code;
    this.ProcessControlChart_();
  }


  onDateSelection(value: Date): void {
    console.log("Start verificar resultado fecha");
    console.log(value);
    console.log("End verificar resultado fecha");

    if (value != null) {

      this.FromDate = this.helper.dateProcessingWithDashFormat(value[0]);
      this.ToDate = this.helper.dateProcessingWithDashFormat(value[1]);
      this.ProcessControlChart_();
    }

  }


  ProcessControlChart_(){
    // console.log("Get Parameter");
    // console.log(this.ID);
    // console.log(this.SourceType);
    // console.log(this.FromDate);
    // console.log(this.ToDate);

    this.ProcessControlChartData= new Array();
    this.lineChart= new Array();
    this.service.ProcessControlChart(this.ID,this.SourceType,this.FromDate,this.ToDate) 
    .subscribe(res => {
      this.title=res.Title;
      this.valueOnGoal=res.OnGoal;
      this.valueMedium=res.Medium;
      this.valueDelayed=res.Delayed;
      this.ProcessControlChartData =res.ChartColor;
      this.lineChart =res.ChartData;
      // console.log("Result Filter");
      // console.log(res);
      // this.chart_("div2");
    });


    
  }

  columcChartDinamic(){
    this.code = "APO_PinturaToyota-PINTL2-Tanque1";
    this.SourceType="PROCESS"
    this.FromDate="2019-01-01"
    this.ToDate="2019-01-31"

    console.log("Get All Chart");
    console.log(this.code);
    console.log(this.SourceType);
    console.log(this.FromDate);
    console.log(this.ToDate);

    let allChartData= new Array();
    this.service.ProcessControlAllChart(this.code,this.SourceType,this.FromDate,this.ToDate) 
    .subscribe(res => {

      allChartData = res.Charts;
      console.log("result All chart");
      console.log(allChartData);

      var index:number=0;
      this.listCharts = new Array();
      allChartData.forEach((element: any) => {
        index = index+1;
        this.listCharts.push("chart"+index); 
      });


      index=0;
      allChartData.forEach((element: any) => {
        index = index+1;
        // this.listCharts.push("chart"+index); 
        
        //set name divs
        this.chartDinamic = "chart"+index;

        //set datos
        this.ProcessControlChartData= new Array();
        this.lineChart= new Array();
        this.title=element.Title;
        this.valueOnGoal=element.OnGoal;
        this.valueMedium=element.Medium;
        this.valueDelayed=element.Delayed;
        this.ProcessControlChartData =element.ChartColor;
        this.lineChart =element.ChartData;
        console.log("Result Filter");
        console.log(res);
        this.chart_(this.chartDinamic);
      });
  

    });

  }
//date 





  chart_(div:string){
    console.log("nombre de vid");
    console.log(div);
    console.log("nombre de vid");

    let dataProcessControlChart= new Array();
    var Value0:any,Value1:any,Value2:any,Value3:any,Value4:any,Value5:any
    var color0:any,color1:any,color2:any,color3:any,color4:any,color5:any,color6:any;

    this.ProcessControlChartData.forEach((element: any) => {
      if(element.Order ==0 ){
        Value0=element.Value;
        color0 = this.getColor(element.Color)
      }
      if(element.Order ==1 ){
        Value1=element.Value;
        color1=this.getColor(element.Color)
      }
      if(element.Order ==2 ){
        Value2=element.Value;
        color2=this.getColor(element.Color)
      }
      if(element.Order ==3 ){
        Value3=element.Value;
        color3=this.getColor(element.Color)
      }
      if(element.Order ==4 ){
        Value4=element.Value;
        color4=this.getColor(element.Color)
      }
      if(element.Order ==5 ){
        Value5=element.Value;
        color5=this.getColor(element.Color)
      }
    });

 

    this.lineChart.forEach((element: any) => {
      let object = new Object();
      object['value'] = element.Value;
      object['Order'] = element.Order;
      object['Tooltip'] = element.Tooltip;


      object['Value0'] = Value0;
      object['color0'] = color0;
  
      object['Value1'] = Value1;
      object['color1'] = color1;
  
      object['Value2'] = Value2;
      object['color2'] = color2;
  
      object['Value3'] = Value3;
      object['color3'] = color3;
  
      object['Value4'] = Value4;
      object['color4'] = color4;
  
      object['Value5'] = Value5;
      object['color5'] = color5;
  
      object['Value5'] = Value5;
      object['color5'] = color5;
  

      dataProcessControlChart.push(object)
    });

    console.log("ProcessControlChart adap");
    console.log(dataProcessControlChart);
    console.log(this.ProcessControlChartData);
    console.log("ProcessControlChart adap");

    
    var chart = this.AmCharts.makeChart(div, {
    //var chart = this.AmCharts.makeChart("div2", {
      "type": "serial",
      "columnWidth": 1, 
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },

          "dataProvider": dataProcessControlChart,
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
            "balloonText": "",
            "lineColor": "transparent", 
            "fillAlphas": 0.8,
            "labelText": "",
            "lineAlpha": 0.3,
            "title": "",
            "type": "column",
            "color": "#296eba",
            "valueField": "Value0"
        },
          {
            "balloonText": "<span style='font-size:14px;'><b>[[value]]</b>  </span>",
            "lineColor": color1, 
            "fillAlphas": 0.8,
            "labelText": "",
            "lineAlpha": 0.3,
            "title": "",
            "type": "column",
           "color": "color1",
            "valueField": "Value1"
        }, {
            "balloonText": "<span style='font-size:14px;'><b>[[value]]</b>  </span>",
           "lineColor": color2,
            "fillAlphas": 0.8,
            "labelText": "",
            "lineAlpha": 0.3,
            "title": "",
            "type": "column",
            "color": "#000000",
            "valueField": "Value2"
        },
        {
            "balloonText": "<span style='font-size:14px;'><b>[[value]]</b>  </span>",
            "lineColor": color3,
            "fillAlphas": 0.8,
            "labelText": "",
            "lineAlpha": 0.3,
            "title": "",
            "type": "column",
          "color": "#000000",
            "valueField": "Value3"
        }
        ,
        {
            "balloonText": "<span style='font-size:14px;'><b>[[value]]</b>  </span>",
            "lineColor": color4,
            "fillAlphas": 0.8,
            "labelText": "",
            "lineAlpha": 0.3,
            "title": "",
            "type": "column",
          "color": "#000000",
            "valueField": "Value4"
        },
        {
            "balloonText": "<span style='font-size:14px;'><b>[[value]]</b>  </span>",
            "lineColor": color5,
            "fillAlphas": 0.8,
            "labelText": "",
            "lineAlpha": 0.3,
            "title": "",
            "type": "column",
          "color": "#000000",
            "valueField": "Value5"
        },
        {
            "balloonText": "<span style='font-size:14px;'><b>[[value]]</b>  </span>",
            "lineColor": color6,
            "fillAlphas": 0.8,
            "labelText": "",
            "lineAlpha": 0.3,
            "title": "",
            "type": "column",
          "color": "#000000",
            "valueField": "Value6"
        }
        
        ,{
          "id": "graph2",
          "balloonText": "<span style='font-size:12px;'>[[title]] in [[Tooltip]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#4A4E56",
          "useLineColorForBulletBorder": true,
          "bulletBorderThickness": 3,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "value",
          "valueField": "value",
          "dashLengthField": "dashLengthLine",
          "lineColor": "#4A4E56",
        } 
      ],
        "categoryField": "Order",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left"
        },
        "color": "#ffffff",
    
    });

  }









}
