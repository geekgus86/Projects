import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from '@app/reports/reports-routing.module';
import { JobsbyhourComponent } from '@app/reports/jobsbyhour/jobsbyhour.component';
import { ProdDuplicatesComponent } from '@app/reports/prodduplicates/prodduplicates.component';
import { SharedModule } from '@app/shared';
import { ReportsService } from '@app/reports/reports.service';
import { ProdaverageComponent } from '@app/reports/prodaverage/prodaverage.component';
import { ProdbydateandmodelComponent } from '@app/reports/prodbydateandmodel/prodbydateandmodel.component';
import { ProdaveragejphComponent } from '@app/reports/prodaveragejph/prodaveragejph.component';
import { ProdlistComponent } from '@app/reports/prodlist/prodlist.component';
import { ProdperformanceComponent } from '@app/reports/prodperformance/prodperformance.component';
import { HistoryComponent } from '@app/reports/history/history.component';
import { OvercycletimesComponent } from '@app/reports/overcycletimes/overcycletimes.component';
import { SlowestcyclesComponent } from '@app/reports/slowestcycles/slowestcycles.component';
import { CycletimesmonthlydataComponent } from '@app/reports/cycletimesmonthlydata/cycletimesmonthlydata.component';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule } from '@angular/forms';
import {PastCyclesComponent} from '@app/reports/past-cycles/past-cycles.component';
import {AdministrativeComponent} from '@app/reports/met/administrative/administrative.component';


@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    NgbModule, 
    BsDatepickerModule.forRoot(), 
    
  ],
  declarations:
  [
    JobsbyhourComponent,
    ProdDuplicatesComponent,
    ProdaverageComponent,
    ProdbydateandmodelComponent,
    ProdaveragejphComponent,
    ProdlistComponent,
    ProdperformanceComponent,
    HistoryComponent,
    OvercycletimesComponent,
    SlowestcyclesComponent,
    CycletimesmonthlydataComponent,
      PastCyclesComponent,
      AdministrativeComponent
  ],
  providers: [
    ReportsService,
  ]
})
export class ReportsModule { }
