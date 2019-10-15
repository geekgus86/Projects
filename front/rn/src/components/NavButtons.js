import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { colors, theme } from '../styles/theme'
import I18n from '../i18n/i18n'

export class NavButtons extends PureComponent {
    state = {
        validate:null,
        back:null,
        today:null,
        next:null,
    }
    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.setState({
            validate:this.props.validate,
            back:this.props.back,
            today:this.props.today,
            next:this.props.next,
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.validate!=this.props.validate){//Revisar props
            this.setState({ validate: this.props.validate })
        }
    }

    render() {
        let button1 = null
        let button2 = null
        let buttonCurrent = null
        let buttonColor = colors.azure

        const validate = this.state.validate 
        const back = this.state.back 
        const today = this.state.today 
        const next = this.state.next 

        if(validate){
            buttonColor = colors.coolGrey
        }

        buttonCurrent = (
            <TouchableOpacity 
                onPress={() => (validate?null:today(false))}
                style = {[
                    styles.currentButton,
                    {
                        backgroundColor: buttonColor
                    }
                ]}
            >
                <Text style={ styles.logText }>{I18n.t('today')}</Text>
            </TouchableOpacity>
        )
        button1 = (
            <TouchableOpacity 
                onPress={() => back()}
                style = {[
                    styles.lastButton,
                    {
                        backgroundColor: colors.azure
                    }
                ]}
            >
                <Image source={require('../assets/caretLeftAnticon.png')} />
            </TouchableOpacity>
        )
        button2 = (
            <TouchableOpacity 
                onPress={() => (validate?null:next())}
                style = {[
                    styles.nextButton,
                    {
                        backgroundColor: buttonColor
                    }
                ]}
            >
                <Image style={{}} source={require('../assets/caretRightAnticon.png')} />
            </TouchableOpacity>
        )    

        return(
            <View style={{
                flexDirection: "row",
                alignContent: 'center',
                marginTop: 10,
                marginBottom: 5,
                justifyContent: "center"
            }}>
                {button1}
                {buttonCurrent}
                {button2}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logText: {
        fontFamily: "Gotham Rounded",
        fontSize: 18,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    },
    currentButton: {
        width: 195,
        height: 40,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center',
    },
    lastButton: {
        width: 65,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 100,
    },
    nextButton: {
        width: 65,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
    }
})