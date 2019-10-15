import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, View, Text, FlatList, Vibration, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, LogCard, FailureHeader, Spinner, CommentBox, NavButtons, AccumulatedComp, CollapList } from '../../components'
import { fetchLastShiftLog, deleteLog, updateLog } from './actions'
import { getChecklistAnswers } from '../checklist/actions'
import { clearSession } from '../profile/actions'

import { 
    fetchCurrentPeriodDowntime,
    fetchCurrentFailure, 
    setCurrentFailure,
    setCurrentReport,
    setCurrentEscalation,
    clearCurrentFailure,
    reloadProduction,
    reloadShift } from '../home/actions'

import { guid, tracker, upperCase } from '../../helpers'
import { subscribeTo, unsubscribe } from '../../lib/Socket'
import PushNotification from 'react-native-push-notification'

import moment from 'moment-timezone'
import 'moment/locale/es'

class LastShiftLog extends Component {
    state = {
        isLoading: true,
        isRefreshing: false,
        shiftTitle: '',
        showBox: false,
        commentText: '',
        nav: null,
        item: null,
        downtimeValues: []
    }
    _mounted = false
    _shift = true

    constructor(props) {
        super(props)
        this._onRefresh = this._onRefresh.bind(this)
        this.reportCreated = this.reportCreated.bind(this)
        this.reportClosed = this.reportClosed.bind(this)
        this.reportIssue = this.reportIssue.bind(this)
        this.onEscalation = this.onEscalation.bind(this)
        this.onEscalationStop = this.onEscalationStop.bind(this)
        this.openFailureModal = this.openFailureModal.bind(this)
        this.periodDowntimes = this.periodDowntimes.bind(this)
    }

    reportCreated(data) {
        if (this._mounted === true) {
            this.props.setCurrentReport(data)
        }
    }

    reportClosed(data) {
        if (this._mounted === true) {
            this.props.clearCurrentFailure()
        }
    }

    reportIssue(data) {
        /*Asignar si la falla es la falla actual*/
        if (this._mounted === true && this.props.currentReport) {
            if( data.ID == (this.props.currentReport.report || this.props.currentReport.id) ){
                this.props.fetchCurrentFailure()
            }
        }
    }
    
    onEscalation(data) {
        if (this._mounted === true) {
            /*Vibration.vibrate(1000)
            PushNotification.localNotification({
                title: 'Paro',
                message: `Se ha escalado el paro a ${data.label}.`
                //message: `Se ha escalado el paro.`
            })*/
            this.props.fetchCurrentFailure().then(()=>{
                this.props.setCurrentEscalation(data)
                let report = this.props.currentReport
                //if this.props.profile.aro.id == 3 'Team member user'
                if(data.level==2 && !report.issue && this.props.profile.aro.id==3){
                    Alert.alert(
                        I18n.t('identify_stop'),
                        I18n.t('detected_stop'),
                        [
                            {text: I18n.t('identify_stop'), onPress: () => {
                                if(!report.report){
                                    report.report = report.id
                                }
                                report.issue = null
                                report.desc = null
                                this.props.navigation.navigate('IdentifyFailureModal', { failure: report, report_type: report.report_type, returnFunction: this.getLastShiftLog.bind(this), actualReport: true  })                        
                            }},
                            {text: I18n.t('ok'), style: 'cancel'},
                        ],
                        { cancelable: false }
                    )
                }
            })
        }
    }

    onEscalationStop(data) {
        if (this._mounted === true) {
            //this.props.clearCurrentFailure()
        }
    }

    openFailureModal() {
        this.props.navigation.navigate('NewReportModal')
    }

