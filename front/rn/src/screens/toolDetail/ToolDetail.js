import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import {
    SensaiButton,
    FailureHeader,
    Spinner,
    SensaiCard,
    SensaiRow,
    CardDivider,
    CardHeader,
    HorizontalLabel,
    VerticalLabel,
    CurrentToolCard,
    LogCard,
} from '../../components'

import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { tracker, guid, upperCase } from '../../helpers'
import moment from 'moment-timezone'
import 'moment/locale/es'

import { fetchToolSpeed } from '../home/actions'
import { fetchToolReports } from './actions'

class ToolDetail extends Component {
    state = {
        isLoading: true,
        isRefreshing: false
    }

    _mounted = false
    _shift = true

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this._onRefresh = this._onRefresh.bind(this)
    }

    componentDidMount() {
        tracker.trackScreenView('ToolDetail')
        this._mounted = true
        this.props.fetchToolSpeed(this.params.tool).then(() => {
        })
        this.props.fetchToolReports(this.params.tool.trim(), this.params.start, this.params.end).then(() => {
            this.setState({ isLoading: false })
        })
    }

    componentWillUnmount() {
        this._mounted = false
    }

    _renderItem({ item }) {
        return <LogCard item={item} returnFunction={this._onRefresh.bind(this)} showButton={this._shift}/>
    }

    _onRefresh() {
        this.setState({ isRefreshing: true })
        this.props.fetchToolReports(this.params.tool.trim()).then(() => {
            this.setState({ isRefreshing: false, isLoading: false })
        })
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }

    render() {
        let report = null
        let level = null

        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }
        
        let logEntries = null
        if (!this.state.isLoading) {
            logEntries = (
                <FlatList
                    data={this.props.reports}
                    shouldItemUpdate={(props, nextProps) => {
                        return props.item !== nextProps.item
                    }}
                    getItemLayout={this._getItemLayout.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={item => {
                        return guid()
                    }}
                    removeClippedSubviews
                    disableVirtualization
                    initialNumToRender={4}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                />
            )
        } else {
            logEntries = (
                <Spinner />
            )
        }
        //Validate edit button by 48 hours
        let validate = moment(this.params.start) > moment().add(-48, 'hours')
        this._shift = validate
        return (
            <View style={{ flex: 1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                    enableBack={true}
                />
                <SensaiCard>
                    <View style={{ flexDirection: 'column', }}>
                        <View style={styles.twoColumns}>
                            <Text style={styles.subText}>{this.params.tool}</Text>
                        </View>
                        <CardDivider />

                        <HorizontalLabel
                            title={`${I18n.t('last_production')}:`}
                            value={`${moment(this.params.start).utc().format('h:mm A')} - ${moment(this.params.end).utc().format('h:mm A')}`}
                        />
                        <HorizontalLabel
                            title={`${I18n.t('last_produced')}:`}
                            value={this.params.piezas}
                        />
                    </View>
                </SensaiCard>

                <SensaiCard>
                    <CardHeader title={I18n.t('tool_details')} />
                    <View style={[styles.twoColumns, {marginTop: 10}]}>
                        <View style={{
                            flex: 0.5
                        }}>
                            <VerticalLabel title={`${I18n.t('design_speed')}:`} value={this.props.toolSpeed} />
                        </View>
                        <View style={{
                            flex: 0.5
                        }}>
                            <VerticalLabel title={`${I18n.t('real_speed')}:`} value={'--'} />
                        </View>
                    </View>
                </SensaiCard>

                <View style={styles.modalContainer}>
                    <Text style={styles.mainText}>
                        {upperCase(I18n.t('tool_stops'))}
                    </Text>
                </View>

                <View style={styles.itemList}>
                    {logEntries}
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 5,
        padding: 10,
    },
    itemList: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    withMargin: {
        marginTop: 2,
        marginBottom: 2,
    },
    subText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        marginTop: 5
    },
})

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        toolSpeed: state.userMachine.toolSpeed,
        reports: state.tools.reports
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchToolSpeed, fetchToolReports }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolDetail)