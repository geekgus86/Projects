import React, { PureComponent } from "react";
import styleDaily from "../../DailyReport.less";
import { FormattedMessage } from "react-intl";

class DailyReportDetailTable extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <table className={styleDaily.DetailTable}>
        <thead className={styleDaily.HeaderPadd}>
          <tr>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.tool" defaultMessage="herramienta" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.schedule" defaultMessage="Horario" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.tnd" defaultMessage="tnd" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.designSpeed" defaultMessage="vel. DISEÑO" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.realSpeed" defaultMessage="vel. REAL" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.gspm" defaultMessage="NSPM" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.realStrokes" defaultMessage="golpes reales" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.julianNum" defaultMessage="#Juliano" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.rollQty" defaultMessage="cantidad de Rollo" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.scrap" defaultMessage="chatarra (PIEZAS)" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.reworkedPieces" defaultMessage="retrabajo (PIEZAS)" />
            </td>
            <td className={styleDaily.OrangeCell}>
              <FormattedMessage id="dpr.DailyReport.table.changeover" defaultMessage="C/O" />
            </td>
            <td className={styleDaily.RedCell}>
              <FormattedMessage id="dpr.DailyReport.table.eventsNum" defaultMessage="eventos de afectación" />
            </td>
            <td>
              <FormattedMessage id="dpr.DailyReport.table.oapr" defaultMessage="%OA*PR" />
            </td>
          </tr>
        </thead>
        {children}
      </table>
    );
  }
}

export default DailyReportDetailTable;