    componentDidMount() {
        this._mounted = true
        subscribeTo('report-created', this.reportCreated)
        subscribeTo('report-closed', this.reportClosed)
        subscribeTo('report-issueIdentified', this.reportIssue)
        subscribeTo('report-typeChanged', this.reportIssue)
        subscribeTo('escalationStart', this.onEscalation)
        subscribeTo('escalationStop', this.onEscalationStop)
        subscribeTo('userLogin', (data)=>{
            this._mounted = false
            const name = data.Profile.name
            if(data.Profile.group == '1'){return;}
            if(data.Profile.id == this.props.profile.id){
                this.props.clearSession().then(()=>{
                    alert(I18n.t('another_session_active'))
                })
            }
        })

        tracker.setUser(this.props.currentUserName)
        tracker.createNewSession(`${new Date().getTime()}-${this.props.currentUserId}`)
        tracker.trackScreenView('LastShiftLog')
        this.props.fetchCurrentFailure()
        this.setState({ isLoading: true })
        this.getLastShiftLog()
    }

    getLastShiftLog() {
        if (this.props.currentMachine !== null) {
            let start = moment('06:00:00', 'hh:mm:ss')
            let end = moment('06:00:00', 'hh:mm:ss')

            const diff = moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds')
            let from = null
            let to = null

            if (moment().isBetween(moment('00:00:00', 'hh:mm:ss'), moment('06:00:00', 'hh:mm:ss'))) {
                from = moment().subtract(2, 'days').format('D MMM')
                to = moment().subtract(1, 'days').format('D MMM')
            } else {
                from = moment().subtract(1, 'days').format('D MMM')
                to = moment().format('D MMM')
            }
            
            this.setState({ shiftTitle: `${from} ${start.format('hA')} - ${to} ${end.format('hA')}` })
            this.setState({ isLoading: true })
            this.props.fetchLastShiftLog(this.props.currentMachine.id, 'last').then(() => {
                this.periodDowntimes()
                if(this._mounted){
                    if(this.props.currentMachine.name.includes('apo')){
                        this.setState({
                            nav: moment(this.props.toDate).add(-12, 'hours').format('YYYY-MM-DD HH:mm:ss')
                        })
                    }else{
                        this.setState({
                            nav: moment(this.props.toDate).add(-0, 'hours').format('YYYY-MM-DD HH:mm:ss')
                        })
                    }
                    let params = {
                        machine: this.props.currentMachine.id,
                        shift: this.props.toDate,
                        answersSaved: this.props.answersSaved,
                    }
                    this.props.getChecklistAnswers(params).then(()=>{
                        this.setState({ 
                            isLoading: false, 
                            isRefreshing: false,
                        })
                    })
                }
            })
        }
    }

    periodDowntimes(){
        //Get accumulated downtimes in navigation change
        const fromDate = moment(this.props.toDate).add(-11, 'hours').format('YYYY-MM-DD HH:mm:ss')
        this.setState({ downtimeValues: [] })
        this.props.fetchCurrentPeriodDowntime(fromDate, this.props.toDate).then(() => {
            if (this.props.downtime !== null) {
                let downtimeValues = []
                for (let value of this.props.downtime) {
                    let timeDownReal = value.downtime !== 0 ? value.downtime.toFixed(2) : 0
                    value.downtime = timeDownReal
                    downtimeValues.push(value)
                }
                this.setState({ downtimeValues })
            }
        })
    }

    componentWillUnmount() {
        this._mounted = false
        unsubscribe('report-created')
        unsubscribe('report-closed')
        unsubscribe('report-issueIdentified')
        unsubscribe('report-typeChanged')
        unsubscribe('escalationStart')
        unsubscribe('escalationStop')
        unsubscribe('userLogin')
    }

    _renderItem({ item }) {
        //validators for edit and delete
        /*if (item.type === 'oa-comment') {
            return <LogCard item={item} returnFunction={this._onRefresh.bind(this)}
            showButton={this._shift}/>
        }else */if(item.type === 'Shift-Comment'){
            return <LogCard item={item} selectedItem={this.state.item} returnFunction={this._commentOptions.bind(this)} 
            showButton={false/*this.props.user.id==item.id_user&&this._shift*/}/>
        }
        return null
    }

