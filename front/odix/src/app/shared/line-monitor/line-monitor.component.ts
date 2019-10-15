import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineMonitorService } from './line-monitor.service';
import { TippyService } from 'ng-tippy';
import { Subject } from 'rxjs/Subject';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'line-monitor',
  templateUrl: './line-monitor.component.html',
  styleUrls: ['./line-monitor.component.scss']
})
export class LineMonitorComponent implements OnInit, OnDestroy {
  plantName: string;
  machineName: string;
  stations: any[];
  title: string;
  reportList: any[];
  tableData: any[];
  lastUpdate: string;
  onDestroy$ = new Subject<void>();
  reportSelected: number = 0;
  reportStationName = "";
  reportStatus = "";
  imageLast: Element;
  reportIsLoading = false;
  constructor( private route: ActivatedRoute, private monitorService: LineMonitorService, private tippyService: TippyService) { }

  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
    this.plantName = this.route.snapshot.paramMap.get('plantName');
    this.machineName = this.route.snapshot.paramMap.get('machineName');
    console.log(this.plantName);
    console.log(this.machineName);

    // ESCONDER INFORMACION EN HOVER
    // $('#tooltip-info').hide();
    // $('#info-icon').hover(
    //   function() {
    //     $('#tooltip-info').fadeIn();
    //   }, function() {
    //     $('#tooltip-info').fadeOut();
    //   }
    // );
    
    this.fetchLayoutFromService();
    this.fetchTableFromService();
    this.fetchReportFromService(this.reportSelected);
    //LLAMANDO SERVICIOS
    let obs = Rx.Observable.interval(15000).takeUntil(this.onDestroy$);
    obs.subscribe(value => {
      this.fetchLayoutFromService();
      this.fetchTableFromService();
    });

  }

  fetchLayoutFromService(){
    this.monitorService.getStationsLayout(this.plantName,"28-09-2018",this.machineName).
    subscribe(res => {
      console.log("RESPUESTA DE LAYOUT: ");
      console.log(res.RTML[0]);
      this.stations = res.RTML[0].Childs;
      //this.lastUpdate = "Fecha pendiente";//res.lastUpdateDate.substr(0,19);
      //this.fetchReportFromService(this.reportSelected);
    });
  }

  fetchReportFromService(st: number){
    if(this.stations){
      this.reportIsLoading = true;
      this.reportSelected = st;
      this.monitorService.getProductionReport(this.plantName,"28-09-2018",this.machineName,this.stations[st].Station).
      subscribe(res => {
        console.log("RESPUESTA DE REPORTE: ");
        console.log(res.Station);
        this.reportList = res;
        this.reportStationName = this.stations[st].Station;
        this.reportStatus = this.getStatus(st);
        this.reportIsLoading = false;
      });
    }
  }

  fetchTableFromService(){
    this.monitorService.getInformationTable(this.plantName,"28-09-2018",this.machineName).
    subscribe(res => {
      console.log("RESPUESTA DE TABLA: ");
      console.log(res.Stations);
      this.tableData = res.Stations;
      this.lastUpdate = res.LastUpdateDate;
    });
  }

  ngOnDestroy(){
    this.onDestroy$.next();
  }

  getStationStyle(linea: number) {
    var estilo = '';
    if(this.stations){
      let station = this.stations[linea];
      estilo = station.Green ? 'inProgress' : estilo;
      estilo = station.Orange ? 'processTime' : estilo;
      estilo = station.Red ? 'failure' : estilo;
      estilo = station.Yellow ? 'manual' : estilo;
    }
    
    return estilo;
  }

  getStatus(station: number){
   
    if (this.stations[station].Block) {
      return "Blocked";
    }
    if (this.stations[station].Failure) {
      return "Failure";
    }
    if (this.stations[station].Load) {
      return "Load";
    }
    if (this.stations[station].Manual) {
      return "Manual";
    }
    if (this.stations[station].ProcessActive) {
      return "Process";
    }
    if (this.stations[station].Starve) {
      return "Starved";
    }
    if (this.stations[station].Unload) {
      return "Unload";
    }

    return "N/A";
    
  }

  unselect(){
      if(this.imageLast){
          if(this.imageLast.getAttribute('src').includes('robot-1-selected.png')){
            this.imageLast.setAttribute('src', 'assets/images/overview/robot-1.png')
          }else if(this.imageLast.getAttribute('src').includes('robot-2-selected.png')){
            this.imageLast.setAttribute('src','assets/images/overview/robot-2.png');
          }
      }
  }


  imageSwap(e:MouseEvent, type:number){
    if (type == 1){
      e.srcElement.setAttribute('src','assets/images/overview/robot-1-selected.png');
      //if(this.imageLast) this.imageLast.setAttribute('src','assets/images/overview/robot-1.png');
    }
    if (type == 2){
      e.srcElement.setAttribute('src','assets/images/overview/robot-2-selected.png');
      //if(this.imageLast) this.imageLast.setAttribute('src','assets/images/overview/robot-2.png');
    }

    if(this.imageLast){
      if(this.imageLast.getAttribute('src').includes('robot-1-selected.png')){
        this.imageLast.setAttribute('src', 'assets/images/overview/robot-1.png')
      }else if(this.imageLast.getAttribute('src').includes('robot-2-selected.png')){
        this.imageLast.setAttribute('src','assets/images/overview/robot-2.png');
      }
    }

    this.imageLast = e.srcElement;
  }


}
