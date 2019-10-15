import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../styles/theme'
import { upperCase, navigate } from '../../helpers'

import moment from 'moment-timezone'
import 'moment/locale/es'
import BottomSheet from 'react-native-bottomsheet';
import I18n from '../../i18n/i18n';

export class LogCardCheck extends PureComponent {

    state = {
        checked: false,
    }

    _type = null

    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
        this._type = this.props.item.report_type
    }

    componentDidMount() {
        if (this._type != 2) {
            this._type = 1
        }

        if(this.props.item.try_out){
            this._type = 5
        }
        this.setState({ checked: this._type })
    }

    onPress(value) {
        this._type = value
        this.setState({ checked: value })
        this.props.onChange && this.props.onChange(value, this.props.item)
    }

    checkboxStyle(value) {
        let style = {
            width: 36,
            height: 36,
            borderRadius: 6,
            backgroundColor: colors.white,
            borderStyle: 'solid',
            borderWidth: 1.5,
            borderColor: colors.azure,
            justifyContent: 'center',
            alignItems: 'center',
        }
        if (this.state.checked === value) {
            style.backgroundColor = colors.azure
        }
        return style
    }

    render() {
        const { container, card, containerWrapper, eventTitle, timeStamp, iconCircle, failureMode, detailContainer, downTimeText, areaContainer, areaColorIndicatior, areaLabel } = styles
        const { checkContainer, checkbox } = styles
        let { checkStyle } = this.props
        const { item } = this.props
        const { returnFunction } = this.props;
        let failure = ''
        let showButton = true
        if (item.issue === null) {
            failure = I18n.t('no_identified')
        } else {
            failure = item.desc
        }

        if (this.props.showButton === true) {
            showButton = true
        } else if (this.props.showButton === false) {
            showButton = false
        }
        if (this.props.selectedItem) {
            if (this.props.selectedItem.id != this.props.item.id) {
                showButton = false
            }
        }

        let downtime = (item.open_minutes === null ? '--' : item.open_minutes)
        let issueType = (item.issueType === null ? '--' : item.issueType)
        let iconBackground = ''
        let icon = 'ban'
        title = I18n.t('stop') + (item.report_number ? ' #' + item.report_number : '') + (item.report_division ? ' ' + item.report_division : '')
        if(!item.report_number){
            title = I18n.t('actual_stop')
        }
        let titleColor = ''
        let timestamp = moment(item.reportCreatedAt).format('DD/MMMM, h:mmA')
        let text = ''
        let containerWrapperStyle = containerWrapper

        if (this._type == 1 && item.report_statusID !== 19) {
            iconBackground = titleColor = (this._type == 5 ? 'black' : colors.orangeRed)
        } else if (this._type == 1 && item.report_statusID === 19) {
            timestamp = moment(item.createdAt).format('DD/MMM, h:mm [-] ') + moment(item.closedAt).format('h:mmA')
            iconBackground = titleColor = colors.purpleBlue
            title = I18n.t('low_speed') + (item.report_division ? ' ' + item.report_division : '')
        } else if (this._type == 2) {
            iconBackground = titleColor = '#ff6d10'
            title = I18n.t('changeover') +(item.report_number?' #'+item.report_number: '')+(item.report_division?' '+item.report_division:'')
            if(!item.report_number){
                title = I18n.t('actual_changeover')
            }
        } else if (this._type == 5 && item.report_statusID !== 19) {
            iconBackground = titleColor = 'black'
        }

        return (
            <View style={container}>
                <View style={card}>
                    <View style={containerWrapperStyle}>
                        <View style={{ alignSelf: 'flex-start', width: '50%' }}>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <View style={[iconCircle, { backgroundColor: iconBackground }]}>
                                    <LineIcon name={icon} size={20} color={colors.white} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[eventTitle, { color: titleColor }]}>{title}</Text>
                                    <Text style={timeStamp}>{timestamp}</Text>
                                </View>
                            </View>
                            <View style={{}}>
                                <Text style={failureMode}>{failure}</Text>
                                <View>
                                    <View style={detailContainer}>
                                        <Text style={downTimeText}>
                                            {I18n.t('downtime')}: {downtime.toFixed(2)} {I18n.t('minutes_dim')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        { item.try_out == false?
                            <View style={checkStyle}>
                                <Text style={downTimeText}>{upperCase(I18n.t('type_stop'))}:</Text>
                                {
                                    item.report_type==2 ?
                                    null:
                                    <View style={checkContainer}>
                                        <TouchableWithoutFeedback onPress={()=>this.onPress(1)}>
                                            <View style={this.checkboxStyle(1)}>
                                                <Icon name="check" style={checkbox} size={32} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Text style={[failureMode, { marginLeft: 5}]}>{I18n.t('production')}</Text>
                                    </View>
                                } 
                                {
                                    ((item.report_type !== 2) || item.report_statusID === 19) ?
                                    null:
                                    <View style={checkContainer}>
                                        <TouchableWithoutFeedback onPress={()=>this.onPress(2)}>
                                            <View style={this.checkboxStyle(2)}>
                                                <Icon name="check" style={checkbox} size={32} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Text style={[failureMode, { marginLeft: 5}]}>{I18n.t('change_over')}</Text>
                                    </View>
                                }

                                {
                                    item.report_type==2 ?
                                        null :
                                        <View style={checkContainer}>
                                            <TouchableWithoutFeedback onPress={() => this.onPress(5)}>
                                                <View style={this.checkboxStyle(5)}>
                                                    <Icon name="check" style={checkbox} size={32} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <Text style={[failureMode, { marginLeft: 5 }]}>{upperCase(I18n.t('out'))}</Text>
                                        </View>
                                }
                            </View>
                        :
                            <View style={checkStyle}>
                                {item.is_out == true ?
                                    <View style={checkContainer}>
                                        <TouchableWithoutFeedback onPress={() => this.onPress(5)}>
                                            <View style={this.checkboxStyle(5)}>
                                                <Icon name="check" style={checkbox} size={32} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Text style={[failureMode, { marginLeft: 5 }]}>{upperCase(I18n.t('out'))}</Text>
                                    </View>
                                    :null
                                }
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '95%',
        alignItems: 'center',
        margin: 10,
        marginLeft: -5,
        marginTop: 5,
        marginBottom: 0,
        paddingBottom: 10,
    },
    checkbox: {
        color: colors.white,
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
        alignItems: 'center',
    },
    eventTitle: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.orangeRed,
    },
    timeStamp: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#898b8e'
    },
    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    failureMode: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    downTimeText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    areaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    areaColorIndicatior: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginRight: 5
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
})