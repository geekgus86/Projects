import React, { PureComponent } from "react";
import styles from "./KpiDashboard.less";
import { FormattedMessage } from "react-intl";
import { Bar } from "react-chartjs-2";

class ToolPerfomance extends PureComponent {
  render() {
    const { data } = this.props;
    let content = null;
    if (data !== null) {
      const chartData = {
        labels: data.map(l => { return l.tool; }),
        datasets: [{
          type: "line",
          label: "NSPM",
          fill: false,
          showLine: false,
          backgroundColor: "#FCB630",
          borderColor: "#FCB630",
          data: data.map(l => { return l.gspm; })
        }, {
          label: "OA X PR Herramienta",
          backgroundColor: data.map(c => { return c.color }),
          borderColor: data.map(c => { return c.color }),
          data: data.map(l => { return l.oapr; })
        }]
      };

      const chartOptions = {
        responsive: true,
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawBorder: true,
              color: "#D7DFEB",
              display: false,
              lineWidth: 1
            }
          }],
          yAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              min: 0,
              callback: function(value, index, values) {
                return value + "%";
              }
            }
          }]
        }
      };

      content = (
        <React.Fragment>
          <Bar data={chartData} options={chartOptions} redraw={true} />
          <div className={`${styles.widgetLegend}`}>
            <span className={`${styles.legendContainer}`}>
              <span className={`${styles.legendColor}`} style={{backgroundColor: "#1174BA"}}></span>
              <FormattedMessage id="kpi.toolPerformance.oapr" defaultMessage="OA x PR" />
            </span>
            <span className={`${styles.legendContainer}`}>
              <span className={`${styles.legendColor}`} style={{backgroundColor: "#FCB630", borderRadius: "5px", width: "10px"}}></span>
              <FormattedMessage id="kpi.toolPerformance.gspm" defaultMessage="GSPM" />
            </span>
          </div>
        </React.Fragment>
      )
    }
    return content
  }
}
export default ToolPerfomance;