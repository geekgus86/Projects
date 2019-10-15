import React, { PureComponent } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import Bar from './Bar'
import Lines from './Lines'
import Subtitle from './Subtitle'
import RotatedText from './RotatedText'

export class BarChart extends PureComponent {
    render() {
        const { rightItemTitle,
            leftItemTitle,
            itemOneValue,
            itemTwoValue,
            itemThreeValue,
            itemFourValue,
            unit,
            timePeriod } = this.props
        const max = Math.max(itemOneValue, itemTwoValue, itemThreeValue, itemFourValue)
        
        const graphAreaSize = 140
        const numberOfLines = 10
        const spacerSize = graphAreaSize / numberOfLines
        let lines = []
        for (let i = 0; i < numberOfLines; i++) {
            let style = null
            style = (i == 0) ? styles.lineStyleFirst : styles.lineStyle
            style = (i == numberOfLines - 1) ? styles.lineStyleLast : styles.lineStyle
            lines.push(
                <View key={'line-' + i} style={[style, { height: spacerSize }]}></View>
            )
        }

        return (
            <View style={{
                marginBottom: 10
            }}>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}>
                    {lines}
                </View>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>                    
                        {/*<RotatedText />*/}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            marginLeft: 20
                        }}>
                            <Bar itemValue={itemOneValue+(unit || '')} itemHeight={itemOneValue / max * 120} />
                            <Bar itemValue={itemTwoValue+(unit || '')} itemHeight={itemTwoValue / max * 120} typeItem={2} />
                        </View>
                    </View>
                    <View style={styles.containerButtom}>
                        <View style={[styles.itemsContainer]}>
                            <Subtitle subtitle={rightItemTitle} />
                            <Subtitle subtitle={leftItemTitle} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    graphicsContainer: {
        height: 180,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lineStyle: {
        borderBottomColor: '#a6a8ab',
        borderBottomWidth: 1,
    },
    lineStyleFirst: {
        borderColor: '#a6a8ab',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    lineStyleLast: {
        borderBottomColor: '#898b8e',
        borderBottomWidth: 1,
    },
    itemsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    itemTitleText: {
        color: 'black',
        fontSize: 13,
        textAlign: 'center'
    },
    containerButtom: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 30
    },
    bottomTitles: {
        width: 127,
        marginRight: 8,
    },
    graphicLimit: {
        flexDirection: 'row',
        borderBottomColor: '#47315a',
        borderBottomWidth: 1,
        height: 180,
    }
})
