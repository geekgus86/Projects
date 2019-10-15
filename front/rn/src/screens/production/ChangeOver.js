import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AsyncStorage, ScrollView, View, Text, StyleSheet, Alert, RefreshControl } from "react-native";
import { FailureHeader, SensaiButton, Spinner } from "../../components";
import { tracker, upperCase } from "../../helpers";
import { colors } from "../../styles/theme";
import { ToolHeader } from "./ToolHeader";
import { ToolInformationCard } from "./ToolInformationCard";
import { ChangeOverCard } from "./ChangeOverCard";
import { validateProduction, verfifyProduction, getValidatedProduction, prepareProduction, updateToolParams } from "./actions";
import { updateWorkOrderMaximo, updateWorkOrderMaximoSFMS, checkExistsWOMSFMS } from '../report/actions'
import { getPreparedToolSpeed, getField, getPreparedTool, getValidatedTool } from "./reducers";
import moment from "moment-timezone";
import "moment/locale/es";

import { subscribeTo, unsubscribe } from '../../lib/Socket'
import I18n from "../../i18n/i18n";

class ChangeOver extends Component {
  state = {
    isLoading: false,
  };

  _mounted = false;

  constructor(props) {
    super(props);
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount() {
    this._mounted = true;
    tracker.trackScreenView("ChangeOver");
    subscribeTo('setupmode', (data)=> {
      if(data.status){
        this._onRefresh()
      }else{
        this.props.navigation.state.params.returnFunction()
        this.props.getValidatedProduction()
        this.props.navigation.goBack()
      }
    })
    if (this.props.validated === null) {
      this._onRefresh()
    }
  }

  _onRefresh() {
    if(this._mounted){
      this.setState({ isLoading: true })
      this.props.getValidatedProduction().then(()=>{
        this.props.prepareProduction()
        this.setState({ isLoading: false })
      })
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    unsubscribe('setupmode')
  }

	async validate() {
		if (this._mounted === true) {
      if(this.props.status==1){
        Alert.alert(
          I18n.t('confirm_start_changeover'),
          `${I18n.t('confirm_change_tool')} ${this.props.tool}`,
          [
            { text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
              text: I18n.t('confirm'),
              onPress: () => {          
                this.setState({ isLoading: true });
                this.props.validateProduction(this.props.prepared, true).then(() => {
                  this.props.getValidatedProduction()
                  this.props.prepareProduction()
                  this.setState({ isLoading: false });
                });
              }
            }
          ],
        )
      }else{
        let data = {
          fin:  moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        try {
          this.props.checkExistsWOMSFMS(this.props.prepared.WorkOrderDetailID).then(() => {
            this.setState({exists: this.props.existsWOMSFMS, responseExists: this.props.recordWOMSFMS})
            let wom = this.state.responseExists
            console.log("es true", this.state.exists)
            console.log("regreso", wom)
            if (this.state.exists) {
              data = {}
              data.location = wom.location
              data.siteid = wom.site_id
              data.orgid = wom.org_id
              data.wopriority = wom.wo_priority
              data.fechaInicioParo = moment(wom.wod_start_at).tz('America/Monterrey').format('YYYY-MM-DDTHH:mm:ss')
              data.fechaFinParo = moment().tz('America/Monterrey').format('YYYY-MM-DDTHH:mm:ss')
              data.description = wom.description + " - Closed Downtime"
              data.wonum = wom.wo_num
              data.workorderid = wom.workorder_id
              this.props.updateWorkOrderMaximo(data).then(() => {
                data.fechaFinParo = moment(data.fechaFinParo).tz('UTC').format('YYYY-MM-DDTHH:mm:ss')
                console.log("response updt", this.props.respWOMResponseUpd)
                this._updateWorkOrderMaximoSFMS(data, 'PROCESADA', this.props.prepared.WorkOrderDetailID)
              })
            }
          });
          await AsyncStorage.removeItem('changeOverCheckList', () => {
            this.setState({ isLoading: true }, () => {
              this.props.verfifyProduction(this.props.validated.ID, data).then(() => {
                this.props.validateProduction(this.props.prepared, false).then(() => {
                  this.setState({ isLoading: false });
                  this.props.navigation.state.params.returnFunction()
                  this.props.getValidatedProduction()
                  this.props.navigation.goBack()
                })
              })
            })
          })
        } catch (error) {
          Alert.alert(
            '',
            I18n.t('error_finish_changeover'),
            [
              { text: I18n.t('ok'), onPress: () => {}, style: 'cancel' }
            ],
          ) // Alert - End
        } // Handling Error - End
      }			
		}
	}

  _updateWorkOrderMaximoSFMS(data, status, dtId) {
      let order = Object.assign({}, data)
      order.dtId = dtId
      order.message = this._getErrorMessageMaximo(data.message)
      order.tadi = this.props.currentUser.tadi 
      order.status = status
      this.props.updateWorkOrderMaximoSFMS(order).then(() =>{
        console.log("Actualizada: ", order);
      })
  }

  _getErrorMessageMaximo(errorResponse) {
      let message = errorResponse
      if (message != null && message.indexOf('BMX') >= 0) {
          message = message.substring(message.indexOf('BMX'))
          let end = message.indexOf(' ') < 0 ? message.length : message.indexOf(' ')
          message = message.substring(0, end)
      } else {
          message = ''
      }
      return message;
  }

  render() {
    const {
      headerContainer,
      headerText,
      twoColumns,
      toolInfo,
      toolLabel,
      hourLabel,
      bold,
      labelText
    } = styles;

    let report = null;
    let level = null;
    if (this.props.currentFailure !== false) {
      report = this.props.currentReport;
      level = this.props.currentEscalation
        ? this.props.currentEscalation.label
        : "";
    }
    let changeover = this.props.changeover
    let showButton = true
    if(changeover && this.props.status==2){
      showButton = (changeover.OpenSecond===null || changeover.OpenSecond<0)
    }
    let toolDesc = "--"
    if(this.props.prepared.tool){
      toolDesc = this.props.prepared.tool.DescTool
    }
    return (
      <View style={{ flex: 1 }}>
        <FailureHeader
          enableBack={true}
          machineName={this.props.currentMachine.label}
          failure={this.props.currentFailure}
          escalationLevel={level}
          report={report}
        />
        <View style={headerContainer}>
          <Text style={headerText}>{upperCase(I18n.t('change_over'))}</Text>
        </View>
        {!this.state.isLoading?
        <ScrollView refreshControl={
          <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this._onRefresh}
          />
        }>
          <ToolHeader
            number={toolDesc}
            start={moment(this.props.inicio).utc().format("hh:mm A") || moment().format("hh:mm A")}
            end={I18n.t('actual')}
          />
          <ToolInformationCard
            tool={this.props.prepared.tool}
            blanco={this.props.blanco}
            rollo={this.props.rollo}
            lote={this.props.lote}
            numJuliano={this.props.num_juliano}
            velocidad={this.props.designSpeed}
            golpes={this.props.golpes}
            piezas={this.props.piezas}
          />
          {this.props.status==2 && changeover?
            <ChangeOverCard item={changeover}/>
          :null}
        </ScrollView>
        :<Spinner />}
        {showButton?
        <SensaiButton
          text={`${this.props.status == 1 ? I18n.t('start') : I18n.t('finish') } ${I18n.t('change_over')}`}
          buttonStyle={{ margin: 10 }}
          loading={this.state.isLoading}
          onPress={this.validate.bind(this)}
        />:null}
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
    prepared: state.production.prepared,
    validated: state.production.validated,
    changeover: state.production.prepared.WorkOrderDetail,
    //status: getField(state, "DailyStatusID", "prepared"),
    designSpeed: getPreparedToolSpeed(state),
    rollo: getField(state, "RolledNo", "prepared"),
    lote: getField(state, "RolledLot", "prepared"),
    golpes: getField(state, "UnitAuto", "prepared"),
    piezas: getField(state, "UnitManual", "prepared"),
    inicio: getField(state, "StartAt", "prepared"),
    num_juliano: getField(state, "JulianCode", "prepared"),
    blanco: getField(state, "LoteBlanco", "prepared"),
    status: state.production.prepared.DailyStatusID,
    tool: getPreparedTool(state),
    toolValidated: getValidatedTool(state),
    existsWOMSFMS: state.forumComments.existsWOMSFMS,
    recordWOMSFMS: state.forumComments.recordWOMSFMS,
    respWOMResponseUpd: state.forumComments.respWOMResponseUpd,
    respWOMCorrectUpd: state.forumComments.respWOMCorrectUpd,
    respWOMResponseSFMS: state.forumComments.respWOMResponseSFMS,
    respWOMResponseSFMSUpd: state.forumComments.respWOMResponseSFMSUpd,
    currentUser: state.session.profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ validateProduction, verfifyProduction, getValidatedProduction, prepareProduction, 
    updateToolParams, updateWorkOrderMaximo, updateWorkOrderMaximoSFMS, checkExistsWOMSFMS }, dispatch);
}

const styles = StyleSheet.create({
  headerContainer: {
    borderRadius: 5,
    backgroundColor: "rgba(209, 209, 212, 0.5)",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeOver);
