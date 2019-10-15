import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BackHandler, View, Text, FlatList, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, LogCard, Spinner, FailureHeader, OkModal } from '../../components'

import { mergeDowntimes, splitDowntimes } from './actions'
import { guid, tracker, upperCase, navigate } from '../../helpers'

import { createWorkOrderMaximo, updateWorkOrderMaximo, createWorkOrderMaximoSFMS, updateWorkOrderMaximoSFMS,
         checkExistsWOMSFMS } from './../report/actions'
import moment from 'moment-timezone'
import 'moment/locale/es'

class MergeDowntime extends Component {

    state = {
        isLoading: false,
        list: [],
        merge: [],
        buttonEnable: false
    }

    _validAreasMaximo = []
    originalList = []

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this._renderItem = this._renderItem.bind(this)
        this._returnFunction = this._returnFunction.bind(this)
        this._options = this._options.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
        this._validAreasMaximo = [3,4]
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    }

    handleBackButton() {
        this.props.navigation.goBack()
        return true
    }

    componentWillMount() {
        this.setState({ list: this.params.list, buttonEnable: this.params.identified })
    }

    _returnFunction(item, issue, reportType, issueType) {
        let { list } = this.state
        this.originalList = Object.assign([], this.props.merge)
        let enabled = true
        for (let i = 0; i < list.length; i++) {
            if(item.report_division == list[i].report_division){
                list[i].color = issueType.color
                list[i].issue = issue.id
                list[i].desc = issue.desc
                list[i].issueType = issueType.name
                list[i].report_type = reportType
                list[i].area = issueType.id
                list[i].code = issue.code
            }
            enabled = !list[i].issue== false
        }
        this.setState({ buttonEnable: enabled, list: list })
    }

    _options() {
        if(this.state.buttonEnable){
            this.setState({ isLoading: true })
            if(this.params.type=="merge"){    
                let parent = this.state.list[0]            
                this.params.merge.forEach(function (i) {
                    i.color = parent.color
                    i.issue = parent.issue
                    i.desc = parent.desc
                    i.issueType = parent.issueType
                    i.report_type = parent.report_type
                    i.area = parent.area
                    i.code = parent.code
                    i.tool_code = parent.tool_code
                })
                this.props.mergeDowntimes(parent, this.params.merge).then(()=>{
                    if (parent.area != 5) {
                        this.generateWorkOrder();
                    } else {
                        this.props.navigation.state.params.returnFunction()
                        this.props.navigation.goBack()
                    }
                })
            }else{
                const list = Object.assign([], this.state.list)
                this.props.splitDowntimes(list).then(()=>{
                    this.props.navigation.state.params.returnFunction()
                    this.props.navigation.goBack()
                })
            }
        }
    }

    generateWorkOrder() {
        let womaximo = {}
        let parent = Object.assign({}, this.state.list[0])
        let downtimes = this.params.merge.filter(i => i.wo_maximo != null)
        womaximo.dtId = parent.id
        womaximo.location = "SCHULER"
        womaximo.siteid = "APO"
        womaximo.orgid = "MET-MEX"
        womaximo.wopriority = 100
        womaximo.fechaInicioParo = moment(parent.createdAt).tz('America/Monterrey').format('YYYY-MM-DDTHH:mm:ss')
        if (this._isAreaMaximo(parent.area)) {
            if (downtimes.length == 0) {
                womaximo.description = I18n.t('wom_created_desc', {
                    area: parent.issueType, code: parent.code
                })
                womaximo.description = womaximo.description + " - " + parent.tool_code + " - Closed Downtime"
                this.createWOM(womaximo, parent)
            } else {
                let self = this
                for (var i = 0, len = downtimes.length; i < len; i++) {
                    if (i < len) {
                        womaximo = {}
                        womaximo.dtId = downtimes[i].id
                        womaximo.location = "SCHULER"
                        womaximo.siteid = "APO"
                        womaximo.orgid = "MET-MEX"
                        womaximo.wopriority = 100
                        womaximo.fechaInicioParo = moment(downtimes[i].createdAt).format('YYYY-MM-DDTHH:mm:ss')
                        womaximo.description = I18n.t('wom_created_desc', {
                            area: downtimes[i].issueType, code: downtimes[i].code
                        })
                        womaximo.description = womaximo.description + " - Closed Downtime"
                        womaximo.wonum = downtimes[i].wo_maximo
                        womaximo.workorderid = downtimes[i].wo_maximo_id
                        self.updateWorkOrder(womaximo, downtimes[i].id)
                    } else {
                        this.props.navigation.state.params.returnFunction()
                        this.props.navigation.goBack()
                    }
                }
            }
        } else if (downtimes.length > 0) {
            let self = this
            downtimes.forEach(async function (i) {
                let previous = self.originalList.filter((j) => {
                    return j.id = i.id
                })[0]
                womaximo.description = I18n.t('wom_reason_cancel', 
                                    { ogArea: previous.name, ogIssue: previous.code,
                                      nwArea: i.name, nwIssue: i.code,
                                      tool: parent.tool_code })
                womaximo.wonum = i.wo_maximo
                womaximo.workorderid = i.wo_maximo_id
                self.updateWorkOrder(womaximo, i.id)
            });
        } else{            
            this.props.navigation.state.params.returnFunction()
            this.props.navigation.goBack()
        }
    }

    createWOM(womaximo, downtime) {
        this.setState({ isLoading: true })
        this.props.checkExistsWOMSFMS(downtime.id).then(() => {
            if (this.props.existsWOMSFMS == true) {
                this.setState({ showAlertMaximo: false })
                this.props.navigation.state.params.returnFunction()
                this.props.navigation.goBack()
                this.setState({ isLoading: false })
            } else {
                this.props.createWorkOrderMaximo(womaximo).then(() => {
                    this.setState({ showAlertMaximo: this.props.respWOMResponse.showAlert })
                    if (this.props.respWOMCorrect) {                        
                        this.setState({ woMaximoId: this.props.respWOMResponse.wonum })
                        let order = this._createWorkOrderMaximoSFMS(this.props.respWOMResponse, downtime.id)
                        this.props.createWorkOrderMaximoSFMS(order).then(() => {
                            this.dlgWomCreated.showModal()
                            womaximo.wonum = this.props.respWOMResponse.wonum
                            womaximo.fechaFinParo = moment(downtime.closedAt).format('YYYY-MM-DDTHH:mm:ss')
                            womaximo.worklogDescription = downtime.name
                            womaximo.workorderid = this.props.respWOMResponse.workorderid
                            this.updateWorkOrder(womaximo, downtime.id)
                            this.setState({ isLoading: false })
                        })
                    } else {
                        let order = this._createWorkOrderMaximoSFMS(this.props.respWOMResponse, downtime.id)
                        let message = this._getErrorMessageMaximo(this.props.respWOMResponse.message)
                        this.setState({ woMaximoMessage: `${I18n.t('wom_error_alert')} (${message})` })
                        this.setState({ isLoading: false })
                        this.dlgWomCreated.showModal()
                        this.props.createWorkOrderMaximoSFMS(order).then(() => {
                            this.setState({ isLoading: false })
                        });
                    }
                }).catch((error) => {
                    let order = this._createWorkOrderMaximoSFMS(this.props.respWOMResponse, downtime.id)
                    let message = this._getErrorMessageMaximo(this.props.respWOMResponse.message)
                    this.setState({ woMaximoMessage: `${I18n.t('wom_error_alert')} (${message})` })
                    this.dlgWomCreated.showModal()
                    this.props.createWorkOrderMaximoSFMS(order).then(() => {
                        this.setState({ isLoading: false })
                    });
                })
            }
        })
    }

    updateWorkOrder(womaximo, dtId) {
        this.setState({ isLoading: true })
        this.props.updateWorkOrderMaximo(womaximo).then(() => {
            if (this.props.respWOMCorrectUpd) {
                this._updateWorkOrderMaximoSFMS(womaximo, 'PROCESADA', dtId)
            } else {
                let message = this._getErrorMessageMaximo(this.props.respWOMResponseUpd.message)
                womaximo.message = message
                this._updateWorkOrderMaximoSFMS(womaximo, 'ABIERTA', dtId)
            }
        })
    }

    _getErrorMessageMaximo(errorResponse) {
        let message = errorResponse
        if (message != null && message.indexOf('BMX') >= 0) {
            message = message.substring(message.indexOf('BMX'))
            let end = message.indexOf(' ') < 0 ? message.length : message.indexOf(' ')
            message = message.substring(0, end)
        } else {
            message = ''
        }
        return message;
    }

    _createWorkOrderMaximoSFMS(data, dtId) {
        let order = Object.assign({}, data)
        order.dtId = dtId
        order.message = this._getErrorMessageMaximo(data.message)
        order.user = this.props.currentUser.username
        order.tadi = this.props.currentUser.tadi
        return order
    }

    _updateWorkOrderMaximoSFMS(data, status, dtId) {
        let order = Object.assign({}, data)
        order.dtId = dtId
        order.message = this._getErrorMessageMaximo(data.message)
        order.tadi = this.props.currentUser.tadi 
        order.status = status
        order.description = data.description
        this.setState({ isLoading: true })
        this.props.updateWorkOrderMaximoSFMS(order).then(() =>{
            this.setState({ isLoading: false })
        })
    }

    _isAreaMaximo(area) {
        return this._validAreasMaximo.includes(area) && this.props.currentMachine.maximo == true
    }

    renderLoader() {
        return (
            <View style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 9999,
            }}>
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size='large' />
                </View>
            </View>
        )
    }

    _renderItem(item, key) {
        let card = null;
        let title = item.issue !== null ? I18n.t('modify_stop') : I18n.t('identify_stop');
        let negativebg = !item.issue == false;
        card = <LogCard item={item} key={key} customButton={{ title: title, onPress: ()=>{
            navigate('IdentifyFailureModal', { 
                failure: item, returnFunction: this._returnFunction.bind(this), noupdate:true, report_type: item.report_type
            })
        }}}/>
        return card
    }

    render() {
        const { modalContainer, mainText } = styles

        let report = null
        let level = null

        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }

        const entries = this.state.list.map((item, i)=>{
            return this._renderItem(item, i)
        })

        return (
            <View style={{ flex:1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                    enableBack={true}
                />
                <View style={{flex: 1, justifyContent: 'flex-start',}} pointerEvents={this.params.disable ? 'none' : 'auto'}>
                    {this.state.isLoading ?
                        this.renderLoader()
                        :
                        null
                    }
                    <View style={modalContainer}>
                        <View>
                            <Text style={mainText}>
                                {upperCase((this.state.list.length > 1 ? I18n.t('identify_new_stops') : I18n.t('confirm_new_stop') + (this.state.list[0].report_number?' # '+this.state.list[0].report_number:'')))}
                            </Text>
                        </View>
                    </View>
                    <ScrollView>
                        { entries }
                    </ScrollView>
                </View>
                <SensaiButton
                    text = {I18n.t('confirm')}
                    default={!this.state.buttonEnable}
                    buttonStyle={{ margin: 10 }}
                    onPress={()=> this._options() }
                    loading={this.state.isLoading}
                />
                
                <OkModal
                    ref={(r)=>{this.dlgWomCreated = r}} 
                    title={I18n.t('assistance_requested')} 
                    message={`${I18n.t('assistance_requested_in_area')}:`}
                    area={this.state.list[0].issueType}
                    color={this.state.list[0].color}
                    onPress={()=>{
                        this.props.navigation.state.params.returnFunction()
                        this.props.navigation.goBack()
                        this.setState({ isLoading: false })
                    }}
                    confirmIcon="check"
                    womTitle={`${I18n.t('wom_title_alert')}:`}
                    womId={this.state.woMaximoId}
                    womMessage={this.state.woMaximoMessage}
                    showAlertMaximo={this.state.showAlertMaximo}
                    confirmText={I18n.t('wom_agreed_alert')}
                    onConfirm={()=>{
                        this.props.navigation.state.params.returnFunction()
                        this.props.navigation.goBack()
                        this.setState({ isLoading: false })
                    }}

                />
            </View>
        )
    }


}

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        currentReport: state.userMachine.report,
        currentFailure: state.userMachine.inFailureMode,
        currentEscalation: state.userMachine.escalation,
        respWOMResponse: state.forumComments.respWOMResponse,
        respWOMCorrect: state.forumComments.respWOMCorrect,
        respWOMResponseUpd: state.forumComments.respWOMResponseUpd,
        respWOMCorrectUpd: state.forumComments.respWOMCorrectUpd,
        respWOMResponseSFMS: state.forumComments.respWOMResponseSFMS,
        respWOMResponseSFMSUpd: state.forumComments.respWOMResponseSFMSUpd,
        existsWOMSFMS: state.forumComments.existsWOMSFMS,
        recordWOMSFMS: state.forumComments.recordWOMSFMS,
        currentUser: state.session.profile
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ mergeDowntimes, splitDowntimes, createWorkOrderMaximo, updateWorkOrderMaximo, 
        createWorkOrderMaximoSFMS, updateWorkOrderMaximoSFMS, checkExistsWOMSFMS }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MergeDowntime)

const styles = StyleSheet.create({
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
})