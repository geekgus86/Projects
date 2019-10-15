import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/theme'
import { SensaiRow, SensaiCard, CardHeader, Spinner } from './'
import { upperCase } from '../helpers'
import I18n from '../i18n/i18n'

export class AccumulatedComp extends PureComponent {

    constructor(props){
        super(props);
    }

    render(){
        const { rowLabel, rowText, rowMargin, headerContainer, headerText } = styles
        let downtimeTable = null
        
        if (this.props.downtimeValues.length !== 0) {
            downtimeTable = this.props.downtimeValues.map((rowInfo, i) => {
                let showDivider = (i == this.props.downtimeValues.length - 1) ? false : true
                let dot = null
                if (!rowInfo.color) {
                    dot = (
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginRight: 5,
                            backgroundColor: colors.darkGreyBlue,
                            borderColor: colors.darkGreyBlue,
                            borderWidth: 1,
                        }}></View>
                    )
                } else {
                    let borderColor = (rowInfo.color.toUpperCase() === '#FFFFFF') ? colors.coolGrey : rowInfo.color
                    dot = (
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginRight: 5,
                            backgroundColor: rowInfo.color,
                            borderColor: borderColor,
                            borderWidth: 1,
                        }}></View>
                    )
                }
                return (
                    <SensaiRow divider={showDivider} customStyle={rowMargin} sizes={[2, 1, 0.8]} key={i}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                            {dot}
                            <Text style={rowLabel}>{rowInfo.title}</Text>
                        </View>                        
                        <Text style={rowText}>{rowInfo.setup + ' min'}</Text>
                        <Text style={rowText}>{rowInfo.downtime + ' min'}</Text>
                    </SensaiRow>
                )
            })
        } else {
            downtimeTable = (
                <SensaiRow divider margin sizes={[2, 1, 0.8]}>
                    <Spinner />
                    {/*<Text style={rowLabel}>{I18n.t('home_performance_noInformation')}</Text>
                    <Text style={rowText}>{'--'}</Text>
                    <Text style={rowText}>{'--'}</Text>*/}
                </SensaiRow>
            )
        }

        return(
            <View>
                <View style={headerContainer}>
                    <Text style={headerText}>
                        {upperCase(this.props.title)}
                    </Text>
                </View>	
                <SensaiCard padding={[10, 10, 10, 0]}>
                    <SensaiRow sizes={[2, 1, 0.8]}>
                        <CardHeader title={upperCase(I18n.t('downtime'))} />
                        <CardHeader title={upperCase(I18n.t('objective'))} />
                        <CardHeader title={upperCase(I18n.t('real'))} />
                    </SensaiRow>
                    {downtimeTable}
                </SensaiCard>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowLabel: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.darkGreyBlue,
        justifyContent: 'center',
    },
    rowText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: '#243746',
    },
    rowMargin: {
        marginTop: 10,
        marginBottom: 10,
    },
	headerContainer: {
		borderRadius: 5,
		backgroundColor: "rgba(209, 209, 212, 0.5)",
		marginLeft: 10,
		marginRight: 10,
		marginTop: 15,
		padding: 10
	},
	headerText: {
		fontFamily: "Montserrat",
		fontSize: 16,
		fontWeight: "bold",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: colors.darkGreyBlue
	},
})