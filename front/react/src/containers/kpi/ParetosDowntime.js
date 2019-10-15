import React, { PureComponent } from "react";

import { Bar } from "react-chartjs-2";
import { round, mapColors } from "../../lib/utils";
import AreasLegend from "./AreasLegend";

class ParetosDowntime extends PureComponent {
  render() {
    let { data } = this.props;
    let content = null;
    if (data !== null) {
      let orderData = [...data].sort((a, b) => a.percentage < b.percentage).slice(0, 6);
      data = data.filter(element => orderData.find(_element => element.issue === _element.issue));
      const chartData = {
        labels: data.map(l => { return l.dtCode; }),
        datasets: [{
          label: "% Downtime",
          backgroundColor: data.map(c => { return mapColors(c.color) }),
          borderColor: data.map(c => { return mapColors(c.color) }),
          data: data.map(l => { return l.percentage; }),
          fullData: data
        }]
      }

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
              display: false,
            },
            ticks: {
              min: 0,
              callback: function (value, index, values) {
                return value + "%";
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem[0].index];
              return t.dtCode + " - " + t.desc;
            },
            label: function (tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem.index];
              return "% Downtime: " + round(t.percentage, 1) + "%";
            },
            footer: function (tooltipItem, data) {
              let t = data.datasets[0].fullData[tooltipItem[0].index];
              let htas = [];
              t.tools.forEach((tool) => {
                let toolCode = (tool.tool_code !== null) ? tool.tool_code : "--"
                htas.push(`HTA: ${toolCode} - ${round(tool.percentage, 1)}%`);
              });
              return htas;
            }
          }
        }
      }

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
export default ParetosDowntime;