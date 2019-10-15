import React from 'react'
import { Text } from 'react-native'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'

export const CardHeader = (props) => {
    return (
        <Text style={styles.header}>
            {upperCase(props.title)}
        </Text>
    )
}

const styles = {
    header: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.coolGrey,
    },
}