import { Component, OnInit } from '@angular/core';
import { PlantService } from '@app/bloomberg/plant/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '@app/shared/helper';
import { Router } from '@angular/router';

import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash'
import { Subject } from 'rxjs/Subject';
import { PARENT } from '@angular/core/src/render3/interfaces/view';


@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {
  plantName : string;
  mapPlantAssembly: any;
  mapPlant: any;
  plantdate: any;
  name: string;
  date: string;

  helper: Helper;
  shift: number;
  serviceDate: string;

  dataAssembly: any;
  dataPress: any;
  dataPainting: any;
  
  Hour: string;
  zonahoraria: string =" (CT)";
  today:any;

  onDestroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute,private plantService: PlantService, private router: Router) {
    console.log("===============  PLANT COMPONENT ===============");
    this.mapPlant = this.route.snapshot.data.plant;
    this.plantName = this.route.snapshot.paramMap.get('plantName');  

    this.helper = new Helper();
    const now = new Date();
    this.today = this.helper.dateProcessingWithDashFormat(now);

    console.log("mapPlant adap");
    console.log(this.mapPlant);
    console.log("mapPlant adap");
  }

  ngOnDestroy(){
    this.onDestroy$.next();
  }

  ngOnInit() {
    this.obserableJson();
  }

  obserableJson(){
    var update;
    var actualValue:any;
    var start = true;
    var remoteJSON:any;
    var localJSON:any;


    let obs = Rx.Observable.interval(5000).takeUntil(this.onDestroy$);
    obs.subscribe(value => {

      if(this.serviceDate ==this.today ){ //Exec only today

        this.plantService.getPlant(this.serviceDate, this.shift.toString(), this.plantName)
        .subscribe(res => {
          
          if(start){
            this.mapPlant = res;
            actualValue = res.AREAS;
            update = res.AREAS;
            start = false;
            this.fillArrays();
            this.Updatefecha();
          }else{
            update = res.AREAS;
          }

          //compare 
          remoteJSON = actualValue,
          localJSON = update;
          var compare = (_.isEqual(remoteJSON, localJSON) );


          if (!compare )  {
            start= true;
          }

        });

      }

    });

  }


  Updatefecha() {
    this.helper = new Helper();
    const dt = new Date(this.mapPlant.DATE);
    this.plantdate = this.helper.dateFormatDDMMYYY(dt);
    this.Hour = this.mapPlant.HOUR;
    this.Hour =this.Hour+this.zonahoraria;
  }

  getPlants(): void {
    this.plantService.getPlant(this.serviceDate, this.shift.toString(), this.plantName)
    .subscribe(res => {
      this.mapPlant = res;
      this.fillArrays();
      this.Updatefecha();
    });
  }

  onDateShiftChange(value: any): void {
    this.shift = value.shiftId;
    this.serviceDate = value.serviceDate;
    this.getPlants();
  }


  fillArrays(): void {

    this.mapPlantAssembly = this.mapPlant.AREAS;
    this.dataAssembly = new Array();
    this.dataPress= new Array();
    this.dataPainting = new Array();
     
    for (var i=0; i<this.mapPlantAssembly.length; i++) {
      
      if (this.mapPlantAssembly[i].area=='Assembly'){
        this.dataAssembly.push(this.mapPlantAssembly[i]);
      }

      if (this.mapPlantAssembly[i].area=='Press'){ //Press
        this.dataPress.push(this.mapPlantAssembly[i]);
      }   

      if (this.mapPlantAssembly[i].area=='Painting'){
        this.dataPainting.push(this.mapPlantAssembly[i]);
      }       

    }

    //filter default
    this.setOrder("Assembly","LineOrder");
    this.setOrder("Press","LineOrder");
    this.setOrder("Painting","LineOrder");
    $("div.goals__title--filter select").val("LineOrder");

  }



  setOrder(area: string,FilterBy: string ){
    if(area == "Assembly" ){

      if(FilterBy == "LineOrder" ){ // Sort ASC description 

        this.dataAssembly.sort(function (obj1:any, obj2:any) {
          return ('' + obj1.description).localeCompare(obj2.description);
        })
      }
     
      if(FilterBy == "LowestGoals" ){ //Sort ASC  percent

        this.dataAssembly.sort(function(obj1:any, obj2:any) {
          return obj1.percent - obj2.percent;
        });

      }
      if(FilterBy == "HighestGoals" ){ //Sort DESC  percent

        this.dataAssembly.sort(function(obj1:any, obj2:any) {
          return obj2.percent - obj1.percent;
        });

      }

    }


    if(area == "Press" ){

      if(FilterBy == "LineOrder" ){ // Sort ASC description 

        this.dataPress.sort(function (obj1:any, obj2:any) {
          return ('' + obj1.description).localeCompare(obj2.description);
        })
      }
     
      if(FilterBy == "LowestGoals" ){ //Sort ASC  percent

        this.dataPress.sort(function(obj1:any, obj2:any) {
          return obj1.percent - obj2.percent;
        });

      }
      if(FilterBy == "HighestGoals" ){ //Sort DESC  percent

        this.dataPress.sort(function(obj1:any, obj2:any) {
          return obj2.percent - obj1.percent;
        });

      }

    }

    
    if(area == "Painting" ){

      if(FilterBy == "LineOrder" ){ // Sort ASC description 

        this.dataPainting.sort(function (obj1:any, obj2:any) {
          return ('' + obj1.description).localeCompare(obj2.description);
        })
      }
     
      if(FilterBy == "LowestGoals" ){ //Sort ASC  percent

        this.dataPainting.sort(function(obj1:any, obj2:any) {
          return obj1.percent - obj2.percent;
        });

      }
      if(FilterBy == "HighestGoals" ){ //Sort DESC  percent

        this.dataPainting.sort(function(obj1:any, obj2:any) {
          return obj2.percent - obj1.percent;
        });

      }

    }

  }

  openLinkOverview(name:string){
    this.router.navigate([`overview/${this.plantName}/${name}`]);
  }
}


$(window).scroll(function(){
  var darkyNav = $('.upper-dark-container'),
      scroll = $(window).scrollTop();

  if (scroll >= 45) darkyNav.addClass('darkFixed');
  else darkyNav.removeClass('darkFixed');

  if (darkyNav.hasClass('darkFixed')) $('#plantMapContainer').css("margin", "65px 0 0 0");
  else $('#plantMapContainer').css("margin", "0");
});

$(document).ready(function(){


  $(window).scroll(function(){
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed'), sticky.removeClass('navigation-spacer'), $(".first-ov-row").css("margin-top", "68px");
    else sticky.removeClass('fixed'), sticky.addClass('navigation-spacer'), $(".first-ov-row").css("margin-top", "0px");
  });


  $(window).scroll(function(){
    var stickyPlant = $('.stickyPlant'),
        scroll = $(window).scrollTop();

    if (scroll >= 46) stickyPlant.addClass('fixedPlant'), stickyPlant.removeClass('navigation-spacer'), $(".first-ov-row").css("margin-top", "90px"), $('.upper__navigation').css('color', '#fff'), $('.upper__navigation--current-line').css('background', 'none');
    else stickyPlant.removeClass('fixedPlant'), $(".first-ov-row").css("margin-top", "0px"), $('.upper__navigation').css('color', '#0A828B'), $('.upper__navigation--current-line').css('background', '#04464B');
  });


 });