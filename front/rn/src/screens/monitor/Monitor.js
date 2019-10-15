import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native'
import I18n from '../../i18n/i18n'
import { upperCase, tracker, navigate } from '../../helpers'
import { subscribeTo, unsubscribe } from '../../lib/Socket'
import { fetchProduction } from '../home/actions'

import { colors, theme } from '../../styles/theme'
import { SensaiButton, SensaiCard, SensaiRow, BarChart, Spinner, ChangeOverCard, FailureHeader, CurrentToolCard, LabelWithIndicator, CardFooter, StrokesCard, ProgressCard } from '../../components'

import moment from 'moment-timezone'
import 'moment/locale/es'

class Monitor extends Component {
    state = {
        isLoading: true,
        loadingGraph: true,
        isRefreshing: true,
        tool: false,
        currentSpm: 0,
        BoxingPartCounter: 0,
        planeada: 0,
        objective: 0,
        objective_pr: 0,
        nextTool: false,
        oa: 0,
        oa_pr: 0,
        nextCO: '',
        countdown: '',
    }
    _mounted = false
    oldTool = ''

    constructor(props) {
        super(props)
        this._onRefresh = this._onRefresh.bind(this)
        this.setProdValues = this.setProdValues.bind(this)
        this.setPartsByHour = this.setPartsByHour.bind(this)
    }

    setPartsByHour(data) {
        if (this.props.production.length !== 0) {
            if(!data.acum || isNaN(data.acum)){
                data.acum = 0
            }
            if(!data.parts || isNaN(data.parts)){
                data.parts = 0
            }
            let acumulado_r = 0
            let acumulado_p = 0
            for (r=0;r < this.props.production.length;r++){
                const value = this.props.production[r]
                if(this.props.production[r+1]){
                    acumulado_r+=value.piezas || 0
                    acumulado_p+=value.piezas_p || 0
                }
            }
            let oa = (acumulado_r+data.parts) / (acumulado_p+data.acum)  * 100
            //EasyRemind #38446
            if(isNaN(oa) || oa ===  Infinity){
                oa = 0
            }
            //EasyRemind #38446
            oa = oa > 100 ? 100 : oa;
            this.setState({ 
                currentSpm: data.spm,
                oa_pr: Math.round(oa) 
            })
        }
    }

    setProdValues(prodData) {
        if (this._mounted === true) {

            console.log(prodData)

            this.setState({ 
                tool: prodData.tool,
                //currentSpm: prodData.currentSpm,
                BoxingPartCounter: prodData.BoxingPartCounter,
                planeada: prodData.planeada,
                objective: prodData.objective,
                objective_pr: prodData.objective_pr,
                nextTool: prodData.nextTool,
                oa: (prodData.oa) ? Math.round(prodData.oa) : 0,
                //oa_pr: (prodData.oa_pr) ? Math.round(prodData.oa_pr) : 0,
                nextCO: prodData.nextCO,
            }) 
        }
    }

    _onRefresh(){
        if(this._mounted===true){
            this.setState({ isRefreshing: true, isLoading: true, loadingGraph: true })
            this.props.fetchProduction().then(() => {
                this.setState({ isRefreshing: false, isLoading: false, loadingGraph: false })
            })
        }
    }

    componentDidMount() {
        this._mounted = true
        tracker.trackScreenView('Home Monitor')
        this._onRefresh()
        subscribeTo('partsByHour', this.setPartsByHour)
        subscribeTo('andon', this.setProdValues)
        subscribeTo('hxhproduction-created', this._onRefresh)
        subscribeTo('objective-prod', this._onRefresh)
    }

    componentWillUnmount() {
        this._mounted = false
        unsubscribe('objective-prod')
        unsubscribe('andon')
        unsubscribe('partsByHour')
        unsubscribe('hxhproduction-created')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.currentFailure !== false) {
            this.forceUpdate()
        }
        if (
            nextState.isLoading !== this.state.isLoading  ||
            nextState.isRefreshing !== this.state.isRefreshing  ||
            nextState.loadingGraph !== this.state.loadingGraph  ||
            nextState.tool !== this.state.tool ||
            nextState.currentSpm !== this.state.currentSpm ||
            nextState.BoxingPartCounter !== this.state.BoxingPartCounter ||
            nextState.planeada !== this.state.planeada ||
            nextState.objective !== this.state.objective ||
            nextState.objective_pr !== this.state.objective_pr ||
            nextState.nextTool !== this.state.nextTool ||
            nextState.oa !== this.state.oa ||
            nextState.oa_pr !== this.state.oa_pr ||
            nextState.nextCO !== this.state.nextCO ||
            nextProps.currentFailure !== this.props.currentFailure
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { mainContainer, listHeader, mainText, header, text, rowText, rowLabel, rowMargin, strokesGraphContainer, subText, subText2 } = styles
        
        let report = null
        let level = null
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }
        const now = new Date().getTime();
        const diff = new Date(moment().add(this.state.nextCO, "m").format()).getTime() - now;
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        hours = (hours < 0) ? 0 : hours;
        minutes = (minutes < 0) ? 0 : minutes;
        seconds = (seconds < 0) ? 0 : seconds;

        const hours2digits = (hours < 10) ? `0${hours}` : hours;
        const mins2digits = (minutes < 10) ? `0${minutes}` : minutes;
        const secs2digits = (seconds < 10) ? `0${seconds}` : seconds;
        const countdown = `${hours2digits}:${mins2digits}:${secs2digits} ${I18n.t('hours')}`;
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
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <View style={listHeader}>
                        <Text style={mainText}>{upperCase(I18n.t('real_time_monitor'))}</Text>
                    </View>
                    {this.state.tool?
                    <CurrentToolCard
                        name={this.state.tool.nameTool}
                        designSpeed={this.state.tool.designSpeed}
                        currentSpeed={this.state.currentSpm}
                        strokeRate={this.state.BoxingPartCounter}
                        objectiveStrokes={this.state.planeada || 6000}
                    />:null}

                    {this.state.objective?
                    <StrokesCard 
                        title={I18n.t('eficience_actual_tool')}
                        loading={this.state.loadingGraph} 
                        objective={this.state.objective}
                        real={Math.round(this.state.oa)}
                        unit={'%'}
                    />:null}
                    {this.state.objective_pr?
                    <StrokesCard 
                        title={I18n.t('eficience_press')}
                        loading={this.state.loadingGraph} 
                        objective={this.state.objective_pr}
                        real={this.state.oa_pr}
                        unit={'%'}
                    />:null}
                    {!this.state.isLoading?
                        <ChangeOverCard
                            changeover={countdown || `00:00:00 ${I18n.t('hours')}`}
                            tool={this.state.nextTool}
                        />:null}
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
    
    listHeader: {
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
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        toolSpeed: state.userMachine.toolSpeed,
        prepared: state.production.prepared,
        production: state.userMachine.production.data || [],
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProduction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)