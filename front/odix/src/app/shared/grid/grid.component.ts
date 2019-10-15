import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


// new imports

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {

 @Input() source: any;
 @Input() settings: any;
 @Input() styles: any;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 withSorting: Boolean;
 withFilter: Boolean;
 dataSource: any;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.source);
    this.withSorting = this.settings.withSorting;
    this.withFilter = this.settings.withFilter;
  }

  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    
       if(changes.source && !changes.source.firstChange){
          this.dataSource = new MatTableDataSource(changes.source.currentValue);
       }
        
     }
}
