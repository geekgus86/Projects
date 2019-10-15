import React, { PureComponent } from "react";
import KpiTable from "./KpiTable/KpiTable";
import KpiRow from "./KpiTable/KpiRow";
import KpiDynamicRow from "./KpiTable/KpiDynamicRow";
import { FormattedMessage } from "react-intl";

class PressIndicators extends PureComponent {
  render() {
    const { data } = this.props;
    const oaprObj = 85;
    const avgCoObj = 17.0;
    const pctCoObj = 5.4;
    const pctDtObj = 9.6;
    const ansAvgTimeObj = 2;
    
    let content = null;

    if (data !== null) {
      const outTime = (data.totalOutTime / 60).toFixed(2);
      content = (
        <React.Fragment>
          <KpiTable name={
            <FormattedMessage id="kpi.PressIndicators.oaprIndicators" defaultMessage="Indicadores OA x PR" />
          }>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.outTime" defaultMessage="Hora(s) de paro(s) programado(s)" />
            } real={outTime || 0.00} objective="-"/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.realStrokes" defaultMessage="Golpes Estampados" />
            } real={data.totalStrokes.toFixed(0)} objective="-" isInt="true"/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.potencialStrokes" defaultMessage="Golpes Potenciales" />
            } real={data.potentialStrokes.toFixed(0)} objective="-" isInt="true"/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.gspm" defaultMessage="Golpes Con Demora" />
            } real={data.gsph.toFixed(2) + " NSPM"} objective="-"/>
            <KpiDynamicRow label={
              <FormattedMessage id="kpi.PressIndicators.oaPr" defaultMessage="%OA x PR" />
            } real={data.oapr} objective={oaprObj} unit="%" comparison={">"}/>
          </KpiTable>
          <KpiTable name={
            <FormattedMessage id="kpi.PressIndicators.coIndicators" defaultMessage="Indicadores Changeover" />
          }>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.avgRollChangesTime" defaultMessage="Tiempo Promedio de Cambio de Rollos" />
            } real="N/A" objective="N/A"/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.avgRollChanges" defaultMessage="Cantidad de Cambios de Rollo (C/C)" />
            } real="N/A" objective="N/A"/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.qtyChangeover" defaultMessage="Cantidad de Cambios de Htas. (C/O)" />
            // } real={data.coEvents} objective="N/A" isInt="true" />
          } real={data.coMinutes > 0 ?  data.coEvents  : "N/A"} objective="N/A" isInt="true" />
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.changeoverMins" defaultMessage="Minutos Totales de Changeover" />
            } real={data.coMinutes.toFixed(2)} objective="N/A"/>
            <KpiDynamicRow label={
              <FormattedMessage id="kpi.PressIndicators.pctChangeover" defaultMessage="% Changeover" />
            } real={data.percentageCo} objective={pctCoObj} unit="%" comparison={"<"}/>
            <KpiDynamicRow label={
              <FormattedMessage id="kpi.PressIndicators.avgChangeover" defaultMessage="Promedio de C/O (Mins)" />
            } real={data.avgCoMins} objective={avgCoObj} comparison={"<"}/>
          </KpiTable>
          <KpiTable name={
            <FormattedMessage id="kpi.PressIndicators.dtIndicators" defaultMessage="Indicadores Downtime" />
          }>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.dtMinutes" defaultMessage="Minutos de Downtime" />
            } real={data.dtMinutes.toFixed(2)} objective="N/A"/>
            <KpiDynamicRow label={
              <FormattedMessage id="kpi.PressIndicators.pctDowntime" defaultMessage="% Downtime" />
            } real={data.percentageDt} objective={pctDtObj} unit="%" comparison={"<"}/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.pctTNR" defaultMessage="% Tiempo no Reportado" />
            } real={data.tnr.toFixed(2) + "%"} objective="N/A"/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.Mttr" defaultMessage="MTTR Promedio (Mins)" />
            } real={data.mttrProm} objective="17 min"/>
            <KpiRow label={
              <FormattedMessage id="kpi.PressIndicators.avgMttr" defaultMessage="Tiempo Promedio de Respuesta" />
            } real={data.ansAvgTime} objective={ansAvgTimeObj}/>
          </KpiTable>
        </React.Fragment>
      );
    }
    return content
  }
}
export default PressIndicators;