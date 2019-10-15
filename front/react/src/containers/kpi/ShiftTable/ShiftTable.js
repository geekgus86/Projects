import React, { PureComponent } from "react";
import styles from "../KpiDashboard.less";
import { FormattedMessage } from "react-intl";

class ShiftTable extends PureComponent {
  render() {
    return (
      <table className={`${styles.kpiTable} ${styles.ShiftTableMain}`}>
        <thead className={`${styles.kpiTableHeader} ${styles.kpiTableBoldText}`}>
          <tr>
            <td className={`${styles.kpiTablePaddingLeft10}`}>
              <FormattedMessage id="kpi.shiftIndicators.tblShift" defaultMessage="Turno" />
            </td>
            <td className={`${styles.kpiTablePaddingLeft10}`}>
              <FormattedMessage id="kpi.shiftIndicators.tblOaPr" defaultMessage="% OA x PR" />
            </td>
            <td className={`${styles.kpiTablePaddingLeft10}`}>
              <FormattedMessage id="kpi.shiftIndicators.tblGspm" defaultMessage="NSPM" />
            </td>
            <td className={`${styles.kpiTablePaddingLeft10}`}>
              <FormattedMessage id="kpi.shiftIndicators.tblAvgCO" defaultMessage="C/O Promedio" />
            </td>
            <td className={`${styles.kpiTablePaddingLeft10}`}>
              <FormattedMessage id="kpi.shiftIndicators.tblStrokes" defaultMessage="Golpes" />
            </td>
          </tr>
        </thead>
        <tbody className={`${styles.kpiTableBody}`}>
          {this.props.children}
        </tbody>
      </table>
    );
  }
}
export default ShiftTable;