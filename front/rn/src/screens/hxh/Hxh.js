import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, RefreshControl, ScrollView, StyleSheet, AsyncStorage } from 'react-native'
import { FailureHeader, SensaiRow, SensaiCard, CardLabel, NavButtons } from '../../components'

import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { fetchProduction, setCurrentTool, fetchToolSpeed } from '../home/actions'
import { subscribeTo, unsubscribe } from '../../lib/Socket'

import moment from 'moment-timezone'
import 'moment/locale/es'
import { tracker, upperCase } from '../../helpers'

class Hxh extends Component {
    state = {
        isLoading: false,
        productionTable: [],
        total: 0,
        nav: null,
        dieName: '',
        strokeRate: 0,
        currentSpm: 0,
        totalAcum: 0,
        objectiveStrokes: 0,
        oa: "00",
        spmTool: 0,
        lastRecord: null,
    }

    _mounted = false
    _validate = false
    oldTool = ''

    constructor(props) {
        super(props)
        this.getTableData = this.getTableData.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this._setTotal = this._setTotal.bind(this)
        this.mergeTools = this.mergeTools.bind(this)

        this.setPartsByHour = this.setPartsByHour.bind(this)
        this.setProdValues = this.setProdValues.bind(this)
    }

    componentDidMount() {
        this._mounted = true
        tracker.trackScreenView('Hxh')
        this.getTableData()

        subscribeTo('partsByHour', this.setPartsByHour)
        subscribeTo('prodtrack', this.setProdValues)
        subscribeTo('hxhproduction-created', this._onRefresh)
        
        this.timer = setInterval(
            () => this.tick(),
            4 * 1000
        );
    }

    componentWillUnmount() {
        this._mounted = false
        unsubscribe('partsByHour')
        unsubscribe('prodtrack')
        unsubscribe('hxhproduction-created')

        clearInterval(this.timer)
    }

    async tick() {
        let { production } = this.props
        let lastProduction = production && production[production.length - 1]
        let now = moment()
        let endHour = moment(lastProduction.horaEnd)

        if (now > endHour && this._validate) {
            await this.getTableData()
        }

    }

    getTableData(timer) {
        if (this._mounted == true) {
            this.setState({ isLoading: true, productionTable: [] })
            this.props.fetchProduction().then(() => {
                //EasyRemind #29609
                if(this.props.currentMachine.name.includes('apo')){
                    this.setState({ nav: moment(this.props.toDate)})
                }else{
                    this.setState({ nav: moment(this.props.toDate).add(24, 'hours')})
                }
                //EasyRemind #29609
                this.mergeTools()
            })
        }
    }

    _navigationProd() {
        this.setState({ isLoading: true, productionTable: [] })
        this.props.fetchProduction(moment(this.state.nav).add(24, 'hours').format('YYYY-MM-DD')).then(() => {
            this.setState({ nav: moment(this.state.nav).add(24, 'hours') })
            this.mergeTools()
        })
    }

    _navigationProdL() {
        this.setState({ isLoading: true, productionTable: [] })
        this.props.fetchProduction(moment(this.state.nav).add(-24, 'hours').format('YYYY-MM-DD')).then(() => {
            this.setState({ nav: moment(this.state.nav).add(-24, 'hours') })
            this.mergeTools()
        })
    }

