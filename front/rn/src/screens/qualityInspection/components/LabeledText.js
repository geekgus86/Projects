import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../../styles/theme'

const styles = StyleSheet.create({
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    text: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#243746"
    },
    bold: {
        fontWeight: "bold",
    }
});

export default (props) => {
    return (
        <View style={styles.top}>
            <Text style={[styles.text, styles.bold]}>{props.label}: </Text><Text style={styles.text}>{props.text}</Text>
        </View>
    )
}