import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Image } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { colors } from '../../styles/theme'
import { upperCase, navigate } from '../../helpers'
import { SensaiButton } from '../../components'
import moment from 'moment-timezone'
import 'moment/locale/es'
import I18n from '../../i18n/i18n';

export class FailureCard extends PureComponent {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { container, card, containerWrapper, eventTitle, timeStamp, iconCircle, failureMode, detailContainer, downTimeText, areaContainer, areaColorIndicatior, areaLabel, commentContainerWrapper, commment, roleName, userName, roundedImage } = styles

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

        let issueType = (item.issueType === null ? '--' : item.issueType)
        let content = null
        let iconBackground = ''
        let icon = ''
        let title = ''
        let titleColor = ''
        let timestamp = ''
        let text = ''
        let containerWrapperStyle = null
        let data = ''
        try {
            data = JSON.parse(item.data);
        } catch (err) {
            data = ''
        }
        
        timestamp = moment(item.createdAt).format('DD/MMMM, h:mmA')
        containerWrapperStyle = containerWrapper
        text= 'Pedir Asistencia'

        if (item.type === 'escalation') {
            iconBackground = titleColor = colors.tomato
            icon = 'ban'
            title = I18n.t('escalation')

            content = (
                <View style={{ marginTop: 10 }}>
                    <View style={detailContainer}>
                        <Text style={commment}>
                            {data.message}
                        </Text>
                    </View>
                </View>
            )
        } else if (item.type === 'comment' || item.type === 'assist') {
            let user = this.props.user
            let userFullName = ''
            if (data) {
                userFullName = user.nombre
            }
            iconBackground = titleColor = colors.darkSkyBlue
            icon = 'bubble'
            title = I18n.t('feedback')
            text = I18n.t('options')

            let source = ''
            if (user.thumbnailUrl === "file/get/undefined" || !user.thumbnailUrl) {
                source = false
            } else {
                source = `http://${this.props.user.domain}.sensai.net/${user.thumbnailUrl}`
            }

            content = (
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View style={[iconCircle, { backgroundColor: colors.darkSkyBlue }]}>
                                <LineIcon name={'bubble'} size={20} color={colors.white} />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 10}}>
                            <Text style={[eventTitle, { color: titleColor }]}>{I18n.t('feedback')}</Text>
                            <Text style={timeStamp}>{timestamp}</Text>
                        </View>
                    </View>
                    <View style={[commentContainerWrapper]}>
                        {!source ?
                                <Image style={roundedImage} source={require('../../assets/icon.png')} />
                                :
                            <Image
                                resizeMode="cover"
                                style={roundedImage} source={{ uri: source }} />
                        }
                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={roleName}>{I18n.t('feedback')}</Text>
                            <Text style={userName}>{userFullName}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={[commment, { fontStyle: 'italic' }]}>
                            {'"'+data.message+'"'}
                        </Text>
                    </View>
                </View>
            )
        } else if(item.type == 'failure') {
            iconBackground = titleColor = (item.report_type==3?'#ff6d10':colors.tomato)
            icon = 'ban'
            title = (item.report_type == 3 ? I18n.t('changeover') : I18n.t('stop'))+(item.report_number?' #'+item.report_number:'')+(item.report_division?' '+item.report_division:'')
            
            content = (
                <View style={{ marginTop: 10 }}>
                    <View style={detailContainer}>
                        <Text style={commment}>
                            {data.message}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={container}>
                <View style={card}>
                    {(item.type === 'comment' || item.type === 'assist')?null:
                        <View style={containerWrapperStyle}>
                            <View style={{ flexDirection: 'row', alignItems:'center' }}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[eventTitle, { color: titleColor }]}>{title}</Text>
                                </View>
                                <View style={{ flex:1, alignItems: 'flex-end' }}>
                                    <Text style={timeStamp}>{timestamp}</Text>
                                </View>
                            </View>
                        </View>
                    }
                    {content}
                    {(showButton === true) ?
                        <View style={{width: 168, marginTop:10}}>
                            <SensaiButton
                                xs
                                text={text}
                                onPress={this.props.onPress}
                            />
                        </View>
                        :
                        null
                    }
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
    commentContainerWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    commment: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
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
    roundedImage: {
        width: 30,
        height: 30,
        borderRadius: 35,
    },
})