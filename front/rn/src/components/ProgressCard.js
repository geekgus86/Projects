import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native'
import { SensaiCard } from './SensaiCard'
import { SensaiButton } from './SensaiButton'
import { SensaiRow } from './SensaiRow'
import { CardHeader } from './CardHeader'
import { CardDivider } from './CardDivider'
import { CardLabel } from './CardLabel'
import { colors } from '../styles/theme'
import I18n from '../i18n/i18n'
import { upperCase } from '../helpers';

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

export class ProgressCard extends PureComponent {
    constructor(props) {
        super(props)
    }

    callOnButtonPress = () => {
        this.props.onButtonPress && this.props.onButtonPress()
    }

    render() {
        const { twoColumns, withMargin, subText, mainText, progressBar } = styles
        let value = 0
        if(this.props.start && this.props.end){
            value = this.props.start/this.props.end
        }
        return (
            <SensaiCard>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={twoColumns}>
                        <View>
                            <Text style={mainText}>{upperCase(I18n.t('production_pieces'))}</Text>
                            <Text style={subText}>{`${this.props.start} de`}</Text>
                        </View>
                    </View>
                    <View style={twoColumns}>
                        <View>
                            <Text style={[mainText, {textAlign: 'right'}]}>{upperCase(I18n.t('planned'))}</Text>
                            <Text style={[subText, {textAlign: 'right'}]}>{`${this.props.end}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                {
                    ( Platform.OS === 'android' )
                    ?
                    ( <ProgressBarAndroid style={progressBar} styleAttr = "Horizontal" progress = { value } indeterminate = { false } /> )
                    :
                    ( <ProgressViewIOS style={progressBar} progress = { value } /> )
                }
                </View>
            </SensaiCard>
        )
    }
}