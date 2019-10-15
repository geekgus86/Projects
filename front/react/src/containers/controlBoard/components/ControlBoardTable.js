import React, { PureComponent } from "react";
import styles from "../ControlBoard.less";
import { FormattedMessage } from "react-intl";

class ControlBoardTable extends PureComponent {
  render() {
    return (
      <table className={`${styles.ControlBoardTable}`}>
        <thead className={`${styles.MainTable}`}>
          <tr>
            <td className={`${styles.BoldCell}`}>
              <FormattedMessage id="controlBoard.ControlBoardTable.hourLbl" defaultMessage="Hora" />
            </td>
            <td className={`${styles.BoldCell}`}>
              <FormattedMessage id="controlBoard.ControlBoardTable.partLbl" defaultMessage="Parte" />
            </td>
            <td className={`${styles.BoldCell}`}>
              <FormattedMessage id="controlBoard.ControlBoardTable.speedLbl" defaultMessage="Vel" />
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
              <FormattedMessage id="controlBoard.ControlBoardTable.potStrokesLbl" defaultMessage="Golpes Potenciales" />
              </div>
              <div className={`d-flex justify-content-around`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.hourLbl" defaultMessage="Hora" />
                <FormattedMessage id="controlBoard.ControlBoardTable.accumLbl" defaultMessage="Acumulado" />
              </div>
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.realStrokesLbl" defaultMessage="Golpes Reales" />
              </div>
              <div className={`d-flex justify-content-around`}>
                <div className={`${styles.CenteredCellStrokeR}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.hourLbl" defaultMessage="Hora" />
                </div>
                <FormattedMessage id="controlBoard.ControlBoardTable.accumLbl" defaultMessage="Acumulado" />
              </div>
            </td>
            <td className={`${styles.BoldCell}`}>
              <FormattedMessage id="controlBoard.ControlBoardTable.oaprLbl" defaultMessage="% OA X PR" />
            </td>
            <td>
                <div className={`${styles.BoldCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.oaprLbl" defaultMessage="% OA X PR" />
                </div>
                <div>
                  <FormattedMessage id="controlBoard.ControlBoardTable.accumLbl" defaultMessage="Acumulado" />
                </div>
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.downtimeLbl" defaultMessage="Paros" />
              </div>
              <div className={`d-flex justify-content-around`}>
                <span className={`${styles.BoldCell} ${styles.BlueCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.opLbl" defaultMessage="Op" />
                </span>
                <span className={`${styles.BoldCell} ${styles.RedCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.mttoLbl" defaultMessage="Mtto" />
                </span>
                <span className={`${styles.BoldCell} ${styles.GreenCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.htaLbl" defaultMessage="Hta" />
                </span>
                <span className={`${styles.BoldCell} ${styles.OrangeCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.logLbl" defaultMessage="Log" />
                </span>
                <span className={`${styles.BoldCell} ${styles.GrayCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.calLbl" defaultMessage="Cal" />
                </span>
                <span className={`${styles.BoldCell} ${styles.BlackCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.tnrLbl" defaultMessage="Tnr" />
                </span>
              </div>
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.changeoverLbl" defaultMessage="Changeover" />
              </div>
              <div className={`d-flex justify-content-around`}>
                <span className={`${styles.BoldCell} ${styles.BlueCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.opLbl" defaultMessage="Op" />
                </span>
                <span className={`${styles.BoldCell} ${styles.RedCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.mttoLbl" defaultMessage="Mtto" />
                </span>
                <span className={`${styles.BoldCell} ${styles.GreenCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.htaLbl" defaultMessage="Hta" />
                </span>
                <span className={`${styles.BoldCell} ${styles.OrangeCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.logLbl" defaultMessage="Log" />
                </span>
                <span className={`${styles.BoldCell} ${styles.GrayCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.calLbl" defaultMessage="Cal" />
                </span>
                <span className={`${styles.BoldCell} ${styles.BlackCell}`}>
                  <FormattedMessage id="controlBoard.ControlBoardTable.tnrLbl" defaultMessage="Tnr" />
                </span>
              </div>
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.microstopLbl" defaultMessage="Microparos" />
              </div>
              <div>
                <FormattedMessage id="controlBoard.ControlBoardTable.minLbl" defaultMessage="(MIN)" />
              </div>
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.totalLbl" defaultMessage="Total" />
              </div>
              <div>
                <FormattedMessage id="controlBoard.ControlBoardTable.minLbl" defaultMessage="(MIN)" />
              </div>
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.outTimeLbl" defaultMessage="Tiempo fuera" />
              </div>
              <div>
                <FormattedMessage id="controlBoard.ControlBoardTable.minLbl" defaultMessage="(MIN)" />
              </div>
            </td>
            <td>
              <div className={`${styles.BoldCell}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.signaturesLbl" defaultMessage="Firmas" />
              </div>
              <div className={`d-flex justify-content-around`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.tlLbl" defaultMessage="TL" />
                <FormattedMessage id="controlBoard.ControlBoardTable.glLbl" defaultMessage="GL" />
              </div>
            </td>
          </tr>
        </thead>
        <tbody className={styles.MainTable}>
          {this.props.children}
        </tbody>
      </table>
    );
  }
}
export default ControlBoardTable;