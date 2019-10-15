import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { FormsModule } from '@angular/forms';
import { AmChartsModule } from '@amcharts/amcharts3-angular';

import { TvRoutingModule } from './tv-routing.module';
import { QualityReportComponent } from './quality-report/quality-report.component';
import { DefectsComponent } from './defects/defects.component';

@NgModule({
  imports: [
    CommonModule,
    AmChartsModule,
    FormsModule,
    TvRoutingModule,
    SharedModule,
  ],
  declarations: [
    QualityReportComponent,
    DefectsComponent
  ]
})
export class TvModule { }
