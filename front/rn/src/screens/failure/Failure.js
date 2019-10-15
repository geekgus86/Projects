import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, RefreshControl, KeyboardAvoidingView } from 'react-native'
import { SensaiButton, LogCard, CommentBox, Spinner, LogCardChecklist, CollapList } from '../../components'
import { ActualReport } from './ActualReport'
import { guid, tracker, upperCase, navigate  } from '../../helpers'
import { fetchCurrentShiftLog, postCommentToLog, deleteLog, updateLog } from '../home/actions'
import { newComment, createReport } from './actions'

import { subscribeTo, unsubscribe } from '../../lib/Socket'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'

class Failure extends Component {
    state = {
        isLoading: false,
        isRefreshing: false,
        log: [],
        workOrders: [],
        diff: 0,
        timer: null,
        showBox: false,
        showMenu: true,
        commentText: '',
        item: null,
        checklist: false,
        items: [],
        list: [],
        paros: 0,
        min: 0,
    }

    constructor(props) {
        super(props)
        this.onWriteComment = this.onWriteComment.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this._failureOptions = this._failureOptions.bind(this)
        this._checked = this._checked.bind(this)
        this._merge = this._merge.bind(this)

        this._onRefresh = this._onRefresh.bind(this)
        this._actualReport = this._actualReport.bind(this)
        this._assistance = this._assistance.bind(this)
        this._updateTable = this._updateTable.bind(this)
        this._mounted = false
    }

    componentDidMount() {
        tracker.trackScreenView('Failure')
        subscribeTo('report-closed', this._onRefresh)
        //subscribeTo('report-created', this._onRefresh)
        this._mounted = true
        this._updateTable()
    }

    componentWillUnmount() {
        this._mounted = false
        unsubscribe('report-closed')
        //unsubscribe('report-created')
    }

    onWriteComment(comment) {
        if (comment !== '' && this.props.currentMachine !== null) {
            tracker.trackEvent('user-actions', 'write-comment')
            comment = comment.replace(/['"]+/g, '')
            this.setState({ isLoading: true })
            this.props.postCommentToLog(this.props.currentMachine.id, comment).then(()=>{
                this.setState({ showBox: false, commentText: '', item: null })
                this._onRefresh()
            })
        }
    }

    _merge() {
        if (this.state.list.length <= 1) {
            Alert.alert(I18n.t('alert_title'), I18n.t('select_two_stops'))
        } else {
            let sortable = this.state.list
            let total = 0      
            sortable.sort(function(a, b) {
                return a.id - b.id
            }).forEach(function(value) {
                total += value.open_minutes
            })
            let item = Object.assign({}, sortable[0])
            let mustReidentify = true
            //Escenario 1 -> 
            let differentIssues = [... new Set(sortable.map(x => x.issue))]
            //Todos se identificaron con el mismo issue
            if (differentIssues.length == 1) {
                //Escenarios 2 y 3
                mustReidentify = (differentIssues[0] == null);
            } else if (differentIssues.length == 2) {
                //Escenario 4
                if (differentIssues[0] == null || differentIssues[1] == null) {
                    let issue = differentIssues.filter(function(item){
                        return item != null;
                    })
                    let item2 = sortable.filter(temp => {
                        return temp.issue == issue[0];
                    })[0]
                    item.issue = item2.issue
                    item.issue_type = item2.issue_type
                    item.desc = item2.desc
                    item.color = item2.color
                    mustReidentify = false
                } else {
                    mustReidentify = true
                    item.issue = item.issueType = item.desc = null
                }
            } else {
                mustReidentify = true
                item.issue = item.issueType = item.desc = null
            }
            item.open_minutes = total
            navigate('MergeDowntime', { list: [item], merge: sortable, identified: !mustReidentify, 
                returnFunction: this._onRefresh.bind(this), type:"merge", disable: !mustReidentify })
        }
    }

    _failureOptions(item, value) {
        if (item == null || item.group_id == null && (item.report_division == null || item.report_division == '')) {
            switch(value){
                case 0:
                    if (item.report_division || item.group_id) {
                        Alert.alert(I18n.t('already_gd_downtime_group'))
                    } else if(item.report_statusID===19){
                        Alert.alert(I18n.t('alert_title'), I18n.t('no_agroup_stop'))
                    }else{
                        this.setState({ checklist: true, showMenu: true, list: [], paros: 0, min: 0, item: item  })
                    }
                    break;
                case 1:
                    if (item.report_division || item.group_id) {
                        Alert.alert(I18n.t('already_gd_downtime_divide'))
                    } else if(item.open_minutes<=1 || item.report_statusID===19){
                        Alert.alert(I18n.t('alert_title'), I18n.t('no_divide_stop'))
                    }else{
                        navigate('SplitDowntime', { item: item, returnFunction: this._onRefresh.bind(this) })
                    }
                    break;
                case 2:
                    if(item.report_division || item.group_id){
                        navigate('FailureHistoryModal', item)
                    }else{
                        alert(I18n.t('no_history_stop'))
                    }
                    break;
                case 3:
                    if(!item.report){
                        item.report = item.id
                    }
                    if(item.issue){
                        navigate('FailureDetailModal', item)
                    }else{
                        alert(I18n.t('identify_stop_to_continue'))
                    }
                    break;
                default:
                    this.setState({ checklist: false, item: null, isLoading: true, items: [] })
                    this._updateTable()
                    break;
            }
        } else if (item != null && item.group_id != null) {
            switch(value){
            case 0:
                if(item.report_division || item.group_id){
                    navigate('FailureHistoryModal', item)
                }else{
                    alert(I18n.t('no_history_stop'))
                }
                break;
            case 1:
                if(!item.report){
                    item.report = item.id
                }
                if(item.issue){
                    navigate('FailureDetailModal', item)
                }else{
                    alert(I18n.t('identify_stop_to_continue'))
                }
                break;
            default:
                    this.setState({ checklist: false, item: null, isLoading: true, items: [] })
                    this._updateTable()
                    break;
            }
        } else {
            switch(value){
                case 0:
                    if(!item.report){
                        item.report = item.id
                    }
                    if(item.issue){
                        navigate('FailureDetailModal', item)
                    }else{
                        alert(I18n.t('identify_stop_to_continue'))
                    }
                    break;
                default:
                        this.setState({ checklist: false, item: null, isLoading: true, items: [] })
                        this._updateTable()
                        break;
                }
        }
    }

    _checked(checked, item) {
        let list = this.state.list
        if(checked){
            list.push(item)
        }else{
            list = list.filter(el => el.id !== item.id);
        }
        let minutos = 0
        list.map(function(value){ minutos = minutos+value.open_minutes })
        this.setState({ list: list, paros: list.length, min: minutos })
        if(list.length==0){
            this._failureOptions(null, -1)
        }
    }

    _updateTable(){
        if (this.props.currentMachine !== null) {
            this.setState({ isLoading: true, isRefreshing: true, log: [], checklist: false, item: null, items: [], workOrders: [] })
            this.props.fetchCurrentShiftLog(this.props.currentMachine.id, 'current').then(()=>{
                let sorted = this.props.currentShiftLog.sort((a, b) => new Date(...a.createdAt.split('/').reverse()) - new Date(...b.createdAt.split('/').reverse()));
                let workOrders = this.props.currentWorkOrders.reverse()
                this.setState({ isLoading:false, isRefreshing:false, log: sorted.reverse(), workOrders: workOrders })
            })
        }
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }

    _onRefresh() {
        tracker.trackEvent('user-actions', 'pull-to-refresh-current-failure-log')
        this._updateTable()
    }

    _commentOptions(item, index){
        switch(index){
            case 0:
                //Editar
                //data = JSON.parse(item.data)
                this.setState({ showBox: true, commentText: item.data, item: item })
                break;
            case 1:
                //Borrar
                Alert.alert(
                    I18n.t('delete_feedback_question'),
                    I18n.t('delete_feedback_confirm'),
                    [
                        {text: I18n.t('cancel'), style: 'cancel'},
                        {text: I18n.t('confirm'), onPress: () => {
                            this.setState({ isLoading: true })
                            this.props.deleteLog(item.id).then(()=>{
                                this._onRefresh();
                            })
                        }},
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

    _renderItem({ item }) {
        //validators for edit and delete
        if(item.type === 'Shift-Comment' && !this.state.checklist){
            return <LogCard item={item} selectedItem={this.state.item} returnFunction={this._commentOptions.bind(this)} 
                    showButton={this.props.user.id==item.id_user} showMaximo={this.props.currentMachine.maximo == true} />
        }
        return null
    }

    _renderDowntimes(data) {
        let grouped = []
        let dataValue = []
        let fin = false
        let pushed = 0
        //Se quita el i_order == 2 el api no lo devuelve mas
        //data = data.filter((item)=>{return item.i_order==2 && (item.report_statusID===19 || item.type === 'Report-Closed' || item.type=='ChangeOver' || item.type == 'microparo' || item.type == 'unidentified-dt' || item.type == 'unidentified-co-dt')})
        data = data.filter((item)=>{return (item.report_statusID == 19 || item.type === 'Report-Closed' || item.type=='ChangeOver' || item.type == 'microparo' || item.type == 'unidentified-dt' || item.type == 'unidentified-co-dt')})
        if (data.length != 0) {
            for (let i = 0; i < data.length; i++) {
                let record = data[i]
                let next = data[i + 1]
                if(!fin){
                    fin = record.reportCreatedAt
                }
                dataValue.push(record)
                if (next) {                    
                    if (record.tool_code != next.tool_code) {
                        if(this.state.workOrders[pushed]){
                            const workOrder = this.state.workOrders[pushed]
                            grouped.push({ tool: workOrder.Tool, data: dataValue, fin: workOrder.EndAt, inicio: workOrder.StartAt })
                            pushed++
                        }else{
                            grouped.push({ tool:record.tool_code, data: dataValue, fin: fin, inicio: record.reportCreatedAt })
                            fin = record.reportCreatedAt
                        }
                        dataValue = []
                    }
                } else {
                    //Set last
                    if(this.state.workOrders[pushed]){
                        const workOrder = this.state.workOrders[pushed]
                        grouped.push({ tool: workOrder.Tool, data: dataValue, fin: workOrder.EndAt, inicio: workOrder.StartAt })
                        pushed++
                    }else{
                        grouped.push({ tool:record.tool_code, data: dataValue, fin: fin, inicio: record.reportCreatedAt })
                        fin = record.reportCreatedAt
                    }
                }
            }
            return <CollapList data={grouped} returnFunction={this._onRefresh.bind(this)} showOptions={true} 
                    failureFunction={this._failureOptions.bind(this)} showButton={true}
                    showMaximo={this.props.currentMachine.maximo == true} />
        }
        return null
    }

    _actualReport(item, value) {
        if(!item.report){
            item.report = item.id
        }
        switch(value){
            case 0:
                //this._assistance(item, 'assist')
                if(item.issue_type!=5){
                    if(item.name){
                        navigate('FailureDetailModal', item)
                    }else{
                        alert(I18n.t('identify_stop_to_escale'))
                    }
                }
                break;
            case 1:
                //this._assistance(item, 'escalation')
                break;
            default:
                break;
        }
    }

    _assistance(item, type){
        let data = ''
        if(type=='assist'){
            data = `{"message": "${I18n.t('technical_assistance')}"}`
        }else if(type=='escalation' && item.escalationLevel < 5){
            data = `{"message": "${I18n.t('stop_manual_escaled')}"}`
        }
        if(data != ''){
            this.setState({ isLoading:true })
            this.props.newComment(item.report, data, this.props.user.id, type).then(()=>{
                this.setState({ isLoading:false})
                if(type=='escalation'){
                    Alert.alert(
                        I18n.t('level_manual_escalade'),
                        I18n.t('stop_manual_escalade'),
                        [
                            {text: I18n.t('accept')}
                        ],
                        { cancelable: false }
                    )
                }else{
                    Alert.alert(
                        I18n.t('assistance'),
                        I18n.t('technical_assistance'),
                        [
                            {text: I18n.t('accept')}
                        ],
                        { cancelable: false }
                    )
                }
            })
        }else{
            Alert.alert(I18n.t('alert_title'), I18n.t('no_escale_stop'))
        }
    }

    render() {
        const { mainContainer, itemList, verticalLine, mainText, modalContainer, rectangle } = styles
        let report = null
        let level = null
        if (this.props.currentFailure !== false && this.props.currentReport) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
            report.report_number = null
        }

        let logEntries = null
        if(this.state.checklist){
            logEntries = (
                <ScrollView style={{ marginBottom: 76 }}>
                    {this.state.log.map((item, i) => {
                        if(this.state.item.tool_code==item.tool_code || !item.tool_code){
                            if(item.report_type == 2){
                                item.type='ChangeOver'
                            }
                            if ((item.type === 'Report-Closed' || item.type=='ChangeOver') && !item.report_division && item.report_statusID !== 19 && item.group_id == null && item.try_out==false ) {
                                return <LogCardChecklist key={i} item={item} onChange={this._checked.bind(this)} checked={item.id==this.state.item.id} />
                            }
                        }
                        return null
                    })}
                </ScrollView>
            )
        }else{
            logEntries = (
                <ScrollView style={{ flex: 1 }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <FlatList
                        data={
                            this.state.log.filter(report => {
                                return (report.type === 'Shift-Comment')
                            })
                        }
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
                        initialNumToRender={7}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />
                    {this._renderDowntimes(this.state.log)}
                </ScrollView>
            )
        }
        let commentEvent = null
        let placeholder = false
        if(this.state.showBox){
            placeholder = I18n.t('edit_feedback')
            commentEvent = this._updateLog.bind(this)
        }else{
            commentEvent = this.onWriteComment.bind(this)
        }

        return (
            <View style={mainContainer}>
                {this.state.isLoading ?
                    this.renderLoader()
                    :
                    null
                }
                {
                    this.props.currentFailure&&!this.state.isLoading&&!this.state.checklist&&report?
                        <ActualReport report={report} onPress={this._onRefresh.bind(this)} 
                            returnFunction={this._actualReport.bind(this)} 
                            createReport={()=> this.props.createReport() }
                            showMaximo={this.props.currentMachine.maximo == true}/>
                        :null
                }
                {
                    this.state.checklist?
                    <View style={modalContainer}>
                        <Text style={mainText}>
                            {upperCase(I18n.t('home_production_merge'))}
                        </Text>
                    </View>:null
                }
                { logEntries }
                {
                    !this.state.checklist?
                        <CommentBox keyboardPadding={true} commentText={this.state.commentText} 
                        placeholder = {placeholder}
                        onSendPress = {commentEvent}/>
                    :
                        <View style={{
                            position: 'absolute',
                            bottom: (this.state.showMenu?0:-108),
                            paddingLeft: 10,
                            paddingRight: 10,
                            width:'100%',
                            backgroundColor: "rgba(209, 209, 212, 1)"
                        }}>
                            <TouchableOpacity style={{ alignItems:'center', height:30}} 
                                onPress={()=>this.setState({ showMenu: !this.state.showMenu })}>
                                <View style={ rectangle }></View>
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[mainText, {fontWeight: 'normal'}]}> {`${I18n.t('selected_stops')}: `}
                                    <Text style={ mainText }>{this.state.paros}</Text>
                                </Text>
                                <Text style={ mainText }>{upperCase(`${I18n.t('total')}: ${this.state.min.toFixed(2)} ${I18n.t('minutes_dim')}`)}</Text>
                            </View>
                            <SensaiButton
                                text = {I18n.t('grouping')} 
                                buttonStyle={{ marginTop: 10 }}
                                onPress={() => this._merge()}
                            />
                            <SensaiButton
                                text = {I18n.t('cancel')}
                                outline
                                buttonStyle={{ marginTop: 10, marginBottom: 10 }}
                                onPress={() => this._failureOptions(null, -1)}
                            />
                        </View>
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.session.info,
        currentShiftLog: state.userMachine.currentShiftLog,
        currentWorkOrders: state.userMachine.currentWorkOrders,
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCurrentShiftLog, postCommentToLog, deleteLog, updateLog, newComment, createReport }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Failure)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemList: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        left: 14,
        bottom: 65,
        borderLeftWidth: 1,
        borderLeftColor: colors.azure,
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
    rectangle: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: 40,
        height: 2,
        borderRadius: 2,
        backgroundColor: colors.coolGrey
    }
})