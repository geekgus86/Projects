import React from 'react'
import I18n from '../i18n/i18n'
import { TabNavigator } from 'react-navigation'
import { topTabsDefaultOptions } from '../helpers'

import PerformanceTab from '../screens/home/PerformanceTab'
import ProductionTab from '../screens/home/ProductionTab'
import CurrentShiftTab from '../screens/home/CurrentShiftTab'

const tabsRouteConfig = {
    Performance: {
        screen: PerformanceTab,
        navigationOptions: () => ({
            title: I18n.t('home_performanceTabTitle'),
        }),
    },
    Production: {
        screen: ProductionTab,
        navigationOptions: () => ({
            title: I18n.t('home_productionTabTitle'),
        }),
    },
    CurrentShiftLog: {
        screen: CurrentShiftTab,
        navigationOptions: () => ({
            title: I18n.t('home_currentShiftTabTitle'),
        }),
    },
}

export default new TabNavigator(tabsRouteConfig, topTabsDefaultOptions())