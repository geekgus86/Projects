import { TabNavigator } from "react-navigation";
import { topTabsDefaultOptions } from "../helpers";
import NextProduction from "../screens/production/NextProduction";
import CurrentProduction from "../screens/production/CurrentProduction";
import PreviousProduction from "../screens/production/PreviousProduction";
import I18n from '../i18n/i18n'

let tabsRouteConfig = {
  NextProductionTab: {
    screen: NextProduction,
    navigationOptions: () => ({
      header: null,
      title: I18n.t('productionTabs_prep')
    })
  },
  CurrentProductionTab: {
    screen: CurrentProduction,
    navigationOptions: () => ({
      header: null,
      title: I18n.t('productionTabs_actual')
    })
  },
  PreviousProductionTab: {
    screen: PreviousProduction,
    navigationOptions: () => ({
      header: null,
      title: I18n.t('productionTabs_hist')
    })
  }
};

export default new TabNavigator(tabsRouteConfig, topTabsDefaultOptions());
