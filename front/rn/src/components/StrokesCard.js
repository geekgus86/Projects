import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SensaiCard } from './SensaiCard'
import { Spinner } from './Spinner'
import { CardHeader } from './CardHeader'
import { CardDivider } from './CardDivider'
import { CardLabel } from './CardLabel'
import { CardFooter } from './CardFooter'
import { LabelWithIndicator } from './LabelWithIndicator'
import { BarChart } from './BarChart/BarChart'
import { colors } from '../styles/theme'
import I18n from '../i18n/i18n'
import { navigate, upperCase } from '../helpers'

const styles = StyleSheet.create({
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    withMargin: {
        marginTop: 2,
        marginBottom: 2,
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
})

export class StrokesCard extends PureComponent {
    constructor(props) {
        super(props)
    }

    callGotoPress = () => {
        this.props.onGotoPress && this.props.onGotoPress()
    }

    render() {
        const { twoColumns, withMargin, subText } = styles
        let { loading, objective, real, oa, timePeriod, unit } = this.props
        if(!loading && !oa && !real && !objective){
            objective = 1
            real = 0
        }
        let graph = (
            <Spinner />
        )
        if (loading !== true) {
            graph = (
                <BarChart
                    rightItemTitle={I18n.t('home_performance_graphObjTitle')}
                    leftItemTitle={I18n.t('home_performance_graphRealTitle')}
                    timePeriod={timePeriod}
                    itemOneValue={objective}
                    itemTwoValue={real}
                    itemThreeValue={0}
                    itemFourValue={0}
                    unit={(unit || '')}
                />
            )
        }
        let title = I18n.t('strikes')
        let label = ''
        if(this.props.title){
            title = this.props.title
        }
        if(this.props.label){
            label = this.props.label
        }
        return (
            <SensaiCard padding={[10, 10, 10, 0]}>
                <CardHeader title={`${upperCase(title)} ${timePeriod || ''}`} />
                <View style={twoColumns}>
                    <View style={{
                        flex: 1,
                        marginTop: 10
                    }}>
                        <LabelWithIndicator 
                            title={I18n.t('objective')} 
                            value={objective+(unit || '')} 
                            start={colors.darkMint} 
                            end={colors.jungleGreen} />

                        <LabelWithIndicator 
                            title={I18n.t('real')} 
                            value={real+(unit || '')} 
                            start={colors.lighterPurple} 
                            end={colors.purpleBlue} />
                        
                        {label?
                        <View style={{
                                marginTop: 10
                            }}>
                                <CardLabel
                                    title={label}
                                    value={oa}
                                    threshold={85}
                                    unit={'%'}
                                    margin={true}
                                />
                        </View>:null}
                    </View>
                    <View style={{flex: 1}}>
                        {graph}
                    </View>
                </View>
                {this.props.onGotoPress?
                    <View>
                        <CardDivider />
                        <CardFooter 
                            text={I18n.t('go_production_shift')} 
                            onPress={this.callGotoPress.bind(this)} />
                    </View>:null
                }
            </SensaiCard>
        )
    }
}