    _renderDowntimes(data) {
        let grouped = []
        let dataValue = []
        let fin = false
        data = data.filter((item)=>{return (item.type === 'Report-Closed' || item.report_statusID === 19 || item.type=='changeover-open' || item.type == 'microparo' || item.type == 'unidentified-dt' || item.type == 'unidentified-co-dt')})
        //data.sort((a, b) => b.report - a.report);
        data.sort((a, b) => b.open_minutes - a.open_minutes);
        if (data.length != 0) {
            /*for (let i = 0; i < data.length; i++) {
                let record = data[i]
                let next = data[i + 1]
                if(!fin){
                    fin = record.reportCreatedAt
                }
                dataValue.push(record)
                if (next) {
                    if (record.tool_code != next.tool_code) {
                        grouped.push({ tool:record.tool_code, data: dataValue, fin: fin, inicio: record.reportCreatedAt })
                        fin = record.reportCreatedAt
                        dataValue = []
                    }
                } else { //Set last
                    grouped.push({ tool:record.tool_code, data: dataValue, fin: fin, inicio: record.reportCreatedAt })
                }
            }
            let grouped2 = []
            dataValue = []
            for (let i = 0; i < grouped.length; i++) {
                //grouped[i].data.sort((a, b) => b.report - a.report); // order by report : report.id
                for (let j = 0; j < grouped[i].data.length; j++) {
                    let record = grouped[i].data[j]
                    */
                    /*******************
                    Removing the following downtimes:
                    - Same tool_code, report but different type. If one of them is 'microparo' or 'unidentified-dt', it remains in the list.
                    
                    The following are the new Downtimes types added
                    - 'microparo'           : Sum of all microparos (micro-downtimes)  
                    - 'unidentified-dt'     : Sum of all 'Not Reported Regular Downtimes'
                    - 'unidentified-co-dt'  : Sum of all 'Not Reported Changeover Downtimes'
                    ********************/   
                    /*const last = (j+1) == grouped[i].data.length ? null : grouped[i].data[j+1]                  
                    if (last != null) {
                        if (record.tool_code == last.tool_code && record.report == last.report) {
                            if ((record.type == 'report-closed' && (last.type == 'microparo' || last.type == 'unidentified-dt')) || 
                                (last.type == 'report-closed' && (record.type == 'microparo' || record.type == 'unidentified-dt'))) {
                                dataValue.splice(!dataValue[0] ? 0 : dataValue[0].type == 'microparo' ? 1 : 0, 0, last.type == 'report-closed' ? record : last) // always dt 'microparo' at the 1st group (dataValue) place
                                j++;
                            }
                            else if ((last.type == 'changeover-open' && record.type == 'unidentified-co-dt') || (last.type == 'unidentified-co-dt' && record.type == 'changeover-open')) {
                                dataValue.splice(!dataValue[0] ? 0 : dataValue[0].type == 'microparo' ? 1 : 0, 0, record.type == 'unidentified-co-dt' ? record : last) // always dt 'microparo' at the 1st group (dataValue) place                                
                                j++;
                            } else {
                                dataValue.push(record)
                            }
                        } else {
                            dataValue.push(record)
                        }    
                    } else {
                        dataValue.push(record)
                    }
                }
                let dataValue2 = []
                for (let j = 0; j < dataValue.length; j++) {
                    let record = dataValue[j]
                    if (record.type == 'microparo' && record.data != null) {
                        dataValue2.splice(0, 0, dataValue[j])
                    } else if ((record.type == 'unidentified-co-dt' || record.type == 'unidentified-dt') && record.data != null) {
                        dataValue2.splice(dataValue[0].type == 'microparo' ? 1 : 0, 0, record)
                    } else if (record.type == 'report-closed' && (record.issue == 118 || record.issue == 119) && record.data == null) {

                    } else {
                        dataValue2.push(record)
                    }
                }
                dataValue.length = 0
                grouped2.push({ tool: grouped[i].tool, data: dataValue2.slice(), fin: grouped[i].fin, inicio: grouped[i].inicio })                
                dataValue2.length = 0
            }
            return <CollapList data={grouped2} returnFunction={this._onRefresh.bind(this)} showButton={this._shift&&(this.props.profile.aro.id==10||this.props.profile.aro.id==12)}/>
            */
           const top = data.splice(0, 5)
           return (
                <View>
                    <Text style={[styles.mainText, { textAlign: 'left', marginBottom: 10, marginTop: 10, marginLeft: 10 }]}>{upperCase(I18n.t('top_stops'))}</Text>
                    {top.map((value_v, i_v)=>{
                        return <LogCard item={value_v} returnFunction={this._onRefresh.bind(this)} showButton={false/*this._shift&&(this.props.profile.aro.id==10||this.props.profile.aro.id==12)*/} key={i_v} />
                    })}
                </View>
            )
        }
        return null
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }

