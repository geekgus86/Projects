import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BackHandler, View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { FailureHeader, SensaiButton, Spinner, SensaiCard, CardDivider, CardFooter, SensaiRow, CardLabel, CardHeader } from '../../components'
import { tracker, upperCase, guid } from '../../helpers'
import { colors, theme } from '../../styles/theme'

import moment from 'moment-timezone'
import 'moment/locale/es'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '../../i18n/i18n'

import { fetchToolsProduction } from '../toolList/actions'
import { fetchDailyReport, clearDowntimes, fetchDowntime } from './actions'
import { groupByToolName, getDateRange } from '../toolList/reducers'

let downtime = 0
let changeover = 0
class DailyReport extends Component{
    state = {
        isLoading: false,
        list: [],
        downtimeValues: [],
        downtime: 0,
        changeover: 0,
        showDetail: false,
    }
    _mounted = false
    _shift = true

    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this._onRefresh = this._onRefresh.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
    }

    componentWillMount() {
        this._onRefresh()
    }

    componentDidMount() {
        this._mounted == true
        this.props.fetchDowntime(this.params.production.fromDate, this.params.production.toDate).then(()=>{
            if (this.props.downtime !== null) {
                let downtimeValues = []
                for (let value of this.props.downtime) {
                    downtimeValues.push(value)
                }
                this.setState({ downtimeValues })
            }
        })
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }

    componentWillUnmount() {
        this._mounted = false
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    }

    handleBackButton() {
        this.props.navigation.goBack()
        return true
    }

    _onRefresh() {
        this.setState({ isLoading:true, list:[] })
        downtime = 0
        changeover = 0
        this.props.fetchDailyReport(this.params.production.fromDate).then(() => {
            this.props.list.map(function(item){
                downtime+= item.downtime*1
                changeover+= item.changeover*1
            })
            this.setState({ 
                isLoading: false,
                list: this.props.list.reverse(),
                downtime: downtime,
                changeover: changeover
            })
        })
    }

    _renderItem({item}) {
        const { rowtext, rowtextL, row, rowView, buttonHolder } = styles
        let OA = Math.round((item.piezas/item.golpes_total)*100)
        return <View>
            <Text style={[styles.mainTitle, { marginLeft: 10,}]}>
                {moment(item.inicio).utc().format('hh:mm A')+' - '+
                (item.fin ? moment(item.fin).utc().format('hh:mm A') : I18n.t('actual_tool'))}
            </Text>
            <SensaiCard padding={[10, 10, 10, 0]}>
                <Text>{upperCase(I18n.t('tool'))}</Text>
                <Text>{(item.code)?item.code:'--'}</Text>
                {this._shift?
                    <View style={buttonHolder}>
                        <SensaiButton
                            xs
                            text={I18n.t('edit')}
                            onPress={() => {
                                this.props.clearDowntimes()
                                if(!item.fin){
                                    this.props.navigation.navigate('ToolChangeOver', {data: item, returnFunction: this._onRefresh.bind(this) })
                                }else{
                                    this.props.navigation.navigate('ToolReport', {data: item, returnFunction: this._onRefresh.bind(this) })
                                }
                            }}
                        />
                    </View>:null
                }
                <CardDivider />
                <View style={row}>
                    <View style={rowView}>
                        <Text style={rowtext}>{`${I18n.t('real_speed')}:`}</Text>
                        <Text style={rowtextL}>{item.velocidad+' ' + I18n.t('gpm')}</Text>
                    </View>
                    <View style={rowView}>
                        <Text style={rowtext}>{`${I18n.t('real_strikes')}:`}</Text>
                        <Text style={rowtextL}>{item.golpes_total}</Text>
                    </View>
                </View>
                <View style={row}>
                    <View style={rowView}>
                        <Text style={rowtext}>{`${I18n.t('change_over')}:`}</Text>
                        <Text style={rowtextL}>{`${item.changeover} ${I18n.t('minutes_dim')}`}</Text>
                    </View>
                    <View style={rowView}>
                        <Text style={rowtext}>{`${I18n.t('downtime')}:`}</Text>
                        <Text style={rowtextL}>{`${item.downtime} ${I18n.t('minutes_dim')}`}</Text>
                    </View>
                </View>
                <View style={row}>
                    <View style={rowView}>
                        <Text style={rowtext}>{`${I18n.t('oa_pr')}:`}</Text>
                        <CardLabel
                            title={''}
                            value={(OA?OA:0)}
                            threshold={99}
                            unit={'%'}
                            margin
                        />
                    </View>
                    <View style={rowView}>
                        <Text style={rowtextL}>{`${I18n.t('total_pieces')}:`}</Text>
                        <Text style={rowtext}>{item.piezas}</Text>
                    </View>
                </View>
            </SensaiCard>
        </View>
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }
        
    render() {
        const { modalContainer, mainText, secondaryText, rowtext, rowtextL, row, rowView, rowLabel, rowMargin } = styles
        let report = null
        let level = null

        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }

        let downtimeTable = null

        if (this.state.downtimeValues.length !== 0) {
            downtimeTable = this.state.downtimeValues.map((rowInfo, i) => {
                let showDivider = (i == this.state.downtimeValues.length - 1) ? false : true
                let dot = null
                if (!rowInfo.color) {
                    dot = (
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginRight: 5,
                            backgroundColor: colors.darkGreyBlue,
                            borderColor: colors.darkGreyBlue,
                            borderWidth: 1,
                        }}></View>
                    )
                } else {
                    let borderColor = (rowInfo.color.toUpperCase() === '#FFFFFF') ? colors.coolGrey : rowInfo.color
                    dot = (
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginRight: 5,
                            backgroundColor: rowInfo.color,
                            borderColor: borderColor,
                            borderWidth: 1,
                        }}></View>
                    )
                }
                return (
                    <SensaiRow divider={showDivider} customStyle={rowMargin} sizes={[2, 1, 0.8]} key={i}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                            {dot}
                            <Text style={rowLabel}>{rowInfo.title}</Text>
                        </View>                        
                        <Text style={rowtext}>{`${rowInfo.setup} ${I18n.t('minutes_dim')}`}</Text>
                        <Text style={rowtext}>{`${rowInfo.downtime} ${I18n.t('minutes_dim')}`}</Text>
                    </SensaiRow>
                )
            })
        } else {
            downtimeTable = (
                <SensaiRow divider margin sizes={[2, 1, 0.8]}>
                    <Text style={rowLabel}>{I18n.t('home_performance_noInformation')}</Text>
                    <Text style={rowtext}>{'--'}</Text>
                    <Text style={rowtext}>{'--'}</Text>
                </SensaiRow>
            )
        }

        let header = (
            <SensaiCard padding={[10, 10, 10, 0]}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={rowtext}>{`${I18n.t('changeover_total_day')}:`}</Text>
                    <CardLabel
                        title={`${this.state.changeover} ${I18n.t('minutes_dim')}`}
                        value={this.state.changeover}
                        threshold={100}
                        unit={''}
                        hideValue
                        margin
                    />
                </View>
                <CardDivider />

                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={rowtext}>{`${I18n.t('downtime_total_day')}:`}</Text>
                    <CardLabel
                        title={`${this.state.downtime} ${I18n.t('minutes_dim')}`}
                        value={this.state.downtime}
                        threshold={100}
                        unit={''}
                        hideValue
                        margin
                    />
                </View>
                <CardDivider />
                {this.state.showDetail?
                    <View>
                        <SensaiRow sizes={[2, 1, 0.8]}>
                            <CardHeader title={I18n.t('downtime')} />
                            <CardHeader title={I18n.t('objective')} />
                            <CardHeader title={I18n.t('real')} />
                        </SensaiRow>
                        {downtimeTable}
                        <CardDivider />
                        <CardFooter 
                            icon={'arrow-up'}
                            onPress={() => this.setState({ showDetail: false })}
                        />
                    </View>
                    :
                    <CardFooter 
                        icon={'arrow-down'}
                        onPress={() => this.setState({ showDetail: true })}
                    />
                }
            </SensaiCard>
        )
        //Validate edit button by 48 hours
        let validate = moment(this.params.production.fromDate) > moment().add(-48, 'hours')
        this._shift = validate

        return (
            <View style={{ flex:1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                    enableBack={true}
                />
                
                <View style={modalContainer}>
                    <View>
                        <Text style={mainText}>
                            {upperCase(I18n.t('daily_production_report'))}
                        </Text>
                        <Text style={secondaryText}>
                            {this.params.production.range}
                        </Text>
                    </View>
                </View>

                <FlatList
                    data={this.state.list}
                    shouldItemUpdate={(props, nextProps) => {
                        return props.item !== nextProps.item
                    }}
                    ListHeaderComponent={header}
                    getItemLayout={this._getItemLayout.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={item => {
                        return guid()
                    }}
                    removeClippedSubviews
                    disableVirtualization
                    initialNumToRender={4}
                    refreshing={this.state.isLoading}
                    onRefresh={this._onRefresh}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        downtime: state.tools.downtime,
        currentMachine: state.userMachine.machine,
        currentReport: state.userMachine.report,
        currentFailure: state.userMachine.inFailureMode,
        currentEscalation: state.userMachine.escalation,
        list: state.tools.dailyReport,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchToolsProduction, fetchDailyReport, clearDowntimes, fetchDowntime }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyReport)

const styles = StyleSheet.create({
    mainContainer:{
        marginLeft: 10,
        marginRight: 10,
    },
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 5,
        padding: 10,
    },
    mainTitle:{
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.azure
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
    rowtext: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: -0.39,
        color: 'black'
    },
    rowtextL: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontStyle: "normal",
        letterSpacing: -0.39,
        color: 'black'
    },
    row: {
        flex:1,
        marginTop: 5,
        marginBottom: 5,
        flexDirection:'row',
        alignItems: 'center'
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '50%',
    },
    buttonHolder: {
        width: 80,
        height: 35,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    rowLabel: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.darkGreyBlue,
        justifyContent: 'center',
    },
    rowMargin: {
        marginTop: 10,
        marginBottom: 10,
    },
})