import React, { PureComponent } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { colors } from '../../styles/theme'

export default class Subtitle extends PureComponent {
    render() {
        const { subtitle } = this.props
        return (
            <View style={[styles.item]}>
                <Text style={styles.itemTitleText}>{subtitle}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        width: 55,
        marginRight: 5,
        marginLeft: 5
    },
    itemTitleText: {
        fontFamily: "Open Sans",
        fontSize: 13,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.31,
        textAlign: "center",
        color: colors.darkGreyBlueTwo
    },
})