    mergeTools() {
        let productionTable = []
        let total = 0
        if (this.props.production.length !== 0) {
            let tool = this.props.production[0].tool
            let start = this.format(this.props.production[0].hora)
            let end = this.format(this.props.production[0].horaEnd)
            let data = []
            for (r = 0; r < this.props.production.length; r++) {
                if (tool != this.props.production[r].tool) {
                    productionTable.push({ tool: tool, data: data, start: start, end: end })
                    data = []
                    start = this.format(this.props.production[r].hora)
                    tool = this.props.production[r].tool
                }

                this.props.production[r].start = this.formatDate(this.props.production[r].hora, true)
                this.props.production[r].end = this.formatDate(this.props.production[r].horaEnd, false)
                this.props.production[r].oa_h = Math.round((this.props.production[r].piezas / this.props.production[r].piezas_p) * 100)
                if (this.props.production[r].oa_h == 'Infinity' || isNaN(this.props.production[r].oa_h)) {
                    this.props.production[r].oa_h = '00'
                }
                data.push(this.props.production[r])
                total += this.props.production[r].piezas
                let end = this.format(this.props.production[r].horaEnd)
                if (!this.props.production[r + 1]) {//Fill last row
                    if (this._validate) {
                        end = I18n.t('actual')
                        this.props.production[r].last = true
                    }
                    productionTable.push({ tool: tool, data: data, start: start, end: end })
                }
            }
        } else {
            productionTable.push({
                tool: '--',
                start: '06',
                end: '06',
                data: [{
                    start: '-',
                    end: '-',
                    spm: 0,
                    oa_h: 0,
                    piezas: 0
                }]
            })
        }
        this.setState({ isLoading: false, total: total, productionTable })
        this._setTotal()
    }

    _setTotal() {
        let lastRow = Object.assign([], this.props.production)

        if (this._mounted === true && lastRow[0]) {
            let piezas = 0
            // let oa_real = 0
            // let add = 0
            let acumulado_r = 0
            let acumulado_p = 0
            if (this._validate) {
                this.props.production.map((value, i) => {
                    if (!value.last) {
                        piezas = value.piezas < value.pieces_try ? value.piezas : (value.piezas - value.pieces_try)
                        acumulado_r += piezas || 0
                        acumulado_p += value.piezas_p || 0
                    }
                })
                const oa = Math.round(((acumulado_r + this.state.strokeRate) / (acumulado_p + this.state.totalAcum)) * 100)
                this.setState({ lastRecord: { oa: oa, acumulado: (acumulado_r + this.state.strokeRate) } })
            } else {
                this.props.production.map((value, i) => {
                    piezas = value.piezas < value.pieces_try ? value.piezas : (value.piezas - value.pieces_try)
                    acumulado_r += piezas  || 0
                    acumulado_p += value.piezas_p || 0
                })
                const oa = Math.round((acumulado_r / acumulado_p) * 100)
                this.setState({ lastRecord: { oa: oa, acumulado: acumulado_r } })
            }
            // let acumulado = (lastRow.map(item => item.piezas).reduce((prev, next) => prev + next))+piezas
            // let oa = (lastRow.map(item => item.oa_h).reduce((prev, next) => prev*1 + next*1))+oa_real
            // oa = Math.round(oa / (lastRow.length + add))
            // this.setState({ lastRecord: {oa: oa, acumulado: acumulado} })
            // console.log(last);
        }
    }

    setPartsByHour(data) {
        if (this._mounted === true) {
            if (!data.spm || isNaN(data.spm)) {
                data.spm = 0
            }
            if (!data.parts || isNaN(data.parts)) {
                data.parts = 0
            }
            if (!data.oa || isNaN(data.oa)) {
                data.oa = 0
            }
            let oa_este = Math.round(((data.parts - data.parts_out) / data.acum) * 100)
            this.setState({ spmTool: data.spm, strokeRate: (data.parts - data.parts_out), totalAcum: data.acum, dieName: data.dieName, oa: oa_este })
            this._setTotal()
        }
    }

    setProdValues(prodData) {
        if (this._mounted === true) {
            //this.setState({ strokeRate: prodData.parts, dieName: prodData.DieName, currentSpm: (prodData.CurrentStrokeRate / 10) })
            this._setTotal()
        }
    }

    format(date) {
        let hora = date.split('.')[0]
        let time = hora.split('T').join(' ')
        let ini = moment(time, 'YYYY-MM-DD HH:mm:SS')
        return ini.format('h:mmA')
    }

    formatDate(date, fmt, add) {
        let hora = date.split('.')[0]
        let time = hora.split('T').join(' ')
        let ini = moment(time, 'YYYY-MM-DD HH:mm:SS')

        if (add) {
            ini.add(add, 'hours')
        }

        if (ini.format('mm') == '00') {
            if (fmt) {
                ini = ini.format('h')
            } else {
                ini = ini.format('hA')
            }
        } else {
            ini = ini.format('h:mm')
        }

        return ini
    }

