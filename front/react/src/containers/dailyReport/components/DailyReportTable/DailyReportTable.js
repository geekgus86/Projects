import React, { PureComponent } from "react";
import styleDaily from "../../DailyReport.less";
import Card from "../Card/Card";
import OaPrCell from "../OaPrCell/OaPrCell";
import { FormattedMessage } from "react-intl";

class DailyReportTable extends PureComponent {
  state = {
    collapsed: true
  }
  toggleAccordion() {
    this.setState({ collapsed: !this.state.collapsed });
    this.props.onToggleDetail && this.props.onToggleDetail(this.state.collapsed);
  }
  render() {
    const { cardTitle, cardSubtitle, borderColor, showButton, data, children } = this.props;
    const displayStatus = (this.state.collapsed === true) ? "none" : "table-row";
    return (
      <Card title={cardTitle} subtitle={cardSubtitle} borderColor={borderColor} showButton={showButton} onButtonPress={this.toggleAccordion.bind(this)} user={this.props.user}>
        <table className={styleDaily.CardTable}>
          <thead>
            <tr>
              <td>
                <FormattedMessage id="dpr.DailyReport.detailTbl.prodRun" defaultMessage="CORRIDA DE PRODUCCIÓN" />
              </td>
              <td>
                <FormattedMessage id="dpr.DailyReport.detailTbl.nat" defaultMessage="TIEMPO NETO DISP" />
              </td>
              <td>
                <FormattedMessage id="dpr.DailyReport.detailTbl.gspm" defaultMessage="VELOCIDAD C/ DEMORA (GSPM)" />
              </td>
              <td>
                <FormattedMessage id="dpr.DailyReport.detailTbl.realStrokes" defaultMessage="GOLPES REALES" />
              </td>
              <td>
                <FormattedMessage id="dpr.DailyReport.detailTbl.scrap" defaultMessage="CHATARRA (PIEZAS)" />
              </td>
              <td>
                <FormattedMessage id="dpr.DailyReport.detailTbl.reworkedPieces" defaultMessage="RETRABAJO (PIEZAS)" />
              </td>
              <td className={styleDaily.OrangeCell}>
                <FormattedMessage id="dpr.DailyReport.detailTbl.avgChangeover" defaultMessage="PROMEDIO C/O" />
              </td>
              <td className={styleDaily.RedCell}>
                <FormattedMessage id="dpr.DailyReport.detailTbl.totalAffect" defaultMessage="TOTAL EVENTOS AFECTACIONES" />
              </td>
              <td>
                <FormattedMessage id="dpr.DailyReport.detailTbl.oapr" defaultMessage="%OA*PR" />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styleDaily.BoldCell}>
                {data.tool} <FormattedMessage id="dpr.DailyReport.detailTbl.runs" defaultMessage="corridas" />
              </td>
              {/* <td>{data.tnd} min</td> */}
              <td>{data.tnd > 0 ?  data.tnd  : 0}  min</td>
              <td>{data.gspm}</td>
              <td>{data.golpes}</td>
              <td>{data.scrap}</td>
              <td>{data.retrabajo}</td>
              <td>{(data.changeover).toFixed(2)} min</td>
              <td className={styleDaily.BlueCell}>
                  {data.paros}
              </td>
              {/* <OaPrCell value={data.percentageOaPr} /> */}
              <OaPrCell value={data} />
            </tr>
            <tr style={{ display: displayStatus }}>
              <td colSpan={9}>
                {children}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  }
}

export default DailyReportTable;