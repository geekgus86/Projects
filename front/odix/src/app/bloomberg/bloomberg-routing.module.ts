import { NgModule } from '@angular/core';
import { GlobalComponent } from '@app/bloomberg/global/global.component';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { PlantComponent } from '@app/bloomberg/plant/plant.component';
import { OverviewComponent } from '@app/bloomberg/overview/overview.component';
import { LineMonitorComponent } from '@app/shared/line-monitor/line-monitor.component';
import { DashboardComponent } from '@app/bloomberg/dashboard/dashboard.component';
import { PlantResolver } from '@app/bloomberg/plant/plant.resolve';
import { OverviewResolver } from '@app/bloomberg/overview/overview.resolve';
import { GlobalResolver } from '@app/bloomberg/global/global.resolve';
import { PerformanceRateComponent } from './performance-rate/performance-rate.component';
import { MttrFormingComponent } from './mttr-forming/mttr-forming.component';
import { KpiDashboardComponent } from './kpi-dashboard/kpi-dashboard.component';
import { PcbAssemblyComponent } from './pcb-assembly/pcb-assembly.component';
import { KpiDashboardResolver } from './kpi-dashboard/kpi-dashboard.resolve';
import { FormingDashboardComponent } from './forming-dashboard/forming-dashboard.component';
import { PowerbiComponent } from './powerbi/powerbi.component';

const routes: Routes = [
  Route.withOdixTop([
    { path: 'forming', component: FormingDashboardComponent, data: { title: extract('Forming Dashboard') } },
    { path: 'performance/:plantName', component: PerformanceRateComponent, data: { title: extract('Performance') } },
    { path: 'mttr/:plantName', component: MttrFormingComponent, data: { title: extract('Mttr Forming') } },
    { path: 'pcb-assembly/:lineName', component: PcbAssemblyComponent, data: { title: extract('PCB Assembly') } },
    { path: 'kpi/:plantName', component: KpiDashboardComponent, resolve:{kpi: KpiDashboardResolver }, data: { title: extract('Kpi dashboard') } },
    { path: 'kpi/:plantName/:prensa', component: KpiDashboardComponent, resolve:{kpi: KpiDashboardResolver }, data: { title: extract('Kpi dashboard') } },
    { path: 'powerbi/embedded/:dashboardName', component: PowerbiComponent, data: { title: extract('Dashboard') } },

  ]),
  Route.withOdixShell([
    { path: '', redirectTo: '/global', pathMatch: 'full' },
    { path: 'global', component: GlobalComponent, resolve: { globalPlants: GlobalResolver}, data: { title: extract('Global') } }
  ]),
  Route.withShell([


    { path: 'plant/:plantName', component: PlantComponent, resolve: { plant: PlantResolver}, data: { title: extract('Plant') } },

    { path: ':plantName/dashboard/:dashboardName', component: DashboardComponent, data: { title: extract('Dashboard') } },

    { path: 'overview/:plantName/:machineName', component: OverviewComponent, resolve: { resolver: OverviewResolver}, data: { title: extract('Overview') } },

    { path: 'monitor/:plantName/:machineName', component: LineMonitorComponent, data: { title: extract('RTMONITOR') } },

  ])

  // tslint:disable-next-line:max-line-length
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [KpiDashboardResolver, PlantResolver, OverviewResolver, GlobalResolver],
  exports: [RouterModule],
})
export class BloombergRoutingModule { }
