import React, { PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import {
    SensaiButton,
    FailureHeader,
    Spinner,
    SensaiCard,
    SensaiRow,
    CardDivider,
    HorizontalLabel,
    CurrentToolCard,
    SensaiCombo,
} from '../../components'
import { logoutUser } from './actions'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { tracker, guid, upperCase } from '../../helpers'

import { fetchToolsProduction } from './actions'
import { groupByToolName, getDateRange } from './reducers'

import moment from 'moment-timezone'
import 'moment/locale/es'

class ToolList extends PureComponent {
    state = {
        isLoading: false,
        list: [],
        selected: '',
    }

    constructor(props) {
        super(props)
        this._mounted = false
        this._onRefresh = this._onRefresh.bind(this)
    }

    componentDidMount() {
        tracker.trackScreenView('ToolList')
        this._mounted = true
        this._onRefresh(null)
    }

    componentWillUnmount() {
        this._mounted = false
    }

    _onRefresh(date) {
        this.setState({ isLoading: true, selected:'', list: [] })
        this.props.fetchToolsProduction(date).then(() => {
            this.setState({ isLoading: false, list:this.props.list })
        })
    }

    _renderItem({ item }) {
        let button = null
        let buttonText = '--'
        if (item.tool != '') {
            buttonText = item.tool
            button = (
                <SensaiButton xs text={I18n.t('details')} onPress={() => {
                    this.props.navigation.navigate('ToolDetail', item)
                }} />
            )
        }
        return (
            <SensaiCard>
                <SensaiRow>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.twoColumns}>
                            <Text style={styles.subText}>{buttonText}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                {button}
                            </View>
                        </View>

                        <CardDivider />

                        <HorizontalLabel
                            title={`${I18n.t('last_production')}:`}
                            value={`${moment(item.start).utc().format('h:mm A')} - ${moment(item.end).utc().format('h:mm A')}`}
                        />
                        <HorizontalLabel
                            title={`${I18n.t('produced_pieces')}:`}
                            value={item.piezas}
                        />
                    </View>
                </SensaiRow>
            </SensaiCard>
        )
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }

    renderLoader(){
        return(
            <View style={{
                position: 'absolute',
                height:'100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 9999,
            }}>
                <Spinner />
            </View>
        );
    }

    customSort(arr, attr, order){
        var sorted = false
        while (!sorted){
            sorted = true;
            arr.forEach(function (element, index, array){
                if(array[index+1]){
                    if (element[attr] > array[index+1][attr] && order == 'asc') {
                        array[index] = array[index+1];
                        array[index+1] = element;
                        sorted = false
                    }
                    if (element[attr] < array[index+1][attr] && order == 'desc') {
                        array[index] = array[index+1];
                        array[index+1] = element;
                        sorted = false
                    }
                }
            });
        }
        return arr
    }

    render() {
        const { twoColumns, withMargin, subText, modalContainer, mainText, secondaryText, sendButton, buttonHolder } = styles
        let report = null
        let level = null

        const { params } = this.props.navigation.state
        const toolName = params ? params.name : ''
        const speed = params ? params.speed : 0

        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }

        logEntries = (
            <FlatList
                data={this.state.list}
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
            />
        )

        let backButton = null
        let nextButton = null
        if (this.props.range.to && !this.state.isLoading) {
            backButton = (
                <LinearGradient
                    style={sendButton}
                    colors={[colors.azure, colors.ceruleanBlue]}
                    startPoint={{ x: 0.0, y: 0.0 }} endPoint={{ x: 0.0, y: 1.0 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this._onRefresh.bind(this, this.props.range.from)}>
                        <Icon name='arrow-back' size={20} color={colors.white} />
                    </TouchableOpacity>
                </LinearGradient>
            )

            nextButton = (
                <LinearGradient
                    style={sendButton}
                    colors={[colors.azure, colors.ceruleanBlue]}
                    startPoint={{ x: 0.0, y: 0.0 }} endPoint={{ x: 0.0, y: 1.0 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this._onRefresh.bind(this, this.props.range.to)}>
                        <Icon name='arrow-forward' size={20} color={colors.white} />
                    </TouchableOpacity>
                </LinearGradient>
            )
        }
        params.tool = params.name.trim()
        let currentTool = null
        if(params.tool){
            currentTool = (
                <CurrentToolCard
                    name={toolName}
                    designSpeed={this.props.toolSpeed}
                    currentSpeed={speed}
                    buttonText={'Detalles'}
                    onButtonPress={() => {
                        this.props.navigation.navigate('ToolDetail', params)
                    }}
                />
            )
        }

        if (moment(this.props.range.to) > moment()) {
            nextButton = null
        } else {
            currentTool = null
        }

        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ?
                    this.renderLoader()
                    :
                    null
                }
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                    enableBack={true}
                />
                <View style={{flex: 1}}>
                    <View style={modalContainer}>
                        <View style={buttonHolder}>
                            {backButton}
                        </View>
                        <View>
                            <Text style={mainText}>
                                {upperCase(I18n.t('tools'))}
                            </Text>
                            <Text style={secondaryText}>{(this.state.isLoading) ? null : this.props.range.title}</Text>
                        </View>
                        <View style={buttonHolder}>
                            {nextButton}
                        </View>
                    </View>
                    <View style={{
                        marginLeft: 10,
                        marginRight: 10,
                    }}>
                        <SensaiCombo
                            label = {`${I18n.t('order_by_tool')}:`} 
                            selected = {this.state.selected}
                            items = {[
                                {label: `[${I18n.t('select_an_option')}...]`, value:''},
                                {label: I18n.t('asc'), value:'asc'},
                                {label: I18n.t('desc'), value:'desc'},
                            ]}
                            onChange = {(value) => {
                                let sorted = Object.assign([], this.props.list)
                                this.setState({ selected: value, list: [] })
                                switch(value){
                                    case 'asc':
                                    case 'desc':
                                        sorted = this.customSort(sorted, 'tool', value)
                                        break;
                                    default:
                                        sorted = this.props.list
                                        break;
                                }
                                this.setState({ list: sorted })
                            }}
                        />
                    </View>
                    {currentTool}
                    {logEntries}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 5,
        padding: 10,
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
    secondaryText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
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
    buttonHolder: {
        width: 30,
        height: 30,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

function mapStateToProps(state) {
    let total = 0
    if(state.tools.production){
        total = state.tools.production.data.length
    }
    return {
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        list: (total==0?[]:groupByToolName(state)),
        range: getDateRange(state),
        toolSpeed: state.userMachine.toolSpeed,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchToolsProduction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolList)