import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { colors } from '../styles/theme'

export const Spinner = ({ size, background }) => {
    return (
        <View style={[styles.spinnerStyle, background]}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    )
}

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}