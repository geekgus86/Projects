import React, { PureComponent } from "react";
import styles from "../ControlBoard.less";
import { FormattedMessage } from "react-intl";

class TotalProduction extends PureComponent {
    sumShifts(record1, record2) {
        if (record1 && record2) {
            return record1.sumPiezas + record2.sumPiezas
        } else if (record1 && !record2) {
            return record1.sumPiezas
        } else if (!record1 && record2) {
            return record2.sumPiezas
        } else {
            return ''
        }
    }
    render() {
        const { data } = this.props;
        let arrContent = []
        let numTurno = null

        if (data !== null) {

            let arrShifts = data.map(a => a.turno);            
            arrShifts = [...new Set(arrShifts)];
            // arrShifts.sort();

            let dataTotal = {
                total0: 0,
                total1: 0,
                total2: 0,
                total3: 0,
                total4: 0,
                total5: 0,
                total6: 0
            }

            arrShifts.forEach(function(shift) {
                const t = data.filter((d) => { return d.turno === shift })
                
                dataTotal.total0 += (t[0] ? t[0].sumPiezas : 0)
                dataTotal.total1 += (t[1] ? t[1].sumPiezas : 0)
                dataTotal.total2 += (t[2] ? t[2].sumPiezas : 0)
                dataTotal.total3 += (t[3] ? t[3].sumPiezas : 0)
                dataTotal.total4 += (t[4] ? t[4].sumPiezas : 0)
                dataTotal.total5 += (t[5] ? t[5].sumPiezas : 0)
                dataTotal.total6 += (t[6] ? t[6].sumPiezas : 0)
                numTurno = shift.substring(shift.length - 1, shift.length)
                arrContent.push(
                    <tr>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.turno" defaultMessage="Shift" /> {numTurno}
                        </td>
                        <td className={`${styles.CenteredCell}`}>{t[0] ? t[0].sumPiezas : ""}</td>
                        <td className={`${styles.CenteredCell}`}>{t[1] ? t[1].sumPiezas : ""}</td>
                        <td className={`${styles.CenteredCell}`}>{t[2] ? t[2].sumPiezas : ""}</td>
                        <td className={`${styles.CenteredCell}`}>{t[3] ? t[3].sumPiezas : ""}</td>
                        <td className={`${styles.CenteredCell}`}>{t[4] ? t[4].sumPiezas : ""}</td>
                        <td className={`${styles.CenteredCell}`}>{t[5] ? t[5].sumPiezas : ""}</td>
                        <td className={`${styles.CenteredCell}`}>{t[6] ? t[6].sumPiezas : ""}</td>
                    </tr>
                )
            })
            
            arrContent.push(
              <tr>
                <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                  <FormattedMessage id="controlBoard.TotalProduction.totalLbl" defaultMessage="Total" />
                </td>
                <td className={`${styles.CenteredCell}`}>{dataTotal.total0}</td>
                <td className={`${styles.CenteredCell}`}>{dataTotal.total1}</td>
                <td className={`${styles.CenteredCell}`}>{dataTotal.total2}</td>
                <td className={`${styles.CenteredCell}`}>{dataTotal.total3}</td>
                <td className={`${styles.CenteredCell}`}>{dataTotal.total4}</td>
                <td className={`${styles.CenteredCell}`}>{dataTotal.total5}</td>
                <td className={`${styles.CenteredCell}`}>{dataTotal.total6}</td>
              </tr>
            );
        }

        return (
            <table className={`${styles.ControlBoardTable} ${styles.LeftTable}`}>
                <thead className={`${styles.MainTable}`}>
                    <tr>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.planLbl" defaultMessage="Plan" />
                        </td>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.mondayLbl" defaultMessage="Lunes" />
                        </td>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.tuesdayLbl" defaultMessage="Martes" />
                        </td>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.wednesdayLbl" defaultMessage="Miércoles" />
                        </td>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.thursdayLbl" defaultMessage="Jueves" />
                        </td>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.fridayLbl" defaultMessage="Viernes" />
                        </td>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.saturdayLbl" defaultMessage="Sábado" />
                        </td>
                        <td className={`${styles.CenteredCell} ${styles.BoldCell}`}>
                            <FormattedMessage id="controlBoard.TotalProduction.sundayLbl" defaultMessage="Domingo" />
                        </td>
                    </tr>
                </thead>
                <tbody className={`${styles.MainTable}`}>
                    {arrContent.map((content, i) => (
                        content
                    ))}                    
                </tbody>
            </table>
        );
    }
}
export default TotalProduction;