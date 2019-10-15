import React, { PureComponent } from "react";
import styles from "../KpiDashboard.less";

class KpiRow extends PureComponent {
  render() {

    /**
     * Formatting real
     */
    let real = this.props.isInt ? this.props.real : parseFloat(this.props.real);
    real = isNaN(real) || this.props.isInt ? this.props.real : real.toFixed(2);
    
    /**
     * Formatting objective
     */
    let objective = parseFloat(this.props.objective);
    objective = isNaN(objective) ? this.props.objective : objective.toFixed(2);

    return (
      <tr>
        <td className={`${styles.kpiTablePaddingLeft10}`}>{this.props.label}</td>
        <td className={`${styles.kpiTablePaddingLeft15}`}>{real}</td>
        <td className={`${styles.kpiTableCenterText}`}>{objective}</td>
      </tr>
    );
  }
}
export default KpiRow;