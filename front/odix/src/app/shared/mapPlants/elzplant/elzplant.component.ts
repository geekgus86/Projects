import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-elzplant',
  templateUrl: './elzplant.component.html',
  styleUrls: ['./elzplant.component.scss'],
   providers: [NgbTooltipConfig]
})
export class ElzplantComponent implements OnInit {

  @Input() mapPlant: any;
   plant: {};
   plantName: string;

  constructor(
    config: NgbTooltipConfig,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    config.placement = 'top';
    config.triggers = 'hover';
    this.plant = {};
  }

  ngOnInit() {
    
    this.route.params.subscribe(
      params => { this.plantName = params['plantName']; }
    );
    
    this.mapPlant.areas.forEach((area:any) => {
     
    
      let obj = {};
      let rateTitle = '';
     
      obj['name'] = area.name;
      obj['rate'] = area.rate;
      obj['value'] = area.value;
      obj['goal'] = area.goal; 
      obj['img'] =  `${area.name}-${area.rate}.png`;

      switch(area.rate) {
        case 'delayed':
          rateTitle = 'Delayed';
          break;
        case 'medium':
        rateTitle = 'Medium';
          break;
        case 'on-goal':
        rateTitle = 'On Goal';
          break;
      } 

      obj['rateTitle'] = rateTitle; 
         
      this.plant[`${area.name}`] = obj;


      /** 
           * primero que todo voy a comprobar si dicha maquina existe para eso 
           * cada img representa una maquina y va a tener el id con el nombre de la misma
          */
         let nodeImg = this.elRef.nativeElement.querySelector(`#${area.name}`);
      
         // solo si existe es que vamos agregarle los eventos
         if(nodeImg) {
          
           nodeImg.addEventListener('mouseenter', (event:any) => {
               event.target.src = `assets/images/mapPlants/apodaca/${area.name}-hover-${area.rate}.png`;
             });
   
           nodeImg.addEventListener('mouseleave', (event:any) => {
               event.target.src = `assets/images/mapPlants/apodaca/${area.name}-${area.rate}.png`;
           });
           
           nodeImg.addEventListener('click', (event: any) => {
             this.router.navigate([`overview/${this.plantName}/${event.target.id}`]);
           });
           
         }
    });   
  }
}
