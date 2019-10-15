import React, { PureComponent } from 'react'
import {BackHandler, View, Text, StyleSheet, ScrollView, FlatList, Alert, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity,Modal } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { guid, tracker, upperCase,navigate,goBack} from '../../helpers'

import { getCodeTryOut } from './actions'
import { LogCardCheck } from '../../screens/report/LogCardCheck'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, NavHeader, SensaiCheckbox, AlertConfirmModal, InputModal } from '../../components'
import moment from 'moment-timezone'
import 'moment/locale/es'
import { NavCard, Spinner } from "../../components";

import {  selectSingleIssue } from './actions'
import { setReportData } from '../failure/actions' 


class IdentifyOut extends PureComponent {
    state = {
        selectedIssue: {},
        selected: {},
        titleHeder: '',
        titleButton: '',
        isLoading: true,
        failure: I18n.t('no_identified'),
        mode_started_title: '',
        mode_started_msg: '',
        card_identif:'',
        InternalCode:'',
        Active:false,
        // area: '--',
        // loteRollo: null,
    }

  

    _mounted = false
    _lastSelect = false

    constructor(props) {
        super(props)
        this.failure
        this.dataTryOut  = this.props.navigation.state.params.dataTryOut
        this.InternalCode  = this.props.navigation.state.params.InternalCode
        this._onRefresh = this._onRefresh.bind(this)
        this.filterByIssueType = this.filterByIssueType.bind(this)
        this.ValidateTadiTryOutPath = this.ValidateTadiTryOutPath.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
    }



    componentDidMount() {


        tracker.trackScreenView('IdentifyOut')
        this._mounted = true
        this.props.getCodeTryOut(this.InternalCode).then(() => {
            this.filterByIssueType()
        })

        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }

    componentWillUnmount() {
        // this._mounted = false
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    }

    handleBackButton() {
        this.props.navigation.state.params.returnFunction()
        this.props.navigation.goBack()
        return true
    }

    filterByIssueType(value) {

            let mode_started_title 
            let mode_started_msg 
            let titleButton 
            let titleHeder 
            let card_identif 

            if(this.InternalCode == "TOUT"){
                titleHeder = "mode_tryout"
                titleButton = "start_tryout"
                mode_started_title = "mode_tryout_started_title"
                mode_started_msg = "mode_tryout_started_msg"
                card_identif = "card_identif_TryOut"
            }else{
                titleHeder = "mode_out"
                titleButton = "start_out"
                mode_started_title = "mode_out_started_title"
                mode_started_msg = "mode_out_started_msg"
                card_identif = "card_identif_Out"
            }

            selected = { id : false }

            this.setState({
                selected: selected,
                titleHeder: titleHeder,
                titleButton: titleButton,
                mode_started_title: mode_started_title,
                mode_started_msg: mode_started_msg,
                card_identif:card_identif,
                selectedIssue: {},
                isLoading: false,
                InternalCode : this.InternalCode ,
                Active: this.dataTryOut.try_out,
            })

    }

    _onPress(value, item) {
   
    }



    _onRefresh(data) {
        navigate('NextProduction')
        this.props.navigation.state.params.returnFunction()
        this.props.navigation.goBack()
    }
    


    ValidateTadiTryOutPath() {

        if(Object.keys(this.state.selectedIssue).length>0){
            navigate('ValidateTadiTryOut', {report: this.params,tryOutData:this.state ,returnFunction: this._onRefresh.bind(this) })
        }
    }

    _onConfirm() {        
    }

    renderLoader() {
        return (
            <View style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 9999,
            }}>
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size='large' />
                </View>
            </View>
        )
    }

    render() {

        const selectedId = (this.state.selected?this.state.selected.id:null) || null
        return(
            <View style={{flex: 1}}>

                {this.state.isLoading ?this.renderLoader():null}

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText2}  > {upperCase(I18n.t(this.state.titleHeder))}</Text>
                </View>	

                <ScrollView>
                
                    {!this.state.isLoading?
                        <View style={{ margin: 10 }}>
                            <Text style={[styles.headerText, { color: 'black' }]}>{upperCase(I18n.t('select_code_stop'))}</Text>
                        </View>
                    :null}

                    {this.state.isLoading ?
                        null
                        :
                        <View style={{ marginTop: 5, flex: 1 }}>
                            <FlatList
                                data={this.props.issuesOuts}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={[styles.componentItem, { paddingLeft: 0 }]}>
                                            <SensaiCheckbox
                                                key={item.ID}
                                                label={item.DescIssue}
                                                checked={item.selected}
                                                onChange={(value) => {
                                                    if (value === true) {
                                                        this.setState({ selectedIssue: item, failure: item.DescIssue })
                                                        this.props.selectSingleIssue(item)
                                                    } else {
                                                        this.setState({ selectedIssue: {}, failure: I18n.t('no_identified') });
                                                    }
                                                }} />
                                        </View>
                                    );
                                }}
                                keyExtractor={item => {
                                    return guid()
                                }}
                            />
                        </View>
                    }
                </ScrollView>


                <SensaiButton
                    onPress={() => {
                        this.ValidateTadiTryOutPath()
                    }}
                    // onPress={this.assignFailureTEST}
                    buttonStyle={{margin: 10}}
                    text={I18n.t(this.state.titleButton )}
                    loading={this.state.isLoading}
                />
                  

    

            </View>
        )

    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    headerText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.coolGrey,
    },


	headerText2: {
		fontFamily: "Montserrat",
		fontSize: 16,
		fontWeight: "bold",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: colors.darkGreyBlue
	},
    headerContainer: {
		borderRadius: 5,
		backgroundColor: "rgba(209, 209, 212, 0.5)",
		marginLeft: 10,
		marginRight: 10,
		marginTop: 15,
		padding: 10
    },
    

    searchContainer: {
        height: 36,
        borderRadius: 10,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.silver,
        margin: 10,
    },
    searchInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 32,
        borderRadius: 10,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        paddingLeft: 10,
        paddingRight: 10,
    },
    currentComponentHeader: {
        margin: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentComponentHeaderText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: '#323d50',
        flex: 1,
    },
    componentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 42,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.coolGrey,
        paddingLeft: 10,
        paddingRight: 10,
    },
    componentItemText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.darkGreyBlue,
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    }
})

function mapStateToProps(state) {
    return {
        issuesOuts: state.tryout.outs,
        currentReport: state.userMachine.report,
        actualReport: state.forumComments.report,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { 
            getCodeTryOut, 
            selectSingleIssue,
            setReportData,
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyOut)
