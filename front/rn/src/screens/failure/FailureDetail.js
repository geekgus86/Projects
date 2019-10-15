import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { FailureHeader, CommentBox, SensaiButton, Spinner } from "../../components";
import { colors } from '../../styles/theme'
import { tracker, upperCase, navigate } from "../../helpers";
import FailureCombatHeader from './components/FailureCombatHeader'
import { FailureCard } from './FailureCard'
import ParoRegisterCard from "./components/ParoRegisterCard";
import { asistenciaLog, manualEscalation, manualAssist, fetchComments, newComment, cleanComments, setReportData } from "./actions";
import IdentificationTimeCard from "./components/IdentificationTimeCard";
import moment from 'moment-timezone'
import 'moment/locale/es'
import { subscribeTo, unsubscribe } from '../../lib/Socket'
import I18n from '../../i18n/i18n'

class FailureDetail extends Component {
    state = {
        isLoading: false,
        commentText: '',
        log: [],
        escalationLevel: [],
        diff: 0,
        timer: null,
    };

    _mounted = false;
    params = null;
    _lastEscalation = null;

    constructor(props) {
        super(props);
        this.failure = this.props.navigation.state.params
        this.reportId = this.failure && this.failure.report
        this._onRefresh = this._onRefresh.bind(this)
        this._onAssist = this._onAssist.bind(this)
        this._newComment = this._newComment.bind(this)
        this._manualEscalation = this._manualEscalation.bind(this)
        this._updateData = this._updateData.bind(this)
        this.tick = this.tick.bind(this)
    }

    componentDidMount() {
        this._mounted = true;
        tracker.trackScreenView("FailureDetail");
        this._onRefresh()
        if (this.state.timer === null) {
            clearInterval(this.state.timer)
            let timer = setInterval(this.tick, 1000)
            this.setState({ timer })
        }
        subscribeTo('log-created', this._updateData)
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
        this.setState({ timer: null })
        this._mounted = false;
        unsubscribe('log-created')
    }

    _updateData(data) {
        //Update data if report log is updated
        if(this.reportId == data.report || this.reportId == data.WorkOrderID){
            this._onRefresh();
        }
    }

    _onRefresh() {
        this.setState({ isLoading: true, log: [], escalationLevel: [], escalationDate: null,})
        this.props.setReportData(this.reportId).then(()=>{
            this.params = this.props.actualReport
            this.props.fetchComments(this.failure.id)
            this.props.asistenciaLog(this.failure.id).then(()=>{
                const data = this.props.log.data
                if(this.props.log.data){
                    if(data.length){
                        this.params.reportClosedAt = data[0].reportClosedAt
                        this.params.escalationLevel = data[0].escalationLevel
                    }
                }
                this.setState({ 
                    isLoading: false,
                    log: this.props.log.data,
                    escalationLevel: this.props.log.escalationLevel,
                })
            })
        })
    }

    _onAssist() {
        navigate('ValidateTadi', {report: this.params, returnFunction: this._onRefresh.bind(this) })
    }

    _manualEscalation() {
        this.setState({ isLoading: true })
        this.props.manualEscalation(this.reportId).then(()=>{
            this._onRefresh()
        })
    }

    tick() {
        const report  = this.params
        if (report && !report.reportClosedAt) {
            let now = new Date().getTime()
            let creation = new Date(moment(this._lastEscalation || report.createdAt).format()).getTime()
            let diff = Math.round((now - creation) / 1000)
            let h = Math.floor(diff / (60 * 60))
            diff = diff - (h * 60 * 60)
            let m = Math.floor(diff / (60))
            diff = diff - (m * 60)
            let s = diff
            if(this._mounted){
                this.setState({ diff: `${h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}` })
            }
        }
    }

    _getDiff(creation, end) {
        if (creation == null || end == null) {
            return "00:00:00"
        }
        creation = new Date(moment(creation).format()).getTime()
        end = new Date(moment(end).format()).getTime()
        let diff = Math.round((end - creation) / 1000)
        let h = Math.floor(diff / (60 * 60))
        diff = diff - (h * 60 * 60)
        let m = Math.floor(diff / (60))
        diff = diff - (m * 60)
        let s = diff
        return `${h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}`;
    }

