import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/theme'

export const VerticalLabel = ({ title, value }) => {
    const { container, label, margin, bold } = styles
    return (
        <View style={container}>
            <Text style={[label, margin]}>{title}</Text>
            <Text style={[label, bold]}>{value}</Text>
        </View>
    )
}

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    label: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "left",
        color: colors.darkGreyBlue,
    },
    margin: {
        marginRight: 4
    },
    bold: {
        fontWeight: "bold",
    }
}