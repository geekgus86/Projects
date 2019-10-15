import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { FailureHeader, ConfirmModal, SensaiButton } from "../../components";
import FailureNavigator from "../../navigation/FailureNavigator";
import { tracker } from "../../helpers";

class FailureHome extends Component {
  _mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      //keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
    }
  }

  componentDidMount() {
    this._mounted = true;
    tracker.trackScreenView("FailureHome");
    //this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this))
  }

  componentWillUnmount() {
    this._mounted = false;
    //this.keyboardHideListener.remove()
  }

  /*keyboardHideListener() {
    this.setState({
        keyboardAvoidingViewKey:'keyboardAvoidingViewKey' + new Date().getTime()
    });
  }*/

  render() {
    let report = null;
    let level = null;
    if (this.props.currentFailure !== false) {
      report = this.props.currentReport;
      level = this.props.currentEscalation
        ? this.props.currentEscalation.label
        : "";
    }
    return ( 
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
        <FailureHeader
          machineName={this.props.currentMachine.label}
          failure={this.props.currentFailure}
          escalationLevel={level}
          report={report}
        />
          <FailureNavigator />
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentMachine: state.userMachine.machine,
    currentFailure: state.userMachine.inFailureMode,
    currentReport: state.userMachine.report,
    currentEscalation: state.userMachine.escalation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FailureHome);
