
import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View
} from 'react-native'
import { colors } from '../../styles/theme'

export default class RotatedText extends PureComponent {
    render() {
        return (
            <View style={styles.textRotateContainer}>
                <Text style={styles.textRotate}>Golpes</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textRotateContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRotate: {
        transform: [{ rotate: '270deg' }],
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: -0.39,
        color: colors.darkGreyBlueTwo
    },
})