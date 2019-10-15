import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from "ag-grid-angular/main";
import { FormsModule } from '@angular/forms'; 
import { AlertModule } from 'ngx-bootstrap/alert';

import { BloombergAuthRoutingModule } from '@app/bloomberg-auth/bloomberg-routing.module';


import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { BsDatepickerModule } from 'ngx-bootstrap';

import { EmailsComponent } from './process-control/emails/emails.component';
import { WorkgroupsComponent } from './process-control/workgroups/workgroups.component';
import { ProcessParameterlimitsComponent } from './process-control/parameterlimits/parameterlimits.component';
import { ParameterlimitsComponent } from './thicknesses/parameterlimits/parameterlimits.component';
import { ParametersComponent } from './thicknesses/parameters/parameters.component';
import { TanksParametersComponent } from './tanks/parameters/parameters.component';
import { cellButton } from './agGrid/cell-button.component';
import { AgGridComponent } from './agGrid//ag-grid.component';
import { CycletimesGoalsComponent } from './cycletimes-goals/cycletimes-goals.component';
import { LineGoalEditingComponent } from './line-goal-editing/line-goal-editing.component';
import { ShiftScheduledDowntimeComponent } from './shift-scheduled-downtime/shift-scheduled-downtime.component';
import { EntryComponent } from './process-control/entry/entry.component';
import { StatusAndonComponent } from './status-andon/status-andon.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { UserComponent } from './user/user.component';
import { PiEntryComponent } from './product-inspection/pi-entry/pi-entry.component';
import { ProcessComponent } from './process-control/pintl2/process/process.component';
import { PText } from './process-control/pintl2/process/links.component';
import { OcmAdminComponent } from './ocm-admin/ocm-admin.component';
import { OcmResolver } from './ocm-admin/ocm-resolver';
import { AdminsComponent } from './admins/admins.component';
import { AdminUserComponent } from './admins/categories/user/admin-user.component';
import { TeamsComponent } from './admins/categories/teams/teams.component';
import { ToolComponent } from './admins/categories/tool/tool.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GrdFilterPipe } from '@app/pipes/grid.pipe';
import { NumberOnlyDirective } from '@app/shared/numericDirective/numeric.directive';
import { NoWhitespaceDirective } from '@app/shared/noSpacesDirective/nospaces.directive';
import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';
import { DragScrollModule } from 'ngx-drag-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './admins/angular-material';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { CreateModuleComponent } from './admins/categories/qualitygate/create-module/create-module.component';
import { FilterPipe } from './admins/filter.pipe';
import { CreateOperatorComponent } from './admins/categories/qualitygate/create-operator/create-operator.component';
import { TrainOperatorComponent } from './admins/categories/qualitygate/train-operator/train-operator.component';
import { OperatorViewComponent } from './admins/categories/qualitygate/operator-view/operator-view.component';
import { CreateDefectsComponent } from './admins/categories/qualitygate/create-defects/create-defects.component';
import { ColorHueModule } from 'ngx-color/hue';
import { CreateItemsComponent } from './admins/categories/qualitygate/create-items/create-items.component';
import { IpAssignmentComponent } from './admins/categories/qualitygate/ip-assignment/ip-assignment.component';
import { AlertHelper } from './admins/categories/qualitygate/alerts-helper';
import { ViewsListComponent } from './admins/categories/qualitygate/views-list/views-list.component';
import { EditViewComponent } from './admins/categories/qualitygate/edit-view/edit-view.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes  } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents(
      [
        EmailsComponent,
        WorkgroupsComponent,
        ParameterlimitsComponent,
        AgGridComponent,
        cellButton,
        PText,
        ProcessParameterlimitsComponent,
        CycletimesGoalsComponent,
        LineGoalEditingComponent,
        ShiftScheduledDowntimeComponent,
        // DesignNewComponent,
        // ChildMessageRenderer,
        UserComponent
      ]
    ),
    SweetAlert2Module.forRoot(),
    AlertModule.forRoot(),
    FormsModule,

    BloombergAuthRoutingModule,
    TranslateModule,
    NgbModule, 
    BsDatepickerModule.forRoot(), 

    UiSwitchModule.forRoot({
      size: 'large',
      switchColor: '#FFFFFF',
      defaultBgColor: '#ff3333',
      checkedLabel: 'ON',
      uncheckedLabel: 'OFF'
    }),
    NgxPaginationModule,
    BrowserModule,
    AngularDraggableModule,
    DragScrollModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ColorHueModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
    })
  ],
  declarations: [
    EmailsComponent,
    WorkgroupsComponent,
    ParameterlimitsComponent,
    ParametersComponent, 
    TanksParametersComponent, 
    AgGridComponent,
    cellButton,
    PText,
    NumberOnlyDirective,
    NoWhitespaceDirective,
    ProcessParameterlimitsComponent,
    CycletimesGoalsComponent,
    LineGoalEditingComponent,
    ShiftScheduledDowntimeComponent,
    EntryComponent,
    StatusAndonComponent,
    PiEntryComponent,
    ConfirmationDialogComponent,
    // DesignNewComponent,
    // ChildMessageRenderer,
    UserComponent,
    ProcessComponent,
    OcmAdminComponent,
    AdminsComponent,
    AdminUserComponent,
    TeamsComponent,
    ToolComponent,
    GrdFilterPipe,
    CreateModuleComponent,
    FilterPipe,
    CreateOperatorComponent,
    TrainOperatorComponent,
    OperatorViewComponent,
    CreateDefectsComponent,
    CreateItemsComponent,
    IpAssignmentComponent,
    ViewsListComponent,
    EditViewComponent
  ],
  providers: [ 
    ConfirmationDialogService,
    OcmResolver ,
    AlertHelper
  ],
  entryComponents: [ 
    ConfirmationDialogComponent,
    CreateModuleComponent,
    EditViewComponent
  ]
  
})
export class EditingReportsModule { }