    _onRefresh() {
        this.setState({ isRefreshing: true })
        this.getLastShiftLog()
    }
    //EasyRemind #29609
    _navigationLog() {
        this.setState({ isLoading: true })
        if(this.props.currentMachine.name.includes('apo')){
            this.props.fetchLastShiftLog(this.props.currentMachine.id, 'day', moment(this.state.nav).add(12, 'hours').format('YYYY-MM-DD HH')).then(() => {
                this.periodDowntimes()
                this.setState({ isLoading: false, isRefreshing: false, nav: moment(this.state.nav).add(12, 'hours') })
            })
        }else{
            this.props.fetchLastShiftLog(this.props.currentMachine.id, 'day', moment(this.state.nav).add(8, 'hours').format('YYYY-MM-DD HH')).then(() => {
                this.periodDowntimes()
                this.setState({ isLoading: false, isRefreshing: false, nav: moment(this.state.nav).add(8, 'hours') })
            })
        }
    }

    _navigationLogL() {
        this.setState({ isLoading: true })
        if(this.props.currentMachine.name.includes('apo')){
            this.props.fetchLastShiftLog(this.props.currentMachine.id, 'day', moment(this.state.nav).add(-12, 'hours').format('YYYY-MM-DD HH')).then(() => {
                this.periodDowntimes()
                this.setState({ isLoading: false, isRefreshing: false, nav: moment(this.state.nav).add(-12, 'hours'), })
            })
        }else{
            this.props.fetchLastShiftLog(this.props.currentMachine.id, 'day', moment(this.state.nav).add(-8, 'hours').format('YYYY-MM-DD HH')).then(() => {
                this.periodDowntimes()
                this.setState({ isLoading: false, isRefreshing: false, nav: moment(this.state.nav).add(-8, 'hours'), })
            })
        }
        //EasyRemind #29609
    }
    
    renderLoader(){
        return(
            <View style={{
                position: 'absolute',
                height:'100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 9999,
            }}>
                <Spinner />
            </View>
        );
    }

