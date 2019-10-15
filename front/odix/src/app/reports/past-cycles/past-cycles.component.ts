import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Helper } from '@app/shared/helper';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { ReportsService } from '../reports.service';//a
import 'd3';
import * as c3 from 'c3';
import * as $  from 'jquery';
import { AssetsID } from '@app/globalEnum';
import { Router } from '@angular/router';



@Component({
  selector: 'app-past-cycles',
  templateUrl: './past-cycles.component.html',
  styleUrls: ['./past-cycles.component.scss']
})

export class PastCyclesComponent implements OnInit {

  helper: Helper;

  arrayArea: any;
  arrayLinea: any;
  arrayENN: any;
  arrayStation: any;
  arrayShifts: any;
  arrayAverage: any;
  arrayMinimum: any;
  arrayMaximum: any;
  arrayGoal: any;
  arrayStandarDesviation: any;

  AssetID:number;
  AreaAssetID:number;
  LineAssetID:number;
  EnnID:number;
  stationID:number;

  StartDate:string;
  EndDate:string;
  idShift:number;
  maxDate: Date;

  areaName: string;
  LineName: string;
  display:string = "none";

  bsRangeValue: Date[];
  isData:boolean= true;
  private isInit = true;

  chart: AmChart;
  
    constructor(private reportsService: ReportsService,private AmCharts: AmChartsService,router: Router ) {
        this.helper = new Helper();
        let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
        this.AssetID = (+AssetsID[plantName]);
    }

    ngOnInit() {
        this.maxDate = new Date();
        this.display = "block";
        this.bsRangeValue = [new Date(), new Date()];
    }


    onDateSelection(value: Date): void {
        if (value != null) {
          this.StartDate = this.helper.dateProcessingWithDashFormat(value[0]);
          this.EndDate = this.helper.dateProcessingWithDashFormat(value[1]);
         // this.getDataPastcycles();
          this.getArea();
        }
      }

    onAreaChange(value: number): void {
        this.AreaAssetID = value;
        this.getLine();
    }

    onLineChange(value: number): void {
        this.LineAssetID= value;
        this.getENN();
    }

    onEnnChange(value: number): void {
        this.EnnID= value;
        this.getStation();

    }

    onStationChange(value: number): void {
        this.stationID= value;
        this.getDataPastcycles();
        
    }

    onAreaShifts(value: number): void {
        this.idShift= value;
        this.getDataPastcycles();
    }


    getArea(): void {
        this.reportsService.getAreaAssetIDNameByParentId(this.AssetID)
        .subscribe(res => {
            this.arrayArea = res.Values;
            this.AreaAssetID= this.arrayArea[0].ID
            this.getLine();
        });


    }

    getLine(): void {
        this.reportsService.getLineAssetIDNameByParentId(this.AreaAssetID)
        .subscribe(res => {
          this.arrayLinea = res.Values;
            if(this.arrayLinea.length!=0){
               this.LineAssetID= this.arrayLinea[this.arrayLinea.length-1].ID;
               this.getENN();
            }else{
                this.display = "none";
                this.isData =false; 
            }
        });

    }

    getENN(): void {
        this.reportsService.getEnnAssetIDNameByParentId(this.LineAssetID)
        .subscribe(res => {
          this.arrayENN = res.Values;
          if(this.arrayENN.length!=0){
            this.EnnID= this.arrayENN[this.arrayENN.length-1].ID;
            this.getStation();
          }else{
            this.isData =false; 
            this.arrayStation = [];
            $("#chartdiv").css("display", "none");
            this.display = "none";
          }
        });
    }

    getStation(): void {
        this.reportsService.getStationAssetIDNameByParentId(this.EnnID)
        .subscribe(res => {
            this.arrayStation = res.Values;
            this.stationID= this.arrayStation[0].ID
            this.getShift_();
        });

    }


    getShift_(): void {
          
        this.arrayShifts = new Array<clsShift>();

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var date = this.helper.dateProcessingWithDashFormat(yesterday);

        this.reportsService.getShifts(1,date)
        .subscribe(res => {

            var cls = new  clsShift()
            cls.description="ALL";
            cls.value="0";
            this.arrayShifts.push(cls);

            res.SHIFTS.forEach((val:any) => {
                var cls = new  clsShift()
                cls.description= String(val.id);
                cls.value=val.id;
                this.arrayShifts.push(cls);
            })

            this.idShift =this.arrayShifts[this.arrayShifts.length-1].value;
            this.getDataPastcycles();
            
        });

    }



