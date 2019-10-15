import React from 'react'
import { StackNavigator } from 'react-navigation'
import Login from '../screens/login/Login'

const routeConfig = {
    Login: {
        screen: Login
    },
}

const navigatorOptions = {
    initialRouteName: 'Login',
    mode: 'modal',
    headerMode: 'none',
}

export default new StackNavigator(routeConfig, navigatorOptions)