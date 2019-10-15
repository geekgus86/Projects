import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SensaiCard } from './SensaiCard'
import { CardHeader } from './CardHeader'
import { CardDivider } from './CardDivider'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'
import I18n from '../i18n/i18n'

const styles = StyleSheet.create({
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    withMargin: {
        marginTop: 2,
        marginBottom: 2,
    },
    mainText:{
        fontFamily: "Gotham Rounded",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.coolGrey
    },
    subText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        marginTop: 5
    },
    progressBar: {
        width: '100%',
        marginTop: 10,
        transform: [{ scaleX: 1.0 }, { scaleY: 4.5 }],
    },
})

export class ChangeOverCard extends PureComponent {
    constructor(props) {
        super(props)
    }

    callOnButtonPress = () => {
        this.props.onButtonPress && this.props.onButtonPress()
    }

    render() {
        const { twoColumns, withMargin, subText, progressBar, mainText } = styles
        return (
            <SensaiCard>
                <View style={{ flexDirection: 'column' }}>
                    <View style={twoColumns}>
                        <View>
                            <CardHeader title={`${upperCase(I18n.t('next_changeover_on'))}:`} />
                            <Text style={subText}>{this.props.changeover}</Text>
                        </View>
                    </View>

                    <CardDivider />

                    <View style={twoColumns}>
                        <View>
                            <CardHeader title={`${upperCase(I18n.t('next_tool'))}:`} />
                            <Text style={subText}>{this.props.tool}</Text>
                        </View>
                    </View>
                </View>
            </SensaiCard>
        )
    }
}