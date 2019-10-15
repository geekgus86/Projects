import React, { PureComponent } from "react";
import { mapColors, guid } from "../../lib/utils";
import { Pie } from "react-chartjs-2";
import EqesTable from "./EqesTable/EqesTable";
import EqesRow from "./EqesTable/EqesRow";

class EqesDowntime extends PureComponent {
  render() {
    const { data } = this.props;
    let content = null;
    if (data !== null) {
      
      const chartData = {
        labels: data.map(l => { return l.name; }),
        datasets: [{
          label: "Afectación por EQES",
          backgroundColor: data.map(c => { return mapColors(c.color) }),
          borderColor: "#FFFFFF",
          data: data.map(l => { return l.afect; }),
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
            left: 20,
            right: 20,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
          }],
          yAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              callback: function(value, index, values) {
                return value + "%";
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
              const t = data.labels[tooltipItem[0].index];
              return t;
            },
            label: function(tooltipItem, data) {
              const t = data.datasets[0].data[tooltipItem.index];
              return "Afectación: " + t.toFixed(2) + " %";
            },
            footer: function(tooltipItem, data) {
              const t = data.datasets[0].fullData[tooltipItem[0].index];
              let footer = []
              
              let _tnrPct = t.tnrPct || 0;
              let _dt_minutes = t.dt_minutes || 0;
              let _co_minutes = t.co_minutes || 0;
              let _tnrMin = t.tnrMin || 0;

              _tnrPct = _tnrPct.toFixed(2);
              _dt_minutes = _dt_minutes.toFixed(2);
              _co_minutes = _co_minutes.toFixed(2);
              _tnrMin = _tnrMin.toFixed(2);

              if (t.id === 2) {
                footer = [
                  `Tiempo no reportado: ${_tnrPct} %`,
                  `Minutos de Downtime: ${_dt_minutes}`,
                  `Minutos de Changeover: ${_co_minutes}`,
                  `Minutos de tiempo no reportado: ${_tnrMin}`,
                ];
              } else {
                footer = [
                  `Minutos de Downtime: ${_dt_minutes}`,
                  `Minutos de Changeover: ${_co_minutes}`,
                ];
              }
              return footer
            }
          }
        }
      }

      content = (
        <React.Fragment>
          <Pie data={chartData} options={chartOptions} redraw={true} />
          <EqesTable>
            {data.map((eq) => {
              return <EqesRow key={guid()} name={eq.name} color={eq.color} dtMinutes={eq.dt_minutes.toFixed(2)} coMinutes={eq.co_minutes.toFixed(2)} affect={eq.afect.toFixed(2)} objectiveDt={eq.objectiveDt || 0.0}/>
            })}
          </EqesTable>
        </React.Fragment>
      )
    }
    return content
  }
}
export default EqesDowntime;