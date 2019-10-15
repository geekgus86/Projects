import React, { PureComponent } from "react";
import styles from "../KpiDashboard.less";
import { mapColors } from "../../../lib/utils";

class EqesRow extends PureComponent {
  render() {
    return (
      <tr>
        <td className={`${styles.kpiTablePaddingLeft10}`}>
          <div style={{display: "flex", justifyContent: "flex-start", alignitems: "center"}}>
            <span style={{
              marginRight: "10px",
              width: "10px", 
              height: "10px", 
              borderRadius: "5px", 
              backgroundColor: mapColors(this.props.color), 
              display: "inline-block"
            }}></span>
            <span>{this.props.name}</span>
          </div>
        </td>
        <td className={`${styles.kpiTableCenterText}`}>{this.props.dtMinutes}</td>
        <td className={`${styles.kpiTableCenterText}`}>{this.props.coMinutes}</td>
        <td className={`${styles.kpiTableCenterText}`}>{this.props.affect}</td>
        <td className={`${styles.kpiTableCenterText}`}>{this.props.objectiveDt} %</td>
      </tr>
    );
  }
}
export default EqesRow;