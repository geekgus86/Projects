import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Vibration } from 'react-native'
import PushNotification from 'react-native-push-notification'

import {
    fetchLocalMachine,
    fetchCurrentFailure,
} from './actions'

import { colors } from '../../styles/theme'
import { FailureHeader, Spinner } from '../../components'

import NotCheckedIn from './NotCheckedIn'
import HomeTabNavigator from '../../navigation/HomeTabNavigator'

import { tracker } from '../../helpers'

class Home extends Component {
    _mounted = null
    state = {
        isLoading: true
    }

    constructor(props) {
        super(props)
        this.reportCreated = this.reportCreated.bind(this)
        this.reportClosed = this.reportClosed.bind(this)
        this.onEscalation = this.onEscalation.bind(this)
        this.onEscalationStop = this.onEscalationStop.bind(this)
        this.openFailureModal = this.openFailureModal.bind(this)
    }

    componentWillMount() {
        this.props.fetchLocalMachine().then(() => {
            this.setState({ isLoading: false })
            if (this.props.currentMachine !== null) {
                this.setState({ isLoading: true })
                this.props.navigation.navigate('LastShiftLog')
                this.props.fetchCurrentFailure().then(() => {
                    this.setState({ isLoading: false })
                })
            }
        })
    }

    componentDidMount() {
        this._mounted = true
        tracker.trackScreenView('Home')
    }

    componentWillUnmount() {
        this._mounted = false
    }

    _onNavigationChange(prevState, currentState) {
        if (currentState.index == 1 && this.props.production.length != 0) {
            this.props.reloadProduction()
        } else if (currentState.index == 2 && this.props.shiftLog.length != 0) {
            this.props.reloadShift()
        }
    }

    render() {
        let report = null
        let level = null
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.DescEscalationRule : ''
        }

        let content = null
        if (this.state.isLoading === true) {
            content = (
                <Spinner background={{ backgroundColor: colors.darkGreyBlue }} />
            )
        } else {
            if (this.props.currentMachine !== null) {
                content = (
                    <View style={{ flex: 1 }}>
                        <FailureHeader
                            machineName={this.props.currentMachine.label}
                            failure={this.props.currentFailure}
                            escalationLevel={level}
                            report={report}
                        />
                        <HomeTabNavigator onNavigationStateChange={this._onNavigationChange.bind(this)} />
                    </View>
                )
            } else {
                content = (
                    <NotCheckedIn {...this.props} />
                )
            }
        }

        return content
    }
}

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        currentUserId: state.session.info.id,
        currentUserName: state.session.info.name,
        production: state.userMachine.production,
        shiftLog: state.userMachine.currentShiftLog
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchLocalMachine,
        fetchCurrentFailure,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)