import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, TouchableWithoutFeedback } from 'react-native'
import I18n from '../../i18n/i18n'
import { upperCase, tracker, navigate } from '../../helpers'
import { subscribeTo, unsubscribe } from '../../lib/Socket'

import { colors, theme } from '../../styles/theme'
import { SensaiButton, SensaiCard, SensaiRow, BarChart, Spinner, CardHeader, CardDivider, CardLabel, CurrentToolCard, LabelWithIndicator, CardFooter, StrokesCard, ProgressCard } from '../../components'

import { checkOut, fetchCurrentPeriodDowntime, fetchToolSpeed, setCurrentTool } from './actions'
import moment from 'moment-timezone'
import 'moment/locale/es'

class PerformanceTab extends Component {
    state = {
        isLoading: false,
        loadingGraph: true,
        isRefreshing: false,
        downtimeValues: [],
        dieName: '',
        strokeRate: 0,
        objectiveStrokes: 0,
        oa: 0,
        spmTool: 0,
        currentSpm: 0
    }
    _mounted = false
    timePeriod = ''
    lastTimePeriod = ''
    oldTool = ''

    constructor(props) {
        super(props)
        this.updateTimePeriod = this.updateTimePeriod.bind(this)
        this._onRefresh = this._onRefresh.bind(this)

        this.setPartsByHour = this.setPartsByHour.bind(this)
        subscribeTo('partsByHour', this.setPartsByHour)

        this.setProdValues = this.setProdValues.bind(this)
        subscribeTo('prodtrack', this.setProdValues)
    }

    setPartsByHour(data) {
        if (this._mounted === true) {
            let minutes = moment().minutes() == 0 ? 1 : moment().minutes()
            let currentTool = this.state.dieName.split(' ')[0]
            if (this.oldTool !== currentTool) {
                this.oldTool = currentTool
                this.props.setCurrentTool(currentTool)
                this.props.fetchToolSpeed(this.oldTool).then(() => {
                    this.setState({ loadingGraph: false })
                    const spm = this.props.toolSpeed
                    this.setState({ spmTool: spm, objectiveStrokes: spm * minutes })
                    if (this.state.objectiveStrokes !== 0) {
                        this.setState({ oa: parseInt((this.state.strokeRate / this.state.objectiveStrokes) * 100) })
                    }
                })
            } else {
                this.setState({ objectiveStrokes: this.state.spmTool * minutes });
                if (this.state.objectiveStrokes !== 0) {
                    this.setState({ oa: parseInt((this.state.strokeRate / this.state.objectiveStrokes) * 100) })
                }
            }
        }
    }

    setProdValues(prodData) {
        if (this._mounted === true) {
            // console.log(prodData);
            this.setState({ strokeRate: prodData.parts, dieName: prodData.DieName, currentSpm: (prodData.CurrentStrokeRate / 10) })
            this.setPartsByHour(true)
        }
    }

    updateTimePeriod() {
        if (this._mounted) {
            let from = moment().format('hA')
            let to = moment().add(1, 'hours').format('hA')
            let past = moment().subtract(1, 'hours').format('hA')
            this.timePeriod = `${from} - ${to}`
            this.lastTimePeriod = `${past} - ${from}`
        }
    }

    _getCurrentPeriodDowntime() {
        let from = moment().format('YYYY-MM-DD HH:00:00')
        let last = moment().add(1, 'hours').format('YYYY-MM-DD HH:00:00')
        this.props.fetchCurrentPeriodDowntime(from, last).then(() => {
            if (this._mounted === true) {
                this.setState({ isRefreshing: false })
            }
        })
    }

    componentDidMount() {
        this._mounted = true
        this.updateTimePeriod()
        this._getCurrentPeriodDowntime()
        this.timer = setInterval(this.updateTimePeriod, 60000)
        tracker.trackScreenView('HomeKPI')
    }

    componentWillUnmount() {
        this._mounted = false
        unsubscribe('partsByHour')
        unsubscribe('prodtrack')
    }

