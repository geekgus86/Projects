import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MultipleFilterService } from '@app/shared/multiple-filter/multiple-filter.service';

import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Helper } from '@app/shared/helper';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { TranslateService } from '@ngx-translate/core';
import { AssetsID } from '@app/globalEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiple-filter',
  templateUrl: './multiple-filter.component.html',
  styleUrls: ['./multiple-filter.component.scss']
})
export class MultipleFilterComponent implements OnInit {

  // properties
  @Input() datepicker: boolean;
  @Input() AreaName: String;
  @Input() Code: string;
  @Output() event: EventEmitter<any> = new EventEmitter();

  helper: Helper;
  AssetID: number;
  AreaAssetID: number;
  idShift: number;
  lineCode: string;

  arrayArea: any;
  arrayLinea: any;

  bsRangeValue: Date[];
  maxDate: Date;
  startDate: string;
  endDate: string;

  constructor(private multipleFilterService: MultipleFilterService,private calendarService: BsLocaleService, private translateService: TranslateService,router: Router) {
    console.log("=============== MULTIPLE FILTER COMPONENT ==============");
    this.helper = new Helper();
    defineLocale('es', esLocale); 
    defineLocale('en', enGbLocale); 
    let plantName = router.routerState.snapshot.root.children[0].children[0].params['plantName'];
    this.AssetID = (+AssetsID[plantName]);
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.bsRangeValue = [new Date(), new Date()];
    this.defaultLoad();
    this.changeLanguage();
    this.emmit();
  }

 defaultLoad(){

  this.getArea();

 }

  emmit(): void {
    
    const data = {
      code: this.lineCode, 
      startDate: this.startDate,
      endDate: this.endDate
    };

    if (this.datepicker) {
      if (data.code !== undefined && data.startDate !== undefined && data.endDate !== undefined) {
        this.event.emit(data);
      }
    } else if (data.code !== undefined) {
      this.event.emit(data);
    }
  }

  onDateSelection(value: Date): void {
    if (value != null) {
      this.startDate = this.helper.dateProcessingWithDashFormat(value[0]);
      this.endDate = this.helper.dateProcessingWithDashFormat(value[1]);
      this.emmit();

    }
  }

  onAreaChange(value: number): void {
    this.Code = "";
    this.AreaName= "";
    this.AreaAssetID = value;
    this.getLine();
  }

  onLineChange(value: string): void {
    this.Code = "";
    this.AreaName = "";
    this.lineCode = value;
    this.emmit();
  }

  getArea(): void {

    this.multipleFilterService.getAssetIDNameByParentId(this.AssetID)
      .subscribe(res => {
        this.arrayArea = res.Values;
        this.AreaAssetID = this.arrayArea[0].ID;

        if(this.AreaName!="" && this.AreaName !== undefined && this.AreaName !== null ){ //data parameter

          var value = this.AreaName;
          var filter = this.arrayArea.filter(function (el:any) {
            return (el.Name === value );
          });
          this.AreaAssetID = filter[0].ID;

        }
         this.getLine();
        
      });
  }

  getLine(): void {

    this.multipleFilterService.getAssetIDNameByParentId(this.AreaAssetID)
      .subscribe(res => {
        this.arrayLinea = res.Values;

        if(this.arrayLinea.length!=0){
  
          if(this.Code!="" && this.Code !== undefined && this.Code !== null ){
                    
            this.lineCode = this.Code;
          }else{
            this.lineCode = res.Values[0].Code;
          }
        }
       

        this.emmit();
      });

  }

  changeLanguage():void{
    this.calendarService.use((this.translateService.currentLang.indexOf('es') >= 0) ? 'es' : 'en')
    this.translateService.onLangChange
      .subscribe((event: any) => {
        event && this.calendarService.use((event.lang.indexOf('es') >= 0) ? 'es' : 'en');
    });
  }

}
