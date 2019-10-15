import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native'
import I18n from '../../i18n/i18n'
import { upperCase, tracker, navigate } from '../../helpers'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, SensaiCard, SensaiRow, Spinner, NavButtons } from '../../components'
import { fetchProduction } from './actions'
import moment from 'moment-timezone'
import 'moment/locale/es'

class ProductionTab extends PureComponent {
    state = {
        isLoading: true,
        productionTable: [],
        shiftTitle: '',
        isLoading: true,
        isRefreshing: false,
        nav: null,
        hours: {}
    }
    _mounted = false

    constructor(props) {
        super(props)
        this.updateTable = this.updateTable.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
    }

    componentDidMount() {
        this._mounted = true
        this.getTableData()
        tracker.trackScreenView('HourByHour')
    }

    componentWillUnmount() {
        this._mounted = false
    }

    getTableData() {
        if (this._mounted == true) {
            this.setState({ isLoading: true })
            this.props.fetchProduction().then(() => {
                this.setState({ nav: moment(this.props.fromDate).add(1, 'day') })
                this.updateTable()
            })
        }
    }

    _navigationProd() {
        this.setState({ isLoading: true })
        this.props.fetchProduction(moment(this.state.nav).add(24, 'hours').format('YYYY-MM-DD')).then(() => {
            this.setState({ nav: moment(this.state.nav).add(24, 'hours') })
            this.updateTable()
        })
    }

    _navigationProdL() {
        this.setState({ isLoading: true })
        this.props.fetchProduction(moment(this.state.nav).add(-24, 'hours').format('YYYY-MM-DD')).then(() => {
            this.setState({ nav: moment(this.state.nav).add(-24, 'hours') })
            this.updateTable()
        })
    }

    updateTable() {
        let shift = {}
        let start = null
        let end = null
        let shiftName = ''
        let isNightShift = false

        if (moment().isBetween(moment('06:00:00', 'hh:mm:ss'), moment('18:00:00', 'hh:mm:ss'))) {
            isNightShift = false
            shiftName = I18n.t('home_production_dayShiftName')
        } else {
            isNightShift = true
            shiftName = I18n.t('home_production_nightShiftName')
        }
        const diff = moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds')
        let from = null
        let to = null
        if (moment().isBetween(moment('00:00:00', 'hh:mm:ss'), moment('06:00:00', 'hh:mm:ss'))) {
            from = moment().subtract(1, 'days').format('D MMM')
            to = moment().format('D MMM')
            start = moment('06:00:00', 'hh:mm:ss').subtract(1, 'days')
            end = moment('06:00:00', 'hh:mm:ss')
        } else {
            from = moment().format('D MMM')
            to = moment().add(1, 'days').format('D MMM')
            start = moment('06:00:00', 'hh:mm:ss')
            end = moment('06:00:00', 'hh:mm:ss').add(1, 'days')
        }

        this.setState({ shiftTitle: `${from} ${start.format('hA')} - ${to} ${end.format('hA')}` })

        let duration = moment.duration(start.diff(end))
        let limit = Math.abs(duration.asHours())
        let hours = {}
        for (let i = 0; i < limit; i++) {
            if (i > 0) {
                hours[start.add(1, 'hours').format('YYYY-MM-DDTHH:mm:SS')] = true
            } else {
                hours[start.format('YYYY-MM-DDTHH:mm:SS')] = true
            }
        }
        // console.log(hours)
        this.setState({ hours })
        let productionTable = []
        if (this.props.production.length !== 0) {
            //for (r in this.props.production) {
            for (r=0;r < this.props.production.length;r++){
                let hora = this.props.production[r].hora.split('.')[0]
                let time = hora.split('T').join(' ')
                let ini = moment(time, 'YYYY-MM-DD HH:mm:SS')
                let fin = moment(time, 'YYYY-MM-DD HH:mm:SS')
                if(ini.format('mm')=='00'){
                    ini = ini.format('hA')
                }else{
                    ini = ini.format('h:mm')
                }

                if(this.props.production[r+1]){
                    hora = this.props.production[r+1].hora.split('.')[0]
                    time = hora.split('T').join(' ')
                    fin = moment(time, 'YYYY-MM-DD HH:mm:SS')
                    if(fin.format('mm')=='00'){
                        fin = fin.format('hA')
                    }else{
                        fin = fin.format('h:mm')
                    }
                }else{
                    fin = fin.add(1, 'hours').format('hA')
                }

                productionTable.push({
                    time: `${ini} - ${fin}`,
                    parts: this.props.production[r].piezas,
                    tool: this.props.production[r].tool,
                })
            }
            // productionTable.pop()
        }else{
            productionTable.push({
                time: '--',
                parts: 0
            })
        }
        this.setState({ isLoading: false, isRefreshing: false })
        this.setState({ productionTable })
    }

