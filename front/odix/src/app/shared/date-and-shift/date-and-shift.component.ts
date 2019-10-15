import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Helper } from '@app/shared/helper';
import { PlantService } from '@app/bloomberg/plant/plant.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-date-and-shift',
  templateUrl: './date-and-shift.component.html',
  styleUrls: ['./date-and-shift.component.scss']
})
export class DateAndShiftComponent implements OnInit {
  @Input() plantName: any;
  @Input() lineName: any;
  @Input() services : any;
  @Input() AssetID : number;

  @Output() event: EventEmitter<any> = new EventEmitter();
   
  serviceDate: string;
  helper: Helper;
  maxDate: Date;
  shift: number;
  arrayShift: any;
  today : Date = new Date();
  ScheduleTime:string;

  
  constructor(private plantService: PlantService,private calendarService: BsLocaleService, private translateService: TranslateService) { 
    defineLocale('es', esLocale); 
    defineLocale('en', enGbLocale); 
  }

  ngOnInit() {
    this.helper = new Helper();
    const now = new Date();
    this.serviceDate = this.helper.dateProcessingWithDashFormat(now);
    this.maxDate = new Date();
    this.changeLanguage();
    this.loadShift();
  }

  onDateSelection(date: Date): void {
    this.serviceDate = this.helper.dateProcessingWithDashFormat(date);
    this.loadShift();
  }

  loadShift(): void {
    
    // console.log("AA: reload loadShift --> shift = "+this.shift + "  date = "+this.serviceDate);
    this.plantService.getShifts(this.AssetID, this.serviceDate, this.plantName) 
    .subscribe(res => {

      //Load select option shift 
      this.arrayShift = res.SHIFTS;  

      //Get Max id Shift 
      if (this.shift === undefined || this.shift  === null ){ 
          this.shift = res.SHIFTS.reduce(function(max:any, x:any) { return (x.id > max) ? x.id : max; }, 0); //Get Maximum Id
      }
        
     //Entra cuendo no existe el shift que se busca
      if(this.arrayShift.map(function(d:any) { return d['id']; }).indexOf(+this.shift) === -1){ 
        this.shift = this.arrayShift[0].id;
      }

      this.getScheduleShift();

      const data = {
        shiftId: this.shift,
        serviceDate: this.serviceDate,
        ScheduleTime: this.ScheduleTime
      };
      this.event.emit(data);

    }); 
  }


  onShiftChange(value: any): void {
    this.shift = value.id;
    this.ScheduleTime = value.ScheduleTime;
    const data = {
      shiftId: this.shift,
      serviceDate: this.serviceDate,
      ScheduleTime: this.ScheduleTime
    };
    this.event.emit(data);
  }

  changeLanguage():void{
    this.calendarService.use((this.translateService.currentLang.indexOf('es') >= 0) ? 'es' : 'en')
    this.translateService.onLangChange
      .subscribe((event: any) => {
        event && this.calendarService.use((event.lang.indexOf('es') >= 0) ? 'es' : 'en');
    });
  }

  getScheduleShift(){
    var shift_ = this.shift;
    var data = this.arrayShift;
    var schedule  = data.filter(function (el:any) {
      return (el.id === (+shift_) );
    });
    this.ScheduleTime =  schedule[0].ScheduleTime;
  }

}

