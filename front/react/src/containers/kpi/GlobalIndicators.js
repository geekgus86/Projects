import React, { PureComponent } from "react"
import styles from "./KpiDashboard.less"
import { FormattedMessage } from "react-intl";
import { Bar } from "react-chartjs-2"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { store } from '../../store';

const { user } = store.getState();

class GlobalIndicators extends PureComponent {
    changeArrow(v1, v2) {
        if (v1 <= v2) {
            return <FaArrowUp color={"#46b978"} />
        } else {
            return <FaArrowDown color={"#ff2c18"} />
        }
    }

    render() {
        const { data } = this.props
        let content = null
        if (data !== null) {
            const objetivOA = 85
            const objectivCO = 5.40
            const objectivDT = 9.60
            const objectivMicroparos = 0

            const oA = data.oapr.toFixed(2)
            const cO = data.co.toFixed(2)
            const dt = data.dt.toFixed(2)
            const microparos = data.microparos.toFixed(2) || 0

            let oaArrow = null
            let coArrow = null
            let dtArrow = null
            let microArrow = null

            if (oA > objetivOA) {
                oaArrow = <FaArrowUp color={"#46b978"} />
            } else {
                oaArrow = <FaArrowDown color={"#ff2c18"} />
            }

            coArrow = this.changeArrow(cO, objectivCO)
            dtArrow = this.changeArrow(dt, objectivDT)
            microArrow = this.changeArrow(microparos, objectivMicroparos)

            let labels = (user.language === "es") ? ["%OA", "%C/O", "%DT", "%MICROPAROS"] : ["%OA", "%C/O", "%DT", "%MICRODOWNTIMES"]

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Real",
                        customId: "globalRealWidget",
                        backgroundColor: "#0a75c2",
                        fill: true,
                        showLine: true,
                        data: [oA, cO, dt, microparos]
                    }, {
                        label: "Objetivo",
                        customId: "globalTargetWidget",
                        backgroundColor: "#64c1ec",
                        fill: true,
                        showLine: true,
                        data: [objetivOA, objectivCO, objectivDT, objectivMicroparos]
                    }
                ]
            }

            let maxValue = Math.max(...[objetivOA, objectivCO, objectivDT, objectivMicroparos, oA, cO, dt, microparos])

            const chartOptions = {
                responsive: true,
                legend: {
                    display: false
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
                            max: maxValue + 20,
                            callback: function (value, index, values) {
                                return value + "%"
                            }
                        }
                    }]
                }
            }

            content = (
                <React.Fragment>
                    <Bar data={chartData} options={chartOptions} redraw={true} height={100} />
                    <div className={`${styles.widgetLegend}`}>
                        <div className={`col-12 row-fluid`}>
                            <span className={`${styles.MarginSpace}`}>
                                <span>
                                    {oaArrow}
                                </span>
                                <span>
                                    <FormattedMessage id="kpi.GlobalIndicators.pctOa" defaultMessage="%OA" />
                                </span>
                            </span>
                            <span className={`${styles.MarginSpace}`}>
                                <span>
                                    {coArrow}
                                </span>
                                <span>
                                    <FormattedMessage id="kpi.GlobalIndicators.pctCo" defaultMessage="%C/O" />
                                </span>
                            </span>
                            <span className={`${styles.MarginSpace}`}>
                                <span>
                                    {dtArrow}
                                </span>
                                <span>
                                    <FormattedMessage id="kpi.GlobalIndicators.pctDt" defaultMessage="%DT" />
                                </span>
                            </span>
                            <span className={`${styles.MarginSpace}`}>
                                <span>
                                    {microArrow}
                                </span>
                                <span>
                                    <FormattedMessage id="kpi.GlobalIndicators.pctMicrostop" defaultMessage="%MICROPAROS" />
                                </span>
                            </span>
                        </div>
                        <div className={`col-12`}>
                            <span className={`${styles.legendContainer}`}>
                                <span className={`${styles.legendColor}`} style={{ backgroundColor: "#0a75c2" }}></span>
                                <FormattedMessage id="kpi.GlobalIndicators.real" defaultMessage="Real" />
                            </span>
                            <span className={`${styles.legendContainer}`}>
                                <span className={`${styles.legendColor}`} style={{ backgroundColor: "#64c1ec" }}></span>
                                <FormattedMessage id="kpi.GlobalIndicators.objective" defaultMessage="Objetivo" />
                            </span>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        return content
    }
}
export default GlobalIndicators