import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BackHandler, View, Text, Image, StyleSheet, Platform ,TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { OkModal, SensaiInput, Spinner } from '../../components'
import { tracker, upperCase , goBack} from '../../helpers'
import { postChecklistAnswers } from '../checklist/actions'
import { clearAssistanceUser } from '../failure/actions'

class ValidateUser extends Component {

    state = {
        isLoading: false,
        tadi: null
    }

    _mounted = false
    _user = ''

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
    }

    componentDidMount() {
        this._mounted = true
    }

    componentWillUnmount() {
        this._mounted = false
    }

    onPress() {
        if(this.state.tadi){
            this.params.tadi = this.state.tadi
            if(this.props.profile.tadi === this.state.tadi){
                this.setState({ isLoading: true })
                this.props.postChecklistAnswers(this.params).then(()=>{
                    //this._user = `${this.props.user.nombre} ${this.props.user.apellidoPaterno}`
                    this._user = `${this.props.profile.name}`
                    this.setState({ isLoading: false })
                    this.modal1.showModal()
                }).catch((err)=>{
                    console.log(err)
                    this.setState({ isLoading: false, tadi: '' })
                })
            }else{
                let msjTadi = I18n.t('validateUser_tadi_error')
                msjTadi = msjTadi.replace('?1',this.state.tadi)
                msjTadi = msjTadi.replace('?2',this.props.profile.name)
                alert(msjTadi)
                this.setState({ tadi: '' })
            }
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
                        <TouchableOpacity style={[button]} onPress={(e) => {this.props.navigation.goBack()}} hitSlop={hitSlop}>
                            <MaterialIcon name='arrow-back' size={30} color={colors.darkGreyBlue} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        position: 'relative',
                        left: 10,
                        top: 2,
                    }}>
                        <Text style={mainTitle}>
                            {upperCase(I18n.t('action'))}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{
                        width: 107,
                        height: 107,
                        marginBottom: 20,
                    }} source={require('../../assets/tadi.png')} />
                    <Text style={mainText}>{I18n.t('user_identification')}</Text>
                    <Text style={subText}>{I18n.t('card_identification')}</Text>
                    <SensaiInput 
                        inputStyle={inputText}
                        value={this.state.tadi}
                        keyboardType={(Platform.OS === 'ios' ? 'number-pad' : 'numeric')}
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
                    title={I18n.t('user_identified')} 
                    message={this._user}
                    onPress={()=>{
                        this.props.clearAssistanceUser()
                        this.props.navigation.popToTop()
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
        session: state.session.info,
        profile: state.session.profile,
        machine: state.userMachine.machine,
        user: state.forumComments.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearAssistanceUser, postChecklistAnswers }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidateUser)

const styles = StyleSheet.create({
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
})