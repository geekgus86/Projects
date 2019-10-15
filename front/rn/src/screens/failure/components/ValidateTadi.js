import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../../styles/theme'
import { SensaiInput, Spinner, OkModal } from '../../../components'
import { tracker, upperCase, goBack } from '../../../helpers'
import { manualAssist, clearAssistanceUser } from "../actions";
import I18n from '../../../i18n/i18n'

class ValidateTadi extends Component {
    _mounted = false
    _user = ''

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.state = {
            isLoading: false,
            tadi: null,
        }
    }

    componentDidMount() {
        this._mounted = true
        tracker.trackScreenView("ValidateTadi");
    }

    componentWillUnmount() {
        this._mounted = false
    }

    onPress() {
        if(this.state.tadi){
            this.setState({ isLoading: true })
            this.props.manualAssist(this.params.report.report, this.state.tadi).then(()=>{
                this._user = `${this.props.user.nombre}`
                this.setState({ isLoading: false })
                this.modal1.showModal()
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
        /*
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : null}>
            </KeyboardAvoidingView>
        */
        return (
            <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
                <View style={modalContainer}>
                    <View style={{
                        position: 'absolute',
                        left: 10,
                        top: 4,
                    }}>
                        <TouchableOpacity style={[button]} onPress={(e) => {goBack()}} hitSlop={hitSlop}>
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
                    <Text style={subText}>{I18n.t('card_identification')}</Text>
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
                
                <OkModal
                    ref={(r)=>{this.modal1 = r}} 
                    title = {I18n.t('user_identified')}
                    message={this._user}
                    area={this.params.report.issueType || this.params.report.name}
                    color={this.params.report.color}
                    onPress={()=>{
                        this.props.clearAssistanceUser()
                        this.params.returnFunction()
                        this.props.navigation.goBack()
                    }}
                    confirmIcon="check"
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
        user: state.forumComments.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ manualAssist, clearAssistanceUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidateTadi)

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