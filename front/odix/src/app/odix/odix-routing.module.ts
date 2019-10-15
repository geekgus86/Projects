import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { GlobalComponent } from '@app/bloomberg/global/global.component';

const routes: Routes = [
  { path: 'Yudier', component: GlobalComponent, data: { title: extract('Global') } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdixRoutingModule { }
