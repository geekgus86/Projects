import React, { PureComponent } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    processColor
} from 'react-native';

//import { BarChart, LineChart, PieChart } from 'react-native-charts-wrapper'

export class Chart extends PureComponent {
    constructor (props) {
        super(props)
    }
    
    getRandomColor () {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }
    
    renderPie (pie) {
        const time = pie.time
        const legend = pie.label
        const dataset = pie.dataset
    
        var dataSetsValue = []
        var dataStyle = {}
        var legendStyle = {}
        var descStyle = {}
        var xAxisStyle = {}
        var chooseStyle = {}
        var valueLegend = []
        var colorLegend = []
    
        legend.map((legendValue) => {
            time.map((timeValue) => {
                const datasetValue = dataset[legendValue]
                const datasetTimeValue = datasetValue[timeValue]
        
                valueLegend.push({ value: parseInt(datasetTimeValue), label: legendValue })
            })
            colorLegend.push(processColor(this.getRandomColor()))
        })
    
        const datasetObject = {
            values: valueLegend,
            label: '',
            config: {
                colors: colorLegend,
                valueTextSize: 20,
                valueTextColor: processColor('green'),
                sliceSpace: 5,
                selectionShift: 13
            }
        }
        dataSetsValue.push(datasetObject)
    
        legendStyle = {
            enabled: true,
            textSize: 12,
            form: 'CIRCLE',
            position: 'BELOW_CHART_RIGHT',
            wordWrapEnabled: true
        }
        dataStyle = {
            dataSets: dataSetsValue
        }
        descStyle = {
            text: '',
            textSize: 15,
            textColor: processColor('darkgray')
        }
    
        return (
          <PieChart
            style={styles.bar}
            chartDescription={descStyle}
            data={dataStyle}
            legend={legendStyle}
            highlights={[{ x: 2 }]} />
        )
    }
    
    renderBar (bar) {
        const style1 = {
            barWidth: 0.1,
            groupSpace: 0.2
        }
        const style2 = {
            barWidth: 0.2,
            groupSpace: 0.1
        }
        const style3 = {
            barWidth: 0.3,
            groupSpace: 0.2
        }
    
        const time = bar.time
        const legend = bar.label
        const dataset = bar.dataset
    
        var dataSetsValue = []
        var dataStyle = {}
        var legendStyle = {}
        var descStyle = {}
        var xAxisStyle = {}
        var chooseStyle = {}
        var valueLegend = []
        var colorLegend = []
    
        if (legend.length === 4) {
            chooseStyle = style1
        } else if (legend.length === 3) {
            chooseStyle = style2
        } else if (legend.length === 2) {
            chooseStyle = style3
        }
    
        legend.map((legendValue) => {
            var valueLegend = []
        
            time.map((timeValue) => {
                const datasetValue = dataset[legendValue]
                const datasetTimeValue = datasetValue[timeValue]
        
                valueLegend.push(parseInt(datasetTimeValue))
            })
    
            const datasetObject = {
                values: valueLegend,
                label: legendValue,
                config: {
                drawValues: false,
                colors: [processColor(this.getRandomColor())]
                }
            }
            dataSetsValue.push(datasetObject)
        })
    
        legendStyle = {
            enabled: true,
            textSize: 14,
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            wordWrapEnabled: true
        }
        dataStyle = {
            dataSets: dataSetsValue,
            config: {
                barWidth: chooseStyle.barWidth, // 0.1
                group: {
                fromX: 0,
                groupSpace: chooseStyle.groupSpace, // 0.2
                barSpace: 0.1
                }
            }
        }
        xAxisStyle = {
            valueFormatter: time,
            granularityEnabled: true,
            granularity: 1,
            axisMaximum: 5,
            axisMinimum: 0,
            centerAxisLabels: true
        }
    
        return (
            <BarChart
                style={styles.bar}
                xAxis={xAxisStyle}
                chartDescription={{ text: '' }}
                data={dataStyle}
                legend={legendStyle}
                drawValueAboveBar={false}
            />
        )
    }
    
    renderLine (line) {
        const time = line.time
        const legend = line.label
        const dataset = line.dataset
    
        var dataSetsValue = []
        var dataStyle = {}
        var legendStyle = {}
        var descStyle = {}
        var xAxisStyle = {}
        var chooseStyle = {}
        var valueLegend = []
        var colorLegend = []
    
        legend.map((legendValue) => {
            var valueLegend = []
    
            time.map((timeValue) => {
                const datasetValue = dataset[legendValue]
                const datasetTimeValue = datasetValue[timeValue]
        
                valueLegend.push({ y: parseInt(datasetTimeValue) })
            })
            let color = this.getRandomColor()
            const datasetObject = {
                values: valueLegend,
                label: legendValue,
                config: {
                    lineWidth: 1,
                    drawCubicIntensity: 0.4,
                    circleRadius: 5,
                    drawHighlightIndicators: false,
                    color: processColor(color),
                    drawFilled: true,
                    fillColor: processColor(color),
                    fillAlpha: 45,
                    circleColor: processColor(color),
                    drawValues: false
                }
            }
            dataSetsValue.push(datasetObject)
        })
    
        legendStyle = {
            enabled: true,
            textColor: processColor('blue'),
            textSize: 12,
            position: 'BELOW_CHART_RIGHT',
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            formToTextSpace: 5,
            wordWrapEnabled: true,
            maxSizePercent: 0.5
        }
        dataStyle = {
            dataSets: dataSetsValue
        }
        xAxisStyle = {
            valueFormatter: time
        }
        const markers = {
            enabled: true,
            digits: 2,
            backgroundTint: processColor('teal'),
            markerColor: processColor('#F0C0FF8C'),
            textColor: processColor('white')
        }
    
        let barStyle = styles.bar
        if(this.props.styles){
            barStyle = this.props.styles
        }
        return(
            <LineChart
                style={barStyle}
                data={dataStyle}
                chartDescription={{text: ''}}
                legend={legendStyle}
                marker={markers}
                xAxis={xAxisStyle}
                drawGridBackground={false}
                borderColor={processColor('teal')}
                borderWidth={1}
                drawBorders
            />
        )
    }
    
    render() {
        let view = null
        const { data } = this.props
        const { type } = this.props
        if(data.dataset){
            if(typeof data.time[0] !== 'undefined'){
                switch(type){
                    case 'Line':
                        view = (
                            this.renderLine(data)
                        )
                        break;
                    case 'Bar':
                        view = (
                            this.renderBar(data)
                        )
                        break;
                    case 'Pie':
                        view = (
                            this.renderPie(data)
                        )
                        break;
                }
            }
        }
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    bar: {
        marginTop: 20,
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width-20,
        padding: 10
    }
});