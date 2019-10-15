import React, { PureComponent } from 'react'
import {BackHandler, View, Text, StyleSheet, ScrollView, FlatList, Alert, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { guid, tracker, upperCase} from '../../helpers'
import { fetchIssueTypes, fetchIssuesByType, assignFailure, selectSingleIssue, 
         createWorkOrderMaximo, updateWorkOrderMaximo, createWorkOrderMaximoSFMS, updateWorkOrderMaximoSFMS,
         checkExistsWOMSFMS, getToolCurrentDT } from './actions'
import { LogCardCheck } from './LogCardCheck'

import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, NavHeader, SensaiCheckbox, OkModal, AlertConfirmModal, InputModal } from '../../components'
import moment from 'moment-timezone'
import 'moment/locale/es'

class IdentifyFailure extends PureComponent {
    state = {
        search: '',
        currentList: [],
        level: 0,
        currentLevelStr: '',
        selectedIssue: {},
        selected: {},
        isLoading: true,
        failure: I18n.t('no_identified'),
        area: '--',
        loteRollo: null,
        woMaximoMessage: null
    }

    _mounted = false
    _lastSelect = false
    _originalArea = null
    _validAreasMaximo = []
    _woMaximoId = null
    _descTool = null


    constructor(props) {
        super(props)
        this.filterByIssueType = this.filterByIssueType.bind(this)
        this.assignFailure = this.assignFailure.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
        this._onPress = this._onPress.bind(this)
        this._onConfirm = this._onConfirm.bind(this)
        this.failure = this.props.navigation.state.params.failure
        this.report_type = this.props.navigation.state.params.report_type
        this.noupdate = this.props.navigation.state.params.noupdate
        this.areaSelected = 0
        this.type = 1
        this._originalArea = this.failure.area
        this._validAreasMaximo = [3,4]
        this._createWorkOrderMaximo = this._createWorkOrderMaximo.bind(this)
        this._createWorkOrderMaximoSFMS = this._createWorkOrderMaximoSFMS.bind(this)
    }