    _newComment(comment){
        if(comment){
            let data = comment
            this.setState({ isLoading:true })
            this.props.newComment(this.reportId, data, this.props.session.info.id).then(()=>{
                this.setState({ commentText:'' })
                this._onRefresh()
            })
        }
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

    render() {
        let report = null;
        let level1 = null;
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport;
            level1 = this.props.currentEscalation
                ? this.props.currentEscalation.label
                : "";
            
            if(report.report == this.reportId){
                //Asinar datos de reporte al reporte seleccionado si es el actual
                //this.params = report
            }
        }

        let content = null
        let checkInDate = false
        let identifiedDate = null
        let identifiedDateF = null
        let hasEscalation = false
        let escalationDate = null
        let hasAnswer = false
        let downtimeTotal = null
        let lastEscalation = null
        let isClosed = false
        let closedDate = false
        let firstCheckIn = false

        let dataescalation = []
        if(this.state.log){
            this.state.log.map((value, i)=>{
                switch(value.type){
                    case 'Report-Closed' || value.open_minutes || value.report_statusID === 19:
                        /*duration = moment.duration(moment(value.reportClosedAt).diff(checkInDate || value.reportCreatedAt));
                        closedDate = Math.round(duration.asMinutes())*/
                        isClosed = true;
                        //downtimeTotal = value.open_minutes
                        if(firstCheckIn){
                            closedDate = this._getDiff(firstCheckIn, value.reportClosedAt)
                        }
                        downtimeTotal = this._getDiff(value.reportCreatedAt, value.reportClosedAt)
                        if(dataescalation.length){
                            dataescalation[dataescalation.length-1].date = this._getDiff(lastEscalation, value.reportClosedAt)
                        }
                        break;
                    case 'Report Chec-In':
                        if(!firstCheckIn){
                            firstCheckIn = value.logCreatedAt
                        }
                        checkInDate = value.logCreatedAt
                        /*hasAnswer = moment.duration(moment(value.logCreatedAt).diff(lastEscalation));
                        hasAnswer = Math.round(hasAnswer.asMinutes())*/
                        if(dataescalation[dataescalation.length-1].level==2){
                            hasAnswer = this._getDiff(identifiedDateF, value.logCreatedAt)
                        }else{
                            hasAnswer = this._getDiff(lastEscalation, value.logCreatedAt)
                        }
                        if(dataescalation.length){
                            dataescalation[dataescalation.length-1].answer = hasAnswer
                            dataescalation[dataescalation.length-1].hasAnswer = true
                        }
                        break;
                    case 'Report-Identified':
                        /*duration = moment.duration(moment(value.logCreatedAt).diff(value.reportCreatedAt));
                        identifiedDate = Math.round(duration.asMinutes())*/
                        if(!identifiedDate){
                            identifiedDateF = value.logCreatedAt
                            identifiedDate = this._getDiff(value.reportCreatedAt, value.logCreatedAt)
                        }
                        break;
                    case 'Report-Escalation':
                        if(value.data){
                            value.data = (typeof value.data == 'string' ? JSON.parse(value.data):value.data)
                        }
                        if((value.data.level*1)!=1){
                            hasEscalation = this.state.escalationLevel.filter(obj => {
                                return obj.level*1 === value.data.level*1
                            })
                            if(hasEscalation.length){
                                hasEscalation = hasEscalation[0].label
                            }

                            escalationDate = this._getDiff(lastEscalation || value.reportCreatedAt, value.logCreatedAt)
                            lastEscalation = value.logCreatedAt
                            this._lastEscalation = value.logCreatedAt
                            
                            if(dataescalation.length){
                                dataescalation[dataescalation.length-1].date = this._getDiff(dataescalation[dataescalation.length-1].logDate, lastEscalation)
                            }
                            dataescalation.push({
                                label: hasEscalation,
                                level: value.data.level,
                                date: escalationDate,
                                logDate: (i==0?value.reportCreatedAt:value.logCreatedAt),
                            })
                        }
                        break;
                    default:
                        break;
                }
            })
        };
        
        if(dataescalation.length==1){
            this._lastEscalation = this.params.reportCreatedAt
        }

        let stopEscalation = !this.state.escalationLevel[dataescalation.length+1]
        content = dataescalation.map((value, i) => {
            return(
                <View key={i}>
                    <FailureCombatHeader combate={value.label} tiempo={`${(dataescalation[i+1] || isClosed?value.date:this.state.diff)} min`} />
                    <ParoRegisterCard 
                        close={moment(this.params.closeAt).format('DD MMMM, h:mmA')}
                        date={moment(this.params.createdAt).format('DD MMMM, h:mmA')} 
                        showButton={!value.hasAnswer&&!dataescalation[i+1]&&!isClosed} 
                        paro={this.params.report_number || ''} 
                        report_type={this.params.report_type}
                        text={this.params.desc} 
                        category={this.params.issueType || this.params.name}
                        color={this.params.color} 
                        item={this.params}
                        onPress={()=> this._onAssist() }/>
                    {identifiedDate&&i==0?
                    <IdentificationTimeCard text = {I18n.t('identification_time')} time={`${identifiedDate} min`} />:null}
                    {value.hasAnswer?<IdentificationTimeCard text = {I18n.t('response_time')} time={`${value.answer} min`}/>:null}
                </View>
            )
        })
        
        const items = this.props.items || []
        const logComments = items.map((value, i)=>{
            let user = {
                nombre: value.name,
                apellidoPaterno: value.apellidoPaterno,
                apellidoMaterno: value.apellidoMaterno,
                domain: this.props.session.domain,
                thumbnailUrl: value.thumbnailUrl
            }
            return (
                <FailureCard item={value} user={user} showButton={false} key={i}/>
            )
        })
        return ( 
            <View style={{ flex: 1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level1}
                    report={report}
                    enableBack
                />
                {this.state.isLoading ?
                    this.renderLoader()
                    :
                    null
                }
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <View style={styles.mainContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{upperCase(isClosed ? I18n.t('solved_stop') : `${I18n.t('assistance')}: ${I18n.t('actual_stop')}`)}</Text>
                        </View>
                        {!this.state.isLoading?
                        <View>
                            { content }
                            {!isClosed&&!stopEscalation?
                            <View style={{margin: 10}}>
                                <SensaiButton 
                                    text = {I18n.t('escale_next_combat')}
                                    margin={[10,10,10,10]} 
                                    loading={this.state.isLoading}
                                    onPress={()=> this._manualEscalation() } />
                            </View>:null}
                        </View>:null}
                    </View>
                    {!this.state.isLoading?logComments:null}
                    {firstCheckIn&&isClosed?
                        <IdentificationTimeCard text = {I18n.t('solution_time')} time={`${closedDate} ${I18n.t('minutes_dim')}`} checkIcon/>
                        :null
                    }
                    {isClosed?
                        <IdentificationTimeCard text = {I18n.t('downtime_total_time')} time={`${downtimeTotal} ${I18n.t('minutes_dim')}`} ban/>
                        :null
                    }
                </ScrollView>

                {!isClosed?
                    <CommentBox 
                        commentText={this.state.commentText} 
                        placeholder = {false}
                        onSendPress = {this._newComment.bind(this)}
                    />
                    :
                    <View styles={{ padding: 10 }}>
                        <SensaiButton text = {I18n.t('back')} buttonStyle={{ margin: 10 }} 
                            onPress={()=> this.props.navigation.goBack() } 
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        padding: 10,
    },
    headerText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },

});

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        log: state.forumComments.asistenciaLog,
        actualReport: state.forumComments.report,
        session: state.session,
        items: state.forumComments.comments,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ asistenciaLog, manualEscalation, manualAssist, fetchComments, newComment, cleanComments, setReportData }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FailureDetail);
