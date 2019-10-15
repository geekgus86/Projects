import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules,RouteReuseStrategy  } from '@angular/router';
import { Route, extract } from '@app/core';
import { ExtPageComponent } from '@app/shared/extpage/extpage.component';
import { ProdDuplicatesComponent } from '@app/reports/prodduplicates/prodduplicates.component';
import { JobsbyhourComponent } from '@app/reports/jobsbyhour/jobsbyhour.component';
import { ProdaverageComponent } from '@app/reports/prodaverage/prodaverage.component';
import { ProdbydateandmodelComponent } from '@app/reports/prodbydateandmodel/prodbydateandmodel.component';
import { ApoplantComponent } from '@app/shared/mapPlants/apoplant/apoplant.component';
import { ProdaveragejphComponent } from '@app/reports/prodaveragejph/prodaveragejph.component';
import { ProdlistComponent } from '@app/reports/prodlist/prodlist.component';
import { OvercycletimesComponent } from '@app/reports/overcycletimes/overcycletimes.component';
import { SlowestcyclesComponent } from '@app/reports/slowestcycles/slowestcycles.component';
import { HistoryComponent } from '@app/reports/history/history.component';
import { PastCyclesComponent } from '@app/reports/past-cycles/past-cycles.component';
import { CycletimesmonthlydataComponent } from '@app/reports/cycletimesmonthlydata/cycletimesmonthlydata.component';
import { CustomRouteReusableStrategy } from '@app/core/custom-route-reusable-strategy';
import { AdministrativeComponent } from '@app/reports/met/administrative/administrative.component'; 

const routes: Routes = [
  Route.withShell([
  { path: 'extpage/:site', component: ExtPageComponent, data: { title: extract('Global') } },
  { path: ':plantName/reports/prodduplicates', component: ProdDuplicatesComponent, data: { title: extract('Global') } },
  // tslint:disable-next-line:max-line-length
  { path: ':plantName/reports/jobsperhour', component: JobsbyhourComponent, data: { title: extract('Production Jobs Per Hour') } },
  { path: ':plantName/reports/jobsperhour/:NameArea/:Code', component: JobsbyhourComponent, data: { title: extract('Production Jobs Per Hour') } },
  // tslint:disable-next-line:max-line-length
  { path: ':plantName/reports/prodaverage', component: ProdaverageComponent, data: { title: extract('Production Average') } },
  // tslint:disable-next-line:max-line-length
  { path: ':plantName/reports/prodbydateandmodel', component: ProdbydateandmodelComponent, data: { title: extract('Production by Date and Model') } },
  // tslint:disable-next-line:max-line-length
  { path: ':plantName/reports/prodaveragejph', component: ProdaveragejphComponent, data: { title: extract('Production Average JPH') } },
  { path: ':plantName/reports/prodlist', component: ProdlistComponent, data: { title: extract('Production List') } },
  // tslint:disable-next-line:max-line-length
  { path: ':plantName/reports/overcycletimes', component: OvercycletimesComponent, data: { title: extract('Overcycle Times') } },
  { path: ':plantName/reports/history', component: HistoryComponent, data: { title: extract('History Report') } },
  // tslint:disable-next-line:max-line-length
  { path: ':plantName/reports/slowestcycles', component: SlowestcyclesComponent, data: { title: extract('Slowest Cycles') } },
  { path: 'apoplant', component: ApoplantComponent, data: { title: extract('Production Average') } },
  // tslint:disable-next-line:max-line-length
  { path: 'prodbydateandmodel', component: ProdbydateandmodelComponent, data: { title: extract('Production by Date and Model') } },
  { path: ':plantName/reports/pastcycles', component: PastCyclesComponent, data: { title: extract('pastCycles') } },
  { path: ':plantName/reports/cycletimesmonthlydata', component: CycletimesmonthlydataComponent, data: { title: extract('cycletimesmonthlydata') } },
  { path: ':plantName/reports/mets', component: AdministrativeComponent, data: { title: extract('Administrative') } },
  
  ]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: CustomRouteReusableStrategy
    }],
})
export class AppRoutingModule { }
