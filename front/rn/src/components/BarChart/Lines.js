import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import { colors } from '../../styles/theme'

export default class Lines extends PureComponent {
    render() {
        const { maxLevel } = this.props
        return (
            <View style={styles.linesContainer}>
                <View style={styles.lineStyleFirst}></View>
                <View style={styles.lineStyle}></View>
                <View style={styles.lineStyle}></View>
                <View style={styles.lineStyle}></View>
                <View style={styles.lineStyle}></View>
                <View style={styles.lineStyle}></View>
                <View style={styles.lineStyle}></View>
                <View style={styles.lineStyle}></View>
                <View style={styles.lineStyle}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineStyle: {
        borderBottomColor: colors.silver10,
        borderBottomWidth: 1,
        height: 20,
    },
    lineStyleFirst: {
        borderColor: colors.silver10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        height: 20,
    },
    linesContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
})
