import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../styles/theme'
import { upperCase, navigate } from '../helpers'
import moment from 'moment'
import 'moment/locale/es'
import BottomSheet from 'react-native-bottomsheet';
import I18n from '../i18n/i18n'
export class LogCardChecklist extends PureComponent {

    state = {
        checked: false,
    }

    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }

    componentDidMount() {
        if(this.props.checked){//Revisar checked value
            this.setState({ checked: this.props.checked })
            this.onPress()
        }
    }

    onPress() {
        let val = !this.state.checked
        this.setState({ checked: val })
        this.props.onChange && this.props.onChange(val, this.props.item)
    }

    checkboxStyle() {
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
        if (this.state.checked === true) {
            style.backgroundColor = colors.azure
        }
        return style
    }

    render() {
        const { container, card, containerWrapper, eventTitle, timeStamp, iconCircle, failureMode, detailContainer, downTimeText, areaContainer, areaColorIndicatior, areaLabel } = styles
        const { checkContainer, checkbox } = styles
        let { checkStyle } = this.props
        if(!checkStyle){//Default checkbox styles
            checkStyle = {
                paddingTop: 5,
            }
        }
        const { item } = this.props
        const { returnFunction } = this.props;
        let failure = ''
        let showButton = true
        let areaColor = "#034ea2"
        let borderColor = "#034ea2"
        if (item.issue === null) {
            failure = I18n.t('no_identified')
        } else {
            failure = item.desc
            areaColor = item.color
            borderColor = (item.color === '#FFFFFF') ? colors.coolGrey : item.color
        }

        if (this.props.showButton === true) {
            showButton = true
        } else if (this.props.showButton === false) {
            showButton = false
        }
        if(this.props.selectedItem){
            if(this.props.selectedItem.id!=this.props.item.id){
                showButton = false
            }
        }

        let downtime = (item.open_minutes === null ? '--' : item.open_minutes)
        let issueType = (item.issueType === null ? '--' : item.issueType)
        let content = null
        let iconBackground = ''
        let icon = ''
        let title = ''
        let titleColor = ''
        let timestamp = ''
        let text = ''
        let containerWrapperStyle = null
        if ((item.type === 'Report-Closed' || item.type === 'report-created'|| item.report_statusID === 19) && item.report_type!=3) {
            containerWrapperStyle = containerWrapper
            icon = 'ban'
            timestamp = moment(item.reportCreatedAt).format('DD/MMMM, h:mmA')
            iconBackground = titleColor = colors.orangeRed            
            title = I18n.t('stop') + (item.report_number?' #'+item.report_number:'')+(item.report_division?' '+item.report_division:'')
            if(item.report_statusID === 19){
                timestamp = moment(item.createdAt).format('DD/MMM, h:mm [-] ') + moment(item.closedAt).format('h:mmA')
                iconBackground = titleColor = colors.purpleBlue            
                title = 'Baja Vel.'+(item.report_division?' '+item.report_division:'')
            }
            
            if (item.issueType && item.issueType.toLowerCase() == 'Fuera de tiempo'.toLowerCase()) {
                iconBackground = titleColor = colors.black
            }       
            content = (
                <View style={{ marginTop: 10 }}>
                    <Text style={failureMode}>{failure}</Text>
                    <View style={{ marginTop: 5 }}>
                        <View style={detailContainer}>
                            <Text style={downTimeText}>
                                {I18n.t('stop')}: {downtime} {I18n.t('minutes_dim')} 
                            </Text>
                            {issueType!='--'?
                                <View style={areaContainer}>
                                    <View style={[areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                                    <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                </View>:null
                            }
                        </View>
                    </View>
                </View>
            )

        }else if(item.type == 'ChangeOver' || item.report_type == 3){
            containerWrapperStyle = containerWrapper
            if (item.createdAt) {
                timestamp = moment(item.createdAt).format('DD/MMMM, h:mmA')
            } else {
                timestamp = false
            }
            
            iconBackground = titleColor = '#ff6d10'            
            icon = 'ban'
            title = I18n.t('changeover') + (item.report_number?' #'+item.report_number:'')+(item.report_division?' '+item.report_division:'')

            content = (
                <View style={{ marginTop: 10 }}>
                    <Text style={failureMode}>{failure}</Text>
                    <View style={{ marginTop: 5 }}>
                        <View style={detailContainer}>
                            <Text style={downTimeText}>
                                {I18n.t('downtime')}: {downtime} {I18n.t('minutes_dim')}
                            </Text>
                            {issueType!='--'?
                                <View style={areaContainer}>
                                    <View style={[areaColorIndicatior, { backgroundColor: item.color }]} />
                                    <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                </View>:null
                            }
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View style={container}>
                <View style={card}>
                    <View style={containerWrapperStyle}>
                        <View style={{ flexDirection: 'row' }}>
                            {!item.group_id?
                            <View style={[iconCircle, { backgroundColor: iconBackground }]}>
                                <LineIcon name={icon} size={20} color={colors.white} />
                            </View>:
                            <Image
                                style={{ height: 40, width: 40 }}
                                source={require('../assets/icons/group.png')}
                            />}
                            <View style={{ marginLeft: 10 }}>
                                <Text style={[eventTitle, { color: titleColor }]}>{title}</Text>
                                <Text style={timeStamp}>{timestamp}</Text>
                            </View>
                        </View>
                        <View style={checkStyle}>
                            <View style={checkContainer}>
                                <TouchableWithoutFeedback onPress={this.onPress}>
                                    <View style={this.checkboxStyle()}>
                                        <Icon name="check" style={checkbox} size={32} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    { content }
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
        marginTop: 0,
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