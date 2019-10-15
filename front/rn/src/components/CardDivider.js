import React from 'react'
import { View } from 'react-native'
import { colors } from '../styles/theme'

export const CardDivider = () => {
    return (
        <View style={styles.line} />
    )
}

const styles = {
    line: {
        height: 1,
        backgroundColor: colors.silver,
        marginTop: 8,
        marginBottom: 8,
    },
}