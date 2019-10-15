import React, { Component } from 'react'
import { View, StatusBar, Platform, AppState, Text } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './store'
import { setPushNotificationToken, setOrientation, fetchServerSession, checkForUpdates } from './screens/login/actions'
import { fetchCurrentFailure } from './screens/home/actions'
import Orientation from 'react-native-orientation'
import OneSignal from 'react-native-onesignal'
import Navigator from './navigation/Navigator'
import { navigate } from './helpers'
import { colors } from './styles/theme'
import I18n from './i18n/i18n'

export default class App extends Component {
    state = {
        appState: AppState.currentState
    }

    appUpdateChecker;

    constructor(props) {
        super(props)
        this._handleAppStateChange = this._handleAppStateChange.bind(this)
        store.dispatch(setOrientation())
        if(store.getState().session.tablet){
            Orientation.lockToLandscape();
        }else{
            Orientation.lockToPortrait()
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            store.dispatch(fetchCurrentFailure())
            store.dispatch(fetchServerSession())
        }
        this.setState({ appState: nextAppState })
    }

    componentDidMount() {        
        AppState.addEventListener('change', this._handleAppStateChange)
    }

  	async componentWillMount() {
        this.checkForUpdates()
        this.appUpdateChecker = setInterval((() => this.checkForUpdates()), 30 * 1000);
	  	OneSignal.inFocusDisplaying(2)
        OneSignal.addEventListener('received', this.onReceived)
        OneSignal.addEventListener('opened', this.onOpened)
        OneSignal.addEventListener('ids', this.onIds)
    }

    checkForUpdates(){
        console.log('Check for update');
        console.log(checkForUpdates)
        store.dispatch(checkForUpdates())
    }

    componentWillUnmount() {
        clearInterval(this.appUpdateChecker);
        AppState.removeEventListener('change', this._handleAppStateChange)
        OneSignal.removeEventListener('received', this.onReceived)
        OneSignal.removeEventListener('opened', this.onOpened)
        OneSignal.removeEventListener('ids', this.onIds)
    }

    onReceived(notification) {
        console.log("Notification received: ", notification)
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body)
        console.log('Data: ', openResult.notification.payload.additionalData)
        console.log('isActive: ', openResult.notification.isAppInFocus)
        console.log('openResult: ', openResult)
        if(openResult.notification.payload.additionalData.type==1){
            report = store.getState().userMachine.report
            if(report){
                if(report.issue){
                    navigate('FailureDetailModal', report.id)
                }else{
                    navigate('Paros')
                }
            }
        }
    }

    onIds(device) {
        if (device.pushToken !== null) {
            let token = Platform.OS === 'ios' ?
                device.pushToken.replace('<', '').replace('>', '').replace(' ', '') : device.pushToken
            
            store.dispatch(setPushNotificationToken(token || ''))
        }
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}}>
					<StatusBar
						backgroundColor={colors.darkGreyBlue}
						barStyle="light-content"
					/>
                    <Navigator />
				</View>
			</Provider>
		)
	}
}
