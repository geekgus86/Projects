import React, { PureComponent } from 'react'
import { Text, View, Switch, StyleSheet } from 'react-native'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'

export class SensaiSwitch extends PureComponent {
    state = {
        value: false
    }
    onValueChange(value) {
        this.setState({ value: value })
        this.props.onChangeValue && this.props.onChangeValue(value)
    }
    render() {
        const { label, field } = styles
        return (
            <View style={field}>
                <Text style={label}>{this.props.label}</Text>
                <Switch value={this.state.value} onValueChange={this.onValueChange.bind(this)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        marginLeft: 5
    },
    label: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.coolGrey,
        marginBottom: 5,
    },
})