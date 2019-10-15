import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BackHandler, View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { FailureHeader, SensaiInput, SensaiButton, LogCard } from '../../components'
import { tracker, upperCase, guid } from '../../helpers'
import { colors, theme } from '../../styles/theme'

import { fetchDowntimes } from './actions'

import moment from 'moment-timezone'
import 'moment/locale/es'

class ToolDowntime extends Component{
    state = {
        isLoading: true,
        list: [],
    }
    
    constructor(props){
        super(props)
        this._mounted = false
        this.params = this.props.navigation.state.params
        this._onRefresh = this._onRefresh.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
    }

    componentDidMount() {
        tracker.trackScreenView('ToolDowntime')
        this._mounted = true
        this._onRefresh()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }

    componentWillUnmount() {
        this._mounted = false
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    handleBackButton() {
        this.props.navigation.goBack()
        return true
    }

    _onRefresh() {
        this.setState({ isLoading: true, list: [] })
        this.props.fetchDowntimes(this.params.data.id).then(()=>{
            this.setState({ isLoading: false, list: this.props.list })
        })
    }

    _renderItem({item}) {
        if(item.report_type==1 || item.report_type==2){
            let showButton = true
            return (
                <LogCard item={item} showButton={showButton} returnFunction={this._onRefresh.bind(this)}/>
            )
        }
        return null
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

        let header = (
            <View style={styles.mainContainer}>
                <Text style={[styles.mainTitle, { color: colors.orangeRed }]}>
                    {upperCase(I18n.t('stops_while_production'))}
                </Text>
            </View>
        )

        return(
            <View style={{ flex:1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                    enableBack={true}
                />
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.mainText}>
                            {`${upperCase(I18n.t('confirm_tool'))} ${this.params.data.code}`}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start',}}>
                    <FlatList
                        data={this.state.list}
                        shouldItemUpdate={(props, nextProps) => {
                            return props.item !== nextProps.item
                        }}
                        ListHeaderComponent={header}
                        getItemLayout={this._getItemLayout.bind(this)}
                        renderItem={this._renderItem.bind(this)}
                        keyExtractor={item => {
                            return guid()
                        }}
                        removeClippedSubviews
                        disableVirtualization
                        initialNumToRender={4}
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                    />
                </View>
                <SensaiButton
                    text={I18n.t('next')}
                    buttonStyle={{ margin: 10 }}
                    onPress={() =>{
                        this.props.navigation.goBack()
                    }}
                    loading={this.state.isLoading}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        marginLeft: 10,
        marginRight: 10,
    },
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
    mainTitle:{
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.azure
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
    inputText:{
        marginBottom: 5,
        marginTop: 5,
        width: '49%'
    },
    label:{
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginTop: 5,
        width: '100%',
        marginBottom: 5,
        color: 'black'
    },
    checkStyle:{
        paddingTop: 5, 
        width:'25%'
    }
})

function mapStateToProps(state) {
    return {
        list: state.tools.downtimes,
        currentMachine: state.userMachine.machine,
        currentReport: state.userMachine.report,
        currentFailure: state.userMachine.inFailureMode,
        currentEscalation: state.userMachine.escalation,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchDowntimes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolDowntime)