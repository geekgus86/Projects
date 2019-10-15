import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity, AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import I18n from '../i18n/i18n'
import { SensaiButton, SensaiRow, BarChart } from './'
import { colors, theme } from '../styles/theme'
import { upperCase, navigate, goBack } from '../helpers'
import { subscribeTo, unsubscribe } from '../lib/Socket'
import Network from '../lib/Network'
import moment from 'moment-timezone'
import 'moment/locale/es'
import { NetInfo } from 'react-native'
import { store } from '../store'
import { fetchServerSession} from '../screens/login/actions'
import { fetchCurrentFailure } from '../screens/home/actions'
import { inRoom, reconnectSocket } from '../lib/Socket'


export class FailureHeader extends PureComponent {
    state = {
        startTimer: null,
        diff: 0,
        timer: null,
        outDesc: null,
        isConnected: true,
        reconnect : null,
        callPing : 1,
        hourInit : null,
        ipAddress : null,
        userName : null,
    }
    _mounted = false

    constructor(props) {
        super(props)
        this.tick = this.tick.bind(this)
        this.callOnFailurePress = this.callOnFailurePress.bind(this)
        this.callOnSettingPress = this.callOnSettingPress.bind(this)
        this.escalationTime = this.escalationTime.bind(this)
        this.getDescIssue = this.getDescIssue.bind(this)
    }

    callOnFailurePress() {
        navigate('NewReportModal', {})
    }

    callOnSettingPress() {
        this.props.onSettingPress && this.props.onSettingPress()
    }

    escalationTime(data){
        if (this._mounted === true) {
            let diff = Math.round(data.currentEscalationTime/1000)
            if(data.extraDowntime){
                diff+=(data.extraDowntime*1)
            }
            let h = Math.floor(diff / (60 * 60))
            diff = diff - (h * 60 * 60)
            let m = Math.floor(diff / (60))
            diff = diff - (m * 60)
            let s = diff
            this.setState({ diff: `${h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}` })
        }
    }

    async getDescIssue(data){
        if(data){
            let response = await Network.get('/issue/' + data.issue);
            if(response){
                this.setState({ outDesc : response.DescIssue});
            }else{
                this.setState({ outDesc : null});
            }
        }
    }

    tick() {
        const { report } = this.props
        if (report !== null && this._mounted) {
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
            this.setState({ diff: `${h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}` })
        }
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    async callme(){
        let callPing = null 
            try {
              let valApi = await Network.get('/versionapp');

              if(!valApi.version){
                let profPaso= await AsyncStorage.getItem('sessionData')
                let jsonP = JSON.parse(profPaso)
                let userName = jsonP['Profile'].username
                callPing = 0
                this.setState({ userName })
              }else{
                //let schema = await AsyncStorage.getItem('schema') 
                //reconnectSocket(schema) 
                //inRoom(schema)
                callPing = 1
              }

            } catch (error) {
              callPing = 0
            }
            this.setState({ callPing })
    }

    async saveme(strinfo){
        try{
            const response = await Network.post('/network_log/save_log', {
                strinfo: strinfo,
            })
            console.log('SAVE ERROR NETWORK: ', response)
            let reconnect = null
            let hourInit = null
            this.setState({reconnect})
            this.setState({hourInit})
        } catch (error) {
            console.error('SAVE ERROR NETWORK: ', error)
        }
    }

    async getip(){
        let ipApi = await Network.get('https://jsonip.com/');
        let ipAddress = ipApi.ip
        this.setState({ ipAddress })
    }

    componentDidMount() {
        this._mounted = true
        this.getip() 
        //subscribeTo('escalation-time', this.escalationTime)
        if(this.state.timer === null) {
            clearInterval(this.state.timer)
            let timer = setInterval(this.tick, 1000)
            this.setState({ timer })
        }
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('Expected to see value logged: ', isConnected);
            this.setState({ isConnected });
        });
        this.interval = setInterval(() =>
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.callme()
            let dateT = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let hourInit = ''
            let reconnect = ''
            if(this.state.reconnect != null){
                reconnect = this.state.reconnect
            }else{
                reconnect = null
            }
            if(this.state.hourInit != null){
                hourInit = this.state.hourInit
            }else{
                hourInit = null
            }
            let callPing = this.state.callPing
            if(this.state.reconnect == null && callPing == 0){
                hourInit = dateT
                reconnect = connectionInfo.type + '_' + callPing
                console.log('NETWORK LOSS: ',reconnect);
                this.setState({reconnect})
                this.setState({hourInit})
            }else if(this.state.reconnect != null && callPing == 1){  
                store.dispatch(fetchCurrentFailure())
                store.dispatch(fetchServerSession())           
                reconnect = reconnect + '_' + this.state.hourInit + '_' + dateT + '_' + this.state.ipAddress + '_' + this.state.userName
                this.saveme(reconnect)
            }  
            console.log('NETWORK STATUS: ', connectionInfo.type + '_' + callPing);
        })
        , 4000);
    }

    componentWillUnmount() {
        this._mounted = false
        clearInterval(this.state.timer)
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    render() {
        const { marginWrapper, headerRow, status, subText, pill, pillOutTime, pillIcon, pillText, pillTextOutTime, backArrow } = styles

        let statusStr = ''
        let statusColor = ''
        let headerColor = colors.darkGreyBlue
        let creationDate = ''
        let failureInfo = null
        let timerPill = null
        if(!this.state.isConnected){
            headerColor = colors.tomato
            statusColor = colors.coolGrey
            statusStr = upperCase(I18n.t('app_error_internet'))
        }else if (this.props.failure === false && this.props.report == null) {
            
                statusColor = colors.darkMint
                if(this.state.callPing > 0)
                    statusStr = upperCase(I18n.t('machine_okStatus'))
                else
                    statusStr = upperCase(I18n.t('machine_okStatus')) + ' - Sin salida a Internet'
                /*timerPill = (
                    <SensaiButton
                        sm={true}
                        danger={true}
                        text={'REPORTA FALLA'}
                        onPress={this.callOnFailurePress}
                    />
                )*/
                timerPill = null           
        }else {            
            statusStr = upperCase(I18n.t('machine_failureStatus'))
            let failureDesc = I18n.t('machine_undefinedFailureText')          
            if(this.props.report){
                headerColor = colors.tomato
                failureDesc = this.props.report.desc || failureDesc
                if (this.props.report.issue_type == 5) {
                    this.getDescIssue(this.props.report)
                    failureDesc = this.state.outDesc != null ? this.props.report.desc + " - " + this.state.outDesc : ''
                    headerColor = colors.black
                    statusColor = '#535456'
                } else if (this.props.report.report_type == 2) {
                    statusStr = upperCase(I18n.t('machine_changeoverStatus'))
                    headerColor = '#ff6d10'
                }  
            }
            if(this.props.report.is_try_out1){
                statusStr = "TRY OUT"
            }
            if(!this.props.report.try_out){
                statusColor = colors.reddish
            }
            
            if(this.props.report.is_out){
                statusStr = "OUT"
            }
     
            if (this.props.report != null) {
                creationDate = (this.props.report == null) ? '' : moment(this.props.report.createdAt).tz('America/Monterrey').format('DD/MMM/YY @ hh:mm A')
                timerPill = (
                    <View style={[pill, (this.props.report.issue_type == 5 ? pillOutTime : {})]}>
                        <Icon name='clock' size={20} color={this.props.report.issue_type==5?colors.white:colors.darkGreyBlue} style={pillIcon} />
                        <Text style={[pillText, (this.props.report.issue_type == 5 ? pillTextOutTime : {})]}>{this.state.diff}</Text>
                    </View>
                )                
                failureInfo = (
                    <View style={[headerRow, { marginTop: 10 }]}>
                        <View>
                            <Text style={styles.mainText}>{failureDesc}</Text>
                            {this.props.report.issue_type != 5 ? <Text style={subText}>{creationDate}</Text> : null}
                        </View>
                        {this.props.report.issue_type != 5 ? 
                            <View style={pill}>
                                <Text style={pillText}>{this.props.escalationLevel || I18n.t('microstop')}</Text>
                            </View> 
                        : timerPill}
                    </View>
                )
                if (this.props.report.issue_type == 5) {
                    timerPill = null;
                }
                if(this.props.report.escalationLevel==1 && this.props.report.report_type == 2){
                    failureInfo = (
                        <View style={[headerRow, { marginTop: 10 }]}>
                            <View>
                                <Text style={styles.mainText}>{failureDesc}</Text>
                                {this.props.report.issue_type != 5 ? <Text style={subText}>{creationDate}</Text> : null}
                            </View>
                        </View>
                    )
                }
            }
        }

        let back = null
        if (this.props.enableBack === true) {
            back = (
                <View style={backArrow}>
                    <TouchableOpacity style={{backgroundColor: headerColor}} onPress={(event) => { 
                        if(this.props.customEvent){
                            this.props.customEvent()
                        }else{
                            goBack() 
                        }
                    }} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
                        <MaterialIcon name='arrow-back' size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{backgroundColor: headerColor}}>
                <View style={marginWrapper}>
                    <View style={headerRow}>
                        <View style={{ flexDirection: 'row' }}>
                            {back}
                            <View>
                                <Text style={[theme.headerText, {textAlign: 'left'}]}>{this.props.machineName}</Text>
                                <View style={status}>
                                    <Icon name='circle' size={10} color={statusColor} />
                                    <Text style={[subText, { marginLeft: 5 }]}>{statusStr}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {timerPill}
                        </View>
                    </View>
                    {failureInfo}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    marginWrapper: {
        margin: 10,
        marginTop: Platform.OS === "ios" ? 20 : 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.white,
    },
    subText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.32,
        textAlign: 'left',
        color: colors.white,
    },
    pill: {
        borderRadius: 5,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
    },
    pillOutTime: {
        backgroundColor: '#535456'        
    },
    pillIcon: {
        alignSelf: 'center',
    },
    pillText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.37,
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.tomato,
        marginLeft: 5,
    },
    pillTextOutTime: {
        color: colors.white,
        fontWeight: 'bold',
    },
    backArrow: {
        width: 22,
        height: 22,
        alignSelf: 'center',
        marginRight: 10
    }
})