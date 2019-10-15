import React, { PureComponent } from "react";
import styles from "../KpiDashboard.less";
import { FormattedMessage } from "react-intl";

class KpiTable extends PureComponent {
  render() {
    return (
      <table className={`${styles.kpiTable}`}>
        <thead className={`${styles.kpiTableHeader} ${styles.kpiTableBoldText}`}>
          <tr>
            <td className={`${styles.kpiTablePaddingLeft10} ${styles.kpiTableWideCell}`}>{this.props.name}</td>
            <td className={`${styles.kpiTablePaddingLeft15}`}>
              <FormattedMessage id="kpi.KpiTable.real" defaultMessage="Real" />
            </td>
            <td className={`${styles.kpiTableCenterText}`}>
               <FormattedMessage id="kpi.KpiTable.objective" defaultMessage="Objetivo" />
            </td>
          </tr>
        </thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    );
  }
}
export default KpiTable;