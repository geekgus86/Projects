import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-nodata',
  templateUrl: './nodata.component.html',
  styleUrls: ['./nodata.component.scss']
})
export class NodataComponent implements OnInit {
  @Input() inputMsg: any;
  @Input() inputHeight: any;
  @Input() inputPadding: any;

  Msg: any;


  constructor() { }

  ngOnInit() {
  
    this.Msg="Try to change the selected parameters above";
    // console.log("--parameter--");
    // console.log(this.inputMsg);
    // console.log(this.inputHeight);
    // console.log(this.inputPadding);
    // console.log("--parameter--");

    if(this.inputMsg!== undefined && this.inputHeight!== undefined  && this.inputPadding!== undefined ){
      $(".no-data").height(this.inputHeight);
      $(".no-data").css('padding', this.inputPadding);
      this.Msg = this.inputMsg;
    }
    
  }

}
