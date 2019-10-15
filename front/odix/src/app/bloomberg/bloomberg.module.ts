import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponent } from '@app/bloomberg/global/global.component';
import { PlantComponent } from '@app/bloomberg/plant/plant.component';
import { OverviewComponent } from '@app/bloomberg/overview/overview.component';
import { BloombergRoutingModule } from '@app/bloomberg/bloomberg-routing.module';
import { QuoteService } from '@app/home/quote.service';
import { SharedModule } from '@app/shared';
import { DashboardComponent } from '@app/bloomberg/dashboard/dashboard.component';
import { PlantService } from '@app/bloomberg/plant/plant.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { WorldmapComponent } from '@app/bloomberg/worldmap/worldmap.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { WorldWidePlantsService } from '@app/bloomberg/worldmap/world-wide-plants.service';
import { NguCarouselModule } from '@ngu/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { NgwWowModule } from 'ngx-wow';
import { FormsModule } from '@angular/forms';
import { DateAndShiftComponent } from './../shared/date-and-shift/date-and-shift.component';
import { RemoveWhitePipe } from '@app/utilities/pipe-trim';
import { PerformanceRateComponent } from '@app/bloomberg/performance-rate/performance-rate.component';
import { KpiDashboardComponent } from './kpi-dashboard/kpi-dashboard.component';
import { FormingDashboardComponent } from './forming-dashboard/forming-dashboard.component';
import { MttrFormingComponent } from './mttr-forming/mttr-forming.component';
import { PcbAssemblyComponent } from './pcb-assembly/pcb-assembly.component';
import { PowerbiComponent } from './powerbi/powerbi.component';

@NgModule({
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    BloombergRoutingModule,
    SharedModule,
    AmChartsModule,
    FormsModule,
    NguCarouselModule,
    TranslateModule,

    NgwWowModule.forRoot()
  ],
  declarations: [
    GlobalComponent,
    PlantComponent,
    OverviewComponent,
    DashboardComponent,
    WorldmapComponent,
    DateAndShiftComponent,
    RemoveWhitePipe,
    PerformanceRateComponent,
    KpiDashboardComponent,
    FormingDashboardComponent,
    MttrFormingComponent,
    PcbAssemblyComponent,
    PowerbiComponent
  ],
  providers: [
    QuoteService,
    PlantService,
    WorldWidePlantsService
  ],
  exports: [DateAndShiftComponent, PerformanceRateComponent]
})
export class BloombergModule { }
