import { TabNavigator } from "react-navigation";
import { topTabsDefaultOptions } from "../helpers";
import Failure from "../screens/failure/Failure";
import Accumulated from "../screens/failure/Accumulated";
import I18n from '../i18n/i18n'
import WorkOrderMaximo from "../screens/failure/WorkOrder";

const tabsRouteConfig = {
  FailureTab: {
    screen: Failure,
    navigationOptions: () => ({
      header: null,
      title: I18n.t('failureTabs_failure'),
    })
  },
  AccumulatedTab: {
    screen: Accumulated,
    navigationOptions: () => ({
      header: null,
      title: I18n.t('failureTabs_accu'),
    })
  },
  WorkOrderTab: {
    screen: WorkOrderMaximo,
    navigationOptions: () => ({
      header: null,
      title: I18n.t('failureTabs_wos'),
    })
  }
};

export default new TabNavigator(tabsRouteConfig, topTabsDefaultOptions());
