import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import I18n from '../i18n/i18n'
import { colors } from '../styles/theme'
import moment from 'moment-timezone'
import 'moment/locale/es'


export class WorkOrderMaximoCard extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { container, card, containerWrapper, dateStyle, title, typeDT, rowStyle, dtCodeStyle, dtCodeStyleMin, areaColor, areaColorIndicator, areaContainer, areaLabel } = styles
        const { item } = this.props
        let failure = item.issueType
        let areaFillColor = item.color
        let borderColor = (item.color === '#FFFFFF') ? colors.coolGrey : item.color
        let content = null
        let icon = ''
        let lblTitle = `${I18n.t('wo_title_row')}: ${item.orderId}`
        let descType = `${item.dtType == 1 ? I18n.t('stop') : I18n.t('change_over')}`
        let lblType = `${item.creationType} / ${descType} ${(item.dtNumber == null || item.dtNumber == ' ') ? '' : (item.dtType == 1  ? '#'+item.dtNumber : '')}`
        let lblCode = `${I18n.t('wo_downtime_code_lbl')}: `
        let lblTimestamp = moment(item.createdAt).format('DD MMMM, hh:mm:ss A')
        return (
            <View style={container}>
                <View style={card}>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <Text style={title}>{lblTitle}</Text>
                    </View>
                    <View style={rowStyle}>
                        <Text style={dateStyle}>{lblTimestamp}</Text>
                    </View>
                    <View style={rowStyle}>
                        <Text style={typeDT}>{lblType}</Text>
                    </View>
                    <View style={containerWrapper}>
                        <View style={rowStyle}>
                            <Text style={dtCodeStyle}>{lblCode}</Text>
                            <Text style={dtCodeStyleMin}>{item.code}</Text>
                        </View>
                        <View style={areaContainer}>
                            <Text style={areaLabel}>{failure}</Text>
                            <View
                                style={[
                                    areaColorIndicator,
                                    {
                                        backgroundColor: areaFillColor,
                                        borderColor: borderColor,
                                        borderWidth: 1
                                    }
                                ]}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    rowStyle: {
        marginTop: 5, 
        flex: 1, 
        flexDirection: "row"
    },
    card: {
        flex: 10,
        backgroundColor: colors.white,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 2,
        padding: 12,
        margin: 10,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 4,
    },
    containerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    areaColor: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginLeft: 5
    },
    title: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0,
        textAlign: 'left',
        color: 'black'
    },
    dateStyle: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        letterSpacing: 0,
        textAlign: 'left',
        color: 'gray'
    },
    typeDT: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0,
        textAlign: 'left',
        color: 'black'
    },
    dtCodeStyle: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    dtCodeStyleMin: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    areaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    areaColorIndicator: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginLeft: 5
    },
    areaLabel: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
});