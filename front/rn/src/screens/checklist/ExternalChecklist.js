import React, { PureComponent } from 'react'
import { Alert, BackHandler, View, ScrollView, Text, StyleSheet, RefreshControl, AsyncStorage, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchExternalChecklist,
  postChecklistAnswers,
  fetchInitialChecklist,
} from "./actions";
import { fetchTools } from "../toolDetail/actions";
import { getExternalChecklistSections } from './reducers'
import { colors } from '../../styles/theme'
import I18n from '../../i18n/i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import { guid, tracker, upperCase, goBack } from '../../helpers'
import { SensaiButton, SensaiCheckbox, FailureHeader, Spinner, SensaiCombo } from '../../components/'
import { externalChecklistReady, updateCurrentTool, updateChangeoverReqs, prepareProduction, setExternalChecklistInStorage } from "../production/actions";

import moment from 'moment-timezone'
import 'moment/locale/es'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    headerContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        padding: 10,
    },
    headerText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
})

class ExternalChecklist extends PureComponent {
  state = {
    answers: {},
    isRefreshing: false,
    isLoading: true,
    selectedId: 0,
    toolIdSelected: 0,
    timer: '',
  };

  _inicio = null
  timer = null

  changeOverReqs = {
    material: {
      "17": false
    },
    herramienta: {
      "3": false,
      "5": false,
      "6": false,
      "7": false,
      "8": false
    },
    racks: {
      "16": false
    },
    dedos: {
      "12": false,
      "13": false,
      "15": false
    }
  };

  reqsResponse = {
    material: 0,
    herramienta: 0,
    racks: 0,
    dedos: 0,
  }

  _mounted = false;
  constructor(props) {
    super(props);
    this.setAnswer = this.setAnswer.bind(this);
    this.save = this.save.bind(this);
    this.saveInStorage = this.saveInStorage.bind(this);
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentWillMount() {
    this._mounted = true;
    this.props.fetchTools().then(()=>{
      let tool = (!this.props.prepared.ToolID ? this.props.tools[0].ID : this.props.prepared.ToolID);
      this.setState({ 
        toolIdSelected : tool
      })
    })
    this.getInitialCheckList()
  }

  componentDidMount() {
    tracker.trackScreenView("ExternalChecklist");
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => { this.saveInStorage() })
  }

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this.timer)
  }

  async startTimer() {
    if (this._inicio === null) {
      this._inicio = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    this.timer = setInterval(this.tick, 1000);
  }

  async tick() {
    try {
        let now = new Date().getTime()
        let creation = new Date(moment(this._inicio).format()).getTime()
        let diff = Math.round((now - creation) / 1000)
        let h = Math.floor(diff / (60 * 60))
        diff = diff - (h * 60 * 60)
        let m = Math.floor(diff / (60))
        diff = diff - (m * 60)
        let s = diff
        this.setState({ timer: `${(h < 10) ? '0' + h : h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}` })
    } catch (error) {
        console.log(error)
    }
}

  async saveInStorage() {
    this.backHandler.remove();
    try {
      const storage = {
        timer: this._inicio,
        answers: this.state.answers
      }
      AsyncStorage.setItem('changeOverCheckList', JSON.stringify(storage))  
    } catch (error) {}
  }

  async save() {
    tracker.trackEvent("user-actions", "save-checklist");
    let validChecking = true;
    let params = {
      daily_work_order: this.props.prepared.ID,
      work_order_id: this.props.prepared.WorkOrderID,
      user_id: this.props.user.id,
      checklist_id: this.props.checklist.ID,
      machine_id: 2,
      checklist_type: 2,
      //machine_id: this.props.currentMachine.id,
      shift: this.props.toDate,
      inicio: this._inicio,
      tool: this.state.toolIdSelected || this.props.tools[0].ID,
      answers: []
    };
    this.props.checklist.sections.forEach(section => {
      section.questions.forEach(check => {
        let response = false;
        let comment = "";
        if (this.state.answers[check.ID]) {
          response = this.state.answers[check.ID].response
          comment = this.state.answers[check.ID].comment
        }
        params.answers.push({
          checklistitem_id: check.ID,
          section_id: section.ID,
          response: response,
          comment: comment
        });
        if(!response && comment==''){
          validChecking = false
        }
      });
    });
    if(validChecking) {
      this.setState({ isLoading: true });
      try { // When a new tool is seleceted the variable which has saved the checklist of the previous tool is removed
        this.props.updateCurrentTool(this.props.prepared.ID, params.tool)
          .then(() => {              
            this.props.postChecklistAnswers(params, true).then(() => {
              clearInterval(this.timer)
              this.props.updateChangeoverReqs(params.daily_work_order, this.reqsResponse).then(()=>{
                //this.saveInStorage() // Save in local storage the checkboxes selected
                this.props.prepareProduction().then(()=>{
                  this.setState({ answers : [] }, ()=>{
                    AsyncStorage.removeItem('changeOverCheckList')
                    this.props.navigation.popToTop();
                  })
                })
              })
            });            
          })
      } 
      catch (error) {}    
    }else{
      Alert.alert(I18n.t('alert_warning'), I18n.t('checklist_empty'))
    }
  }

  setAnswer(id, data, comment) {   //item.id, value, comment
    const { answers } = this.state;
    if (this.timer === null) {
      this.startTimer()
    }
    if (data === true) {
      if (id === 39) {
        this.changeOverReqs.material["17"] = true;
      }
      if (id === 25) {
        this.changeOverReqs.herramienta["3"] = true;
      }
      if (id === 27) {
        this.changeOverReqs.herramienta["5"] = true;
      }
      if (id === 28) {
        this.changeOverReqs.herramienta["6"] = true;
      }
      if (id === 29) {
        this.changeOverReqs.herramienta["7"] = true;
      }
      if (id === 30) {
        this.changeOverReqs.herramienta["8"] = true;
      }
      if (id === 38) {
        this.changeOverReqs.racks["16"] = true;
      }
      if (id === 34) {
        this.changeOverReqs.dedos["12"] = true;
      }
      if (id === 35) {
        this.changeOverReqs.dedos["13"] = true;
      }
      if (id === 37) {
        this.changeOverReqs.dedos["15"] = true;
      }
    } else {
      if (id === 39) {
        this.changeOverReqs.material["17"] = false;
      }
      if (id === 25) {
        this.changeOverReqs.herramienta["3"] = false;
      }
      if (id === 27) {
        this.changeOverReqs.herramienta["5"] = false;
      }
      if (id === 28) {
        this.changeOverReqs.herramienta["6"] = false;
      }
      if (id === 29) {
        this.changeOverReqs.herramienta["7"] = false;
      }
      if (id === 30) {
        this.changeOverReqs.herramienta["8"] = false;
      }
      if (id === 38) {
        this.changeOverReqs.racks["16"] = false;
      }
      if (id === 34) {
        this.changeOverReqs.dedos["12"] = false;
      }
      if (id === 35) {
        this.changeOverReqs.dedos["13"] = false;
      }
      if (id === 37) {
        this.changeOverReqs.dedos["15"] = false;
      }
    }

    this.reqsResponse = {
      material: 0,
      herramienta: 0,
      racks: 0,
      dedos: 0,
    }

    if (this.changeOverReqs.material["17"] === true) {
        this.reqsResponse.material = 1;
    }

    if (
      this.changeOverReqs.herramienta["3"] === true &&
      this.changeOverReqs.herramienta["5"] === true &&
      this.changeOverReqs.herramienta["6"] === true &&
      this.changeOverReqs.herramienta["7"] === true &&
      this.changeOverReqs.herramienta["8"] === true
    ) {
        this.reqsResponse.herramienta = 1;
    }

    if (this.changeOverReqs.racks["16"] === true) {
        this.reqsResponse.racks = 1;
    }

    if (
      this.changeOverReqs.dedos["12"] === true &&
      this.changeOverReqs.dedos["13"] === true &&
      this.changeOverReqs.dedos["15"] === true
    ) {
        this.reqsResponse.dedos = 1;
    }
    this.props.updateChangeoverReqs(this.props.prepared.ID, this.reqsResponse);
    answers[id] = { response: data, comment: comment };
    this.setState({ answers : answers });    
  }

  async getInitialCheckList() {
    if (this._mounted === true) {
      if (this.props.currentMachine !== null) {
        try {
          let checklist = await AsyncStorage.getItem('changeOverCheckList');
          this.props
            .fetchExternalChecklist(this.props.currentMachine.id, 2).then(() => {
              this.setState({ isLoading: false, isRefreshing: false })
              if (checklist != null) {
                let answers = JSON.parse(checklist)
                if(answers.answers){
                  this._inicio = answers.timer
                  this.startTimer()
                  this.setState({ answers : answers.answers })
                }
              }            
            })
        } catch (error) {}              
      }
    }
  }

  onToolChange(val, i) {
    /*try { // When a new tool is seleceted the variable which has saved the checklist of the previous tool is removed
      await AsyncStorage.removeItem('changeOverCheckList', () => {
      this.props.updateCurrentTool(this.props.prepared.id, val)
        .finally(() => this.setState({ answers : {} }) )
      })
    } 
    catch (error) {}*/
    this.setState({ toolIdSelected : val });
  }

  // Save in Storage when the App is going to be either inactive or background 
  async _handleAppStateChange(nextAppState) {    
    try {
      if (nextAppState.match(/inactive|background/)) {
        const storage = {
          timer: this._inicio,
          answers: this.state.answers
        }
        AsyncStorage.setItem('changeOverCheckList', JSON.stringify(storage)) 
      }
    } catch (error) {}    
  }

  _selectedId(id) {
    this.setState({ selectedId: id });
  }

  renderCheckListItems() {
    if (!this.state.isLoading && this.props.checklist) {
      const sections = this.props.checklist.sections.map(section => {
        if (section.questions.length < 1) { 
          return 
        }
        const checks = section.questions.map(item => {
          return (
            <View key={item.ID} style={{ marginBottom: 10 }}>
              <SensaiCheckbox
                label={item.DescQuestion}
                showButton={true}
                checked={!this.state.answers[item.ID] ? false : this.state.answers[item.ID].response}
                selectedId={{
                  id: item.ID,
                  selectedId: this.state.selectedId,
                  returnF: this._selectedId.bind(this)
                }}
                onChange={(value, comment) => {
                  this.setAnswer(item.ID, value, comment);
                }}
              />
            </View>
          );
        });
        return (
          <View key={section.ID}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.silver
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 16,
                  fontWeight: "bold",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "left",
                  color: colors.azure
                }}
              >
                {upperCase(section.DescSection)}
              </Text>
            </View>
            {checks}
          </View>
        );
      });
      return sections;
    }
    return <Spinner />;
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
    let items = [];
    if (this.props.tools.length !== 0) {
      items = this.props.tools.map(t => {
        return {
          value: t.ID,
          label: t.DescTool
        };
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <FailureHeader
          enableBack={true}
          machineName={this.props.currentMachine.label}
          failure={this.props.currentFailure}
          escalationLevel={level}
          report={report}
          customEvent= {()=> {
            this.saveInStorage();
            this.props.navigation.popToTop();
          }}
        />
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {upperCase(I18n.t('extChecklist_header'))}
            </Text>
          </View>
          <ScrollView style={{ marginTop: 10 }}>
            {this.state.timer?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
                <Text style={{ fontSize: 16 }}>{I18n.t('checklist_timer')}</Text>
                <Text style={{ justifyContent: 'space-between', fontSize: 16 }}>
                  <Icon name={"clock-o"} size={20} color={colors.darkGreyBlue}/>{'  '+this.state.timer}
                </Text>
              </View>
            :null}
            {this.state.isLoading?null:
              <View style={{ margin: 10, marginBottom: 0 }}>
                <SensaiCombo
                  label={upperCase(I18n.t('extChecklist_tool'))}
                  items={items}
                  onChange={this.onToolChange.bind(this)}
                  selected={this.state.toolIdSelected}
                />
              </View>
            }
            {this.renderCheckListItems()}
          </ScrollView>
          <SensaiButton
            text={I18n.t('extChecklist_finish')}
            buttonStyle={{ margin: 10 }}
            onPress={this.save}
            loading={this.state.isLoading}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        checklist: getExternalChecklistSections(state),
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        user: state.session.info,
        answersSaved: state.checklist.answersSaved,
        toDate: state.lastShift.toDate,
        tools: state.tools.tools,
        prepared: state.production.prepared
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchInitialChecklist, 
    fetchExternalChecklist, 
    postChecklistAnswers, 
    fetchTools, 
    updateCurrentTool, 
    updateChangeoverReqs, 
    externalChecklistReady, 
    prepareProduction,
    setExternalChecklistInStorage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalChecklist)