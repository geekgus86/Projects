import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NguCarousel } from '@ngu/carousel';
import * as c3 from 'c3';
import { GlobalService } from './global.service';
import { Helper } from '../../shared/helper'
import { forkJoin } from 'rxjs';
import * as $  from 'jquery';
import { TranslateService } from '@ngx-translate/core';

// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';



@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})

export class GlobalComponent implements OnInit, AfterViewInit, OnDestroy {
    helper: Helper;
    chart: AmChart;
    sampleChart1: any;
    sampleChart2: any;
    sampleChart3: any;
    globalPlants: any;
    markers : any;
    currentMapArea: string;
    public carouselOne: NguCarousel;
    plants: any[];
    plantName:string;
    top3Location: any;

    ShiftAndHour= new Array();;
    // ShiftValuesByLine: any;

    goalArchived: any;
    qualityTest: any;
    OEEobtained: any;

    // ProductionRates: any;


    currentModel:String;
    currentShiftRate:Number;
    designedRate:String;
    oneDayTotal:String;
    oneDayMedian:String;
    forecast:Number;

    productionDateValue:Number =0;
    diference:number=0;
    productionDateGoal:Number=0;

    dataFramesByShiftAndHour:any;
    type_Name:string;
    ver:boolean=true

    dataQualityNotificationsPais = new Array;
    dataQualityNotificationsPlanta= new Array;
    dataQualityNotificationsTopTen= new Array;
    lenguaje:string;
    displayExport_search:string = "none";

    dataByCountry:any;
    dataByPlant:any;
    dataCars:any;

    alertTabShown = true;
    notiTabShown= true;

    AditionalinfNotification:string="Show aditional information";
    AditionalinfAlert:string="Show aditional information";

    readonly TABLE_ALERT: string  = "tablaalerta";
    readonly TABLE_NOTIFICATION: string  = "tablanotificacion";

    constructor( private AmCharts: AmChartsService, private route: Router, private activedRoute: ActivatedRoute, private elRef: ElementRef, private globalService: GlobalService, private translateService: TranslateService) {
        this.plants = [];
        this.helper = new Helper();

    }



  ngOnInit() {
    $("#tblAlert").css("display", "none");
    $("#tblNotifi").css("display", "none");


    this.globalPlants = this.activedRoute.snapshot.data.globalPlants;
    // console.log("globalPlants");
    // console.log(this.globalPlants);
    this.helper.getTokenCredentials();
    this.dataGaugeChart();
    this.top3Country();

    this.loadMarkers();
    this.carousel();

    this.changeLanguage();
    this.qualityNotificationsPais();
    this.qualityNotificationsPlanta();
    this.qualityNotificationsTopTen();

    this.listAlertAudit();
    this.alertAuditCountry();
    this.alertAuditPlant();


  }


  showTable(nombreTabla: string){
    if(nombreTabla == this.TABLE_NOTIFICATION){
        this.alertTabShown = true;
        this.AditionalinfAlert=" Show aditional information";
        $("#tblAlert").css("display", "none");

        this.notiTabShown = !this.notiTabShown;

        if(this.notiTabShown ){
            this.AditionalinfNotification="Show aditional information";
            $("#tblNotifi").fadeOut(1000);

        }else{
            this.AditionalinfNotification="Hide aditional information";
            $("#tblNotifi").fadeIn(1000);
            $("#tblNotifi").css("display", "block");
        }

    }

    if(nombreTabla == this.TABLE_ALERT){

        this.notiTabShown = true;
        this.AditionalinfNotification="Show aditional information";
        $("#tblNotifi").css("display", "none");
        this.alertTabShown = !this.alertTabShown;
        if(this.alertTabShown ){
            this.AditionalinfAlert="Show aditional information";
             $("#tblAlert").fadeOut(1000);
             console.log("fadeOut");
        }else{
            this.AditionalinfAlert="Hide aditional information";
            $("#tblAlert").fadeIn(1000);
            $("#tblAlert").css("display", "block");
        }
    }


  }

  bestGoal(){
    var  maxId = this.globalPlants.reduce(function(max:any, x:any) { return (x.rate > max) ? x.rate : max; }, 0); //Get Maximum rate

    let locationName:any
    this.globalPlants.forEach((Plants:any) => {  //if there are two maximum then choose one at random
        if(Plants.rate === maxId ){
            locationName = Plants.name + ""+Plants.location;
            this.plantName = Plants.name;
        }
    })

    this.GetAllProductionRates(locationName);

  }

  GetAllProductionRates(locationName:any){

      this.globalService.getAllProductionRates(locationName)
      .subscribe(res => {

        let dataTypeName="";
        var  maxId = res.reduce(function(max:any, x:any) { return (x.rate > max) ? x.rate : max; }, 0); //Get Maximum rate

        res.forEach((value:any) => {  //if there are two maximum then choose one at random
            if(value.rate === maxId ){
                dataTypeName = value.dataTypeName
                this.type_Name = value.type+" "+value.name;
            }
        })

        this.getHour_Values(dataTypeName);

      });


  }



  getHour_Values(dataTypeName:string) {
    this.dataFramesByShiftAndHour = new Array();
    const response = forkJoin([
        this.globalService.getFramesByShiftAndHour(dataTypeName),
        this.globalService.getShiftValuesByLine(dataTypeName)
    ]);

    response.subscribe(result => {

        var FramesByShiftAndHour = result[0];
        var dataShiftValuesByLine = result[1];


        if(FramesByShiftAndHour.length>0 ){
            this.ShiftAndHour.push("count");
            FramesByShiftAndHour.forEach((value: any) => {
                this.ShiftAndHour.push(value.count);
            })
        }



        if(dataShiftValuesByLine.length>0){
            this.currentModel= dataShiftValuesByLine[0].currentModel;
            this.currentShiftRate= dataShiftValuesByLine[0].currentShiftRate;
            this.designedRate= dataShiftValuesByLine[0].designedRate;
            this.oneDayTotal= dataShiftValuesByLine[0].oneDayTotal;
            this.oneDayMedian= dataShiftValuesByLine[0].oneDayMedian;
            this.forecast= dataShiftValuesByLine[0].forecast;
            this.productionDateValue= dataShiftValuesByLine[0].productionDateValue;
            this.diference = (dataShiftValuesByLine[0].productionDateValue-dataShiftValuesByLine[0].productionDateGoal);
            this.productionDateGoal= dataShiftValuesByLine[0].productionDateGoal;

            var dailyRateColorRef=dataShiftValuesByLine[0].dailyRateColorRef;
            var designedColorRef=dataShiftValuesByLine[0].designedColorRef;

            if(this.diference <= 0){
                $("#spanDiference").css('color', 'red');
                this.diference = Math.abs(this.diference);

            }else{
                $("#spanDiference").css('color', '#3aaf01');
            }

            $("#spamCurrentShiftRate").css('color', dailyRateColorRef);
            $("#spamDesignedRate").css('color', designedColorRef);

        }



        if(FramesByShiftAndHour.length == 0 || dataShiftValuesByLine.length == 0){
            // console.log(FramesByShiftAndHour);
            // console.log(dataShiftValuesByLine);
            this.getHour_Values(dataTypeName)
        }else{
            this.dataFramesByShiftAndHour = result[0];
            // console.log(this.dataFramesByShiftAndHour);

        }

        return result;
    });

}


