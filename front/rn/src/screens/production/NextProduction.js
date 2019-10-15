import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyleSheet ,ScrollView, View, RefreshControl, Switch, Text } from "react-native";
import { NavCard, Spinner } from "../../components";
import { tracker, navigate } from "../../helpers";
import { isReadyForChangeOver, getField, getPreparedTool } from "./reducers";
import { prepareProduction, fetchDailyReportLog } from "./actions";
import { subscribeTo, unsubscribe } from '../../lib/Socket'
import I18n from "../../i18n/i18n";
import { TryOutModal } from '../tryout/TryOutModal'

//ADAP
import { CloseTryOutModal } from '../tryout/CloseTryOutModal'
import { fetchCurrentFailure } from '../home/actions' //add ya existia este archivo adap
import { closeTryout } from '../tryout/actions' //add adap
//ADAP


const styles = StyleSheet.create({
  tryOutView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  tryOutText: {
    fontWeight: 'bold',
    color: 'black'
  }
});

class NextProduction extends Component {
  _mounted = false;
  state = {
    isLoading: false,
    Outsustained: false,
    checklistEx_CO:false,
    InternalCode: '',
    mode_started_title:'',
    mode_started_msg:'',
    card_identif:'',
    Active:false,
    try_out:false,
    is_try_out1: false,
    is_out:false
  }


  constructor(props) {
    super(props)
    this._returnFunction = this._returnFunction.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this.getfetchCurrentFailure = this.getfetchCurrentFailure.bind(this)
    this.switchTryOut = this.switchTryOut.bind(this)
  }




  async switchTryOut() {

    if(!this.state.try_out){
      this.modal.showModalSelecctTypeStop()
    }else{

      
      let InternalCode
      let mode_started_title 
      let mode_started_msg 
      let card_identif 
      if(this.state.is_try_out1){ // try Out 
        InternalCode="TOUT"
        mode_started_title = "mode_tryout_stop_title"
        mode_started_msg = "mode_tryout_stop_msg"
        card_identif = "card_identif_TryOut_stop"
      }
      
      if(this.state.is_out){ // Out Sustained
        InternalCode="NOUT"
        mode_started_title = "mode_out_stop_title"
        mode_started_msg = "mode_out_stop_msg"
        card_identif = "card_identif_Out_stop"
      }


      this.setState({
        mode_started_title: mode_started_title,
        mode_started_msg: mode_started_msg,
        card_identif:card_identif,
        InternalCode:InternalCode
      })

      this.modalStop.showModalStop()
    }

    await this.setState({ try_out: !this.state.try_out})
  }

  componentDidMount() {
    this.setState(this.state)
    this._mounted = true;
    tracker.trackScreenView("NextProductionTab");
    subscribeTo('setupmode', this._onRefresh)
    subscribeTo('editProduction', this._onRefresh)
    subscribeTo('isTryOut', this._onRefresh)
    this._onRefresh();
  }

  _onRefresh() {


    this.setState({ isLoading: true })
    this.props.prepareProduction().then(()=>{
      this.setState({ isLoading: false })
    })
    this.getfetchCurrentFailure();

  }

  getfetchCurrentFailure() {


      this.props.fetchCurrentFailure().then(()=>{
        let disabled = !this.props.production


        if(this.props.currentReport != null || this.props.currentReport != undefined ){

          if(this.props.currentReport.try_out){
              disabled =this.props.currentReport.try_out
          }

          if(this.props.currentReport.try_out != null && this.props.currentReport.try_out != undefined  ){

            this.setState({ 
              checklistEx_CO: disabled,
              try_out: this.props.currentReport.try_out,   
              is_try_out1: this.props.currentReport.is_try_out1,     
              is_out: this.props.currentReport.is_out,     
            })

          }
      }else{
        
        this.setState({ 
          checklistEx_CO: false,
          try_out: false,   
          is_try_out1: false,     
          is_out: false,   
          Active:false  
        })

      }


      })
      // this.setState({ tryOut: true,is_out:true,is_try_out1:false, checklistEx_CO: false ,Active:false }) //solo test 



  }


  componentWillUnmount() {
    this._mounted = false;
    unsubscribe('setupmode')
    unsubscribe('editProduction')
    unsubscribe('isTryOut')
  }

  _returnFunction() {
    this.props.prepareProduction()
    this.props.fetchDailyReportLog()
    this.props.navigation.navigate("CurrentProductionTab")
  } 


