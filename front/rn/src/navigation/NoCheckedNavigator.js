import React from 'react'
import { StackNavigator } from 'react-navigation'
import NotCheckedIn from '../screens/home/NotCheckedIn'

const routeConfig = {
    NotCheckedIn: {
        screen: NotCheckedIn
    },
}

const navigatorOptions = {
    initialRouteName: 'NotCheckedIn',
    mode: 'modal',
    headerMode: 'none',
}

export default new StackNavigator(routeConfig, navigatorOptions)