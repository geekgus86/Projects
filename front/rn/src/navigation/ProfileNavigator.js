import React from 'react'
import { Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { stackDefaultOptions } from '../helpers'
import I18n from '../i18n/i18n'
import { colors, theme } from '../styles/theme'

import Profile from '../screens/profile/Profile'
import Settings from '../screens/profile/Settings'
import Feedback from '../screens/profile/Feedback'

const routeConfig = {
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            header: null,
        }
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: {
            header: null,
        }
    }
}

export default new StackNavigator(routeConfig, stackDefaultOptions('Profile'))