    componentWillReceiveProps(nextProps) {
        if (this._mounted === true) {
            if (this.props.downtime !== null) {
                let downtimeValues = []
                for (let value of this.props.downtime) {
                    downtimeValues.push(value)
                }
                this.setState({ isRefreshing: false })
                this.setState({ downtimeValues })
            }

            this.setState({ loadingGraph: false })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextState.strokeRate !== this.state.strokeRate ||
            nextState.dieName !== this.state.dieName ||
            nextState.isLoading !== this.state.isLoading ||
            nextState.downtimeValues !== this.state.downtimeValues ||
            nextState.isRefreshing !== this.state.isRefreshing ||
            nextState.loadingGraph !== this.state.loadingGraph ||
            nextState.objectiveStrokes !== this.state.objectiveStrokes ||
            nextState.oa !== this.state.oa ||
            nextProps.toolSpeed !== this.props.toolSpeed ||
            nextState.currentSpm !== this.state.currentSpm
        ) {
            return true;
        } else {
            return false;
        }
    }

    _onRefresh() {
        tracker.trackEvent('user-actions', 'pull-to-refresh-HomeKPI')
        this.setState({ isRefreshing: true })
        this._getCurrentPeriodDowntime()
    }

    onCheckout() {
        this.setState({ isLoading:true })
        tracker.trackEvent('user-actions', 'checkout')
        this.props.checkOut()
    }

    render() {
        const { mainContainer, header, text, rowText, rowLabel, rowMargin, buttonMargin, strokesGraphContainer, subText, subText2 } = styles

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
                        <Text style={rowText}>{rowInfo.setup + ' ' + I18n.t('minutes_dim')}</Text>
                        <Text style={rowText}>{rowInfo.downtime + ' ' + I18n.t('minutes_dim')}</Text>
                    </SensaiRow>
                )
            })
        } else {
            downtimeTable = (
                <SensaiRow divider margin sizes={[2, 1, 0.8]}>
                    <Text style={rowLabel}>{I18n.t('home_performance_noInformation')}</Text>
                    <Text style={rowText}>{'--'}</Text>
                    <Text style={rowText}>{'--'}</Text>
                </SensaiRow>
            )
        }

        return (
            <View style={mainContainer}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <CurrentToolCard
                        name={this.state.dieName}
                        designSpeed={this.props.toolSpeed}
                        currentSpeed={this.state.currentSpm}
                        buttonText={I18n.t('see_more')}
                        onButtonPress={() => {
                            navigate('ToolListModal', {
                                name: this.state.dieName,
                                speed: this.state.currentSpm
                            })
                        }}
                        onSecondButtonPress={() => {
                            navigate('ProcessParameter', {})
                        }}
                    />

                    {/*<ProgressCard 
                        start={this.state.strokeRate} 
                        end={this.state.objectiveStrokes} 
                    />*/}

                    <StrokesCard 
                        loading={this.state.loadingGraph} 
                        objective={this.state.objectiveStrokes}
                        real={this.state.strokeRate}
                        oa={this.state.oa}
                        timePeriod={this.timePeriod}
                        onGotoPress={() => {
                            this.props.navigation.navigate('Production')
                        }}
                    />

                    <SensaiCard padding={[10, 10, 10, 0]}>
                        <SensaiRow sizes={[2, 1, 0.8]}>
                            <CardHeader title={ I18n.t('downtime') + ' ' + this.timePeriod} />
                            <CardHeader title={I18n.t('objective')} />
                            <CardHeader title={I18n.t('real')} />
                        </SensaiRow>
                        {downtimeTable}
                        <CardDivider />

                        <CardFooter 
                            text={I18n.t('go_downtime_shift')} 
                            onPress={() => this.props.navigation.navigate('CurrentShiftLog')} />

                    </SensaiCard>

                    <SensaiButton
                        text={I18n.t('home_performance_checkoutButton')}
                        buttonStyle={buttonMargin}
                        loading={this.state.isLoading}
                        onPress={this.onCheckout.bind(this)} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily: 'Open Sans',
        fontSize: 13,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        marginLeft: 10,
        marginTop: 15,
    },
    header: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.coolGrey,
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
    rowText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: '#243746',
    },
    rowMargin: {
        marginTop: 10,
        marginBottom: 10,
    },
    buttonMargin: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    strokesGraphContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    subText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        marginTop: 5
    },
    subText2: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: '#243746',
        marginTop: 5
    },
})

function mapStateToProps(state) {
    return {
        downtime: state.userMachine.downtime,
        toolSpeed: state.userMachine.toolSpeed,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ checkOut, fetchCurrentPeriodDowntime, fetchToolSpeed, setCurrentTool }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceTab)