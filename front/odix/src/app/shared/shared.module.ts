import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '@app/shared/loader/loader.component';
import {ExtPageComponent} from '@app/shared/extpage/extpage.component';
import { PipesModule } from '@app/pipes/pipes.module';
import {CdkTableModule} from '@angular/cdk/table';
import {MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { GridComponent } from '@app/shared/grid/grid.component';
import {ReportComponent} from '@app/shared/report/report.component';
import { OrderModule } from 'ngx-order-pipe';
import { ElzplantComponent } from '@app/shared/mapPlants/elzplant/elzplant.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { ApoplantComponent } from '@app/shared/mapPlants/apoplant/apoplant.component';
import { GaugeChartComponent } from '@app/shared/gauge-chart/gauge-chart.component';
import { MultipleFilterComponent } from '@app/shared/multiple-filter/multiple-filter.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TableModule } from 'primeng/table';
import {ShiftsComponent} from '@app/shared/shifts/shifts.component';
import { TranslateModule } from '@ngx-translate/core';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { DonutchartComponent } from './donutchart/donutchart.component';
import { LineMonitorComponent } from './line-monitor/line-monitor.component';
import { ColorIndicatorsComponent } from './color-indicators/color-indicators.component';
import { LoadereportComponent } from './loadereport/loadereport.component';
import { NodataComponent } from './nodata/nodata.component';
import { DateAndShiftComponent } from './date-and-shift/date-and-shift.component';
import { SliderNavComponent } from '@app/shared/slider-nav/slider-nav.component';
import { LineChartComponent } from './graphsAmCharts/line-chart/line-chart.component';
import { StackedcolumnChartComponent } from './graphsAmCharts/stackedcolumn-chart/stackedcolumn-chart.component';
import { LinesComponent } from './mapPlants/lines/lines.component';
import { TippyModule } from 'ng-tippy';
import { ColumnLineMixComponent } from './graphsAmCharts/column-line-mix/column-line-mix.component';
// import {ColumnChartComponent} from '@app/shared/column-chart/column-chart.component';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    CdkTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    OrderModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    TableModule,
    TranslateModule,
    RouterModule,
    TippyModule,
  ],
  declarations: [
    LoaderComponent,
    ExtPageComponent,
    GridComponent,
    ReportComponent,
    ElzplantComponent,
    ApoplantComponent,
    GaugeChartComponent,
    MultipleFilterComponent,
    ShiftsComponent,
    ColumnChartComponent,
    ColorIndicatorsComponent,
    LoadereportComponent,
    DonutchartComponent,
    NodataComponent,
    SliderNavComponent,
    LineChartComponent,
    StackedcolumnChartComponent,
    LineMonitorComponent,
    LinesComponent,
    ColumnLineMixComponent
  ],
  exports: [
    LoaderComponent,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    GridComponent,
    ReportComponent,
    ElzplantComponent,
    ApoplantComponent,
    GaugeChartComponent,
    MultipleFilterComponent,
    ShiftsComponent,
    ColumnChartComponent,
    ColorIndicatorsComponent,
    LoadereportComponent,
    NodataComponent,
	  DonutchartComponent,
    SliderNavComponent,
    LineChartComponent,
    ColumnLineMixComponent,
    StackedcolumnChartComponent,
    LineMonitorComponent,
    LinesComponent
  ]
})
export class SharedModule { }