    _onRefresh() {
        if (this._mounted === true) {
            this.getTableData()
        }
    }

    render() {
        const rowSize = [1.3, 1, 1, 1.2]
        const { mainContainer, listHeader, mainTitle, mainText, secondaryText, rowLabel, rowText, header, acumText, bottomBox } = styles

        let report = null
        let level = null
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }

        this._validate = (moment(this.props.toDate) > moment())
        let totalAcumulado = 0;
        let tmpAcumulado = 0;
        const rows = this.state.productionTable.map((rowinfo, i) => {

            return (
                <View key={i}>
                    <View style={[listHeader, { flexDirection: 'row' }]}>
                        <Text style={[mainText, { textAlign: 'left' }]}>{rowinfo.tool}</Text>
                        <Text style={[mainTitle, { marginLeft: 10 }]}>{'(' + rowinfo.start + ' - ' + rowinfo.end + ')'}</Text>
                    </View>
                    <SensaiCard padding={[10, 10, 10, 0]}>
                        <View style={{ flex: 1 }}>
                            <SensaiRow sizes={rowSize}>
                                <Text style={header}>
                                    {upperCase(I18n.t('home_production_hourTableTitle'))}
                                </Text>
                                <Text style={header}>
                                    {upperCase(I18n.t('home_production_strokesTableTitle'))}
                                </Text>
                                <Text style={header}>
                                    {upperCase(I18n.t('home_production_realTableTitle'))}
                                </Text>
                                <Text style={header}>
                                    {I18n.t('home_production_oaTableTitle')}
                                </Text>
                            </SensaiRow>
                            {rowinfo.data.map((rowData, j) => {
                                if (rowData.oa_h.toString().length == 1) {
                                    rowData.oa_h = "0" + rowData.oa_h;
                                }
                                if (rowData.oa_h > 100) {
                                    rowData.oa_h = 100;
                                }
                                let oatmp = rowData.oa_h
                                let piezasTmp = 0
                                if (!rowData.last) {
                                    tmpAcumulado = (rowData.piezas == 'Infinity' || isNaN(rowData.piezas) || rowData.piezas == null) || rowData.is_try_out ? 0 : rowData.piezas;
                                    piezasTmp = rowData.piezas < rowData.pieces_try  ? rowData.piezas : (tmpAcumulado - rowData.pieces_try)
                                    totalAcumulado += rowData.is_try_out || rowData.in_out ? 0 : piezasTmp //tmpAcumulado - rowData.pieces_try
                                    piezasTmp = piezasTmp < 0 ? 0 : piezasTmp
                                    if(rowData.is_try_out || rowData.in_out){
                                        piezasTmp = rowData.piezas_s
                                    }
                                    oatmp = (piezasTmp / rowData.piezas_p) * 100 || 0
                                    oatmp = Math.round(oatmp < 0 ? 0 : oatmp)
                                }
                                let content = (
                                    <SensaiRow sizes={rowSize} divider customStyle={{ marginTop: 10, marginBottom: 10 }} key={j}>
                                        <Text style={rowLabel}>{rowData.start + ' - ' + rowData.end}</Text>
                                        <Text style={rowText}>{rowData.spm}</Text>
                                        <Text style={rowText}>{piezasTmp}</Text>
                                        <CardLabel
                                            title={oatmp + ' %'}
                                            value={oatmp}
                                            isTryOut={rowData.is_try_out}
                                            threshold={85}
                                            unit={'%'}
                                            hideValue
                                            margin
                                        />
                                    </SensaiRow>
                                )
                                if (rowData.last) {
                                    tmpAcumulado = (this.state.strokeRate == 'Infinity' || isNaN(this.state.strokeRate) || this.state.strokeRate == null) ? 0 : this.state.strokeRate;
                                    totalAcumulado += rowData.is_try_out || rowData.in_out ? 0 : tmpAcumulado
                                    piezasTmp = rowData.piezas < rowData.pieces_try  ? rowData.piezas : (rowData.piezas - rowData.pieces_try)
                                    oatmp = (this.state.oa == 'Infinity' || isNaN(this.state.oa) || this.state.oa == null) ? 0 : this.state.oa
                                    content = (<SensaiRow sizes={rowSize} divider customStyle={{ marginTop: 10, marginBottom: 10 }} key={j}>
                                        {/* <Text style={rowLabel}>{ I18n.t('actual') }</Text> */}
                                        <Text style={rowLabel}>{this._validate == true ? I18n.t('actual') : rowData.start + ' - ' + rowData.end}</Text>
                                        <Text style={rowText}>{this.state.spmTool}</Text>
                                        <Text style={rowText}>{this.state.strokeRate}</Text>
                                        <CardLabel
                                            title={oatmp + ' %'}
                                            value={oatmp}
                                            isTryOut={rowData.is_try_out}
                                            threshold={85}
                                            unit={'%'}
                                            hideValue
                                            margin
                                        />
                                    </SensaiRow>)
                                }
                                return content
                            })}
                        </View>
                    </SensaiCard>
                </View>
            )
        })

