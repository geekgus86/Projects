import React, { PureComponent } from "react";
import styles from "../ControlBoard.less";
import { FormattedMessage } from "react-intl";

class LastRecord extends PureComponent {
  render() {
    const { data } = this.props;
    let content = null;
    if (data !== null) {
      content = (
        <tr>
          <td className={`${styles.CenteredCell}`}>
            <FormattedMessage id="controlBoard.LastRecord.dateLbl" defaultMessage="Fecha: " />
            {data.fecha}
          </td>
          <td className={`${styles.CenteredCell}`}>
            <FormattedMessage id="controlBoard.LastRecord.gspmLbl" defaultMessage="NSPM: " />
            {data.gspm.toFixed(2)}
          </td>
          <td className={`${styles.CenteredCell}`}>
            <FormattedMessage id="controlBoard.LastRecord.strokesLbl" defaultMessage="Golpes: " />
            {data.golpes}
          </td>
          <td className={`${styles.CenteredCell}`}>
            <FormattedMessage id="controlBoard.LastRecord.oaprLbl" defaultMessage="% OA x PR: " />
            {data.oaxpr_perc.toFixed(2)}%
          </td>
        </tr>
      );
    }
    
    return (
      <table className={`${styles.ControlBoardTable} ${styles.LeftTable}`}>
        <thead>
          {content}
        </thead>
      </table>
    );
  }
}
export default LastRecord;