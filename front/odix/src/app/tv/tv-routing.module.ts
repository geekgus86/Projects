import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualityReportComponent } from './quality-report/quality-report.component';
import { DefectsComponent } from './defects/defects.component';

const routes: Routes = [
  { path: ':plantName/tv/qualityreport/:typeReport/:code', component: QualityReportComponent },
  { path: ':plantName/tv/defects/:typeReport/:code', component: DefectsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvRoutingModule { }
