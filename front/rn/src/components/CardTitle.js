import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'

export const CardTitle = (props) => {
    return (
        <View style={styles.listHeader}>
            <Text style={styles.mainText}>{upperCase(props.title)}</Text>
            <Text style={styles.secondaryText}>{(props.subtitle) ? props.subtitle : ''}</Text>
        </View>
    )
}

const styles = {
    listHeader: {
        flexWrap: 'wrap',
        borderRadius: 5,
        backgroundColor: '#E3E4E6',
        padding: 10,
        marginBottom: 10,
    },
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    secondaryText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    }
}