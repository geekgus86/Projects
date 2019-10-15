import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, BackHandler, Dimensions, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment-timezone'
import 'moment/locale/es'

import { colors, theme } from '../../styles/theme'
import { upperCase } from '../../helpers'
import I18n from '../../i18n/i18n'
import { SensaiButton, SensaiRow, SensaiCard, Spinner, CardDivider, FailureHeader } from '../../components'
import { ProcessParameterOption } from './ProcessParameterOption'
import { ProcessParameterSection } from './ProcessParameterSection'
import { getObjectives, addObjectivesRealValues } from './actions'

class ProcessParameter extends Component {
    
    state = {
        isLoading: true,
        isLoadingForSave: false,
        activeOption: 0, // default menu option
        objectives: [],
        proceedToSave: false,
        parameterSectionHeight : 0
    }

    constructor(props) {
        super(props)

        this.rowSize = [2, 1, 1, 1.5, 1.3, 0.2]
        this.containerMenuWidth = 1.3
        this.containerSectionWidth = 2.7
        this.objectivePadding = [2, 0, 2, 5]
        this.objectiveMargin = [10, 10, 10, 10]

        this._onActiveOption = this._onActiveOption.bind(this)
        this._selectNoEmptySections = this._selectNoEmptySections.bind(this)
        this._getObjectivesFilled = this._getObjectivesFilled.bind(this)
        this._setRealForObjective = this._setRealForObjective.bind(this)
        this._handleBackButton = this._handleBackButton.bind(this)
    
        this.topBarsHeight = 230
        this.windowHeight = Dimensions.get('window').height
    }

    componentDidMount() {
        this.setState({ parameterSectionHeight : this._resizeParameterSectionHeight(this.state.activeOption) })

        this.props.getObjectives(this.props.tool.objective)
            .then(() => {
                this.setState({ 
                    objectives : this._selectNoEmptySections(this.props.objectives) 
                }, ()=>{ 
                    this.setState({ isLoading : false }) 
                })
            })
            .catch(error => console.log(error) )
            .finally(() => { this.setState({ isLoading : false }) })
        
        BackHandler.addEventListener('hardwareBackPress', this._handleBackButton)
    }

    _handleBackButton() {
        this.props.navigation.goBack();
        return true
    }

    _resizeParameterSectionHeight(activeOption) {
        let height =  this.windowHeight - this.topBarsHeight;
        if (activeOption == this.state.objectives.length - 1) {
            height -= 60    //SensaiButton Height : 50 + 10px of space at its bottom
        }
        return height
    }

    // Activate Objectives option/section 
    _onActiveOption(option) {
        this.setState({ activeOption : option, parameterSectionHeight : this._resizeParameterSectionHeight(option) })
    }

    // Set into state.objectives just such options (sections) with objectives
    _selectNoEmptySections(objectives) { 
        const noEmpty = [];
        objectives.forEach((row) => {
            if (row.data.length > 0) {
                noEmpty.push(row)                
            }
        })
        return noEmpty;
    }

    // Get Objectives Filled per Section
    _getObjectivesFilled(sectionPos, setCounterInRed = false) {   // sectionPos : option/section that comes from the call
        let objectivesFilled = 0;
        for (let objectiveItem of this.state.objectives[sectionPos].data) {
            if (objectiveItem.real || objectiveItem.real == 0) {
                objectivesFilled++;
            }
        }
        //console.log("setCounterInRed ", setCounterInRed)
        return { objectivesFilled: objectivesFilled, red : (objectivesFilled == 0 ? false : setCounterInRed) }        
    }

    // Set real value to specific objective    
    _setRealForObjective(sectionPos, objectivePos, realValue) {
        let { objectives } = this.state;
        objectives[sectionPos].data[objectivePos].real = realValue
        this.setState({ objectives : objectives })
    }

