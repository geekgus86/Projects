import { NavigationActions } from 'react-navigation'
import { TabBarTop } from 'react-navigation'
import { colors } from '../styles/theme'

let _navigator

export function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef
}

export function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params,
        })
    )
}

export function goBack() {
    _navigator.dispatch(
        NavigationActions.back({
            key: null
        })
    )
}

export function stackDefaultOptions(initialRouteName) {
    return {
        initialRouteName: initialRouteName,
        mode: 'modal',
        cardStyle: {
            backgroundColor: '#f5f7f9',
        },
        navigationOptions: ({ navigation }) => {
            return {
                headerTintColor: 'white',
                headerBackTitle: null,
                headerTitleStyle: {
                    textAlign: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                },
                headerStyle: {
                    backgroundColor: colors.darkGreyBlue,
                },
            }
        }
    }
}

export function topTabsDefaultOptions(canSwipe = true) {
    return {
        swipeEnabled: canSwipe,
        tabBarOptions: {
            style: {
                backgroundColor: "#ffffff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowRadius: 4,
                shadowOpacity: 1
            },
            labelStyle: {
                fontFamily: "Gotham Rounded",
                fontSize: 13,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#7e8082",
                paddingBottom: 5,
                paddingTop: 10,
                height: 38,
            },
            indicatorStyle: {
                height: 3,
                backgroundColor: colors.azure,
            },
            tabStyle: {
                height: 38,
            },
            activeTintColor: '#7e8082',
            inactiveTintColor: '#7e8082',
            upperCaseLabel: false,
        },
        tabBarPosition: 'top',
        tabBarComponent: TabBarTop,
    }
}