        let dateNow = moment().startOf('day')
        let dateHH = moment(this.props.toDate).startOf('day')
        let schema = this.props.currentMachine.label
        this._validate = (moment(this.props.toDate) > moment())

        const { lastRecord } = this.state;
        
        let totalAcumOA = (lastRecord) ? lastRecord.oa : "00";
        if (totalAcumOA == 'Infinity' || isNaN(totalAcumOA) || totalAcumOA.toString().length == 0) {
            totalAcumOA = '00'
        }
        if (totalAcumOA > 100) {
            totalAcumOA = 100
        }
        return (
            <View style={mainContainer}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                />
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <View style={listHeader}>
                        <Text style={mainText}>{upperCase(I18n.t('hour_by_hour_strikes'))}</Text>
                        <Text style={secondaryText}>{(this.state.isLoading) ? null : this.props.range}</Text>
                    </View>
                    {!this.state.isLoading ?
                        <NavButtons
                            back={this._navigationProdL.bind(this)}
                            today={this.getTableData.bind(this)}
                            next={this._navigationProd.bind(this)}
                            validate={this._validate}
                        /> : null}
                    {rows}
                    {!this.state.isLoading ?
                        <View style={bottomBox}>
                            <SensaiRow sizes={[1, 0.5, 0.5]}>
                                <Text style={acumText}>{I18n.t('accumulated_total')}</Text>
                                <Text style={rowText}>{totalAcumulado}</Text>
                                <CardLabel
                                    title={totalAcumOA + '%'}
                                    value={totalAcumOA}
                                    threshold={85}
                                    unit={'%'}
                                    hideValue
                                />
                            </SensaiRow>
                        </View> : null}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    let fromDate = state.userMachine.production.fromDate
    let toDate = state.userMachine.production.toDate
    if (fromDate && toDate) {
        fromDate = moment(fromDate)
        toDate = moment(toDate)
    }
    return {
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        fromDate: fromDate,
        toDate: toDate,
        params: state.userMachine.production,
        range: state.userMachine.production.range,
        production: state.userMachine.production.data || [],
        canReload: state.userMachine.reloadProduction,
        tool: state.userMachine.currentTool,
        toolSpeed: state.userMachine.toolSpeed,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProduction, setCurrentTool, fetchToolSpeed }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Hxh)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    mainTitle: {
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.azure
    },
    header: {
        fontFamily: 'Gotham Rounded',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.coolGrey,
    },
    listHeader: {
        flexWrap: 'wrap',
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 5,
        padding: 10,
    },
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    secondaryText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    rowLabel: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        justifyContent: 'center'
    },
    rowText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: '#243746',
    },
    bottomBox: {
        backgroundColor: "#e1e1e3",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    acumText: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: -0.39,
        color: "#323d50",
    }
})