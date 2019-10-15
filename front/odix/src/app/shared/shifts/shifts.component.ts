import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
  @Input() objShift: any;
  @Input() selectShift: any;
  @Output() ScheduleTime: string;
  @Output() event: EventEmitter<any> = new EventEmitter();
  order: string = 'current';
  reverse: boolean = true;
  

  constructor() { 


  }
  ngOnInit() {}

  onShiftChange(value:number) : void
  {

    var schedule  = this.objShift.filter(function (el:any) {
      return (el.id === (+value) );
    });
    this.ScheduleTime =  schedule[0].ScheduleTime;

    const data = {
      id: value,
      ScheduleTime: this.ScheduleTime
    };
    this.event.emit(data);
  }


}
