import React, { PureComponent } from "react";
import styles from "../KpiDashboard.less";
import { FormattedMessage } from "react-intl";

class EqesTable extends PureComponent {
  render() {
    return (
      <table className={`${styles.kpiTable}`} style={{marginBottom: "0"}}>
        <thead className={`${styles.kpiTableHeader} ${styles.kpiTableBoldText}`}>
          <tr>
            <td className={`${styles.kpiTablePaddingLeft10}`}>
              <FormattedMessage id="kpi.EqesTable.eqes" defaultMessage="EQEs" />
            </td>
            <td className={`${styles.kpiTableCenterText}`}>
              <FormattedMessage id="kpi.EqesTable.dt" defaultMessage="DT (Min)" />
            </td>
            <td className={`${styles.kpiTableCenterText}`}>
              <FormattedMessage id="kpi.EqesTable.co" defaultMessage="C/O (Min)" />
            </td>
            <td className={`${styles.kpiTableCenterText}`}>
              <FormattedMessage id="kpi.EqesTable.pctAffect" defaultMessage="% Afectación" />
            </td>
            <td className={`${styles.kpiTableCenterText}`}>
              <FormattedMessage id="kpi.EqesTable.objective" defaultMessage="Objetivo" />
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
export default EqesTable;