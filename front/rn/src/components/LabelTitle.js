import React from 'react'
import { Text } from 'react-native'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'

export const LabelTitle = (props) => {
    return (
        <Text style={styles.mainText}>
            {upperCase(props.title)}
        </Text>
    )
}

const styles = {
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue,
        textAlign: 'left',
        marginBottom: 10,
    }
}