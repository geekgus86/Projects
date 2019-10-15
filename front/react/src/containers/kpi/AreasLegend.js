import React, { PureComponent } from "react";
import styles from "./KpiDashboard.less";
import { FormattedMessage } from "react-intl";

class AreasLegend extends PureComponent {
  render() {
    let content = null;

    if (this.props.type === true) {
      content = (
        <React.Fragment>
          <span className={`${styles.legendContainer}`}>
            <span className={`${styles.legendColor}`} style={{backgroundColor: "#454748"}}></span>
            <FormattedMessage id="kpi.AreasLegend.objective" defaultMessage="Objetivo" />
          </span>
          <span className={`${styles.legendContainer}`}>
            <span className={`${styles.legendColor}`} style={{backgroundColor: "#000"}}></span>
            <FormattedMessage id="kpi.AreasLegend.total" defaultMessage="Total" />
          </span>
        </React.Fragment>
      )
    } else {
      content = (
        <React.Fragment>
          <span className={`${styles.legendContainer}`}>
            <span className={`${styles.legendColor}`} style={{backgroundColor: "#41B1D6"}}></span>
            <FormattedMessage id="kpi.AreasLegend.opPuroSt" defaultMessage="Op. Puro ST" />
          </span>
          <span className={`${styles.legendContainer}`}>
            <span className={`${styles.legendColor}`} style={{backgroundColor: "#4C4E4F"}}></span>
            <FormattedMessage id="kpi.AreasLegend.engineering" defaultMessage="Ingeniería" />
          </span>
        </React.Fragment>
      )
    }
     
    return (
      <div className={`${styles.widgetLegend}`}>
        <span className={`${styles.legendContainer}`}>
          <span className={`${styles.legendColor}`} style={{backgroundColor: "#EF524C"}}></span>
          <FormattedMessage id="kpi.AreasLegend.maintenance" defaultMessage="Mantenimiento" />
        </span>
        <span className={`${styles.legendContainer}`}>
          <span className={`${styles.legendColor}`} style={{backgroundColor: "#19AC73"}}></span>
          <FormattedMessage id="kpi.AreasLegend.tools" defaultMessage="Herramientas" />
        </span>
        <span className={`${styles.legendContainer}`}>
          <span className={`${styles.legendColor}`} style={{backgroundColor: "#D7DFEB"}}></span>
          <FormattedMessage id="kpi.AreasLegend.quality" defaultMessage="Calidad" />
        </span>
        <span className={`${styles.legendContainer}`}>
          <span className={`${styles.legendColor}`} style={{backgroundColor: "#F16D38"}}></span>
          <FormattedMessage id="kpi.AreasLegend.logistics" defaultMessage="Logística" />
        </span>
        <span className={`${styles.legendContainer}`}>
          <span className={`${styles.legendColor}`} style={{backgroundColor: "#0C4E8A"}}></span>
          <FormattedMessage id="kpi.AreasLegend.operations" defaultMessage="Operaciones" />
        </span>
        {content}
      </div>
    );
  }
}
export default AreasLegend;