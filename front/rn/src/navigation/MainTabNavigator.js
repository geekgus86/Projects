import React from 'react'
import { Image } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { colors } from '../styles/theme'
import MainTabBar from './MainTabBar'
import ExternalChecklist from "../screens/checklist/ExternalChecklist";
import ToolParameters from "../screens/production/ToolParameters";
import ChangeOver from "../screens/production/ChangeOver";
import LastShiftLog from '../screens/lastShiftLog/LastShiftLog'
import Production from '../screens/production/Production'
import FailureHome from '../screens/failure/FailureHome'
import FailureDetail from '../screens/failure/FailureDetail'
import FailureHistory from '../screens/failure/FailureHistory'
import Monitor from '../screens/monitor/Monitor'
import Hxh from '../screens/hxh/Hxh'
import ProfileNavigator from './ProfileNavigator'
import Checklist from '../screens/checklist/Checklist'
import ValidateUser from '../screens/home/ValidateUser'
import ValidateTadi from '../screens/failure/components/ValidateTadi'
import IdentifyFailure from '../screens/report/IdentifyFailure'
import IdentifyOut from '../screens/tryout/IdentifyOut'
import FailureComments from '../screens/failure/FailureComments'
import NotCheckedIn from '../screens/home/NotCheckedIn'
import ReportFailure from '../screens/report/ReportFailure'
import MergeDowntime from '../screens/home/MergeDowntime'
import SplitDowntime from '../screens/home/SplitDowntime'
import ProcessParameter from '../screens/processParameter/ProcessParameter'
import I18n from '../i18n/i18n'
import ValidateTadiTryOut from '../screens/tryout/components/ValidateTadiTryOut'


//Notifications
import Notifications from '../screens/features/Notifications'
import NotificationIcon from '../screens/features/NotificationIcon'

const active = colors.darkGreyBlue
const inactive = colors.coolGrey

let tabsRouteConfig = {
    Home: {
        screen: LastShiftLog,
        navigationOptions: () => ({
            tabBarLabel: I18n.t("tabs_home"),
            tabBarIcon: ({ tintColor }) => (
                <Image
                style={{ height: 26, width: 26 }}
                source={icons["inicio" + (tintColor == inactive ? "" : "_b")]}
                />
            )
        })
    },
    Production: {
        screen: Production,
        navigationOptions: () => ({
            tabBarLabel: I18n.t("tabs_prod"),
            tabBarIcon: ({ tintColor }) => (
                <Image
                style={{ height: 26, width: 26 }}
                source={icons["produccion" + (tintColor == inactive ? "" : "_b")]}
                />
            )
        })
    },
    Paros: {
        screen: FailureHome,
        navigationOptions: () => ({
            tabBarLabel: I18n.t("tabs_paros"),
            tabBarIcon: ({ tintColor }) => (
                <Image
                style={{ height: 26, width: 26 }}
                source={icons["paros" + (tintColor == inactive ? "" : "_b")]}
                />
            )
        })
    },
    Monitor: {
        screen: Monitor,
        navigationOptions: () => ({
            tabBarLabel: I18n.t("tabs_monitor"),
            tabBarIcon: ({ tintColor }) => (
                <Image
                style={{ height: 26, width: 26 }}
                source={icons["monitor" + (tintColor == inactive ? "" : "_b")]}
                />
            )
        })
    },
    Hxh: {
        screen: Hxh,
        navigationOptions: () => ({
            tabBarLabel: I18n.t("tabs_hxh"),
            tabBarIcon: ({ tintColor }) => (
                <Image
                style={{ height: 26, width: 26 }}
                source={icons["hora" + (tintColor == inactive ? "" : "_b")]}
                />
            )
        })
    },
    resources: {
        screen: ProfileNavigator,
        navigationOptions: () => ({
            tabBarLabel: I18n.t("tabs_res"),
            tabBarIcon: ({ tintColor }) => (
                <Image
                style={{ height: 26, width: 26 }}
                source={icons["recursos" + (tintColor == inactive ? "" : "_b")]}
                />
            )
        })
    }
};

let tabsConfiguration = {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarComponent: MainTabBar,
    tabBarOptions: {
        inactiveTintColor: inactive,
        activeTintColor: active,
        style: {
            backgroundColor: 'rgba(209, 209, 212, 0.3)'
        }
    }
}

let mainRoutesConfig = {
    MainTabs: {
        screen: new TabNavigator(tabsRouteConfig, tabsConfiguration),        
    },
    ProcessParameterModal: {
        screen: ProcessParameter,
        navigationOptions: {
            header: null
        }
    },    
    // configure full screen modals here
    ChecklistModal: {
        screen: Checklist,
        navigationOptions: {
            header: null
        }
    },
    ValidateUser: {
        screen: ValidateUser,
        navigationOptions: {
            header: null
        }
    },
    ValidateTadi: {
        screen: ValidateTadi,
        navigationOptions: {
            header: null
        }
    },
    ValidateTadiTryOut: {
        screen: ValidateTadiTryOut,
        navigationOptions: {
            header: null
        }
    },
    NotCheckedModal: {
        screen: NotCheckedIn,
        navigationOptions: {
            header: null
        }
    },
    NewReportModal: {
        screen: ReportFailure,
        navigationOptions: {
            header: null
        }
    },
    IdentifyFailureModal: {
        screen: IdentifyFailure,
        navigationOptions: {
            header: null
        }
    },
    IdentifyOutModal: {
        screen: IdentifyOut,
        navigationOptions: {
            header: null
        }
    },
    MergeDowntime: {
        screen: MergeDowntime,
        navigationOptions: {
            header: null
        }
    },
    SplitDowntime: {
        screen: SplitDowntime,
        navigationOptions: {
            header: null
        }
    },
    ExternalChecklistModal: {
        screen: ExternalChecklist,
        navigationOptions: {
          header: null
        }
    },
    ToolParametersModal: {
        screen: ToolParameters,
        navigationOptions: {
            header: null
        }
    },
    ChangeOverModal: {
        screen: ChangeOver,
        navigationOptions: {
            header: null
        }
    },
    FailureModal: {
        screen: FailureComments,
        navigationOptions: {
            header: null,
        }
    },
    FailureDetailModal: {
        screen: FailureDetail,
        navigationOptions: {
            header: null,
        }
    },
    FailureHistoryModal: {
        screen: FailureHistory,
        navigationOptions: {
            header: null,
        }
    },
}

let mainStackOptions = {
    initialRouteName: 'MainTabs',
    mode: 'modal',
    headerMode: 'none',
}

let icons = {
    'inicio': require('../assets/icons/inicio.png'),
    'inicio_b': require('../assets/icons/inicio_b.png'),
    'produccion': require('../assets/icons/produccion.png'),
    'produccion_b': require('../assets/icons/produccion_b.png'),
    'paros': require('../assets/icons/paros.png'),
    'paros_b': require('../assets/icons/paros_b.png'),
    'monitor': require('../assets/icons/monitor.png'),
    'monitor_b': require('../assets/icons/monitor_b.png'),
    'hora': require('../assets/icons/hora.png'),
    'hora_b': require('../assets/icons/hora_b.png'),
    'recursos': require('../assets/icons/recursos.png'),
    'recursos_b': require('../assets/icons/recursos_b.png')
}

export default new StackNavigator(mainRoutesConfig, mainStackOptions)