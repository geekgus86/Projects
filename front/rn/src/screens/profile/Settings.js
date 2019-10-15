import React, { PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native'
import { SensaiButton, NavHeader } from '../../components'
import { logoutUser } from './actions'

import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { tracker } from '../../helpers'

class Settings extends PureComponent {
    state = {
        isLoading: false
    }

    constructor(props) {
        super(props)
        this._mounted = false
    }

    componentDidMount() {
        tracker.trackScreenView('Settings')
        this._mounted = true
    }

    componentWillUnmount() {
        this._mounted = false
    }

    onLogout() {
        this.setState({ isLoading: true })
        this.props.logoutUser().then(()=>{
            if (this._mounted === true) {
                this.setState({ isLoading: false })
                if (this.props.error !== null) {
                    alert(this.props.error)
                }
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavHeader
                    title={I18n.t('screen_profileTitle')}
                    enableBack={true}
                />
                <View style={theme.mainContainer}>
                    <SensaiButton
                        text={I18n.t('profile_logoutButton')}
                        buttonStyle={{ marginTop: 10 }}
                        loading={this.state.isLoading}
                        onPress={this.onLogout.bind(this)} />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        error: state.session.error,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)