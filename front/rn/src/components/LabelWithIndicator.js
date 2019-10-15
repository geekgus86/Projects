import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../styles/theme'

export const LabelWithIndicator = ({ title, value, start, end }) => {
    const { container, labelContainer, label, margin, bold, dot } = styles
    return (
        <View style={container}>
            <View style={labelContainer}>
                <LinearGradient
                    style={dot}
                    colors={[start, end]}
                    startPoint={{ x: 0.0, y: 0.0 }} endPoint={{ x: 0.0, y: 1.0 }}>
                </LinearGradient>
                <Text style={[label, margin]}>{title}:</Text>
            </View>
            <Text style={[label, bold, { marginLeft: 15 }]}>{value}</Text>
        </View>
    )
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
        backgroundColor: '#000'
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 85,
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
        marginRight: 4,
    },
    bold: {
        fontWeight: "bold",
        textAlign: 'left',
    }
}