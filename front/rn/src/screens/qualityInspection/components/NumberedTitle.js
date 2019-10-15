import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../../styles/theme'

const styles = StyleSheet.create({
    circle: {
        width: 24,
        height: 24,
        borderRadius: 20,
        backgroundColor: colors.azure,
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    text: {
        fontFamily: "OpenSans",
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    },
    title: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#323d50",
        marginLeft: 5,
    }
});

export default (props) => {
    return (
        <View style={styles.top}>
            <View style={styles.circle}>
                <Text style={styles.text}>{props.number}</Text>
            </View>
            <View>
                <Text style={styles.title}>{props.text}</Text>
            </View>
        </View>
    )
}