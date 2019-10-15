import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../styles/theme'

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 2,
        shadowRadius: 4,
        shadowOpacity: 1,
        backgroundColor: colors.white,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
})

export class SensaiCard extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        let padding = {}
        let margin = {}
        let border = {}
        if (this.props.padding && this.props.padding.length) {
            const styleProps = ['paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom']
            this.props.padding.forEach((value, i) => {
                padding[styleProps[i]] = value
            })
        }
        if (this.props.margin && this.props.margin.length) {
            const styleProps = ['marginLeft', 'marginTop', 'marginRight', 'marginBottom']
            this.props.margin.forEach((value, i) => {
                padding[styleProps[i]] = value
            })
        }
        if (this.props.border){
            border = {borderColor: colors.kingBlue, borderWidth: 1}
        }
        return (
            <View style={[styles.card, padding, margin, border]}>
                {this.props.children}
            </View>
        )
    }
}