import React, { PureComponent } from "react";
import styles from "./KpiDashboard.less";
import { FormattedMessage } from "react-intl";
import { Bar } from "react-chartjs-2";
import { mapColors } from "../../lib/utils";

class StrokesPerHour extends PureComponent {
  render() {
    const { data } = this.props;
    let content = null;
    if (data !== null) {
      
      const chartData = {
        labels: data.map(l => { return l.formatedHour; }),
        datasets: [{
          label: "OA X PR",
          backgroundColor: data.map(c => { return mapColors(c.color) }),
          borderColor: data.map(c => { return mapColors(c.color) }),
          data: data.map(l => { return l.total_strokes; }),
          fullData: data
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
            top: 15,
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
              display: false,
            },
            ticks: {
              min: 0,
              max:  Math.max(...data.map(l => { return l.total_strokes; })) + 20,
              callback: function(value, index, values) {               
                return value + "%";
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem[0].index];
              return "Golpes por Hora - " + t.formatedHour;
            },
            label: function(tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem.index];
              // return "OA X PR: " + t.oapr + "%";
              return "Golpes totales: " + t.total_strokes;
              
            },
            footer: function(tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem[0].index];
              let htas = [
                // "Golpes totales: " + t.total_strokes,
                "Golpes potenciales: " + t.potential_strokes,
              ];
              t.tools.forEach((tool) => {
                let toolStr = (t.potential_strokes === 0) ? tool + " (No Registrada)" : tool
                htas.push(`HTA: ${toolStr}`);
              });
              return htas;
            }
          }								
        }
      };

      content = (
        <React.Fragment>
          <Bar data={chartData} options={chartOptions} redraw={true} height={100} />
          <div className={`${styles.widgetLegend}`}>
            <span className={`${styles.legendContainer}`}>
              <span className={`${styles.legendColor}`} style={{backgroundColor: "#1174BA"}}></span>
              <FormattedMessage id="kpi.hourStrokes.objCompleted" defaultMessage="Objetivo Cumplido" />
            </span>
            <span className={`${styles.legendContainer}`}>
              <span className={`${styles.legendColor}`} style={{backgroundColor: "#EF524C"}}></span>
              <FormattedMessage id="kpi.hourStrokes.objNotCompleted" defaultMessage="Objetivo No Cumplido" />
            </span>
          </div>
        </React.Fragment>
      )
    }
    return content
  }
}
export default StrokesPerHour;