  top3Country(){
    //group for Country
    var Group = this.globalPlants.reduce(function(result:any, current:any) {
            result[current.area] = result[current.area] || [];
            result[current.area].push(current);
            return result;
    }, {})

    //To list group
    var listGroup =  Object.keys(Group).map( function( group ){return Group[group];})

    //Get maximum rate for Country
    var listMaxRates = new Array();
    let maxRate:number;
    for (var i=0; i<listGroup.length; i++) {
       var  result = listGroup[i];

        let count:number = 0;
        let sum = 0;
        result.forEach((value: any) => {
            sum = sum + value.rate;
            count = count+1;
        })

        var ptyData = new propertyData();
        ptyData.area  =  result[0].area;
        ptyData.location =result[0].location;
        ptyData.name = result[0].name;
        ptyData.rate = sum/count;
        listMaxRates.push(ptyData);

    }

    //sort desc
    listMaxRates.sort(function(a, b){return b.rate - a.rate});

    //Get top 3 location max rates
    this.top3Location = new Array();
    this.top3Location.push(listMaxRates[0]);
    this.top3Location.push(listMaxRates[1]);
    this.top3Location.push(listMaxRates[2]);

    // console.log("top3 Location");
    // console.log(this.top3Location);

  }



  loadMarkers() {

    this.globalService.getMarkers()
    .subscribe(res => {
        this.markers = res;
        this.chart = this.AmCharts.makeChart("chartdiv", {
            "type": "map",
            "theme": "black",
            "projection": "miller",

            "dataProvider": {
                "map": "worldLow",
                "images": this.markers.marker, // marcadores
                "getAreasFromMap": true,
                "areas": this.markers.areas // areas o sea paises
            },
            "areasSettings": {
                "autoZoom": true,
                //"color":"#00B5A7", // color de las areas que contienen plantas
                "selectedColor": "#00B5A7", // color del area seleccionada
                "unlistedAreasColor":"#00B5A7" // color de las areas que no estan listadas
            },
            "smallMap": {
                "enabled": false
            },
            "export": {
                "enabled": false,
                "position": "bottom-right"
            },
            listeners: [ // los eventos init y zoomCompleted deben estar aca porque son cambiantes
                {
                    event: "init",
                    method: (e: any)=> {

                        let map = e.chart;

                        this.hiddenAllMarkers(map);

                        map.addListener("zoomCompleted", (e: any) => {

                            if(map.zoomLevel() <= 1.5) {
                                this.hiddenAllMarkers(map);
                                this.currentMapArea = '';
                                map.showGroup('countries');
                            }
                            else{
                                this.showMarkers(map);
                                map.hideGroup('countries');
                            }
                        });

                        this.createAllMarkerByCoutry(map);
                        map.validateData();
                    }
                }
            ]
        });

        this.AmCharts.addListener(this.chart, "clickMapObject", (e) => {
            /**
             * en caso que se selecione un pais entoces guardamos el id para cuando
             * finalise el evento "zoomCompleted" entonces mostrar todos los marcadores
             * con el groupId igual a id del area seleccionada
             */

           if (e.mapObject.cname == 'MapArea') {
              this.currentMapArea = e.mapObject.id;
            }

            /**
             * tener mucho cuidado...mapObject es cualquier objeto del
             * mapa por lo que si plant esta definido es que estamos sobre
             * un objeto de tipo image porque asi lo defini yo en este caso
             */
           if (e.mapObject.typeImage == 'plant') {
               let name = e.mapObject.title
                            .replace(' ','_') // Replacing the blanck spaces to under score
                            .toLowerCase();   // Get the plant's name in lowercase for put into url

              this.route.navigate([`/plant/${name}`]);
            }

        });
    });

  }

  dataGaugeChart(){
    this.globalPlants.forEach( (element:any) => {
        this.plants.push(element);
    });
  }

  carousel(){
    this.carouselOne = {
        grid: {xs: 1, sm: 7, md: 7, lg: 7, all: 0},
        slide: 1,
        speed: 400,
        interval: 7000,
        point: {
          visible: true,
          hideOnSingleSlide: true
        },
        load: 2,
        touch: true,
        loop: true,
        custom: 'banner',

      }
  }




 lneChart(){

    this.sampleChart1 =  c3.generate({
        bindto: "#line-1",
        data: {
            columns:  [
                 this.ShiftAndHour
            ],
        },
        color: {
            pattern: ['#00B5A7']
        },
        size: {
            width: 380,
            height: 300
        },
        legend: {
            hide: true
        },
    });

 }



