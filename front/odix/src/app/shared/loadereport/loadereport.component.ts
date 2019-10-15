import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $  from 'jquery';

@Component({
  selector: 'app-loadereport',
  templateUrl: './loadereport.component.html',
  styleUrls: ['./loadereport.component.scss']
})

export class LoadereportComponent implements OnInit {
  @Input() display: any;

  constructor() {

    $("app-loadereport").css("display", "none");
    
      if(this.display == 'block') {
      $('body').css('overflow', 'hidden');
    } else{
      $('body').css('overflow', 'visible');
    }
  }
  ngOnInit() {
      console.log(this.display);
    $("app-loadereport").css("display", this.display);

    if(this.display == 'block') {
      $('body').css('overflow', 'hidden');
    } else{
      $('body').css('overflow', 'visible');
    }

  }

  ngOnChanges() {
    console.log(this.display);
    $("app-loadereport").css("display", this.display);
      
    if(this.display == 'block') {
      $('body').css('overflow', 'hidden');
    } else{
      $('body').css('overflow', 'visible');
    }

  }

 
}