    // Perform request to save records
    _addObjectivesRealValue() {
        let data = [];
        this.state.objectives.forEach((objective) => {
            data.push(...objective.data)
        })                
        this.setState({ isLoadingForSave: true }, () => {            
            this.props.addObjectivesRealValues(data).then(()=>{
                this.setState({ isLoadingForSave: false })
                Alert.alert(
                    I18n.t('processParameter_success_title'),
                    I18n.t('processParameter_success_message', { tool_code: this.props.tool.code }),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                //this.props.navigation.navigate('CurrentProductionTab')
                                this.props.navigation.goBack()
                                //this.props.navigation.state.params.returnFunction()
                            }
                        }
                    ],
                    { onDismiss: () => { this.props.navigation.goBack() } },
                    { cancelable: false}
                ) 
            })
        })
    }

    _validationAndUpdate() {
        let proceedToSave = true;
        this.state.objectives.forEach((obj, i) => {
            if (this._getObjectivesFilled(i, true).objectivesFilled < obj.data.length) {
                proceedToSave = false         
            }
        })

        if (proceedToSave) { 
            Alert.alert(
                I18n.t('processParameter_confirmSaving_title'),
                I18n.t('processParameter_confirmSaving_message', { tool_code: this.props.tool.code }),
                [
                    {
                        text: I18n.t('processParameter_confirmSaving_title'),
                        onPress: () => {
                            this._addObjectivesRealValue()
                        }
                    },
                    {
                        text: I18n.t('processParameter_cancel_text'),
                        onPress: () => {},
                        style: 'cancel'
                    }
                ],
                { cancelable: false }
            )
        } else {            
            Alert.alert(
                '',
                I18n.t('processParameter_onSubmit_validationError_msg'),
                [
                    {
                        text: I18n.t('ok'),
                        onPress: () => {}
                    }
                ],
                { cancelable: false }
            )
        }
    }

    renderTitle() {
        const { modalContainer, twoColumns, mainText, secondaryText, iconGraphContainer } = styles
        const currentDate = moment(new Date()).tz('America/Monterrey').format('D MMMM h:mm A')

        return (
            <View style={modalContainer}>
                <View style={twoColumns}>
                    <View style={{flex: 1}}></View>
                    <View>
                        <Text style={mainText}>
                            {upperCase(I18n.t('processParameter_title'))}
                        </Text>
                        <Text style={secondaryText}>{I18n.t('tool')} {this.props.tool.code} - {currentDate}</Text>
                    </View>
                    <View style={iconGraphContainer}>
                        <Image style={{width: 40, height: 40}} source={require('../../assets/graphIcon.png')} />
                    </View>    
                </View>
            </View>
        )
    }

    renderMenu() {        
        return (
            this.state.objectives.map((row, i) => {
                return (
                    <ProcessParameterOption  
                        optionPos={i}
                        key={'option-' + i} 
                        content={row} 
                        onActiveOption={this._onActiveOption}
                        activeOption={this.state.activeOption}
                        objectivesFilled={this._getObjectivesFilled(i)}
                    />
                )            
            })
        )     
    }

    // The section content state should be saved.
    // And passed over and over as long as the its corresponding menu option/section is being selected    
    renderParameterSection(optionActivated) {
        return (
            <ProcessParameterSection 
                rowSize={this.rowSize} 
                containerWidth={this.containerSectionWidth} 
                objectivePadding={this.objectivePadding} 
                objectiveMargin={this.objectiveMargin}
                sectionPosBelongs={this.state.activeOption}
                objectives={this.state.objectives[this.state.activeOption].data}
                name={this.state.objectives[this.state.activeOption].name}
                setRealValue={this._setRealForObjective}
            />                 
        )        
    }

	render() {
        const { mainContainer } = styles
        let content = <Spinner />;

        if (this.state.isLoading === false) {
            content =   <View style={mainContainer}>
                            {this.renderTitle()}
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', height : this.state.parameterSectionHeight}}>
                                <View style={{ flex : this.containerMenuWidth }}>
                                    {this.renderMenu()}
                                </View>
                                {this.renderParameterSection(this.state.activeOption)}                             
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{ flex : 2.4 }}></View>
                                <View style={{ flex : 0.6 }}>
                                    { this.state.activeOption == (this.state.objectives.length -1)
                                        ?   <SensaiButton
                                                text={I18n.t('processParameter_saving_ButtonText')}
                                                disabled = {true}
                                                buttonStyle={{ margin: 10 }}
                                                onPress={this._validationAndUpdate.bind(this)}
                                                loading={this.state.isLoadingForSave}
                                            /> 
                                        : null
                                    }
                                </View>             
                            </View>
                        </View>;
        }        
        let report = null;
        let level = null;
        if (this.props.currentFailure !== false) {
          report = this.props.currentReport;
          level = this.props.currentEscalation
            ? this.props.currentEscalation.label
            : "";
        }

		return (
            <View style={{ flex : 1 }}>        
                <FailureHeader
                    enableBack={true}
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}/>    			
                {content}
            </View>
		)
	}
}

const styles = StyleSheet.create({
    mainContainer: {    	
        flex: 1,
        justifyContent: 'flex-start'
    },
    modalContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 7,
        padding: 10
    },    
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    secondaryText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
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
    iconGraphContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-end'
    }
})

function mapStateToProps(state) {
    return {        
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        objectives: state.processParameter.objectives,
        tool: state.production.validated.tool    // Tool in production
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getObjectives, addObjectivesRealValues }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessParameter)