import React, { PureComponent } from 'react'
import { Alert, View, ActivityIndicator, AsyncStorage, Text, Image, ImageBackground, StyleSheet, Linking, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SwitchNavigator } from 'react-navigation'
import NoSessionNavigator from './NoSessionNavigator'
import NoCheckedNavigator from './NoCheckedNavigator'
import MainTabNavigator from './MainTabNavigator'
import QualityMainNavigator from './QualityMainNavigator'
import { colors, theme } from '../styles/theme'
import { setTopLevelNavigator, navigate } from '../helpers'
import { fetchServerSession, fetchDomain } from '../screens/login/actions'
import { fetchLocalMachine } from '../screens/home/actions'
import I18n from '../i18n/i18n'
import { SensaiButton } from '../components/SensaiButton'
import config from '../../src/lib/config'

import PushNotification from 'react-native-push-notification'
import moment from 'moment-timezone'
import 'moment/min/moment-with-locales'
import 'moment/locale/es'

let actualroute = null
let start = null
let timer = null

class Navigator extends PureComponent {
    state = {
        isBusy: true
    }
    defaultLanguage = true;
    componentDidMount() {
        if(timer === null){
            AsyncStorage.getItem('@AppStore:timer').then((value)=>{
                if(value){
                    clearInterval(timer)
                    timer = setInterval(this.tick, 1000)
                }
            })
        }
    }

    componentWillMount() {
        this.props.fetchDomain().then(() => {
            this.props.fetchLocalMachine()
            this.props.fetchServerSession().then(() => {
                this.setState({ isBusy: false })
            })
        })
    }

    getNavigator() {  
        if(this.defaultLanguage && this.props.profile.language){
            I18n.locale = this.props.profile.language || 'es'
            moment.locale(this.props.profile.language || 'es');
            this.defaultLanguage = false;
        }
        let nav = 'SignedIn';

        if(this.props.profile && this.props.profile.aro == 5){
            nav = 'SignedInQuality';
        }
        if(!this.props.currentMachine){
            nav = 'NotCheckedIn'
            clearInterval(timer)
        }

        return SwitchNavigator({
            SignedIn: {
                screen: MainTabNavigator
            },
            NotCheckedIn: {
                screen: NoCheckedNavigator
            },
            SignedInQuality: {
                screen: QualityMainNavigator
            },
            SignedOut: {
                screen: NoSessionNavigator
            }
        }, {
            initialRouteName: (this.props.session !== null) ? nav : 'SignedOut'
        })
    }

    _onNavigationStateChange(prevState, currentState) {
        let route = currentState
        while(route['routes']){//get actual route
            route = route['routes'][route.index]
        }
        actualroute = route.routeName
        if(actualroute=='ChecklistModal' && timer === null){
            clearInterval(timer)
            timer = setInterval(this.tick, 1000)
        }
    }
    
    async tick() {
        try {
            let checklist = await AsyncStorage.getItem('checkListStatus')
            let session = await AsyncStorage.getItem('sessionData')
            if(!checklist && session){
                if(!start){
                    start = await AsyncStorage.getItem('@AppStore:timer');
                    if(!start){
                        start = moment().format('YYYY-MM-DD HH:mm:ss')
                        await AsyncStorage.setItem('@AppStore:timer', start);
                    }
                }
                let now = new Date().getTime()
                let creation = new Date(moment(start).format()).getTime()
                let diff = Math.round((now - creation) / 1000)
                let h = Math.floor(diff / (60 * 60))
                diff = diff - (h * 60 * 60)
                let m = Math.floor(diff / (60))
                diff = diff - (m * 60)
                let s = diff
                //console.log(actualroute, `${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}`)
                if(m==8 && s == 0){
                    PushNotification.localNotification({
                        title: I18n.t('alert_title'),
                        message: I18n.t('checklist_incomplete')
                    })
                    if(actualroute!='ChecklistModal' && actualroute!='ValidateUser'){
                        Alert.alert(
                            '',
                            I18n.t('checklist_timerOut'),
                            [
                                {text: I18n.t('checklist_navigate'), onPress: () => {
                                    navigate('ChecklistModal')
                                }},
                            ],
                            { cancelable: false }
                        )
                    }
                }
                if(m==5 && s == 0){
                    PushNotification.localNotification({
                        title: I18n.t('alert_title'),
                        message: I18n.t('checklist_incomplete')
                    })
                    if(actualroute!='ChecklistModal' && actualroute!='ValidateUser'){
                        Alert.alert(
                            '',
                            I18n.t('checklist_timerAlert'),
                            [
                                {text: I18n.t('checklist_navigate'), onPress: () => {
                                    navigate('ChecklistModal')
                                }},
                            ],
                            { cancelable: false }
                        )
                    }
                }
                if(m>8 && s>0){
                    clearInterval(timer)
                    timer = start = null
                }
            }else{
                clearInterval(timer)
                timer = start = null
                await AsyncStorage.removeItem('@AppStore:timer')
            }
        } catch (error) {
            console.log(error)
        }
    }

    downloadNewVersion(){
        if(Platform.OS === 'android'){
            Linking.openURL('https://play.google.com/store/apps/details?id=com.metalsa.sensai');
        }else{
            Linking.openURL('https://tiny.app.link/WZPyJ2mnNU');
        }
        
    }

    render() {
        const { containerStyle } = styles
        let Nav = this.getNavigator()
        let content = null
        if(this.props.changeVersion){
            content = 
            <View style={{ flex: 1, backgroundColor: '#243746'}}>
                <Image style={{alignSelf: "center", width: 36, height: 33, marginTop: 30}} source={require('../assets/alerta.png')}/>
                <View style={{flex: 1,justifyContent: "center",backgroundColor: 'white', marginTop: 10}}>
                    <ImageBackground resizeMode="center" style={{flex: 1, justifyContent: "center"}} source={require('../assets/version_bg.png')}>
                        <View style={containerStyle}>
                            <ImageBackground resizeMode="center" style={{ height: 200, justifyContent: "center"}} source={require('../assets/alerta.png')}>
                                <Text style={{margin: 25, fontWeight: '600', textAlign: "center", fontSize: 25, lineHeight: 40}}>{I18n.t('update_app')}</Text>
                            </ImageBackground>
                            <SensaiButton text={I18n.t('qualityInspection_s_update')} onPress={this.downloadNewVersion} buttonStyle={{alignSelf: "center", width: 200, marginBottom: 10, marginTop: 20}} />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        }else{
            if (this.state.isBusy === true) {
                content = (
                    <View style={theme.initialLoaderContainer}>
                        <ActivityIndicator color={colors.white} size='large' />
                    </View>
                )
            } else {
                content = <Nav ref={navigatorRef => {
                    setTopLevelNavigator(navigatorRef)
                }} onNavigationStateChange={this._onNavigationStateChange.bind(this)} />
            }
        }
        
        return content
    }
}

const styles = StyleSheet.create({
    containerStyle: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 25,
      marginRight: 25,
      justifyContent: "center",
      borderRadius:6,height: 450, backgroundColor: 'white',
    }
  })

function mapStateToProps(state) {
    // console.log("STATE", state.session);
    return {
        language: I18n.locale,
        session: state.session.info,
        profile: state.session.profile,
        currentMachine: state.userMachine.machine,
        changeVersion: (state.session.versionInfo && state.session.versionInfo.version) ? (state.session.versionInfo.version != config['version']) : false
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchServerSession, fetchDomain, fetchLocalMachine }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)