    componentDidMount() {
        tracker.trackScreenView('IdentifyFailures')
        this._mounted = true
        this.props.fetchIssueTypes().then(() => {
            this.filterByIssueType()
        })
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
        this._descTool = this.failure.tool_desc != null ? this.failure.tool_desc : this.failure.tool_code
        if (this._descTool == null) {
            try {
                this.props.getToolCurrentDT(this.failure.id).then(() => {
                    try {
                        this._descTool = this.props.toolCurrentDT.tool
                    } catch (e) {
                        if (this.props.currentReport != null) {
                            this._descTool = this.props.currentReport.tool_desc
                        }
                    }
                });
            } catch(e) {
                this._descTool = ""
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    }

    handleBackButton() {
        this.props.navigation.goBack()
        return true
    }

    filterByIssueType(selected) {
        if(this.failure.try_out){
            selected =5
        }

        if(selected){
            selected = this.props.data.filter((value)=> value.id==selected)[0]
        }else{
            selected = { id : false }
        }
        if (this._mounted === true) {
            this.setState({ isLoading: true })
            this.props.fetchIssuesByType(selected.id, this.report_type,this.failure.is_out,this.failure.is_try_out1).then(() => {
                this.setState({
                    level: 1,
                    selected: selected,
                    currentLevelStr: upperCase(selected.name || ''),
                    area: upperCase(selected.name || ''),
                    currentList: this.props.data,
                    selectedIssue: {},
                    isLoading: false
                })
            })
        }
    }

    _onPress(value, item) {
        this.type = value
        this.report_type = value
        let selected = this.state.selected.id || false
        if(value==5){
            this._lastSelect = selected
        }
        if (this._mounted === true && this.state.level==1) {
            this.setState({ isLoading: true })
            if(value==5){
                this.report_type = 1
                selected = 5
            }
            //Last value if out
            if(value!=5&&this.state.selected.id){
                selected = this._lastSelect
            }
            this.filterByIssueType(selected)
        }
    }

    assignFailure() {
        if (this._mounted === true) {
            let selected = this.props.data.filter((value)=> value.id==this.state.selectedIssue.area)[0]      
            
            if(selected === undefined){
                Alert.alert(
                    I18n.t('error_select'),
                    I18n.t('error_select_required'),
                    [                        
                        {text: I18n.t('ok'),  style: 'cancel'},
                    ]
                )
                return false
            }

            this.setState({ isLoading: true, selected: selected })
            tracker.trackEvent('user-actions', 'assign-failure')
            if(this.noupdate){
                this.setState({ isLoading: false })
                //JMGR
                this.props.navigation.state.params.returnFunction(this.failure, this.state.selectedIssue, this.report_type, selected)
                this.props.navigation.goBack()
            }else{
                if(this.state.selectedIssue.code == 'OD108' || this.state.selectedIssue.code == '32.2'){
                    Alert.alert(
                        I18n.t('change_roll'),
                        I18n.t('register_change_roll'),
                        [
                            {text: I18n.t('confirm'), onPress: () => {
                                this.setState({ isLoading: false })
                                this.modal.showModal()
                            }},
                            {text: I18n.t('cancel'), onPress:()=> this.setState({ isLoading: false }),  style: 'cancel'},
                        ],
                        { cancelable: false }
                    )
                }else{
                    this._onConfirm()
                }
            }
        }
    }

    _onConfirm() {        
        this.setState({ isLoading: true })
        if((this.props.navigation.state.params.actualReport || this._isAreaMaximo(this.areaSelected)) && this.state.selected.id!=5){  
            this.modal2.showModal()
        }else{
            this.props.assignFailure(this.failure.report, this.state.selectedIssue.id, this.report_type, this.state.loteRollo).then(() =>{
                this._createWorkOrderMaximo(this.failure)
                this.props.navigation.state.params.returnFunction(this.state.selectedIssue, this.state.selected)
                this.setState({ isLoading: false, loteRollo: null })
                this.props.navigation.goBack()
            })
        }
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

    render() {
        const selectedId = (this.state.selected?this.state.selected.id:null) || null
        return(
            <View style={{flex: 1}}>
                {this.state.isLoading ?
                    this.renderLoader()
                    :
                    null
                }
                <NavHeader enableBack={true} title={I18n.t('identify_failure')} />
                <ScrollView>
                    <View style={{ margin: 10 }}>
                        <Text style={styles.headerText}>{upperCase(I18n.t('asign_failure'))}</Text>
                    </View>
                    
                    <LogCardCheck item={this.failure} onChange={this._onPress.bind(this)} actualReport={this.props.navigation.state.params.actualReport}/>

                    <View style={{ margin: 10 }}>
                        <Text style={[styles.headerText, { color: 'black' }]}>{upperCase(I18n.t('select_specific_component'))}</Text>
                    </View>

                    {this.state.isLoading || selectedId==5?null:
                    <View style={{ flexDirection: 'row', alignContent:'center', flex: 1, justifyContent: 'space-between', marginLeft: 5 }}>
                        {this.props.data.map((value, i)=>{
                            let opacity = (!this.state.selected.id||this.state.selected.id==value.id?1:.4)
                            if(!value.desc){
                                return null
                            }
                            return (
                                <TouchableOpacity style={{ width: '20%', padding: 5, alignItems:'center', opacity: opacity }} key={i} onPress={ () => {this.filterByIssueType(value.id)} }>
                                    <Text style={{ color: colors.white, backgroundColor: (value.color=='#FFFFFF'?'#898b8e':value.color), fontSize: 18, fontWeight: '600', textAlign: 'center', borderRadius: 52, height: 60, width: 60, paddingTop: 16 }}>{upperCase(`${value.desc}`)}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>}

                    {!selectedId&&!this.state.isLoading?
                        <View style={{ margin: 10 }}>
                            <Text style={[styles.headerText, { color: 'black' }]}>{upperCase(I18n.t('common_stops'))}</Text>
                        </View>
                    :null}

                    {this.state.level === 0 || this.state.isLoading ?
                        null
                        :
                        <View style={{ marginTop: 5, flex: 1 }}>
                            <FlatList
                                data={this.props.issues}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[styles.componentItem, { paddingLeft: 0 }]}>
                                            <SensaiCheckbox
                                                key={item.id}
                                                label={item.desc}
                                                checked={item.selected}
                                                onChange={(value) => {
                                                    if (value === true) {
                                                        this.setState({ selectedIssue: item, failure: item.desc })
                                                        this.props.selectSingleIssue(item)
                                                        this.areaSelected = item.area
                                                    } else {
                                                        this.areaSelected = 0
                                                        this.setState({ selectedIssue: {}, failure: I18n.t('no_identified') });
                                                    }
                                                }} />
                                        </View>
                                    );
                                }}
                                keyExtractor={item => {
                                    return guid()
                                }}
                            />
                        </View>
                    }
                </ScrollView>

                <OkModal
                    ref={(r)=>{this.modal1 = r}} 
                    title={I18n.t('assistance_requested')} 
                    message={`${I18n.t('assistance_requested_in_area')}:`}
                    area={this.state.selected.name}
                    color={this.state.selected.color}
                    onPress={()=>{
                        this.props.navigation.goBack()
                        if (this.props.navigation.state.params.actualReport) {
                            this.props.navigation.navigate('FailureDetailModal', this.failure)
                            this.setState({ isLoading: false, loteRollo: null })
                        }
                    }}
                    confirmIcon="check"
                    womTitle={`${I18n.t('wom_title_alert')}:`}
                    womId={this.state.woMaximoId}
                    womMessage={this.state.woMaximoMessage}
                    showAlertMaximo={this.state.showAlertMaximo}
                    confirmText={I18n.t('wom_agreed_alert')}
                    onConfirm={()=>{
                        this.props.navigation.goBack()
                        if (this.props.navigation.state.params.actualReport) {
                            this.props.navigation.navigate('FailureDetailModal', this.failure)
                            this.setState({ isLoading: false, loteRollo: null })
                        } else {
                            this.props.navigation.state.params.returnFunction(this.state.selectedIssue, this.state.selected)
                        }
                    }}

                />

                <InputModal 
                    ref={(r)=>{this.modal = r}} 
                    title={I18n.t('update_info')}
                    message={I18n.t('batch_of_roll_required')} 
                    confirmText={I18n.t('save')}
                    cancelText={I18n.t('cancel')}
                    onConfirm={(data)=>{
                        this.setState({ loteRollo: data }, ()=>{
                            this.modal.hideModal()
                            this._onConfirm()
                        })
                    }}
                    onCancel={()=>{
                        this.setState({ loteRollo: null })
                        this.modal.hideModal()
                    }} 
                />

                <AlertConfirmModal 
                    ref={(r)=>{this.modal2 = r}} 
                    title={I18n.t('assignment_assistance')} 
                    message={`${I18n.t('assistance_requested_to')}:`} 
                    area={this.state.selected.name}
                    color={this.state.selected.color}
                    confirmText={I18n.t('confirm')}
                    cancelText={I18n.t('cancel')}
                    onConfirm={()=>{
                        this.props.assignFailure(this.failure.report, this.state.selectedIssue.id, this.report_type, this.state.loteRollo).then(() =>{
                            this.setState({ isLoading: false, loteRollo: null })
                            this._createWorkOrderMaximo(this.failure);
                            this.props.navigation.state.params.returnFunction(this.state.selectedIssue, this.state.selected)
                        })
                    }}
                    onCancel={()=>{
                        this.setState({ isLoading: false })
                        this.modal2.hideModal()
                    }} />

                {this.state.level !== 0 ?
                    <SensaiButton
                        onPress={this.assignFailure}
                        buttonStyle={{margin: 10}}
                        text={I18n.t('assign_failure')}
                        loading={this.state.isLoading}
                    />
                    :
                    null
                }
            </View>
        )

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

    _prepareWorkOrderMaximo(item) {
        data = {}
        data.dtId = item.id
        data.location = "SCHULER"
        data.siteid = "APO"
        data.orgid = "MET-MEX"
        data.wopriority = 100
        data.fechaInicioParo = moment(item.createdAt).tz('America/Monterrey').format('YYYY-MM-DDTHH:mm:ss')
        data.option = -1;
        console.log("tool: " + this._descTool)
        //Paro actual
        if (this.props.navigation.state.params.actualReport) {
            if ((this.type == 1 || this.type == 2) 
                && this._isAreaMaximo(this.areaSelected) && item.wo_maximo == null) {
                data.description = I18n.t('wom_created_desc', {
                    area: this.state.selected.name, code: this.state.selectedIssue.code
                })
                data.description += " - " + this._descTool
                data.option = 1
            } else if ((this.type == 1 || this.type == 2) 
                && this._isAreaMaximo(this.areaSelected) && item.wo_maximo != null) {
                data.description = I18n.t('wom_created_desc', {
                    area: this.state.selected.name, code: this.state.selectedIssue.code
                })
                data.option = 4
                data.wonum = item.wo_maximo
                data.workorderid = item.wo_maximo_id
                data.description += " - " + this._descTool
            } else if (this._isAreaMaximo(this._originalArea) && (this._originalArea != this.areaSelected) 
                        && !this._isAreaMaximo(this.areaSelected)) {
                data.description = I18n.t('wom_reason_cancel',
                    {
                        ogArea: this.failure.name, ogIssue: this.failure.code,
                        nwArea: this.state.selected.name, nwIssue: this.state.selectedIssue.code,
                        tool: this._descTool
                    })
                data.option = 3
            }else{
                data.description = I18n.t('wom_reason_cancel', 
                                    { ogArea: this.failure.name, ogIssue: this.failure.code,
                                      nwArea: this.state.selected.name, nwIssue: this.state.selectedIssue.code,
                                      tool: this._descTool })
                data.option = 3
                data.wonum = item.wo_maximo
                data.workorderid = item.wo_maximo_id
            }
        } else if ((this.type == 1 || this.type == 2) && this._isAreaMaximo(this.areaSelected) 
                    && this._originalArea == null) {
            //Paro finalizado pero sin identificar
            data.description = I18n.t('wom_created_desc', {
                area: this.state.selected.name, code: this.state.selectedIssue.code
            })
            data.description += (" - " + this._descTool + " - Closed Downtime")
            data.option = 2
        } else {
            //Paro finalizado pero se reidentifica a un area no valida
            if (this._isAreaMaximo(this._originalArea) && (this._originalArea != this.areaSelected) 
                    && !this._isAreaMaximo(this.areaSelected)) {
                data.description = I18n.t('wom_reason_cancel', 
                                    { ogArea: this.failure.name, ogIssue: this.failure.code,
                                      nwArea: this.state.selected.name, nwIssue: this.state.selectedIssue.code,
                                      tool:  this._descTool})
                data.option = 3
                data.wonum = item.wo_maximo
                data.workorderid = item.wo_maximo_id
            } else if (this._isAreaMaximo(this.areaSelected)) {
                //Paro finalizado identificado cambia entre areas de maximo, solo se actualiza
                data.description = I18n.t('wom_created_desc', {
                    area: this.state.selected.name, code: this.state.selectedIssue.code
                })
                data.description += (" - " + this._descTool  + " - Closed Downtime")
                data.option = 4
                data.wonum = item.wo_maximo
                data.workorderid = item.wo_maximo_id
            }
        }
        return data
    }

    _createWorkOrderMaximo(item) {
        let data = this._prepareWorkOrderMaximo(item)
        let option = data.option
        delete data['option']
        if (option == 1 || option == 2) {
            this.setState({ isLoading: true })
            this.props.checkExistsWOMSFMS(data.dtId).then(() => {
                if (this.props.existsWOMSFMS) {
                    this.setState({ isLoading: false, loteRollo: null })
                    this.setState({ showAlertMaximo: false })
                    this.props.navigation.goBack()
                } else {
                    this.props.createWorkOrderMaximo(data).then(() => {
                        this.setState({ isLoading: true, loteRollo: null })
                        this.setState({ showAlertMaximo: this.props.respWOMResponse.showAlert })
                        if (this.props.respWOMCorrect) {
                            this.setState({ woMaximoId: this.props.respWOMResponse.wonum })
                            this.setState({ isLoading: false })
                            let order = this._createWorkOrderMaximoSFMS(this.props.respWOMResponse)
                            this.setState({ isLoading: true })
                            this.props.createWorkOrderMaximoSFMS(order).then(() => {
                                this.setState({ isLoading: false })
                                this.modal1.showModal()
                                if (option == 2) {
                                    this.setState({ isLoading: true })
                                    update = {}
                                    data.wonum = this.props.respWOMResponse.wonum
                                    data.fechaFinParo = moment(item.closedAt).tz('America/Monterrey').format('YYYY-MM-DDTHH:mm:ss')
                                    data.worklogDescription = this.state.selected.name
                                    data.workorderid = this.props.respWOMResponse.workorderid
                                    this.props.updateWorkOrderMaximo(data).then(() => {
                                        if (this.props.respWOMCorrectUpd) {
                                            this._updateWorkOrderMaximoSFMS(data, 'PROCESADA')
                                            this.setState({ isLoading: false })
                                        } else {
                                            let message = this._getErrorMessageMaximo(this.props.respWOMResponseUpd.message)
                                            data.message = message
                                            this._updateWorkOrderMaximoSFMS(data, 'ABIERTA')
                                            this.setState({ woMaximoMessage: `${I18n.t('wom_error_alert')} (${message})` })
                                            this.setState({ isLoading: false })
                                        }
                                    })
                                }
                            })
                        } else {
                            let order = this._createWorkOrderMaximoSFMS(this.props.respWOMResponse)
                            let message = this._getErrorMessageMaximo(this.props.respWOMResponse.message)
                            this.setState({ woMaximoMessage: `${I18n.t('wom_error_alert')} (${message})` })
                            this.setState({ isLoading: false })
                            this.modal1.showModal()
                            this.props.createWorkOrderMaximoSFMS(order).then(() => {
                                this.setState({ isLoading: false })
                            });
                        }
                    }).catch((error) => {
                        let order = this._createWorkOrderMaximoSFMS(this.props.respWOMResponse)
                        let message = this._getErrorMessageMaximo(this.props.respWOMResponse.message)
                        this.setState({ woMaximoMessage: `${I18n.t('wom_error_alert')} (${message})` })
                        this.setState({ isLoading: false })
                        this.modal1.showModal()
                        this.props.createWorkOrderMaximoSFMS(order).then(() => {
                            this.setState({ isLoading: false })
                        });
                    })
                }
            })
        } else if (option == 3 || option == 4) {
            this.setState({ isLoading: true })
            if (data.wonum != null) {
                data.fechaFinParo = moment(item.closedAt).tz('America/Monterrey').format('YYYY-MM-DDTHH:mm:ss')
                data.worklogDescription = this.state.selected.name
                this.props.updateWorkOrderMaximo(data).then(() => {
                    if (this.props.respWOMCorrectUpd) {
                        this._updateWorkOrderMaximoSFMS(data, (option == 3 ? 'CANCELADA' : 'PROCESADA'))
                        this.setState({ isLoading: false })
                    } else {
                        let message = this._getErrorMessageMaximo(this.props.respWOMResponseUpd.message)
                        data.message = message
                        this._updateWorkOrderMaximoSFMS(data, 'ABIERTA')
                        this.setState({ woMaximoMessage: `${I18n.t('wom_error_alert')} (${message})` })
                        this.setState({ isLoading: false })
                    }
                    this.setState({ isLoading: false })
                    if (this.props.navigation.state.params.actualReport) {
                        this.modal1.showModal()
                    }
                    this.props.navigation.goBack()
                })
            } else {
                this.setState({ isLoading: false })
                this.props.navigation.goBack()
            }
        } else {            
            this.setState({ isLoading: false })
            if (this.props.navigation.state.params.actualReport) {
                this.modal1.showModal()
            }
            this.props.navigation.goBack()
        }
    }

    _createWorkOrderMaximoSFMS(data) {
        let order = Object.assign({}, data)
        order.dtId = this.failure.id
        order.message = this._getErrorMessageMaximo(data.message)
        order.user = this.props.currentUser.username
        order.tadi = this.props.currentUser.tadi
        return order
    }

    _updateWorkOrderMaximoSFMS(data, status) {
        let order = Object.assign({}, data)
        order.dtId = this.failure.id
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

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    headerText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.coolGrey,
    },
    searchContainer: {
        height: 36,
        borderRadius: 10,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.silver,
        margin: 10,
    },
    searchInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 32,
        borderRadius: 10,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        paddingLeft: 10,
        paddingRight: 10,
    },
    currentComponentHeader: {
        margin: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentComponentHeaderText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: '#323d50',
        flex: 1,
    },
    componentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 42,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.coolGrey,
        paddingLeft: 10,
        paddingRight: 10,
    },
    componentItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.darkGreyBlue,
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    }
})

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        data: state.issues.issueTypes,
        failureIdentified: state.issues.failureIdentified,
        issues: state.issues.issues,
        currentUser: state.session.profile,
        respWOMResponse: state.forumComments.respWOMResponse,
        respWOMCorrect: state.forumComments.respWOMCorrect,
        respWOMResponseUpd: state.forumComments.respWOMResponseUpd,
        respWOMCorrectUpd: state.forumComments.respWOMCorrectUpd,
        respWOMResponseSFMS: state.forumComments.respWOMResponseSFMS,
        respWOMResponseSFMSUpd: state.forumComments.respWOMResponseSFMSUpd,
        existsWOMSFMS: state.forumComments.existsWOMSFMS,
        recordWOMSFMS: state.forumComments.recordWOMSFMS,
        toolCurrentDT: state.forumComments.toolCurrentDT
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchIssueTypes, fetchIssuesByType, assignFailure, selectSingleIssue, 
        createWorkOrderMaximo, updateWorkOrderMaximo, createWorkOrderMaximoSFMS, updateWorkOrderMaximoSFMS,
        checkExistsWOMSFMS, getToolCurrentDT }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyFailure)