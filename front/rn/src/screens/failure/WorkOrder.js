import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, FlatList, StyleSheet, RefreshControl } from 'react-native'
import { WorkOrderMaximoCard } from '../../components/WorkOrderMaximoCard'
import { getWorkOrdersMaximo } from './actions'
import { tracker, guid } from '../../helpers'
import I18n from '../../i18n/i18n';
import { ActivityIndicator } from 'react-native';
import { Spinner, NavButtons } from '../../components'
import moment from 'moment-timezone'
import 'moment/locale/es'
import { colors } from '../../styles/theme'
import { upperCase } from '../../helpers'

class WorkOrderMaximo extends Component {

    state = {
        isLoading: true,
        isRefreshing: false,
        items: [],
        shift: null,
        date: null,
        nextDate: null,
        previuosDate: null,
    }

    _mounted = false

    constructor(props) {
        super(props)
        this.state.date = moment().format('YYYY-MM-DD HH:mm:ss')
        this.state.nextDate = moment().add(12, 'hour').format('YYYY-MM-DD HH:mm:ss')
        this.state.previuosDate = moment().add(-12, 'hour').format('YYYY-MM-DD HH:mm:ss')
        this.state.shift = {}
        this._getActualWorkOrdersMaximo = this._getActualWorkOrdersMaximo.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
    }

    componentDidMount() {
        this._mounted = true
        tracker.trackScreenView('WorkOrderComp')
        this._onRefresh()
        this.props.navigation.addListener('willFocus', this._onRefresh)
    }

    componentWillUnmount() {
        
    }

    _onRefresh() {
        this.setState({ isLoading: true, isRefreshing: true })
        this._getActualWorkOrdersMaximo()
    }

    _getActualWorkOrdersMaximo() {
        if (this._mounted === true) {
            this.setState({ isLoading: true, items: [], shift: {}, isRefreshing: true })
            this.props.getWorkOrdersMaximo(moment().format('YYYY-MM-DD HH:mm:ss').toString()).then(() => {
                this.setState({ 
                    isLoading: false, 
                    items: this.props.items, 
                    shift: this.props.shift, 
                    isRefreshing: false,
                    nextDate: moment().add(12, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                    previuosDate: moment().add(-12, 'hour').format('YYYY-MM-DD HH:mm:ss')
                })
            })
        }
    }

    _getPreviousShiftWorkOrders() {
        this.setState({ isLoading: true, items: [], shift: {}, isRefreshing: true })
        this.props.getWorkOrdersMaximo(moment(this.state.previuosDate).format('YYYY-MM-DD HH:mm:ss').toString()).then(() => {
            this.setState({
                isLoading: false, 
                items: this.props.items,
                nextDate: moment(this.state.previuosDate).add(12, 'hour'),
                previuosDate: moment(this.state.previuosDate).add(-12, 'hour'), 
                shift: this.props.shift,
                isRefreshing: false
            })
        })
    }

    _getNextShiftWorkOrders() {
        this.setState({ isLoading: true, items: [], shift: {}, isRefreshing: true })
        this.props.getWorkOrdersMaximo(moment(this.state.nextDate).format('YYYY-MM-DD HH:mm:ss').toString()).then(() => {
            this.setState({
                isLoading: false, 
                items: this.props.items,
                previuosDate: moment(this.state.nextDate).add(-12, 'hour'),
                nextDate: moment(this.state.nextDate).add(12, 'hour'), 
                shift: this.props.shift,
                isRefreshing: false
            })
        })
    }

    render() {
        const { mainContainer, listHeader, textHeader, textShift } = styles
        let content = null
        if (!this.state.isLoading) {
            return (
                <View style={mainContainer}>
                    {this.state.isLoading ?
                        this.renderLoader()
                        :
                        null
                    }
                    {
                        <ScrollView style={{ flex: 1 }} refreshControl={
                            <RefreshControl
                                refreshing={this.state.isLoading}
                                onRefresh={this._onRefresh}
                            />
                        }>
                            <FlatList
                                data={this.props.items}
                                getItemLayout={this._getItemLayout.bind(this)}
                                renderItem={this._renderItem}
                                keyExtractor={item => {
                                    return guid();
                                }}
                                removeClippedSubviews
                                disableVirtualization
                                initialNumToRender={5}
                                ListHeaderComponent={() => {
                                    let header = null
                                    if (!this.state.isLoading) {
                                        let shiftText = `${moment(this.state.shift.startAt).format('DD MMMM h:mm a')} - ${moment(this.state.shift.endAt).format('DD MMMM h:mm a')} / ${this.state.shift.Description}`
                                        header =
                                            <View style={{ marginBottom: 5 }}>
                                                <NavButtons
                                                    back={this._getPreviousShiftWorkOrders.bind(this)}
                                                    today={this._getActualWorkOrdersMaximo.bind(this)}
                                                    next={this._getNextShiftWorkOrders.bind(this)}
                                                    validate={moment(this.state.nextDate).isAfter(moment())}
                                                />
                                                <View style={listHeader}>
                                                    <Text style={textHeader}>{I18n.t('wo_title_header')}</Text>
                                                    {/* <Text style={textShift}> {shiftText   }</Text> */}
                                                    <Text style={textShift}> {upperCase(shiftText)   }</Text>
                                                </View>
                                            </View>
                                    }
                                    return header;
                                }}
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                            />
                        </ScrollView>
                    }
                </View>
            )
        } else {
            return <Spinner />
        }
    }

    _renderItem = ({item}) => (
        <WorkOrderMaximoCard item={item} />
    );

    renderLoader() {
        let content = null

        return (
            <View style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 9999,
            }}>
                <Spinner />
            </View>
        );
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }

}

function mapStateToProps(state) {
    return {
        production: state.userMachine.production,
        downtime: state.userMachine.downtime,
        items: state.forumComments.items,
        shift: state.forumComments.shift
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getWorkOrdersMaximo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderMaximo)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    listHeader: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 5,
        padding: 10,
    },
    textHeader: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    textShift: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    }
})