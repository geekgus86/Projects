import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';

import { EmailsComponent } from '@app/bloomberg-auth/process-control/emails/emails.component';
import { WorkgroupsComponent } from '@app/bloomberg-auth/process-control/workgroups/workgroups.component';
import { ParameterlimitsComponent } from '@app/bloomberg-auth/thicknesses/parameterlimits/parameterlimits.component';
import { ParametersComponent } from '@app/bloomberg-auth/thicknesses/parameters/parameters.component';
import { TanksParametersComponent } from '@app/bloomberg-auth/tanks/parameters/parameters.component';
import { AgGridComponent } from '@app/bloomberg-auth/agGrid/ag-grid.component';
import { ProcessParameterlimitsComponent } from '@app/bloomberg-auth/process-control/parameterlimits/parameterlimits.component';
import { CycletimesGoalsComponent } from '@app/bloomberg-auth/cycletimes-goals/cycletimes-goals.component';
import { LineGoalEditingComponent } from '@app/bloomberg-auth/line-goal-editing/line-goal-editing.component';
import { ShiftScheduledDowntimeComponent } from '@app/bloomberg-auth/shift-scheduled-downtime/shift-scheduled-downtime.component';
import { EntryComponent } from '@app/bloomberg-auth/process-control/entry/entry.component';
import { StatusAndonComponent } from '@app/bloomberg-auth/status-andon/status-andon.component';
import { UserComponent } from '@app/bloomberg-auth/user/user.component';
import { PiEntryComponent } from '@app/bloomberg-auth/product-inspection/pi-entry/pi-entry.component';
import { ProcessComponent } from '@app/bloomberg-auth/process-control/pintl2/process/process.component';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';
import { OcmAdminComponent } from './ocm-admin/ocm-admin.component';
import { OcmResolver } from './ocm-admin/ocm-resolver';
import { AdminsComponent } from './admins/admins.component';
import { OperatorViewComponent } from './admins/categories/qualitygate/operator-view/operator-view.component';



// import { RoleGuardService } from '@app/core/authentication/role-guard.service';

export const ROUTES: Routes = [
  { path: ':plantName/agGrid', component: AgGridComponent,canActivate: [AuthenticationGuard], data: { title: extract('Tanks - parameters') } },
  { path: ':plantName/processcontrol/emails', component: EmailsComponent,canActivate: [AuthenticationGuard], data: { title: extract('Process Control Emails - Editing') } },
  { path: ':plantName/processcontrol/workgroups', component: WorkgroupsComponent,canActivate: [AuthenticationGuard], data: { title: extract('Process Control Workgroups - Editing') } },
  { path: ':plantName/processcontrol/parameterlimits', component: ProcessParameterlimitsComponent,canActivate: [AuthenticationGuard], data: { title: extract('Process Control Parameters Limits') } },
  { path: ':plantName/processcontrol/entry', component: EntryComponent,canActivate: [AuthenticationGuard], data: { title: extract('Process Control Entry') } },
  { path: ':plantName/thicknesses/parameterlimits', component: ParameterlimitsComponent,canActivate: [AuthenticationGuard], data: { title: extract('Thickness Limits of parameters') } },
  { path: ':plantName/thicknesses/parameters', component: ParametersComponent,canActivate: [AuthenticationGuard], data: { title: extract('Thickness - parameters') } },
  { path: ':plantName/tanks/parameters', component: TanksParametersComponent,canActivate: [AuthenticationGuard], data: { title: extract('Tanks - parameters') } },
  { path: ':plantName/tanks/cycletimes-goals', component: CycletimesGoalsComponent,canActivate: [AuthenticationGuard], data: { title: extract('Cycles Times Goals') } },
  { path: ':plantName/tanks/line-goal-editing', component: LineGoalEditingComponent,canActivate: [AuthenticationGuard], data: { title: extract('Line Goals Editing') } },
  { path: ':plantName/tanks/shift-scheduled-downtime', component: ShiftScheduledDowntimeComponent,canActivate: [AuthenticationGuard], data: { title: extract('Shift Schedule Downtime') } },
  { path: ':plantName/statusandon', component: StatusAndonComponent,canActivate: [AuthenticationGuard], data: { title: extract('Status Andon') } },
  { path: ':plantName/productinspection/entry', component: PiEntryComponent,canActivate: [AuthenticationGuard], data: { title: extract('Product Inspection Entry') } },
  { path: 'admin/:plantName/ocm', component: OcmAdminComponent,canActivate: [AuthenticationGuard], resolve: { ocm : OcmResolver}, data: { title: extract('Operational Cost Monitor') } },
  { path: ':plantName/User', component: UserComponent,canActivate: [AuthenticationGuard], data: { title: extract('User') } },
  { path: ':plantName/processcontrol/pintl2/process',component: ProcessComponent },
  { path: 'admin/:typeadmin/:plantName',component: AdminsComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin/:typeadmin',component: AdminsComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin/:typeadmin/:typereport/:plantName',component: AdminsComponent, canActivate: [AuthenticationGuard] },
  { path: 'admin/:typeadmin/:typereport/:plantName/:idView',component: AdminsComponent, canActivate: [AuthenticationGuard] },
  { path: 'qualitygate/operatorview',component: OperatorViewComponent },


  // { path: ':plantName/processcontrol/pintl2/process',
  // component: ProcessComponent,
  // canActivate: [RoleGuardService],
  // data: { 
  //   expectedRole: 'admin'
  // } 
  // },




];


@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  // providers: [],
  providers: [],
  exports: [RouterModule],
})
export class BloombergAuthRoutingModule { }
