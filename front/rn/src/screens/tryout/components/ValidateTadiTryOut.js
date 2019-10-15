import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform,Modal,BackHandler } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../../styles/theme'
import { SensaiInput, Spinner, OkModal } from '../../../components'
import { tracker, upperCase, goBack } from '../../../helpers'
import { manualAssist, clearAssistanceUser  } from '../../failure/actions'
import {  authorizationTryOut } from '../../tryout/actions'
import I18n from '../../../i18n/i18n'
import {  ConfirmModalOut } from '../../tryout/ConfirmModalOut'


class ValidateTadiTryOut extends Component {
        _mounted = false
        _user = ''
        mode_started_msg = ''
        mode_started_title = ''
    
        constructor(props) {
            super(props)

            this.params = this.props.navigation.state.params
            this.tryOutData = this.props.navigation.state.params.tryOutData
            this.state = {
                isLoading: false,
                tadi: null,
            }
            this.handleBackButton = this.handleBackButton.bind(this)
            this.goBackVañiddate = this.goBackVañiddate.bind(this)


        }
    
        componentDidMount() {
            this._mounted = true
            tracker.trackScreenView("ValidateTadiTryOut");
            BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
            
        }
    
        componentWillUnmount() {
            this._mounted = false
            BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)

        }
    
        handleBackButton() {
            if(!this.tryOutData.Active){
                this.props.navigation.state.params.returnFunction()
            }
            this.props.navigation.goBack()
            return true
        }

        goBackVañiddate(){
            if(this.tryOutData.Active){
                goBack()
            }else{
                this.props.navigation.state.params.returnFunction()
                this.props.navigation.goBack()
            }     
        }


        onPress() {
            if(this.state.tadi){
                this.setState({ isLoading: true })

                let OnOff_tryOut_Out =this.tryOutData.Active
                let IssueID =0

                if(this.tryOutData.Active){
                     IssueID =this.tryOutData.selectedIssue.ID
                }

                this.props.authorizationTryOut(this.state.tadi,IssueID,OnOff_tryOut_Out,this.tryOutData.InternalCode ).then(()=>{

                    this._user = `${this.props.user.nombre}`

                    if(this.props.user.resultActive){
                        this.mode_started_title = `${this.tryOutData.mode_started_title}`
                        this.mode_started_msg = `${this.tryOutData.mode_started_msg}`
                    }else{

                        if(this.tryOutData.Active){
                            if(this.props.user.numError == 1){ //No tiene Autorizacion 
                                this.mode_started_title = 'errorTryOut1'
                                this.mode_started_msg = 'errorTryOutDetails1'
                            }else if(this.props.user.numError == 2){ //No se encuentra tadi
                                this.mode_started_title = 'errorTryOut2'
                                this.mode_started_msg = 'errorTryOutDetails2'
                            }
                        }else{
                            if(this.props.user.numError == 1){ //No tiene Autorizacion 
                                this.mode_started_title = 'errorStopTryOut1'
                                this.mode_started_msg = 'errorStopTryOutDetails1'
                            }else if(this.props.user.numError == 2){ //No se encuentra tadi
                                this.mode_started_title = 'errorTryOut2'
                                this.mode_started_msg = 'errorTryOutDetails2'
                            }
                        }


                    }

                    this.setState({ isLoading: false })
                    this.modalStop.showModalConfirm(this.props.user.resultActive)
          


                }).catch((err)=>{
                    console.log(err)
                    this.setState({ isLoading: false, tadi: '' })
                })
            }else{
                alert(I18n.t('insert_user_number'))
            }
        }
    
        render() {

            const { modalContainer, mainTitle, mainText, subText, inputText, button } = styles
            const hitSlop = { top: 10, left: 10, bottom: 10, right: 10 }
    
            if(this.state.isLoading){
                return <Spinner />
            }

            return (
                <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
                    <View style={modalContainer}>
                        <View style={{
                            position: 'absolute',
                            left: 10,
                            top: 4,
                        }}>
                            <TouchableOpacity style={[button]} onPress={(e) => {this.goBackVañiddate()}} hitSlop={hitSlop}>
                                <MaterialIcon name='arrow-back' size={30} color={colors.darkGreyBlue} />
                            </TouchableOpacity>
                        </View>                    
                        <Text style={mainTitle}>
                            {upperCase(I18n.t('register'))}
                        </Text>
                    </View>
                    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{
                            width: 107,
                            height: 107,
                            marginBottom: 20,
                        }} source={require('../../../assets/tadi.png')} />
                        <Text style={mainText}>{I18n.t('user_identification')}</Text>
                        <Text style={subText}>{I18n.t(this.tryOutData.card_identif)}</Text>
                        <SensaiInput 
                            inputStyle={inputText}
                            value={this.state.tadi}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            focus
                            onChangeText={(value) => {
                                if(this._mounted){
                                    this.setState({ tadi: value })
                                }
                            }}
                            onPress={this.onPress.bind(this)}
                            confirmIcon="check"
                        />
                    </View>
                    

                    <ConfirmModalOut 
                        start={true}
                        ref={(r)=>{this.modalStop = r}} 
                        title={I18n.t(this.mode_started_title)}
                        message={I18n.t(this.mode_started_msg)}
                        user={this._user}
                        confirmText={I18n.t('accept')}
                        cancelText={I18n.t('cancel')}
                        confirmIcon="check"
                        onConfirm={()=>{
                        this.props.clearAssistanceUser()
                        this.params.returnFunction()
                        this.props.navigation.goBack()
                        }}

                        onCancel={()=>{
                            this.props.clearAssistanceUser()
                            this.params.returnFunction()
                            this.props.navigation.goBack()
                        }} 


                        />


                </KeyboardAvoidingView>
            )
        }
    
    }
    
    function mapStateToProps(state) {
        return {
            currentMachine: state.userMachine.machine,
            currentFailure: state.userMachine.inFailureMode,
            currentReport: state.userMachine.report,
            currentEscalation: state.userMachine.escalation,
            user: state.tryout.user,

        }
    }
    
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({ 
            manualAssist, 
            clearAssistanceUser,
            authorizationTryOut,
        }, dispatch)
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(ValidateTadiTryOut)
    
    const styles = StyleSheet.create({
        modalContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'rgba(209, 209, 212, 0.5)',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 15,
            marginBottom: 5,
            padding: 10,
        },
        mainTitle: {
            fontFamily: 'Montserrat',
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            textAlign: 'center',
            color: colors.darkGreyBlue
        },
        mainText: {
            marginBottom: 15,
            textAlign: 'center',
            fontFamily: "Montserrat",
            fontSize: 18,
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "center",
            color: colors.azure
        },
        subText: {
            textAlign: 'center',
            fontFamily: "OpenSans",
            fontSize: 16,
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: -0.39,
            textAlign: "center",
            color: colors.darkGreyBlueTwo
        },
        inputText:{
            marginBottom: 5,
            marginTop: 5,
            width: '60%'
        },
        button: {
            height: 34,
            width: 34,
        },
    })