import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../styles/theme'
import { upperCase, navigate } from '../helpers'
import { SensaiButton } from './SensaiButton'

import moment from 'moment-timezone'
import 'moment/locale/es'
import BottomSheet from 'react-native-bottomsheet';
import I18n from '../i18n/i18n';

export class LogCard extends PureComponent {

    constructor(props) {
        super(props)
    }

    _showOptions(item, returnFunction) {
        if (item.type === 'Report-Closed' || item.type === 'report-created' || item.type === 'ChangeOver' || item.report_statusID === 19) {
            navigate('IdentifyFailureModal', { failure: item, report_type: item.report_type, returnFunction: returnFunction })
        } else if (item.type === 'Shift-Comment') {
            if (this.props.selectedItem) {
                if (this.props.selectedItem.id == this.props.item.id) {
                    returnFunction(item, 3)
                }
            } else {
                BottomSheet.showBottomSheetWithOptions({
                    options: [I18n.t('edit'), I18n.t('delete'), I18n.t('cancel')],
                    title: I18n.t('qualityInspection_feedback_options'),
                    dark: false,
                    cancelButtonIndex: 2,
                }, (value) => {
                    returnFunction(item, value)
                });
            }
        }
    }

    _loadFailureOptions(item, returnFunction) {

        let report_number = typeof item.report_number == 'number' ? ' #' + item.report_number : ''

        let report_title = I18n.t('stop')
        if(item.report_type == 2){
            report_title = I18n.t('changeover')
        }else if(item.report_statusID === 19){
            report_title = I18n.t('low_speed')
            report_number = ''
        }
        optionsKebab = []
        idxCancel = 4
        if (item.group_id == null && (item.report_division == null || item.report_division == '')) {
            optionsKebab = [I18n.t('grouping'), I18n.t('divide'), I18n.t('history_grouping'), I18n.t('details'), I18n.t('cancel')]
        } else if (item.group_id != null && (item.report_division == null || item.report_division == '') ) {
            optionsKebab = [I18n.t('history_grouping'), I18n.t('details'), I18n.t('cancel')]
            idxCancel = 2
        } else {
            optionsKebab = [I18n.t('details'), I18n.t('cancel')]
            idxCancel = 1
        }
        BottomSheet.showBottomSheetWithOptions({
            options: optionsKebab,
            title: I18n.t('options_of') + ' ' + report_title + report_number + (item.report_division ? ' ' + item.report_division : ''),
            dark: false,
            cancelButtonIndex: idxCancel,
        }, (value) => {
            returnFunction(item, value)
        });
    }

    render() {
        const { container, card, containerWrapper, eventTitle, timeStamp, iconCircle, failureMode,
            detailContainer, downTimeText, areaContainer, areaColorIndicatior, areaLabel,
            commentContainerWrapper, commment, roleName, userName, woMaximoStyle, rowStyle } = styles
        const { item, returnFunction } = this.props
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
        if (this.props.selectedItem) {
            if (this.props.selectedItem.id != this.props.item.id) {
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
        let labelType = I18n.t('identify')
        if (item.issue) {
            labelType = I18n.t('modify')
        }
        let showWo = item.show_wo
        let showMaximo = this.props.showMaximo && (item.area == 3 || item.area == 4)
        let lblWOM = I18n.t('wo_title_row')
        let txtMaximo = (item.wo_maximo != null) ? (
            <Text style={[woMaximoStyle, { fontWeight: "normal"}]}>{item.wo_maximo}</Text>
        ) : (<Text style={[woMaximoStyle, { fontWeight: "bold",  color: "red"}]}>[Error: {item.wo_maximoMsg}]</Text>)

        let viewMaximo = ((showMaximo == true || showWo) && (item.wo_maximo != null || item.wo_maximoMsg != null)) ? (
            <View style={rowStyle}>
                <Text style={[woMaximoStyle, { fontWeight: "600"}]}>{lblWOM}: </Text>
                {txtMaximo}
            </View>
        ) : null;
        if ((item.type === 'Report-Closed' || item.type === 'report-created' || item.report_statusID === 19) && item.report_type != 2) {

            containerWrapperStyle = containerWrapper
            icon = 'ban'
            text = `${labelType} ${I18n.t('stop')}`

            iconBackground = titleColor = colors.orangeRed
            timestamp = moment(item.createdAt).format('DD/MMM, h:mmA')
            if (item.issueType && item.issueType.toLowerCase() == 'Fuera de tiempo'.toLowerCase()) {
                iconBackground = titleColor = colors.black
            } else if (item.report_statusID === 19) {
                text = `${labelType}`
                timestamp = moment(item.createdAt).format('DD/MMM, h:mm [-] ') + moment(item.closedAt).format('h:mmA')
                iconBackground = titleColor = colors.purpleBlue
            }

            let desc = (item.report_statusID === 19) ? I18n.t('low_speed') : I18n.t('stop')

            let report_title = ''
            if (item.report_statusID !== 19 && typeof item.report_number == 'number') {
                report_title = ' #' + item.report_number
            }

            title = desc + report_title + (item.report_division ? ' ' + item.report_division : '')

            content = (
                <View style={{ marginTop: 10 }}>
                    <Text style={failureMode}>{failure}</Text>
                    {viewMaximo}
                    <View style={{ marginTop: 5 }}>
                        <View style={detailContainer}>
                            <Text style={downTimeText}>
                                {I18n.t('stop')}: {isNaN(downtime) ? downtime : downtime.toFixed(2)} {I18n.t('minutes_dim')}
                            </Text>
                            {issueType != '--' ?
                                <View style={areaContainer}>
                                    <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                    <View style={[areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                                </View> : null
                            }
                        </View>
                    </View>
                </View>
            )



        } else if (item.type === 'microparo') {
            timestamp = moment(item.createdAt).format('DD/MMM, h:mmA')
            iconBackground = titleColor = colors.darkGreyBlue
            icon = 'ban'
            title = I18n.t('microstop')
            showButton = false
            content = (
                <View style={{ marginTop: 10 }}>
                    <View style={{ marginTop: 5 }}>
                        <View style={detailContainer}>
                            <Text style={downTimeText}>
                                {`${I18n.t('accumulated')}: ${downtime} ${I18n.t('minutes_dim')}`}
                            </Text>
                            {issueType != '--' ?
                                <View style={areaContainer}>
                                    <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                    <View style={[areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                                </View> : null
                            }
                        </View>
                    </View>
                </View>
            )
        } else if (item.type == 'unidentified-dt') {
            const data = JSON.parse(item.data)
            downtime = parseInt(data.minutes)
            timestamp = moment(item.createdAt).format('DD MMMM, h:mmA')
            iconBackground = titleColor = colors.orangeRed;
            icon = 'ban'
            suffix = I18n.t('stop')
            title = suffix+(item.report_division ? ' ' + item.report_division : '')
            showButton = false         
            content = (
                <View style={{ marginTop: 10 }}>
                    <Text style={failureMode}>{failure}</Text>
                    {viewMaximo}
                    <View style={{ marginTop: 5 }}>
                        <View style={detailContainer}>
                            <Text style={downTimeText}>
                                {`${I18n.t('accumulated')}: ${downtime} ${I18n.t('minutes_dim')}`}
                            </Text>
                            {issueType != '--' ?
                                <View style={areaContainer}>
                                    <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                    <View style={[areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                                </View> : null
                            }
                        </View>
                    </View>
                </View>
            )
        } else if (item.type === 'oa-comment') {
            let data = ''
            try {
                data = JSON.parse(item.data);
            } catch (err) {
                data = ''
            }
            let userFullName = ''
            if (data) {
                userFullName = [item.nombre].join(' ')
            }

            containerWrapperStyle = commentContainerWrapper
            timestamp = null
            iconBackground = titleColor = colors.darkMint
            icon = 'check'
            title = 'OA'
            showButton = false

            content = (
                <View style={{ marginTop: 10 }}>
                    <Text style={[downTimeText, {marginBottom:5}]}>
                        {`${I18n.t('oa_accumulated')} / ${I18n.t('shift')} ${(moment(item.createdAt).format('A')=='PM' ? I18n.t('home_production_nightShiftName') : I18n.t('home_production_dayShiftName'))}`}
                    </Text>
                    <Text style={downTimeText}>
                        {`${I18n.t('oa_real')}`} 
                        <Text style={commment}>
                            {item.oa}
                        </Text>
                    </Text>
                </View>
            )
        } else if (item.type === 'Shift-Comment') {
            let data = item.data
            let userFullName = ''
            if (data) {
                userFullName = [item.nombre].join(' ')
            }

            containerWrapperStyle = containerWrapper
            timestamp = moment(item.createdAt).format('DD/MMM, h:mmA')
            iconBackground = titleColor = colors.darkSkyBlue
            icon = 'bubble'
            title = I18n.t('feedback')
            text = I18n.t('options')
            if(this.props.selectedItem){
                if(this.props.selectedItem.id==this.props.item.id){
                    text = I18n.t('cancel')
                }
            }

            content = (
                <View>
                    <View style={[commentContainerWrapper, { marginTop: 10 }]}>
                        <View style={[iconCircle, { backgroundColor: colors.silver }]}>
                            <LineIcon name='user' size={20} color={colors.white} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={roleName}>{I18n.t('team_member')}</Text>
                            <Text style={userName}>{userFullName}{"\n"}{I18n.t('commented')}:</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={commment}>
                            "{data}"
                        </Text>
                    </View>
                </View>
            )
        } else if (item.type == 'ChangeOver' || item.report_type == 2) { //item.type : 'unidentified-co-dt' always will be item.report_type : 3
            containerWrapperStyle = containerWrapper
            if (item.createdAt) {
                timestamp = moment(item.createdAt).format('DD/MMM, h:mmA')
            } else {
                timestamp = false
            }
            iconBackground = titleColor = '#ff6d10'
            icon = 'ban'
            title = I18n.t('changeover') + (item.report_division ? ' ' + item.report_division : '')
            text = `${labelType} ${I18n.t('changeover')}`
            if (item.type == 'unidentified-co-dt') {
                const data = JSON.parse(item.data)
                downtime = parseInt(data.minutes)
            }
            content = (
                <View style={{ marginTop: 10 }}>
                    <Text style={failureMode}>{failure}</Text>
                    {viewMaximo}
                    <View style={{ marginTop: 5 }}>
                        <View style={detailContainer}>
                            <Text style={downTimeText}>
                                {item.type == 'unidentified-co-dt' ? I18n.t('accumulated') : I18n.t('downtime')}: {downtime} {I18n.t('minutes_dim')}
                            </Text>
                            {issueType != '--' ?
                                <View style={areaContainer}>
                                    <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                    <View style={[areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                                </View> : null
                            }
                        </View>
                    </View>
                </View>
            )
        } else {
            if (!item.closedAt) {
                timestamp = moment(item.createdAt).format('DD/MMM, h:mmA')
            } else {
                timestamp = moment(item.closedAt).format('DD/MMM, h:mmA')
            }
            containerWrapperStyle = containerWrapper
            if (item.report_type === 1) {
                iconBackground = titleColor = colors.orangeRed
                icon = 'ban'
                title = I18n.t('stop') + (item.report_number ? ' #' + item.report_number : '') + (item.report_division ? ' ' + item.report_division : '')
            } else {
                iconBackground = titleColor = colors.lighterPurple
                icon = 'layers'
                title = I18n.t('setup')
            }
            content = (
                <View style={{ marginTop: 10 }}>
                    <Text style={failureMode}>{failure}</Text>
                    {viewMaximo}
                    <View style={{ marginTop: 5 }}>
                        <View style={detailContainer}>
                            <Text style={downTimeText}>
                                {I18n.t('downtime')}: {downtime} {I18n.t('minutes_dim')}
                            </Text>
                            {issueType != '--' ?
                                <View style={areaContainer}>
                                    <Text style={areaLabel}>{upperCase(issueType)}</Text>
                                    <View style={[areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                                </View> : null
                            }
                        </View>
                    </View>
                </View>
            )
        }


        let iconElement = (<View style={[iconCircle, { backgroundColor: iconBackground }]}>
            <LineIcon name={icon} size={20} color={colors.white} />
        </View>)
        if(item.group_id != null && item.report_statusID !== 19){
            iconElement = (<Image
                style={{ height: 40, width: 40, marginLeft: -5, marginRight: -5 }}
                source={require('../assets/icons/group.png')}
            />)
        }else if(item.group_id != null && item.report_statusID === 19){
            iconElement = (<Image
                style={{ height: 40, width: 40, marginLeft: -5, marginRight: -5 }}
                source={require('../assets/icons/group_bajavel.png')}
            />)
        }
        
        return (
            <View style={container}>
                <View style={card}>
                    <View style={containerWrapperStyle}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            {iconElement}
                           <View style={{ marginLeft: 10 }}>
                                <Text style={[eventTitle, { color: titleColor }]}>{title}</Text>
                                <Text style={timeStamp}>{timestamp}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {
                                this.props.customButton ?
                                    <SensaiButton
                                        xs
                                        text={this.props.customButton.title}
                                        negativebg={item.issue ? true : false}
                                        onPress={() => this.props.customButton.onPress()}
                                    />
                                    :
                                    null
                            }
                            {(showButton === true && !this.props.customButton) ?
                                <SensaiButton
                                    xs
                                    text={text}
                                    negativebg={item.issue ? true : false}
                                    onPress={() => {
                                        this._showOptions(item, returnFunction)
                                    }}
                                />
                                :
                                null
                            }
                            {this.props.showOptions && this.props.failureFunction && item.type != 'microparo' && item.type != 'unidentified-dt' && item.type != 'unidentified-co-dt' && item.try_out == false    ?
                                <TouchableOpacity
                                    style={{
                                        width: 20,
                                        paddingLeft: 5,
                                        marginLeft: 0,
                                        alignItems: 'flex-end',
                                    }}
                                    onPress={() => this._loadFailureOptions(item, this.props.failureFunction)}
                                >
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Icon name="ellipsis-v" size={32} />
                                    </View>
                                </TouchableOpacity>
                                : null
                            }
                        </View>
                    </View>
                    {content}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    commentContainerWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    commment: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "italic",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.darkGreyBlue
    },
    roleName: {
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.azure,
    },
    userName: {
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.darkGreyBlue,
    },
    woMaximoStyle: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    rowStyle: {
        marginTop: 5,
        flex: 1,
        flexDirection: "row"
    }
})