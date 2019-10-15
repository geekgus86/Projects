import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform } from 'react-native'
import { SensaiCard } from './SensaiCard'
import { SensaiButton } from './SensaiButton'
import { CardHeader } from './CardHeader'
import { CardDivider } from './CardDivider'
import { CardLabel } from './CardLabel'
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

export class CurrentToolCard extends PureComponent {
    constructor(props) {
        super(props)
    }

    callOnButtonPress = () => {
        this.props.onButtonPress && this.props.onButtonPress()
    }

    callOnSecondButtonPress = () => {
        this.props.onSecondButtonPress && this.props.onSecondButtonPress()
    }

    render() {
        const { twoColumns, withMargin, subText, progressBar, mainText } = styles
        let value = 0
        if(this.props.strokeRate && this.props.objectiveStrokes){
            value = this.props.strokeRate/this.props.objectiveStrokes
        }
        return (
            <SensaiCard>
                <View style={{ flexDirection: 'column' }}>
                    <View style={twoColumns}>
                        <View>
                            <CardHeader title={I18n.t('home_performance_currentToolTtile')} />
                            <Text style={subText}>{this.props.name || '--'}</Text>
                        </View>
                        {this.props.buttonText?
                            <View style={{ justifyContent: 'center' }}>
                                <SensaiButton
                                    xs
                                    text={this.props.buttonText}
                                    onPress={this.callOnButtonPress.bind(this)}
                                />
                            </View>:null
                        }
                    </View>

                    <CardDivider />

                    <View style={[twoColumns, withMargin]}>
                        <CardLabel
                            title={I18n.t('home_performance_designSpeed') + ': '}
                            value={this.props.designSpeed}
                            unit={I18n.t('gpm')} />
                        <CardLabel
                            title={I18n.t('home_performance_currentSpeed') + ': '}
                            value={this.props.currentSpeed}
                            threshold={this.props.designSpeed}
                            unit={I18n.t('gpm')} />
                    </View>

                    <CardDivider />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={twoColumns}>
                            <View>
                                <Text style={mainText}>{upperCase(I18n.t('production_pieces'))}</Text>
                                <Text style={subText}>{`${this.props.strokeRate} ${I18n.t('of')}`}</Text>
                            </View>
                        </View>
                        <View style={twoColumns}>
                            <View>
                                <Text style={[mainText, {textAlign: 'right'}]}>{upperCase(I18n.t('planned'))}</Text>
                                <Text style={[subText, {textAlign: 'right'}]}>{`${this.props.objectiveStrokes}`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                    {
                        ( Platform.OS === 'android' )
                        ?
                        ( <ProgressBarAndroid style={progressBar} styleAttr = "Horizontal" progress = { value } indeterminate = { false } /> )
                        :
                        ( <ProgressViewIOS style={progressBar} progress = { value } /> )
                    }
                    </View>
                </View>
            </SensaiCard>
        )
    }
}