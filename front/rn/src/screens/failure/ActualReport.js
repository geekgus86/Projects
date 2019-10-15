import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { SensaiButton, AlertConfirmModal } from '../../components'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors, theme } from '../../styles/theme'

import I18n from '../../i18n/i18n'
import moment from 'moment-timezone'
import 'moment/locale/es'
import BottomSheet from 'react-native-bottomsheet'
import { navigate, upperCase  } from '../../helpers'

export class ActualReport extends PureComponent{
    state = {
        diff: 0,
        timer: null,
    }

    _mounted = false

    constructor(props) {
        super(props)
        this.tick = this.tick.bind(this)
    }
    
    componentDidMount() {
        this._mounted = true
        if (this.state.timer === null) {
            clearInterval(this.state.timer)
            let timer = setInterval(this.tick, 1000)
            this.setState({ timer })
        }
    }

    componentWillUnmount() {
        this._mounted = false
    }

    tick() {
        const report  = this.props.report
        if (report !== null) {
            let now = new Date().getTime()
            let creation = new Date(moment(report.createdAt).format()).getTime()
            let diff = Math.round((now - creation) / 1000)
            if(report.extraDowntime){
                diff+=(report.extraDowntime*1)
            }
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

    _loadFailureOptions(item, returnFunction) {
        BottomSheet.showBottomSheetWithOptions({
            options: [item.name ? I18n.t('details') : I18n.t('ask_assistance') , I18n.t('cancel')],
            title: I18n.t('options'),
            dark: false,
            cancelButtonIndex: 2,
        }, (value) => {
            returnFunction(item, value)
        });
    }

    _showOptions(item, returnFunction){
        let now = new Date().getTime()
        let creation = new Date(moment(item.createdAt).format()).getTime()
        let diff = Math.round((now - creation) / 1000)
        item.open_minutes = Math.floor(diff / 60)
        
        if(!item.report){
            item.report = item.id
        }
        if(!item.issue){
            item.issue = null
            item.desc = null
        }

        navigate('IdentifyFailureModal', { failure: item, report_type: item.report_type, returnFunction: returnFunction, actualReport: true  })
        /*if(item.issue==null){
        }else{
            //this.modal.showModal()
            BottomSheet.showBottomSheetWithOptions({
                options: ['Editar', 'Cancelar'],
                title: 'Opciones de '+(item.report_type==3?'C/O':'paro')+' actual',
                dark: false,
                cancelButtonIndex: 1,
            }, (value) => {
                switch(value){
                    case 0:
                        navigate('IdentifyFailureModal', { failure: item, report_type: item.report_type, returnFunction: returnFunction, actualReport: true })
                        break;
                    default:
                        break;
                }
            });
        }*/
    }

    render() {
        const { report, returnFunction }  = this.props
        const { container, card, commment, eventTitle, timeStamp, containerWrapper, mainText, areaColorIndicatior, 
            areaContainer, areaLabel, iconCircle, detailContainer, downTimeText, woMaximoStyle, rowStyle } = styles
        
        let creationDate = (report === null) ? '' : moment(report.createdAt).tz('America/Monterrey').format('DD/MMM, h:mm A')
        let reportNumber = (report === null) ? '' : report.report_number
        let issueType = (report === null) ? '--' : report.name || '--'
        let areaColor = "#034ea2"
        let borderColor = "#034ea2"
        let iconBackground = ''
        let icon = 'ban'
        let titleColor = ''
        if (report.issue !== null) {
            areaColor = report.color
            borderColor = (report.color === '#FFFFFF') ? colors.coolGrey : report.color
        }
        if(reportNumber==0){
            reportNumber = 1
        }
        let failureDesc = I18n.t('machine_undefinedFailureText')
        if(report.desc){
            failureDesc = report.desc
        }
        let headerColor = titleColor = iconBackground = colors.tomato
        let labelType = I18n.t('identify')
        if(report.issue){
            labelType = I18n.t('modify')
        }

        let title = report.report_number ? `${I18n.t('stop')} #${report.report_number}` :  `${I18n.t('actual_stop')}`
        let buttonTitle = `${labelType} ${I18n.t('stop')}`
        if(report.report_type == 2){
            headerColor = titleColor = iconBackground = '#ff6d10'
            title = report.report_number ? `${I18n.t('changeover')} #${report.report_number}` : `${I18n.t('actual_changeover')}`
            buttonTitle = `${labelType} ${I18n.t('changeover')}`
        }
        if(report.escalationLevel==1 && report.report_type!==2){
            return null
        }
        if (report.issue_type != null && report.issue_type == 5) {
            headerColor = titleColor = iconBackground = colors.black;
        }
        let showWo = report.show_wo
        let showMaximo = this.props.showMaximo && (report.issue_type == 3 || report.issue_type == 4)
        let lblWOM = I18n.t('wo_title_row')
        let txtMaximo = (report.wo_maximo != null) ? (
            <Text style={[woMaximoStyle, { fontWeight: "normal"}]}>{report.wo_maximo}</Text>
        ) : (<Text style={[woMaximoStyle, { fontWeight: "bold",  color: "red"}]}>Error: [{report.wo_maximoMsg}]</Text>)
        let viewMaximo = ((showMaximo == true || showWo) && (report.wo_maximo != null || report.wo_maximoMsg != null)) ? (
            <View style={rowStyle}>
                <Text style={[woMaximoStyle, { fontWeight: "600"}]}>{lblWOM}: </Text>
                {txtMaximo}
            </View>
        ) : null;

        content = (
            <View style={{ marginTop: 10 }}>
                <Text style={mainText}>{failureDesc}</Text>
                {viewMaximo}
                <View style={{ marginTop: 5 }}>
                    <View style={detailContainer}>
                        <Text style={downTimeText}>
                            {I18n.t('downtime')}: {this.state.diff}
                        </Text>
                        {issueType!='--'?
                            <View style={areaContainer}>
                                <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                <View style={[areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                            </View>:null
                        }
                    </View>
                </View>
            </View>
        )
        return (
            <View style={container}>
                <View style={card}>
                    <View style={containerWrapper}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={[iconCircle, { backgroundColor: iconBackground }]}>
                                <LineIcon name={icon} size={20} color={colors.white} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={[eventTitle, { color: titleColor }]}>{title}</Text>
                                <Text style={timeStamp}>{creationDate}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <SensaiButton
                                xs
                                text={buttonTitle}
                                negativebg={report.issue?true:false}
                                onPress={() => {
                                    this._showOptions(report, this.props.onPress)
                                }}
                            />
                        { this.props.report.try_out == false?
                            <TouchableOpacity 
                                style={{ 
                                    width: 20, 
                                    paddingLeft: 5,
                                    marginLeft: 0, 
                                    alignItems: 'flex-end'
                                }}
                                onPress={() => this._loadFailureOptions(report, returnFunction)}
                            >
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <Icon name="ellipsis-v" size={32} />
                                </View>
                            </TouchableOpacity>
                        :null }
                        </View>
                    </View>
                    { content }

                    <AlertConfirmModal 
                        ref={(r)=>{this.modal = r}} 
                        title = {I18n.t('modify_stop')}
                        message = {I18n.t('modify_code_stop')} 
                        confirmText = {I18n.t('modify_code')}
                        cancelText = {I18n.t('new_stop')}
                        onConfirm={()=>{
                            navigate('IdentifyFailureModal', { failure: report, report_type: report.report_type, returnFunction: returnFunction, actualReport: true  })
                        }}
                        onCancel={()=>{
                            this.props.createReport()
                        }} />          
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    card: {
        flex: 10,
        backgroundColor: colors.white,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 2,
        padding: 12,
        margin: 10,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 4,
    },
    containerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eventTitle: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.orangeRed,
    },
    timeStamp: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#898b8e'
    },
    commment: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "italic",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.darkGreyBlue
    },
    mainText: {
        marginTop: 5,
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.darkGreyBlue
    },
    areaColorIndicatior: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginLeft: 5
    },
    areaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    areaLabel: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    downTimeText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    woMaximoStyle: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        backgroundColor: 'white'
    },
    rowStyle: {
        marginTop: 5,
        flexDirection: "row"
    }
})