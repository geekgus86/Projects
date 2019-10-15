import { StackNavigator } from "react-navigation";
import ProductionTabNavigator from "./ProductionTabNavigator";

let routeConfig = {
  ProductionTabs: {
    screen: ProductionTabNavigator
  },
};

let mainStackOptions = {
  initialRouteName: "ProductionTabs",
  mode: "modal",
  headerMode: "none"
};

export default new StackNavigator(
  routeConfig,
  mainStackOptions
);
