import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, ScrollView, RefreshControl } from 'react-native'
import { AccumulatedComp } from '../../components'
import { fetchCurrentPeriodDowntime, fetchProduction } from '../home/actions'
import { tracker } from '../../helpers'
import I18n from '../../i18n/i18n';

class Accumulated extends Component {
    state={
        isLoading: false,
        downtimeValues: [],
    }

    _mounted = false

    constructor(props) {
        super(props)
        this._getCurrentPeriodDowntime = this._getCurrentPeriodDowntime.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
    }

    componentDidMount() {
        this._mounted = true
        tracker.trackScreenView('Accumulated')
        this._onRefresh()
    }

    componentWillUnmount() {
        this._mounted = false
    }

    _onRefresh() {
        this.setState({ isLoading: true, downtimeValues: [] })
        this._getCurrentPeriodDowntime()
    }

    _getCurrentPeriodDowntime() {
        this.props.fetchProduction().then(() => {
            this.props.fetchCurrentPeriodDowntime().then(() => {
                if (this._mounted === true) {
                    this.setState({ isLoading: false })                
                    if (this.props.downtime !== null) {
                        let downtimeValues = []
                        for (let value of this.props.downtime) {
                            //EasyRemind #38497
                            let timeDownReal = value.downtime !== 0 ? value.downtime.toFixed(2) : 0
                            value.downtime = timeDownReal
                            //EasyRemind #38497
                            downtimeValues.push(value)
                        }
                        this.setState({ downtimeValues })
                    }
                }
            })
        })
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <AccumulatedComp downtimeValues={this.state.downtimeValues} title={I18n.t('accumulated')}/>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        production: state.userMachine.production,
        downtime: state.userMachine.downtime,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCurrentPeriodDowntime, fetchProduction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Accumulated)