    _onRefresh() {
        tracker.trackEvent('user-actions', 'pull-to-refresh-HourByHour')
        this.setState({ isRefreshing: true })
        this.getTableData()
    }

    componentWillReceiveProps(nextProps) {
        if (this._mounted == true) {
            if (nextProps.canReload == true) {
                this.getTableData()
            }
        }
    }

    render() {
        const rowSize = [1.2, 1, 1]
        const { mainContainer, mainText, secondaryText, rowLabel, rowText, modalContainer, header } = styles

        let acum = 0
        const rows = this.state.productionTable.map(function (rowinfo) {
            return (
                <SensaiRow sizes={rowSize} divider customStyle={{ marginTop: 10, marginBottom: 10 }} key={rowinfo.time}>
                    <Text style={rowLabel}>{rowinfo.time}</Text>
                    <Text style={rowText}>{rowinfo.parts}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={rowText}>{(acum = acum + rowinfo.parts)}</Text>
                    </View>
                    <Text style={rowText}>{rowinfo.tool}</Text>
                </SensaiRow>
            )
        })

        return (
            <View style={mainContainer}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                {
                    (this.state.isLoading) ?
                        <Spinner />
                        :
                        <View>
                            <View style={modalContainer}>
                                <Text style={mainText}>
                                    {upperCase(I18n.t('home_production_tableTitle'))}
                                </Text>
                                <Text style={secondaryText}>{(this.state.isLoading)?null:this.props.range}</Text>
                            </View>
                            <NavButtons
                                back = {this._navigationProdL.bind(this)}
                                today = {this.getTableData.bind(this)}
                                next = {this._navigationProd.bind(this)}
                                validate = {moment(this.props.toDate) > moment()}
                            />
                            {!this.props.tool?null:
                                <View style={[modalContainer, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                                    <Text style={{
                                        fontFamily: "Montserrat",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: colors.darkGreyBlue,
                                        alignSelf: 'center'
                                    }}>{this.props.tool}</Text>
                                    <View style={{ justifyContent: 'center' }}>
                                        <SensaiButton
                                            xs
                                            text={'Ver Más'}
                                            onPress={() => {
                                                navigate('ToolListModal', {
                                                    name: this.props.tool,
                                                    speed: 0
                                                })
                                            }}
                                        />
                                    </View>
                                </View>
                            }
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
                                            {upperCase(I18n.t('home_production_acumTableTitle'))}
                                        </Text>
                                        <Text style={header}>
                                            {upperCase(I18n.t('home_production_toolTableTitle'))}
                                        </Text>
                                    </SensaiRow>
                                    {rows}
                                </View>
                            </SensaiCard>
                            <SensaiButton
                                text={'Reporte'}
                                onPress={()=> navigate('DailyReport', {
                                    production: this.props.params,
                                })}
                            />
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    modalContainer: {
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
    header: {
        fontFamily: 'Gotham Rounded',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.coolGrey,
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
})

function mapStateToProps(state) {
    let fromDate = state.userMachine.production.fromDate
    let toDate = state.userMachine.production.toDate
    if(fromDate && toDate){
        fromDate = moment(fromDate).add(-1, 'day').format('YYYY-MM-DD')
        toDate = moment(toDate).format('YYYY-MM-DD')
    }
    return {
        fromDate: fromDate,
        toDate: toDate,
        params: state.userMachine.production,
        range: state.userMachine.production.range,
        production: state.userMachine.production.data,
        canReload: state.userMachine.reloadProduction,
        tool: state.userMachine.currentTool,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProduction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductionTab)