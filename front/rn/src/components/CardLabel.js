import React from 'react'
import { View, Text, Image } from 'react-native'
import { colors } from '../styles/theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import Tryout from '../assets/Tryout.png'

export const CardLabel = ({ title, value, isTryOut, threshold, unit, margin, hideValue, inverted }) => {
    const { container, iconWrapper, label, valueLabel, titleLabel } =  styles
    let icon = null
    let valueColor = { color: colors.darkGreyBlue }
    let iconColor = { color: colors.darkGreyBlue }
    let iconName = 'arrow-up'
    let extraMargin = { marginRight: 0 }
    let titleText = true
    if (margin) {
        extraMargin = { marginRight: 12 }
    }
    let validate = value >= threshold
    if(inverted){
        validate = value <= threshold
    }
    if (threshold) {
        if (validate) {
            valueColor = { color: colors.green }
            iconColor = { color: colors.green }
            iconName = 'arrow-up'
        } else {
            valueColor = { color: colors.orangeRed }
            iconColor = { color: colors.orangeRed }
            iconName = 'arrow-down'
        } 
        icon = (
            <View style={[iconWrapper]}>
                <Icon name={iconName} size={20} color={iconColor.color} />
            </View>
        )
    }

    if(isTryOut){
        icon = (<Image style={{ height: 22, width: 22 }} source={require('../assets/Tryout.png')} />)
        titleText = false
    }

    return (
        <View style={container}>
            {titleText ? <Text style={[label, titleLabel, extraMargin]}>{title}</Text> : null}
            <View style={container}>
                {hideValue ? null:
                    <Text style={[label, valueLabel, valueColor]}>{value} {unit}</Text>
                }
                {icon}
            </View>
        </View>
    )
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    iconWrapper: {
        width: 22,
        height: 22,
        marginLeft: 10,
        borderRadius: 4,
        padding: 1
    },
    label: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        letterSpacing: -0.39,
        textAlign: "left",
    },
    valueLabel: {
        fontWeight: "bold",
    },
    titleLabel: {
        color: colors.darkGreyBlue,
    }
}