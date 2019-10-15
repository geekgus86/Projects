import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { FailureHeader, LogCard } from "../../components";
import { colors } from '../../styles/theme'
import { tracker, upperCase, navigate } from "../../helpers";
import { setHistoricData } from "./actions";
import moment from 'moment-timezone'
import 'moment/locale/es'
import I18n from '../../i18n/i18n'

class FailureHistory extends Component {
    state = {
        isLoading: false,
        items: [],
    };

    _mounted = false;
    params = null;

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params
        this._onRefresh = this._onRefresh.bind(this)
    }

    componentDidMount() {
        this._mounted = true;
        tracker.trackScreenView("FailureHistory");
        this._onRefresh()
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    _onRefresh() {
        this.setState({ isLoading: true, items: [] })
        this.props.setHistoricData(this.params.group_id).then(()=>{
            this.setState({ isLoading: false, items: this.props.items })
        })
    }

    render() {
        const { headerContainer, headerText, label } = styles
        let report = null;
        let level = null;
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport;
            level = this.props.currentEscalation
                ? this.props.currentEscalation.label
                : "";
        }
        let counter = 0
        let minutes = 0
        let rows = this.state.items.map((item, i)=>{
            if(item.open_minutes < 1){
                item.type = 'microparo'
            }
            minutes+=item.open_minutes
            let diff = item.open_minutes
            let h = Math.floor(diff / (60))
            diff = diff - (h * 60)
            let m = Math.floor(diff)
            diff = (diff - m) * 60
            let s = Math.round(diff)
            item.open_minutes = `${h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}`
            item.report_division = (item.report_division=='null'?null:item.report_division)
            counter++
            return <LogCard item={item} showButton={false} key={i}/>
        })
        return ( 
            <View style={{ flex: 1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                    enableBack
                />
                
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh}
                    />
                }>
                    <View style={headerContainer}>
                        <Text style={headerText}>{`${this.params.report_type==3 ? I18n.t('changeover') : I18n.t('stop') } #${this.params.report_number || ''}`}</Text>
                    </View>
                    <LogCard item={this.params} showButton={false}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={label}>{`${I18n.t('grouped_stops')}: ${counter}`}</Text>
                        <Text style={label}>{upperCase(`${I18n.t('total')}: ${this.params.open_minutes.toFixed(2)} ${I18n.t('minutes_dim')}`)}</Text>
                    </View>
                    { rows }
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        items: state.forumComments.historic,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setHistoricData }, dispatch);
}

const styles = StyleSheet.create({
    headerContainer: {
        borderRadius: 5,
        backgroundColor: "rgba(209, 209, 212, 0.5)",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 10,
        padding: 10
    },
    headerText: {
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.darkGreyBlue
    },
    label: {
        fontSize: 17,
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FailureHistory);
