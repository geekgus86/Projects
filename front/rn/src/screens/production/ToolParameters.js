import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScrollView, View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { FailureHeader, SensaiRow, SensaiButton } from "../../components";
import { tracker, upperCase } from "../../helpers";
import { colors } from "../../styles/theme";
import moment from "moment-timezone";
import "moment/locale/es";
import { toolInfoReady, updateToolParams } from "./actions";
import { getPreparedToolSpeed, getField } from "./reducers";
import { TimeInput } from "./TimeInput";
import { NumInput } from "./NumInput";
import { prepareProduction } from "./actions";
import I18n from "../../i18n/i18n";

class ToolParameters extends Component {
  state = {
    isLoading: false,
    rawDate: new Date(),
    displayDate: "",
    rollo: "",
    lote: "",
    blanco: "",
    golpes: "",
    piezas: "",
    designSpeed: "",
    num_juliano: "",
  };
  _mounted = false;

  constructor(props) {
    super(props)
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentDidMount() {
    this._mounted = true;
    tracker.trackScreenView("ToolParameters");
    this._onRefresh();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _onRefresh() {
    if(this._mounted){
      this.setState({ isLoading: true });
      this.props.prepareProduction().then(() => {
        let date = getField(this.props.state, "inicio", "prepared")
        if(!date){
          date = moment()
        }else{
          date = moment(date).utc()
        }

        let prepared = this.props.prepared

        let currentRoll = ''
        if(prepared.tool.NoRollo){
            currentRoll = prepared.tool.NoRollo
        }        
        if(prepared.RolledNo){
            currentRoll = prepared.RolledNo
        }

        this.setState({ 
          isLoading: false,
          rawDate: date,
          designSpeed: prepared.tool.DesignSpeed,
          rollo: currentRoll,
          blanco: getField(this.props.state, "LoteBlanco", "prepared"),
          lote: getField(this.props.state, "RolledLot", "prepared"),
          golpes: getField(this.props.state, "UnitAuto", "prepared"),          
          piezas: getField(this.props.state, "UnitManual", "prepared"),
          num_juliano: this.props.prepared.JulianCode || moment().format("YY-DDDD"),
        });
      })
    }
  }

  saveAnswers() {

    if(this.props.prepared.tool.ToolType!==1 && this.state.rollo===""){
        Alert.alert(
            I18n.t('alert_empty_fields_title'),
            I18n.t('alert_empty_fields'),
            [{text: I18n.t('alert_confirm'),  style: 'cancel'}]
        )
        return false    
    }

    if(this.props.prepared.tool.ToolType!==1 && this.state.lote===""){
        Alert.alert(
            I18n.t('alert_empty_fields_title'),
            I18n.t('alert_empty_fields'),
            [{text: I18n.t('alert_confirm'),  style: 'cancel'}]
        )
        return false    
    }

    if(this.state.num_juliano===""){
        Alert.alert(
            I18n.t('alert_empty_fields_title'),
            I18n.t('alert_empty_fields'),
            [{text: I18n.t('alert_confirm'),  style: 'cancel'}]
        )
        return false    
    }
    
    if(this.state.golpes===""){
        Alert.alert(
            I18n.t('alert_empty_fields_title'),
            I18n.t('alert_empty_fields'),
            [{text: I18n.t('alert_confirm'),  style: 'cancel'}]
        )
        return false    
    }

    let data = {
      blanco: this.state.blanco,
      num_rollo: this.state.rollo,
      lote_rollo: this.state.lote,
      velocidad: this.state.designSpeed,
      num_juliano: this.state.num_juliano,
      inicio:  moment(this.state.rawDate).format('YYYY-MM-DD HH:mm:ss'),
      golpes_total: this.state.golpes || this.props.golpes,
      piezas: this.state.piezas || this.props.piezas
    };
    this.setState({ isLoading: true });
    this.props.updateToolParams(this.props.prepared.ID, data).then(() => {
      this.props.toolInfoReady();
      this.setState({ isLoading: false });
      this.props.navigation.popToTop();
    });
  }

  handleTimePicked(d) {
    this.setState({ rawDate: d.rawDate });
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
        <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
        <ScrollView>
        <FailureHeader
          enableBack={true}
          machineName={this.props.currentMachine.label}
          failure={this.props.currentFailure}
          escalationLevel={level}
          report={report}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{I18n.t('data_tool')}</Text>
        </View>
        {this.state.isLoading?null:
        <View>
          <View style={{ padding: 10 }}>
            {/*<SensaiRow sizes={[0.5, 0.5]}>
              <View style={styles.leftInput}>
                <TimeInput
                  label="HORA DE INICIO"
                  value={moment(this.state.rawDate).format("hh:mm A")}
                  onSelect={this.handleTimePicked.bind(this)}
                />
              </View>
            </SensaiRow>*/}
            {this.props.prepared.tool.ToolType==1?
              <SensaiRow sizes={[1, 1]}>
                <View style={styles.leftInput}>
                  <NumInput
                    returnKeyType={"done"}
                    label={upperCase(I18n.t('white_batch'))}
                    onChangeText={text => {
                      this.setState({ blanco: text });
                    }}
                    value={`${this.state.blanco}`}
                  />
                </View>
              </SensaiRow>:
              <SensaiRow sizes={[0.5, 0.5]}>
                <View style={styles.leftInput}>
                  <NumInput
                    returnKeyType={"done"}
                    label={I18n.t('no_of_roll')}
                    onChangeText={text => {
                      this.setState({ rollo: text });
                    }}
                    value={`${this.state.rollo}`}
                  />
                </View>
                <View style={styles.rightInput}>
                  <NumInput
                    returnKeyType={"done"}
                    label={I18n.t('batch_of_roll')}
                    onChangeText={text => {
                      this.setState({ lote: text });
                    }}
                    value={`${this.state.lote}`}
                  />
                </View>
              </SensaiRow>
            }
            <SensaiRow sizes={[0.5, 0.5]}>
              <View style={styles.leftInput}>
                <NumInput 
                  returnKeyType={"done"}
                  label={I18n.t('no_julian')}
                  onChangeText={text => {
                    this.setState({ num_juliano: text });
                  }}
                  value={`${this.state.num_juliano}`}
                />
              </View>
              <View style={styles.rightInput}>
                <NumInput
                  returnKeyType={"done"}
                  editable={false}
                  label={I18n.t('design_speed')}
                  onChangeText={text => {
                    this.setState({ designSpeed: text });
                  }}
                  value={`${this.state.designSpeed}`}
                />
              </View>
            </SensaiRow>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.inputLabel}>{I18n.t('scheduled_production')}:</Text>
          </View>
          <View style={{ padding: 10 }}>
            <SensaiRow sizes={[0.5, 0.5]}>
              <View style={styles.leftInput}>
                <NumInput
                  returnKeyType={"done"}
                  label={upperCase(I18n.t('strikes'))}
                  onChangeText={text => {
                    let piecesPerStroke = this.props.prepared.tool.PzPerStroke || 1
                    let calculatedPieces = (parseInt(text)*piecesPerStroke).toString()

                    if(text===""){
                        calculatedPieces = ' '
                    }
 
                    this.setState({ golpes: text, piezas: calculatedPieces })
                  }}
                  value={this.state.golpes}
                />
              </View>
              <View style={styles.rightInput}>
                <NumInput
                  returnKeyType={"done"}
                  label={upperCase(I18n.t('pieces'))}
                  editable={false}  
                  onChangeText={text => {
                    this.setState({ piezas: text });
                  }}  
                  value={this.state.piezas}
                />
              </View>
            </SensaiRow>
          </View>
        </View>}
        <SensaiButton
          text={I18n.t('save')}
          buttonStyle={{ marginBottom: 10, marginTop: 10, marginRight: 10, marginLeft: 10 }}
          loading={this.state.isLoading}
          onPress={this.saveAnswers.bind(this)}
        />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentMachine: state.userMachine.machine,
    currentFailure: state.userMachine.inFailureMode,
    currentReport: state.userMachine.report,
    currentEscalation: state.userMachine.escalation,
    state: state,
    prepared: state.production.prepared,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateToolParams, toolInfoReady, prepareProduction }, dispatch);
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
  },
  inputLabel: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#243746"
  },
  leftInput: {
    marginBottom: 10,
    marginRight: 10
  },
  rightInput: {
    marginBottom: 10,
    marginLeft: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolParameters);
