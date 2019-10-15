import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Platform, View, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, StyleSheet, Switch, Text } from 'react-native'

import I18n from '../../i18n/i18n'
import { theme, colors } from '../../styles/theme'
import { SensaiInput, SensaiButton, SensaiSwitch } from '../../components'
import { loginUser, saveDomain } from './actions'
import { getDevicePushToken, getAuthError } from './reducers'
import { upperCase } from '../../helpers';
import config from '../../../src/lib/config'

class Login extends Component {
    state = {
        email: '',
        password: '',
        domain: '',
        secure: false,
        isLoading: false,
        showDomain: false,
    }

    _mounted = false
    touchCounter = 0

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._mounted = true
    }

    componentWillUnmount() {
        this._mounted = false
    }

    _doLogin() {
        this.props.loginUser(this.state.email, this.state.password, this.props.pushToken).then(() => {
            if (this._mounted === true) {
                this.setState({ isLoading: false })
                if (this.props.error !== null) {
                    alert(this.props.error)
                }
            }
        })
    }

    onLogin() {
        this.setState({ isLoading: true })
        if (this.state.domain !== '') {
            this.props.saveDomain(this.state.domain, this.state.secure).then(() => {
                this._doLogin()
            })
        } else {
            this._doLogin()
        }
    }

    longPress(evt) {
        Keyboard.dismiss()
        if (this.touchCounter < 5) {
            this.touchCounter++
        } else {
            this.setState({ showDomain: true })
        }
    }

    render() {
        const { centerVertically, logo, formMargin, buttonSpacer, row } = styles

        let domain = null
        if (this.state.showDomain === true) {
            domain = (
                <View style={row}>
                    <SensaiInput
                        nohighlight={true}
                        label={I18n.t('login_domain')}
                        inputStyle={{ flex: 1 }}
                        onChangeText={(domain) => this.setState({ domain })}
                    />
                    <SensaiSwitch label={upperCase(I18n.t('secure'))} onChangeValue={(val) => this.setState({ secure: val }) }/>
                </View>
            )
        }

        return (
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : null}>
                <Image
                    style={theme.backgroundImage}
                    source={require('../../assets/background.png')}
                />
                <View style={[theme.mainContainer, centerVertically]}>
                    <TouchableWithoutFeedback onPress={(evt) => this.longPress(evt)} accessible={false}>
                        <Image style={logo} source={require('../../assets/logo.png')} width={150} height={150} />
                    </TouchableWithoutFeedback>

                    <View style={formMargin}>
                        {domain}
                        <SensaiInput
                            nohighlight={true}
                            label={I18n.t('login_username')}
                            placeholder={I18n.t('login_usernamePlaceholder')}
                            keyboardType="email-address"
                            onChangeText={(email) => this.setState({ email })} />

                        <SensaiInput
                            secure
                            nohighlight={true}
                            label={I18n.t('login_password')}
                            onChangeText={(password) => this.setState({ password })}
                            onPress={this.onLogin.bind(this)}
                        />

                        <SensaiButton
                            text={I18n.t('login_loginButton')}
                            buttonStyle={buttonSpacer}
                            loading={this.state.isLoading}
                            onPress={this.onLogin.bind(this)} />

                    </View>
                    <Text style={{fontSize: 12, marginTop: 30, color: 'white',flex:1,textAlign: 'left', justifyContent: 'flex-end',alignItems: 'flex-end'}}>
                        Version {config['version']}
                    </Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        pushToken: getDevicePushToken(state),
        error: getAuthError(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser, saveDomain }, dispatch)
}

const styles = StyleSheet.create({
    centerVertically: {
        justifyContent: 'center'
    },
    logo: {
        marginBottom: 50,
        alignSelf: 'center'
    },
    formMargin: {
        marginRight: 10,
        marginLeft: 10,
    },
    buttonSpacer: {
        marginTop: 50
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)