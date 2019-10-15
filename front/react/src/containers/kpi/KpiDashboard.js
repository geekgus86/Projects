import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
    fetchAfectacionEqes,
    fetchGlobalIndicators,
    fetchHourStrokes,
    fetchKpis,
    fetchParetosChangeover,
    fetchParetosDowntime,
    fetchShiftKpis,
    fetchToolsChangeover,
    fetchToolsPerformance,
} from "../../store/kpi/actions"
import styles from "./KpiDashboard.less"
import { Chart } from "react-chartjs-2"
import Widget from "./Widget"
import PressIndicators from "./PressIndicators"
import ShiftIndicators from "./ShiftIndicators"
import EqesDowntime from "./EqesDowntime"
import GlobalIndicators from "./GlobalIndicators"
import ParetosDowntime from "./ParetosDowntime"
import ParetosChangeover from "./ParetosChangeover"
import ToolPerformance from "./ToolPerformance"
import ToolChageover from "./ToolChageover"
import StrokesPerHour from "./StrokesPerHour"
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader"
import Datepicker from '../../components/Datepicker/Datepicker'
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import moment from "moment-timezone"
import "moment/locale/es"
import { round } from "../../lib/utils"
import { FormattedMessage } from "react-intl";

class KpiDashboard extends PureComponent {
    state = {
        startDate: moment().add(-1, "day"),
        endDate: moment().add(-1, "day"),
        inDateRange: 0,
        loading: true
    }

    componentWillMount() {
        Chart.plugins.register({
            afterDatasetsDraw: function (chart) {
                let ctx = chart.ctx

                chart.data.datasets.forEach(function (dataset, i) {
                    let meta = chart.getDatasetMeta(i)

                    if (
                        !meta.hidden &&
                        dataset.label !== "NSPM" &&
                        (dataset.label !== "Objetivo" || dataset.customId === "globalTargetWidget") &&
                        dataset.label !== "Operaciones" &&
                        dataset.label !== "Mantenimiento" &&
                        dataset.label !== "Logistica" &&
                        dataset.label !== "Calidad" &&
                        dataset.label !== "Herramientas" &&
                        dataset.label !== "Afectación por EQES"
                    ) {
                        meta.data.forEach(function (element, index) {
                            ctx.fillStyle = "#323D50"

                            let fontSize = 13
                            let fontStyle = "normal"
                            let fontFamily = "GothamRounded"
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)

                            let dataString = ""
                            if (dataset.label === "% Downtime") {
                                if (dataset.data[index]) {
                                    dataString = round(dataset.data[index], 1) + "%"
                                } else {
                                    dataString = "0%"
                                }
                            } else if (dataset.label === "Min Changeover") {
                                if (dataset.data[index]) {
                                    dataString = round(dataset.data[index], 1)
                                } else {
                                    dataString = "0"
                                }
                            } else if (dataset.label === "OA X PR Herramienta") {
                                dataString = dataset.data[index].toString() + "%"
                            } else if (dataset.label === "OA X PR") {
                                dataString = dataset.fullData[index].total_strokes.toString()
                            } else if (dataset.label === "Objetivo" && dataset.customId === "globalTargetWidget") {
                                dataString = dataset.data[index].toString() + "%"
                            } else if (dataset.label === "Real" && dataset.customId === "globalRealWidget") {
                                dataString = dataset.data[index].toString() + "%"
                            } else {
                                dataString = dataset.data[index].toString()
                            }

                            ctx.textAlign = "center"
                            ctx.textBaseline = "middle"

                            let padding = 5
                            let position = element.tooltipPosition()
                            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding)
                        })
                    }
                })
            }
        })
    }

    componentDidMount() {
        this.getWidgetsData()
    }

    handleDateStartChange(date) {
        this.setState({ startDate: date })
    }

    handleDateEndChange(date) {
        this.setState({ endDate: date })
    }

    handleSearchButton() {
        const diffdays = moment(this.state.endDate).diff(moment(this.state.startDate), 'days')
        if (diffdays > 0) {
            this.setState({ inDateRange: 1 })
        } else {
            this.setState({ inDateRange: 0 })
        }

        if(diffdays<0){
            const msg = "Favor de seleccionar un rango de fechas valido."
            alert(msg)
            return 
        }

        this.getWidgetsData()
    }

    async getWidgetsData() {
        const startDay = moment(this.state.startDate).format('YYYY-MM-DD')
        const endDay = moment(this.state.endDate).format('YYYY-MM-DD')
        const diffdays = moment(this.state.endDate).diff(moment(this.state.startDate), 'days')

        this.setState({ loading: true })

        await this.props.fetchKpis(startDay, endDay)
        await this.props.fetchShiftKpis(startDay, endDay)
        await this.props.fetchAfectacionEqes(startDay, endDay)
        await this.props.fetchGlobalIndicators(startDay, endDay)
        await this.props.fetchParetosDowntime(startDay, endDay)
        await this.props.fetchParetosChangeover(startDay, endDay)
        await this.props.fetchToolsChangeover(startDay, endDay)
        await this.props.fetchToolsPerformance(startDay, endDay)        
        //Si hay un rango de fechas esta no se ejecuta :)
        if (diffdays === 0) {
            await this.props.fetchHourStrokes(startDay)
        }
        this.setState({ loading: false })
    }

    render() {
        let content = <FullScreenLoader />
        if (this.state.loading === false) {
            content = (
                <React.Fragment>
                    <div className={`${styles.dashboardDateHeader}`}>
                        {moment(this.state.startDate).format('YYYY-MM-DD, 6:00:00[AM]')} - {moment(this.state.endDate).add(1, 'days').format('YYYY-MM-DD, 5:59:59[AM]')}
                    </div>
                    <div className={`row`}>
                        <div className={`col-6`}>
                            <Widget title={
                                <FormattedMessage id="kpi.indicators" defaultMessage="Indicadores" />
                            } paddingClass={`${styles.padd5030} ${styles.WidgetHeight}`}>
                                <PressIndicators data={this.props.pressKpis} />
                            </Widget>
                        </div>
                        <div className={`col-6`}>
                            <Widget title={
                                <FormattedMessage id="kpi.eqes" defaultMessage="Afectación por EQES" />
                            } paddingClass={`${styles.padd5030} ${styles.afectationsTable}`}>
                                <EqesDowntime data={this.props.eqes} />
                            </Widget>
                            <Widget title={
                                <FormattedMessage id="kpi.shiftIndicators" defaultMessage="Indicadores por Turno" />
                            } paddingClass={`${styles.paddModify30} ${styles.IndicadoresTurno}`}>
                                <ShiftIndicators data={this.props.shiftKpis} />
                            </Widget>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className="col-lg-12">
                            <Widget title={
                                <FormattedMessage id="kpi.globalIndicators" defaultMessage="Indicadores Globales" />
                            } paddingClass={`${styles.widgetBodyPadding20} ${styles.heightAuto}`}>
                                <GlobalIndicators data={this.props.globalKpis} />
                            </Widget>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={`col-6`}>
                            <Widget title={
                                <FormattedMessage id="kpi.downtimePareto" defaultMessage="Paretos % Downtime" />
                            } paddingClass={styles.widgetBodyPadding20}>
                                <ParetosDowntime data={this.props.paretosDt} />
                            </Widget>
                        </div>
                        <div className={`col-6`}>
                            <Widget title={
                                <FormattedMessage id="kpi.changeoverPareto" defaultMessage="Paretos C/O" />
                            } paddingClass={styles.widgetBodyPadding20}>
                                <ParetosChangeover data={this.props.paretosCo} />
                            </Widget>
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={`col-6`}>
                            <Widget title={
                                <FormattedMessage id="kpi.avgChangeover" defaultMessage="Changeover por Herramienta" />
                            } paddingClass={`${styles.widgetBodyPadding20} ${styles.mediumSize}`}>
                                <ToolChageover data={this.props.toolsChangeover} />
                            </Widget>
                        </div>
                        <div className={`col-6`}>
                            <Widget title={
                                <FormattedMessage id="kpi.toolPerformance" defaultMessage="Desempeño por Herramienta" />
                            } paddingClass={`${styles.widgetBodyPadding20} ${styles.mediumSize} ${styles.bigSize}`}>
                                <ToolPerformance data={this.props.toolPerf} />
                            </Widget>
                        </div>
                    </div>
                    {this.state.inDateRange===0 &&
                        <div className={`row`}>
                            <div className={`col-12`}>
                                <Widget title={
                                    <FormattedMessage id="kpi.hourStrokes" defaultMessage="Golpes por Hora" />
                                } paddingClass={styles.widgetBodyPadding20}>
                                    <StrokesPerHour data={this.props.hourStrokes} />
                                </Widget>
                            </div>
                        </div>
                    }
                </React.Fragment>
            )
        }

        return (
            <div className={`${styles.dashboardWrapper}`}>
                <div className={`${styles.dashboardTabBar}`}>
                    <div className={`${styles.dashboardTab} ${styles.dashboardTabActive}`}>
                        <FormattedMessage id="kpi.header" defaultMessage="Reporte de Producción Por Prensa" />
                    </div>
                    {/* <div className={`${styles.dashboardTab}`}>
                        <FormattedMessage id="kpi.a3Tab" defaultMessage="A3 de Competitividad" />
                    </div> */}
                </div>
                <div className={`${styles.dashboardContainer}`}>
                    <div className={`row ${styles.dashboardHeader}`}>
                        <div className={`col-6`}>
                            <div className={`${styles.headerTitle}`}>
                                <FormattedMessage id="kpi.reportTab" defaultMessage="REPORTE DE PRODUCCIÓN POR PRENSA" />
                            </div>
                        </div>
                        <div className={`col-6 ${styles.nopadd}`}>
                            <div className={`${styles.dashboardDateFilter}`}>
                                <Datepicker label={
                                    <FormattedMessage id="kpi.from" defaultMessage="Desde " />
                                } onChange={this.handleDateStartChange.bind(this)} date={this.state.startDate} />
                                <Datepicker label={
                                    <FormattedMessage id="kpi.to" defaultMessage="Hasta " />
                                } onChange={this.handleDateEndChange.bind(this)} date={this.state.endDate} />
                                <RoundedButton title={
                                    <FormattedMessage id="kpi.search" defaultMessage="Buscar" />
                                } onClickButton={this.handleSearchButton.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        pressKpis: state.kpis.kpis,
        shiftKpis: state.kpis.shiftKpis,
        eqes: state.kpis.afectEqes,
        globalKpis: state.kpis.globalIndicators,
        paretosDt: state.kpis.paretosDowntime,
        paretosCo: state.kpis.paretosChangeover,
        toolPerf: state.kpis.toolsPerformance,
        hourStrokes: state.kpis.hourStrokes,
        toolsChangeover: state.kpis.toolsChangeover,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAfectacionEqes,
        fetchGlobalIndicators,
        fetchHourStrokes,
        fetchKpis,
        fetchParetosChangeover,
        fetchParetosDowntime,
        fetchShiftKpis,
        fetchToolsChangeover,
        fetchToolsPerformance
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(KpiDashboard)