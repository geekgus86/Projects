import React from "react";
import { Route } from "react-router-dom";

import DigitalBinder from "./containers/digitalBinder/DigitalBinder";
import TrackEquipment from "./containers/trackEquipment/TrackEquipment";
import InitialChecklist from 'containers/checklists/initialChecklist/InitialChecklist'
import ChangeOverChecklist from 'containers/checklists/changeoverChecklist/ChangeOverChecklist'
import DailyReport from "./containers/dailyReport/DailyReport";
import DailyReportEnhanced from "./containers/dailyReport/DailyReportEnhanced";
import KpiDashboard from "./containers/kpi/KpiDashboard";
import ControlBoard from "./containers/controlBoard/ControlBoard";
import DataTable from "./containers/DataTable/DataTable";
import Assets from "./containers/assets/Assets";
import AssetsNew from "./containers/assets/AssetsNew";
import Tools from "./containers/tools/Tools";
import ToolsNew from "./containers/tools/ToolsNew";

import Users from './containers/users/Users'
import UsersNew from './containers/users/UsersNew'
import DowntimesAdmin from './containers/downtimesCodes/DowntimesAdmin'

export const Routes = () => (
  <React.Fragment>
    <Route exact path="/" component={DailyReportEnhanced} />
    <Route exact path="/dpr-o" component={DailyReport} />
    <Route path="/digital-binder" component={DigitalBinder} />
    <Route path="/checklists/initial" component={InitialChecklist} />
    <Route path="/checklists/changeover" component={ChangeOverChecklist} />
    <Route path="/kpi-dashboard" component={KpiDashboard} />
    <Route path="/track-equipment" component={TrackEquipment} />
    <Route path="/dsd" component={ControlBoard} />
    <Route path="/data-table" component={DataTable} />
    <Route path="/downtimes-admin" component={DowntimesAdmin} />
 
    <Route exact path="/admin/assets" component={Assets} />
    <Route exact path="/admin/assets/new" component={AssetsNew} />
    <Route path="/admin/assets/edit/:id" component={AssetsNew} />

    <Route exact path="/admin/tools" component={Tools} />
    <Route exact path="/admin/tools/new" component={ToolsNew} />
    <Route path="/admin/tools/edit/:id" component={ToolsNew} />
    
    {/* <Route exact path="/admin/usersAdmin" component={Users} /> */}

    <Route exact path="/admin/users" component={Users} />
    <Route exact path="/admin/users/new" component={UsersNew} />
    <Route path="/admin/users/edit/:id" component={UsersNew} />
  </React.Fragment>
);