    getDataPastcycles(): void {
        this.display = "block";
        //http://igrwapo03:8080/ApiApodaca/CycleTimeDataByModel/261/2018-06-13/2018-08-30
        this.reportsService.getCycleTimeDataByModel(this.stationID,  this.StartDate, this.EndDate,this.idShift)
        .subscribe(res => {

            this.display = "none";
            this.isData =true;
            if(res.Values[0].model == "No Model"){
                this.isData =false; 
                $("#chartdiv").css("display", "none");
            }else{
                this.columChart(res.Values);
                $("#chartdiv").css("display", "block");
            }
        
        });

    }




  

    columChart(data: any) {

        this.chart = this.AmCharts.makeChart("chartdiv", {
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
            },
            "legend": {
                "useGraphSettings": true,
                "valueAlign": "left",
                "valueWidth": 10,
                "position": "top", //bottom,right
                "align": "center",
                "horizontalGap": 10,
                "markerSize": 10,
                "fillColorsField": "#54AB28",
                "bulletColor": "#54AB28", /// color stroke
                "color": "#ffffff", //Color Text legend 
                
            },
            "panelsSettings": {
                "plotAreaFillColors": "#b55200",
                "plotAreaFillAlphas": 1,
                "marginLeft": 60,
                "marginTop": 5,
                "marginBottom": 5
              },

              
            "dataProvider": 
             data,
            /*
            [
            {
                "model": "Model 0",
                "avarage": 408,
                "minimum": 500,
                "maximum": 520,
                "goal": 530,
                "standardDeviation": 550,
                "Color": "#FF0F00"
            }, {
                "model": "Model 1",
                "avarage": 408,
                "minimum": 100,
                "maximum": 520,
                "goal": 530,
                "standardDeviation": 550,
                "Color": "#FF0F00"
            }, {
                "model": "Model 1",
                "avarage": 408,
                "minimum": 200,
                "maximum": 520,
                "goal": 530,
                "standardDeviation": 550,
                "Color": "#FF0F00"
            },  
            {
                "model": "Model 1",
                "avarage": 408,
                "minimum": 300,
                "maximum": 520,
                "goal": 530,
                "standardDeviation": 550,
                "Color": "#FF0F00"
            }
        ],
        */
            "valueAxes": [{
                "id": "distanceAxis",
                "axisAlpha": 0,
                "gridAlpha": 0,
                "position": "left",
                "title": "Average",
                
            },
        
        ],
            "graphs": [{
                "id":"g0",
                "alphaField": "alpha",
                "balloonText": "", //[[value]] Average
                "dashLengthField": "dashLength",
                "fillAlphas": 0.7,
                "title": "Avarage",
                "type": "column",
                "valueField": "avarage",
                "fillColorsField": "Color",
                "fillColors": "#00B5A7", //color legend
                "labelText": "[[avarage]]",
                "color": "#00B5A7",
                "fontSize": 17,
            }
            ,{
                "id":"g1",
                "title": "Minimum",
                "balloonText": "",
                "type": "step",
                "bullet":"square",
                "bulletAlpha":0,
                "bulletSize":4,
                "bulletBorderAlpha":0,
                "noStepRisers":true,
                "lineThickness":1,
                "valueField": "minimum",
                "bulletColor": "#208aec", /// color stroke 
                "lineColor": "#208aec",
            }
            ,{
                "id":"g2",
                "title": "Maximum",
                "balloonText": "",
                "type": "step",
                "bullet":"square",
                "bulletAlpha":0,
                "bulletSize":4,
                "bulletBorderAlpha":0,
                "noStepRisers":true,
                "lineThickness":1,
                "valueField": "maximum",
                "bulletColor": "#ee712e", /// color stroke #fd8240
                "lineColor": "#ee712e",
            }
            ,{
                "id":"g3",
                "title": "goal",
                "balloonText": "",
                "type": "step",
                "bullet":"square",
                "bulletAlpha":0,
                "bulletSize":4,
                "bulletBorderAlpha":0,
                "noStepRisers":true,
                "lineThickness":1,
                "valueField": "goal",
                "bulletColor": "#ffffff", /// color stroke 
                "lineColor": "#ffffff",
            }
            ,{
                "id":"g4",
                "title": "Standard Deviation",
                "balloonText": "",
                "type": "step",
                "bullet":"square",
                "bulletAlpha":0,
                "bulletSize":4,
                "bulletBorderAlpha":0,
                "noStepRisers":true,
                "lineThickness":1,
                "valueField": "standardDeviation",
                "bulletColor": "#e7f416", /// color stroke 
                "lineColor": "#e7f416",
            }
           
        ],
            "chartCursor": {
                "cursorAlpha": 0.1,
                "cursorColor":"#4a4e56", //color barra de se seleccion de cada grafica 
                 "fullWidth":true,
                "valueBalloonsEnabled": false, //mostrar todo los tooltip
                "zoomable": false
            },
            "categoryField": "model",
            "color": "#ffffff",
            
        });

    }

}


class clsShift{
    description:string;
    value:string;
}

