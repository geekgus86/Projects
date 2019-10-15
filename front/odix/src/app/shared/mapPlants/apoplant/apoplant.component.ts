import { Component, OnInit, NgModule, Input, ElementRef, SimpleChanges, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apoplant',
  templateUrl: './apoplant.component.html',
  styleUrls: ['./apoplant.component.scss'],
  providers: [NgbTooltipConfig]
})

export class ApoplantComponent implements OnInit {
  @Input() mapPlant: any;
  @Input() namePlant : string;
  plants: any;
  plantName: string;

  constructor(
    config: NgbTooltipConfig,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    config.placement = 'top';
    config.triggers = 'hover';
    this.plants = new Array();
  }

  ngOnInit() {
    this.plantName = this.route.snapshot.paramMap.get('plantName');  
    this.putValuesToArrayPlant();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.plants = new Array();

    if (changes.mapPlant.firstChange) {
      return;
    }
    /*this.route.params.subscribe(
      params => { this.plantName = params['plantName']; }
    );*/

    this.putValuesToArrayPlant();
  }

  putValuesToArrayPlant(){
    let parentClass = document.querySelector('.map-plant__isometric')
    this.mapPlant.AREAS.forEach((area:any) => {

      let rateTitle = '';
      let ratecolor='';

      switch(area.rate) {
        case 'delayed':
          rateTitle = 'Delayed';
          ratecolor='red' ;
          break;
        case 'medium':
        rateTitle = 'Medium';
        ratecolor='yellow' ;
          break;
        case 'on-goal':
        rateTitle = 'On Goal';
        ratecolor='green' ;
          break;
      }

      var plant = new Plant();
      plant.name = area.name;
      plant.area = area.area;
      plant.description = area.description;
      plant.rate = area.rate;
      plant.value = area.value;
      plant.goal = area.goal;
      plant.rateTitle = rateTitle;
      plant.ratecolor = ratecolor;
      plant.img = `${area.name}-${ratecolor}.png`;
      plant.clas = PlantAPOClassCSS[area.name.replace('-','_')];

      this.plants.push(plant);
    });
  }

  showTooltip(event:any, name:string){
    let nam = 'poster-'+name;
    let line = 'line-'+name;
    let tooltip = this.elRef.nativeElement.querySelector(`#${nam}`);

    var element = document.getElementById(line).getBoundingClientRect();
    let top = element.top - 130;
    let min = (element.width > 65)?(element.width/2):55;
    let left = element.left - (min);
    tooltip.setAttribute('style',"  display:block; position:fixed; left:"+left+"px; top:"+top+"px;");
  }  

  hideTootltip(name:string) {
    let nam = 'poster-'+name;
    let tooltip = this.elRef.nativeElement.querySelector(`#${nam}`);
    tooltip.setAttribute('style','display:none');
  }

  openLinkOverview(event:any){
    this.router.navigate([`overview/${this.plantName}/${event.target.id}`]);
  }

}

class Plant {
  name:string;
  area: string;
  description: string;
  rate: string;
  value: string;
  goal: string;
  rateTitle: string;
  ratecolor: string;
  img: string;
  clas: string;
}

enum PlantAPOClassCSS {
  //APODACA
  APO_ToyotaTundra_LTE091 = 'apodaca--tundra',
  APO_ToyotaTacoma_LTE092 = 'apodaca--tacoma',
  APO_ToyotaTacoma_LTE093 = 'apodaca--tacoma-l2',
  APO_EnsambleDSL1_DSL1 = 'apodaca--dsl-1',
  APO_EnsambleDSL2_DSL2 = 'apodaca--dsl-2',
  APO_EnsambleDTL1_DTL1 = 'apodaca--dtl-1',
  APO_EnsambleDTL2_DTL2 = 'apodaca--dtl-2',
  APO_PinturaToyota_PINTL2 = 'apodaca--pintl-2',
  APO_PinturaToyota_PINTL3 = 'apodaca--pintl-3',
  APO_PinturaChrysler_PINTL1 = 'apodaca--pintl-1',
  APO_TT_Secuenciado = 'apodaca--secuenciado',
  APO_TT_Pintura = 'apodaca--pintura',
  APO_TT_Beatty1 = 'apodaca--beatty-1',
  APO_TT_Beatty2 = 'apodaca--beatty-2',
  APO_TT_Beatty3 = 'apodaca--beatty-3',
  APO_EstampadoVC_C6000 = 'apodaca--c6000',
  APO_EstampadoVC_C3000 = 'apodaca--c3000',
  APO_EstampadoVC_Whitney1 = 'apodaca--whitney-1',
  APO_EstampadoVC_Whitney2 = 'apodaca--whitney-2',
  APO_EstampadoVC_Cooper = 'apodaca--cooper',
  APO_Bending_RCP = 'apodaca--rcp',
  APO_TT_Descarga = 'apodaca--descarga-TT',

  //SALTILLO
  SAL_PinturaChrysler_PINTL1 = 'saltillo--pintura',
  SAL_D2DJChrysler_D2DJ = 'saltillo--d2dj',
  SAL_DDDPChrysler_DDDP = 'saltillo--dddp',

  //SAN LUIS POTOSÍ
  SLP_BMW_RAC_M035 = 'slp--m035',
  SLP_BMW_RAC_M110 = 'slp--m110',

  //OSASCO
  BRA_Stenhoj_Stenhoj1 = 'osasco--stenhoj1',
  BRA_Pintura_PP2 = 'osasco--pp2',
  BRA_Beatty_Beatty1 = 'osasco--beatty-beatty1',
  BRA_Beatty_Beatty2 = 'osasco--beatty-beatty2',
  BRA_Beatty_Beatty3 = 'osasco--beatty-beatty3',
  BRA_Beatty_Beatty4 = 'osasco--beatty-beatty4',
  BRA_Rollformer_Rollformer2 = 'osasco--rollformer2',
  BRA_Rollformer_Rollformer3 = 'osasco--rollformer3',

  //EL TALAR
  ARG_ECoatL1 = 'eltalar--ecoatl1',
  ARG_EcoatL2 = 'eltalar--ecoatl2',
  ARG_Press3055 = 'eltalar--press305',

  //ELIZABETHTOWN
  P552_Line_1_Main_Line = 'etown--p552l1',
}