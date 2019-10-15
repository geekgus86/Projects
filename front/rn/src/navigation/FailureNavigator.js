import { StackNavigator } from 'react-navigation'
import FailureTabNavigator from "./FailureTabNavigator";

const routeConfig = {
    FailureTabs: {
        screen: FailureTabNavigator
    },
}

const mainStackOptions = {
    initialRouteName: "FailureTabs",
    mode: "modal",
    headerMode: "none"
};
  
export default new StackNavigator(
    routeConfig,
    mainStackOptions
);