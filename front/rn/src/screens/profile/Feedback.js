import React, { PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, StyleSheet, TextInput, Text, TouchableWithoutFeedback} from 'react-native'
import { SensaiButton, NavHeader, Spinner } from '../../components'
import { reportIssueRedmine } from './actions'
import { FeedbackOptions } from "./FeedbackOptions";
import {Keyboard} from 'react-native'


import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { tracker } from '../../helpers'

class Feedback extends PureComponent {
    state = {
        isLoading: false,
        feedBackComment: ''
    }
    types = ['comment','issue']
    typeSelected = 0
    constructor(props) {
        super(props)
        this._mounted = false
    }

    componentDidMount() {
        tracker.trackScreenView('Feedback')
        this._mounted = true
    }

    componentWillUnmount() {
        this._mounted = false
    }

    sendReport(){
        console.log(this.types[this.typeSelected])
        console.log(this.state.feedBackComment)
        console.log(this.props.session.profile.email)
        this.setState({ isLoading:true })
        this.props.reportIssueRedmine(this.props.session.profile.email,this.state.feedBackComment).then(() => {
            alert(I18n.t('issue_enviado_correctamente'))
            this.props.navigation.goBack()
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <NavHeader
                        title={I18n.t('profile_feedback_title')}
                        enableBack={true}
                    />
                    {/* <FeedbackOptions
                        onChange={v => {
                            this.typeSelected = v
                            
                        }}
                        value={0}
                    /> */}
                    <Text style={styles.mainText}>{I18n.t('profile_feedback')}</Text>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t('leave_comment')}
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        value={this.state.feedBackComment}
                        onChangeText={(value)=>this.setState({feedBackComment:value})}
                        />
                    </View>
                    
                    <View style={theme.mainContainer}>
                        <SensaiButton
                            text={I18n.t('error_send_report')}
                            buttonStyle={{ marginTop: 10 }}
                            loading={this.state.isLoading}
                            onPress={this.sendReport.bind(this)} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    textAreaContainer: {
      borderColor: '#e0e0e0',
      borderWidth: 1,
      padding: 5,
      margin: 10
    },
    textArea: {
      height: 150,
      justifyContent: "flex-start"
    },
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 10,
        color: colors.darkGreyBlue
    }
  })

function mapStateToProps(state) {
    return {
        session: state.session,
        error: state.session.error,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ reportIssueRedmine }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)