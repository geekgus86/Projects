import { Component, Input,OnInit,AfterViewInit } from '@angular/core';
import { ExcelService } from '../../services/excel.service';
//import { OrderPipe } from 'ngx-order-pipe';

interface TColumns {
  field: string;
  header: string;  
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit,AfterViewInit {

  @Input() Title: string;
  @Input('Values') items: any;
  @Input() display: string;
  @Input() clssImportXlsxParam: string;
  @Input() clsSearchParam: string;
  @Input() clsCollg: string;

  selectedItems: any[];
  cols: TColumns[];
  searchActive: boolean;

  constructor(private excelService: ExcelService) { 
    this.searchActive = false;
  }

  ngOnInit() {

    this.cols = this.extractKeysAndBuildColumns(this.items[0]);
  }

  ngOnChanges(){
    this.cols = this.extractKeysAndBuildColumns(this.items[0]);
  }

  ngAfterViewInit(){
    if (this.display !== undefined ){
      $("."+this.clssImportXlsxParam).css("display", this.display);
      $("."+this.clsSearchParam).css("display", this.display);
    }

    if (this.clsCollg !== undefined ){
         $( "#ctn" ).removeClass( "col-lg-11" ).addClass(this.clsCollg);
    }

  }


  extractKeysAndBuildColumns(keys: Object): TColumns[] {

    let columns: TColumns[] = [];

    for(let key in keys) {
      columns.push({
        field:`${key}`,
        header:`${key.toUpperCase()}`
      });
    }
    
    return columns
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.items, this.Title);
 }
}
