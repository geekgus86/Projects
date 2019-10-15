import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";
import { FailureHeader } from "../../components";
import ProductionNavigator from "../../navigation/ProductionNavigator";
import { tracker } from "../../helpers";

class Production extends Component {
  state = {
    isLoading: false
  };

  _mounted = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._mounted = true;
    tracker.trackScreenView("Production");
  }

  componentWillUnmount() {
    this._mounted = false;
  }

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
      <View style={{ flex: 1 }}>
        <FailureHeader
          machineName={this.props.currentMachine.label}
          failure={this.props.currentFailure}
          escalationLevel={level}
          report={report}
        />
        <ProductionNavigator />
      </View>
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
)(Production);
