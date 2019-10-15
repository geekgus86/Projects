import React, { PureComponent } from "react";

import { Bar } from "react-chartjs-2";
import { round, mapColors } from "../../lib/utils";
import AreasLegend from "./AreasLegend";

class ParetosChangeover extends PureComponent {
  render() {
    const { data } = this.props;
    let content = null;
    if (data !== null) {
      const chartData = {
        labels: data.map(l => { return l.coCode; }),
        datasets: [{
          label: "Min Changeover",
          backgroundColor: data.map(c => { return mapColors(c.color) }),
          borderColor: data.map(c => { return mapColors(c.color) }),
          data: data.map(l => { return l.issue_minutes; }),
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
            top: 20,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
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
              return t.coCode + " - " + t.desc;
            },
            label: function(tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem.index];
              return "Minutos de Changeover: " + round(t.issue_minutes, 1) + " min";
            },
            footer: function(tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem[0].index];
              let htas = [];
              t.tools.forEach((tool) => {
                let toolCode = (tool.tool_code !== null) ? tool.tool_code : "--"
                htas.push(`HTA: ${toolCode} - ${round(tool.issue_minutes, 1)} min`);
              });
              return htas;
            }
          }								
        }
      };

      content = (
        <React.Fragment>
          <Bar data={chartData} options={chartOptions} redraw={true} />
          <AreasLegend />
        </React.Fragment>
      )
    }
    return content
  }
}
export default ParetosChangeover;