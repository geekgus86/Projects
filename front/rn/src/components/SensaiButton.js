import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../styles/theme'

export class SensaiButton extends PureComponent {
    callOnPress = () => {
        !this.props.loading && this.props.onPress && this.props.onPress()
    }
    render() {
        const { baseButton, buttonText, xs_baseButton, xs_buttonText, sm_baseButton, sm_buttonText, extraStyleButton, lg_baseButton, lg_buttonText} = styles

        let buttonStyle = null
        let buttonTextStyle = null
        let backGround = null
        let buttonBorderStyle = null
        let buttonTextColorStyle = null

        if (this.props.xs === true) {
            buttonStyle = xs_baseButton
            buttonTextStyle = xs_buttonText
            if (this.props.negativebg) {
                buttonBorderStyle = { borderColor : colors.azure, borderWidth: 2.0 }
                buttonTextColorStyle = { color : colors.azure }
            }            
        } else if(this.props.sm === true) {
            buttonStyle = sm_baseButton
            buttonTextStyle = sm_buttonText
        } else if(this.props.lg === true) {
            buttonStyle = lg_baseButton
            buttonTextStyle = lg_buttonText
        } else {
            buttonStyle = baseButton
            buttonTextStyle = buttonText
        }

        if (this.props.danger === true) {
            backGround = [colors.tomato, colors.tomato]
        } else if (this.props.default === true) {
            backGround = [colors.coolGrey, colors.coolGrey]
        } else if (this.props.plain == true) {
            backGround = [colors.white, colors.white]
        } else if (this.props.negativebg) {
            backGround = [colors.white, colors.white]
            buttonStyle.backgroundColor = colors.white
        } else {
            backGround = [colors.azure, colors.ceruleanBlue]
        }

        let buttonContent = <Text style={[buttonTextStyle, buttonTextColorStyle]}>{this.props.text}</Text>
        if (this.props.loading === true) {
            buttonContent = <ActivityIndicator color={!this.props.negativebg?colors.white:colors.azure} size="small"></ActivityIndicator>
        }

        let button = (
            <TouchableOpacity
                style={[this.props.buttonStyle, this.props.extraStyles && extraStyleButton]}
                activeOpacity={0.8}
                onPress={this.callOnPress.bind(this)}>
                <LinearGradient
                    style={[buttonStyle, this.props.buttonStyle, buttonBorderStyle]}
                    colors={backGround}
                    startPoint={{ x: 0.0, y: 0.0 }} endPoint={{ x: 0.0, y: 1.0 }}>
                    {buttonContent}
                </LinearGradient>
            </TouchableOpacity>
        )
        if (this.props.outline) {
            button = (
                <TouchableOpacity
                    style={[baseButton, this.props.buttonStyle, {
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderColor: colors.azure
                    }]}
                    activeOpacity={0.8}
                    onPress={this.callOnPress.bind(this)}>
                    {this.props.loading==true?
                        <ActivityIndicator color={colors.azure} size="small"></ActivityIndicator>
                        :
                        <Text style={[buttonTextStyle, {color: colors.azure}]}>{this.props.text}</Text>
                    }
                </TouchableOpacity>
            )
        }

        return button
    }
}

const styles = StyleSheet.create({
    baseButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 50 * 2,
        backgroundColor: colors.azure,
    },
    extraStyleButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        borderRadius: 50 * 2,
    },
    buttonText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.white,
        marginTop: (Platform.OS === 'ios' ? 5 : 0),
    },
    xs_baseButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 30,
        borderRadius: 60,
        backgroundColor: 'transparent',
    },
    xs_buttonText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.white,
        marginTop: 2,
        marginLeft: 12,
        marginRight: 12,
    },  
    sm_baseButton: {
        minHeight: 30,
        borderRadius: 25,
        width: "100%",
        backgroundColor: colors.tomato,
        paddingVertical: 5,
    },
    sm_buttonText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.white,
    },
    lg_baseButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 50,
        borderRadius: 20,
        padding: 10
    },
    lg_buttonText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.white,
    }
})