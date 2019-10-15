import React, { PureComponent } from "react";
import styles from "../KpiDashboard.less";
//import { numberWithCommas } from "../../../lib/utils";

class ShiftRow extends PureComponent {
  render() {
    return (
      <tr>
        <td className={`${styles.kpiTablePaddingLeft10} ${styles.kpiTableBoldText}}`}>{this.props.label}</td>
        <td className={`${styles.kpiTablePaddingLeft10}`}>{this.props.oa}%</td>
        <td className={`${styles.kpiTablePaddingLeft10}`}>{this.props.gspm}</td>
        <td className={`${styles.kpiTablePaddingLeft10}`}>{this.props.changeover} min</td>
        <td className={`${styles.kpiTablePaddingLeft10}`}>{this.props.strokes}</td>
      </tr>
    );
  }
}
export default ShiftRow;