  render() {
   

    let content = null
    if (this.state.isLoading === false) {
      content = (
        <View>

          <TryOutModal 

            start={true}
            ref={(r)=>{this.modal = r}} 
            title={I18n.t('start_out_try_out')}
            message={`${I18n.t('select_type_stop')}:`} 
            area={null}
            color={null}
            confirmText={I18n.t('try_out')}
            confirmText2={I18n.t('sustained_out')}
            cancelText={I18n.t('cancel')}
            onConfirmTryOut={()=>{
              navigate('IdentifyOutModal', {dataTryOut: this.state,InternalCode: "TOUT",returnFunction: this._onRefresh.bind(this),  })
            }}
            onConfirmOutSostenido={()=>{
              navigate('IdentifyOutModal', { dataTryOut: this.state,InternalCode: "NOUT",returnFunction: this._onRefresh.bind(this), })
            }}
            onCancel={()=>{
              this.setState({ try_out: false })
            }} 
            
            
          />



          <CloseTryOutModal 

            start={true}
            ref={(r)=>{this.modalStop = r}} 
            title={I18n.t('stop_mode_tryout_title')}
            message={`${I18n.t('start_trayout_mode')}:`} 
            area={null}
            color={null}
            confirmText={I18n.t('confirm_stop_mode_tryout')}
            confirmText2={I18n.t('sustained_out')}
            is_out={this.state.is_out}
            is_try_out1={this.state.is_try_out1}
            cancelText={I18n.t('cancel')}
            onConfirmStop={()=>{
              navigate('ValidateTadiTryOut', {report: "", tryOutData:this.state   ,returnFunction: this._onRefresh.bind(this) })
            }}

            onCancel={()=>{
              this.setState({ try_out: true })
            }} 


          />


          <View style={styles.tryOutView}>
            <Text style={styles.tryOutText}>{`${I18n.t('start_trayout_mode')}:`} </Text>
            <Switch value={this.state.try_out} onValueChange={this.switchTryOut} />
          </View>

          <NavCard
            number={1}
            title={I18n.t('checklist_external_changeover')}
            text={I18n.t('checklist_external_changeover_fill')}
            checked={this.props.checkValidation}
            disabled= {this.state.checklistEx_CO}
            onPress={() => { navigate("ExternalChecklistModal"); }}
            />
          <NavCard
            number={2}
            title={I18n.t('data_tool')}
            text={I18n.t('insert_data_tool_change')}
            checked={this.props.toolValidation && this.props.checkValidation}
            // disabled={!this.props.checkValidation}
            disabled={ (this.state.try_out == true ) ? true : !this.props.checkValidation}
            onPress={() => { navigate("ToolParametersModal"); }}
          />
          <NavCard
            number={3}
            title={I18n.t('change_over')}
            text={I18n.t('start_tool_change')}
            checked={this.props.status==2}
            // disabled={!this.props.toolValidation || !this.props.checkValidation}
            disabled={  (this.state.try_out == true ) ? true :  (!this.props.toolValidation || !this.props.checkValidation) }
            onPress={() => { navigate("ChangeOverModal", { returnFunction: this._returnFunction.bind(this) }); }}
          />
        </View>
      )
    }
    return (
      <ScrollView style={{ flex: 1 }} refreshControl={
        <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this._onRefresh}
        />
      }>
        {content}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  let checkValidation = false
  let toolValidation = false

  if(state.production.prepared){
    let piezas = state.production.prepared.UnitManual
    let golpes = state.production.prepared.UnitAuto
    let num_rollo = state.production.prepared.RolledNo
    let lote_rollo = state.production.prepared.RolledLot
    let velocidad = state.production.prepared.DesignSpeed
    let num_juliano = state.production.prepared.JulianCode
    let blanco = state.production.prepared.LoteBlanco
    let rollo_val = false
    if(state.production.prepared.tool){
      let toolType = state.production.prepared.tool.ToolType
      if(toolType==1){
        rollo_val = !blanco==false
      }else{
        rollo_val = !num_rollo==false&& !lote_rollo==false
      }
    }

    toolValidation = (piezas!=null && golpes!=null && rollo_val && velocidad!=null && num_juliano!=null )

    //let dedos = state.production.prepared.dedos
    //let racks = state.production.prepared.racks
    //let herramienta = state.production.prepared.herramienta
    //let material = state.production.prepared.material
    checkValidation = (state.production.prepared.ToolID) ? true : false;
  }

  return {
    changeoverReady: isReadyForChangeOver(state),
    tool: getPreparedTool(state),
    status: getField(state, "DailyStatusID", "prepared"),
    toolValidation: toolValidation,
    checkValidation: checkValidation,
    production: state.production.prepared,
    currentReport: state.userMachine.report,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { 
      prepareProduction, 
      fetchDailyReportLog, 
      fetchCurrentFailure,
      closeTryout,
    }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextProduction);