  ngAfterViewInit() {

        this.sampleChart2 =  c3.generate({
            bindto: "#bar-1",
            data: {
                x: 'x',
                columns: [
                    ['x', ' '],
                    [this.top3Location[0].area, (this.top3Location[0].rate*100).toFixed(2) ],
                    [this.top3Location[1].area, (this.top3Location[1].rate*100).toFixed(2) ],
                    [this.top3Location[2].area, (this.top3Location[2].rate*100).toFixed(2) ],
                ],
                type: 'bar'
            },
            color: {
                pattern: ['#00B5A7', '#0A828B']
            },
            size: {
                width: 560,
                height: 350
            },
            bar: {
                width: {
                    ratio: .7
                },
                space: 0.31
            },

            tooltip: {
                format: {
                    title: function (d) { return '' }

                }
            }
            ,axis:{
                x:{
                   type:"category"
                }
            }


        });

        this.sampleChart3 =  c3.generate({
            bindto: '#area-1',
            data: {
                columns: [
                    ['data1', 300, 350, 300, 0, 0, 120],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                types: {
                    data1: 'area-spline',
                    data2: 'area-spline'
                },
                groups: [['data1', 'data2']]
            },
            color: {
                pattern: ['#00B5A7', '#0A828B']
            },
            size: {
                width: 600,
                height: 200
            }
        });


$('#tab2-content').hide();

$('#tab1').click(function() {
    $('#tab2-content').hide();
    $(this).addClass('active-tab');
    $('#tab2').removeClass('active-tab');
    $('#tab1-content').fadeIn( "slow" );
  });

$('#tab2').click(function(){
    $('#tab1-content').hide();
    $(this).addClass('active-tab');
    $('#tab1').removeClass('active-tab');
    $('#tab2-content').fadeIn( "slow" );
});


/*New Graph */
// $('#tab4-content').hide();

// $('#tab3').click(function() {
//     $('#tab4-content').hide();
//     $(this).addClass('active-tab');
//     $('#tab4').removeClass('active-tab');
//     $('#tab3-content').fadeIn( "slow" );
//   });

// $('#tab4').click(function(){
//     $('#tab3-content').hide();
//     $(this).addClass('active-tab');
//     $('#tab3').removeClass('active-tab');
//     $('#tab4-content').fadeIn( "slow" );
// });



this.bestGoal();

  }

  /**
   * Ocultar todos los markers en el mapa
  */
  hiddenAllMarkers(map: any): void {

    let areas = this.markers.areas;

    areas.forEach((area: any) => {
        map.hideGroup(area.id);
    })

  }

  /**
   * Show marker in the current area (country)
  */
  showMarkers(map: any): void {

    if (this.currentMapArea) {
      map.showGroup(this.currentMapArea);
    }
    else{
      let areas = this.markers.areas;
      areas.forEach((area: any) => {
        map.showGroup(area.id);
      })
    }
  }

    paintMarkerByCountry(): void {
        console.log("ok I'm into paintMarkerByCountry");
        let markerImage = this.elRef.nativeElement.querySelector('[aria-label="United States of America "] image');
        //markerImage.setAttribute('xlink:href','../../../../assets/images/global/apodaca-factory.svg')
        markerImage.setAttribute('xlink:href','assets/images/global/apodaca-factory.svg')
        console.log(markerImage);

    }

    createAllMarkerByCoutry(map: any): void{
        let images = map.dataProvider.images;
       // console.log(map.dataProvider.images);
        images.forEach( (image: any) => {

            if(image.typeImage == 'country') {
               image.imageURL = `assets/images/global/${image.title}${image.rate}.svg`;
               image.balloonText = '';
            }

        })
    }

    public myfunc(event: Event) {
        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel
     }

  ngOnDestroy() {
   if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }



  qualityNotificationsPais(){
    this.globalService.getQualityNotificationsPais()
    .subscribe(res => {
        this.dataQualityNotificationsPais = res;
    });
  }

  qualityNotificationsPlanta(){
    this.globalService.getQualityNotificationsPlanta()
    .subscribe(res => {
        this.dataQualityNotificationsPlanta = res;
    });
  }

  qualityNotificationsTopTen(){
    this.globalService.getQualityNotificationsTopTen()
    .subscribe(res => {
        // this.dataQualityNotificationsTopTen = res;
        console.log(" ---dataQualityNotificationsTopTen ---");
        var dataQualityNotificationsTopTen_aux= new Array;
        res.forEach((value:any) => {
            var object = new Object();
            object['ALERT NUMBER'] = value.numeroAlerta;
            object['DATE NOTIFICATION'] == value.fechaNotificacion;;
            object['PLANT'] = value.planta;
            // object['TYPE'] = value.tipoAlerta;
            object['CUSTOMER NAME'] = value.nombreCliente;
            object['PROCESS'] = value.proceso;
            object['IMPACT'] = value.impacto ;
            object['PROBABILITY'] = value.probabilidad;
            object['TRANSMITTER'] = value.emisor;
            object['STATUS'] = value.estatus;
            object['UPDATE DATE'] = value.fechaActualizacion;
            dataQualityNotificationsTopTen_aux.push(object);
        })
        this.dataQualityNotificationsTopTen = dataQualityNotificationsTopTen_aux;
        console.log(res);
        console.log(this.dataQualityNotificationsTopTen);
    });

  }



  alertAuditCountry(){
    this.dataByCountry  = new Array();
    this.globalService.getPais()
    .subscribe(res => {
        this.dataByCountry =res;
    });
  }

  alertAuditPlant(){
    this.dataByPlant  = new Array();
    this.globalService.getPlanta()
    .subscribe(res => {
        this.dataByPlant =res;
    });
  }


  listAlertAudit(){
    this.dataCars  = new Array();
    const date = new Date();
    date.setDate(date.getDate() - 365);
    var startDate = this.helper.dateFormat_slash_DDMMYYY(date);

    const now = new Date();
    var today = this.helper.dateFormat_slash_DDMMYYY(now);

    let  tipo:string  = "3";
    let  fecha:string  =startDate;
    let  fecha_fin:string  =today;

    this.globalService.getList(tipo,fecha,fecha_fin)
    .subscribe(res => {
        var dataAux= new Array;

        res.results.forEach((value:any) => {
            var object = new Object();

            let date = new Date(value.commitment_date);
            let commitment_date = this.helper.dateFormatDDMMYYY(date);

            let creation_date="";
            if (value.creation_date !== null) {
                date = new Date(value.creation_date);
                creation_date = this.helper.dateFormatDDMMYYY(date);
            }

            let termination_date="";
            if (value.termination_date !== null) {
                let ter_date = new Date(value.termination_date);
                 termination_date = this.helper.dateFormatDDMMYYY(ter_date);
            }

            object['CODE']               = value.code;
            object['COMMITMENT DATE']    = commitment_date;
            object['CREATION DATE']      = creation_date  ;
            object['AREA']               = value.desc_area_es   ;
            object['LINE']               = value.desc_lin_es   ;
            object['PROCESS']            = value.desc_gpro_es   ;
            object['STATUS']             = value.desc_stu_es    ;
            object['LOCATION CODE']      = value.location_code  ;
            object['NAME CREATOR']       = value.name_creator   ;
            object['NAME RESPONSIBLE']   = value.name_responsible;
            object['NAME VALIDATOR']     = value.name_validator ;
            object['TERMINATION DATE']   = termination_date ;
            dataAux.push(object);
        })
        this.dataCars = dataAux;
    });
  }





  changeLanguage():void{
    this.lenguaje = (this.translateService.currentLang.indexOf('es') >= 0) ? 'es' : 'en'
    this.translateService.onLangChange
      .subscribe((event: any) => {
        this.lenguaje = (this.translateService.currentLang.indexOf('es') >= 0) ? 'es' : 'en'
    });
  }
}

class propertyData{
    area:string;
    location:string
    name:string
    rate:number;
  }