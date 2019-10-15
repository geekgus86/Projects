import { NgModule } from '@angular/core';
import { GlobalComponent } from '@app/bloomberg/global/global.component';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { JobsbyhourComponent } from '@app/reports/jobsbyhour/jobsbyhour.component';
import { ProdDuplicatesComponent } from '@app/reports/prodduplicates/prodduplicates.component';


/*const routes: Routes = [
  Route.withShell([

    { path: 'report', redirectTo: '/jobsbyhour', pathMatch: 'full' },
    { path: 'jobsbyhour', component: JobsbyhourComponent, data: { title: extract('Jobs By Hour') } },
    { path: 'prodduplicates', component: ProdDuplicatesComponent, data: { title: extract('Production Duplicates') } }

  ])
];*/

@NgModule({
  imports: [
    // RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [RouterModule],
})
export class ReportsRoutingModule { }
