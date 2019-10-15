import React from 'react'
import { View, Alert, Icon } from 'react-native'
import { SensaiButton, NavHeader } from '../components'
import { StackNavigator } from 'react-navigation'
import { stackDefaultOptions } from '../helpers'
import I18n from '../i18n/i18n'
import { colors, theme } from '../styles/theme'
import { navigate, goBack } from "../helpers"

import QualityInspection from '../screens/qualityInspection/QualityInspection'
import InspectionsHistory from '../screens/qualityInspection/InspectionsHistory';
import InspectionList from '../screens/qualityInspection/InspectionList'
import InspectionSheet from '../screens/qualityInspection/InspectionSheet'
import SettingsUI from '../screens/qualityInspection/SettingsUI'
import RunningMachine from '../components/RunningMachine';
import TrendReport from '../screens/qualityInspection/Report';

export default QualityInspectionNavigator = StackNavigator({
    Home: {
        screen: QualityInspection,
        navigationOptions: ({ navigation }) => {
            return {
                header: <NavHeader qualityExtra={true} settings={true} onSettingsPress={() => navigation.navigate('Settings') } />
            }   
        }
    },
    InspectionsHistory: {
        screen: InspectionsHistory,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: <RunningMachine />
            }
        }
    },
    TrendReport: {
        screen: TrendReport,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: <RunningMachine />
            }
        }
    },
    InspectionList: {
        screen: InspectionList,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: <RunningMachine />
            }
        }
    },
    InspectionSheet: {
        screen: InspectionSheet,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: <RunningMachine />
            }
        }
    },
    Settings: {
        screen: SettingsUI
    }
},stackDefaultOptions("Home"));

const prevGetStateForAction = QualityInspectionNavigator.router.getStateForAction;

QualityInspectionNavigator.router.getStateForAction = (action, state, navigation) => {
    

    if(action.type === "Navigation/BACK" && state && state.routes[state.index].params && state.routes[state.index].params.lockBack){
        Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_logout'), [
            {text: I18n.t('alert_yes'), onPress: () => {
                state.routes[state.index].params.lockBack = false
                goBack()
            }},
            {text: I18n.t('alert_no')}
        ])
    
        return state;
    }

    return prevGetStateForAction(action, state);
}