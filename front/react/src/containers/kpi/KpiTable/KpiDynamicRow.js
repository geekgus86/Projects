import React, { PureComponent } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styles from "../KpiDashboard.less";

class KpiDynamicRow extends PureComponent {
  render() {
    const diff = this.props.objective - this.props.real;
    let icon = null;
    let colorClass = "";
    if (this.props.comparison === ">") {
      if (diff > 0) {
        icon = <FaArrowDown style={{fontSize: "14px", fontWeight: "100", marginLeft: "4px"}}/>
        colorClass = styles.kpiTableBoldRedText;
      } else {
        icon = <FaArrowUp style={{fontSize: "14px", fontWeight: "100", marginLeft: "4px"}}/>
        colorClass = styles.kpiTableBoldGreenText;
      }
    } else {
      if (diff < 0) {
        icon = <FaArrowDown style={{fontSize: "14px", fontWeight: "100", marginLeft: "4px"}}/>
        colorClass = styles.kpiTableBoldRedText;
      } else {
        icon = <FaArrowUp style={{fontSize: "14px", fontWeight: "100", marginLeft: "4px"}}/>
        colorClass = styles.kpiTableBoldGreenText;
      }
    }
    
    return (
      <tr>
        <td className={`${styles.kpiTablePaddingLeft10}`}>{this.props.label}</td>
        <td className={`${styles.kpiTablePaddingLeft15} ${colorClass}`}>
          {`${this.props.real.toFixed(2)}${this.props.unit || ""} (${Math.abs(diff).toFixed(2)})`}
          {icon}
        </td>
        <td className={`${styles.kpiTableCenterText} ${colorClass}`}>{this.props.objective}{this.props.unit}</td>
      </tr>
    );
  }
}
export default KpiDynamicRow;