    _commentOptions(item, index){
        switch(index){
            case 0:
                //Editar
                this.setState({ showBox: false, commentText: '', item: null })
                data = JSON.parse(item.data)
                this.setState({ showBox: true, commentText: data.message, item: item })
                break;
            case 1:
                //Borrar
                Alert.alert(
                    I18n.t('delete_feedback_question'),
                    I18n.t('delete_feedback_confirm'),
                    [
                        {text: I18n.t('confirm'), onPress: () => {
                            this.setState({ isLoading: true })
                            this.props.deleteLog(item.id).then(()=>{
                                this._onRefresh();
                            })
                        }},
                        {text: I18n.t('cancel'), onPress: () => console.log('OK Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                )
                break;
            default:
                this.setState({ showBox: false, commentText: '', item: null })
                break;
        }
    }

    _updateLog(comment){
        let item = this.state.item
        this.setState({ isLoading: true })
        if(item){
            this.props.updateLog(item.id, comment).then(()=>{
                this.setState({ showBox: false, commentText: '', item: null })
                this._onRefresh()
            })
        }
    }

    render() {
        const { mainContainer, listHeader, mainText, secondaryText, itemList } = styles
        let report = null
        let level = null
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }

        let logEntries = null
        if (!this.state.isLoading) {
            let shift = moment(this.props.toDate).format('A')=='AM'?I18n.t('home_production_nightShiftName'):I18n.t('home_production_dayShiftName')
            logEntries = (
                <ScrollView style={{ flex: 1 }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <FlatList
                        data={this.props.items}
                        shouldItemUpdate={(props, nextProps) => {
                            return props.item !== nextProps.item
                        }}
                        getItemLayout={this._getItemLayout.bind(this)}
                        renderItem={this._renderItem.bind(this)}
                        keyExtractor={item => {
                            return guid()
                        }}
                        removeClippedSubviews
                        disableVirtualization
                        initialNumToRender={4}
                        ListHeaderComponent={()=>{
                            let header = null 
                            if(this.state.nav && !this.state.isLoading){
                                header =
                                <View style={{marginBottom: 5}}>
                                    <View style={listHeader}>
                                        <Text style={mainText}>{upperCase(I18n.t('previous_shift_log'))}</Text>
                                        <Text style={secondaryText}>{((this.state.isLoading) ? null : this.props.range) + ' / ' + shift}</Text>
                                    </View>
                                    <NavButtons
                                        back = {this._navigationLogL.bind(this)}
                                        today = {this.getLastShiftLog.bind(this)}
                                        next = {this._navigationLog.bind(this)}
                                        validate = {validate}
                                    />
                                </View>
                            }
                            return header
                        }}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />
                    {this._renderDowntimes(this.props.items)}
                    
                    <AccumulatedComp downtimeValues={this.state.downtimeValues} title={upperCase(I18n.t('previous_shift_quantity'))}/>
                </ScrollView>
            )
        }
        let button = (
            <SensaiButton
                text={I18n.t('checklist_navigate')}
                buttonStyle={{ margin: 10 }}
                onPress={() => this.props.navigation.navigate('ChecklistModal')}
                loading={this.state.isLoading}
            />
        )
        if (this.props.answersSaved === true) {
            button = null
        }
        let validate = null
        if(this.props.currentMachine.name.includes('apo')){
            validate = moment(this.props.toDate) > moment().add(-12, 'hours')
        }else{
            validate = moment(this.props.toDate) > moment().add(-8, 'hours')
        }
        this._shift = validate
        
        let content = <Spinner />

        if (this.props.currentMachine !== null) {
            content = (
                <View style={{ flex: 1 }}>
                {this.state.isLoading ?
                    this.renderLoader()
                    :
                    null
                }
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                />
                <View style={mainContainer}>
                    <View style={itemList}>
                        {logEntries}
                    </View>
                    {
                        (this.state.showBox&&!this.state.isLoading)?
                        <CommentBox commentText={this.state.commentText} 
                        placeholder = {I18n.t('edit_feedback')}
                        onSendPress = {this._updateLog.bind(this)} />
                        :
                        button
                    }
                </View>
            </View>
            )
        }

        return content
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
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
    secondaryText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    itemList: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        left: 14,
        bottom: 65,
        borderLeftWidth: 1,
        borderLeftColor: colors.azure,
    },
})

function mapStateToProps(state) {
    return {
        user: state.session.info,
        profile: state.session.profile,
        currentMachine: state.userMachine.machine,
        downtime: state.userMachine.downtime,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        currentUserId: state.session.info.id,
        currentUserName: state.session.info.name,
        range: state.lastShift.range,
        items: state.lastShift.lastShiftLog,
        toDate: state.lastShift.toDate,
        answersSaved: state.checklist.answersSaved
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchLastShiftLog, 
        fetchCurrentPeriodDowntime,
        getChecklistAnswers, 
        deleteLog, 
        updateLog,
        fetchCurrentFailure,
        setCurrentFailure,
        setCurrentReport,
        setCurrentEscalation,
        clearCurrentFailure,
        reloadProduction,
        reloadShift,
        clearSession
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LastShiftLog)