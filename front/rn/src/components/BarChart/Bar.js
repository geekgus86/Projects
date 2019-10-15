import React, { PureComponent } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../styles/theme'

export default class Bar extends PureComponent {
    render() {
        const { itemValue, typeItem, itemHeight } = this.props
        const gradientColors = typeItem == 2 ? ['#531ed4', '#9672ef'] : ['#0a8640','#46b978']
        return (
            <View style={{
            }}>
                <Text style={styles.itemHeader}>{itemValue}</Text>
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 0.0, y: 0.0 }}
                    style={[styles.item, { height: itemHeight }]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'green',
        width: 55,
        marginRight: 5,
        marginLeft: 5
    },
    itemHeader: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        color: colors.darkGreyBlueTwo,
        textAlign: 'center'
    }
})