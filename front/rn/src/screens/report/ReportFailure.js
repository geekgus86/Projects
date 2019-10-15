import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native'

import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, NavHeader, SensaiCheckbox, SensaiInput } from '../../components'
import { fetchIssueTypes, sendReport, selectIssueType, deselectIssueType, setAbnormalityComment } from './actions'
import { tracker, upperCase } from '../../helpers'

class ReportFailure extends PureComponent {
    state = {
        showDetail: false,
        isLoading: false,
    }

    constructor(props) {
        super(props)
        this.onCancel = this.onCancel.bind(this)
        this.onReportPress = this.onReportPress.bind(this)
        this.onAbnormalityPress = this.onAbnormalityPress.bind(this)
        this.renderCheckboxes = this.renderCheckboxes.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSend = this.onSend.bind(this)

        this.params = this.props.navigation.state.params
    }

    componentDidMount() {
        tracker.trackScreenView('ReportFailure')
        this.props.fetchIssueTypes().then(() => {
            this.setState({ isLoading: false })
        })
        if(this.params.showAb){
            this.onAbnormalityPress()
        }
    }

    onCancel() {
        tracker.trackEvent('user-actions', 'cancel-report-failure')
        this.props.navigation.goBack()
    }

    onReportPress() {
        tracker.trackEvent('user-actions', 'report-failure')
        let current = !this.state.showDetail
        this.setState({ showDetail: current })
    }

    onAbnormalityPress() {
        tracker.trackEvent('user-actions', 'report-abnormality')
        let current = !this.state.showDetail
        this.setState({ showDetail: current })
    }

    onSend() {
        let selectedIssueTypes = this.props.types
            .filter((t) => t.selected === true)
            .map((m) => {
                return {
                    id: m.id,
                    comment: m.comment
                }
            })
        if (selectedIssueTypes.length !== 0) {
            this.setState({ isLoading: true })
            this.props.sendReport(selectedIssueTypes, this.props.currentMachine.id).then(() => {
                Alert.alert(
                    I18n.t('error_report_received'),
                    I18n.t('error_issue_reported'),
                    [
                        {
                            text: I18n.t('accept'), onPress: () => {
                                this.setState({ isLoading: false })
                                this.props.navigation.goBack()
                            }
                        },
                    ],
                    { cancelable: false }
                )
            })
        }
    }

    renderCheckboxes() {
        if (this.props.types.length > 0) {
            const checkboxes = this.props.types.map((issueType) => {
                const data = issueType.issues.map((issue) => {
                    return `${issue.code} / ${issue.desc}`
                })
                return (
                    <View key={issueType.id} style={{ marginBottom: 5 }}>
                        <SensaiCheckbox
                            label={issueType.name}
                            onChange={(value) => {
                                if (value === true) {
                                    this.props.selectIssueType(issueType)
                                } else {
                                    this.props.deselectIssueType(issueType)
                                }
                            }}
                        />
                        {
                            issueType.selected ?
                            <SensaiInput
                                label={I18n.t('comment')}
                                placeholder={I18n.t('write_message')}
                                inputStyle={{
                                    marginBottom: 5,
                                    marginTop: 5
                                }}
                                onChangeText={(value) => {
                                    issueType.comment = value
                                    this.props.setAbnormalityComment(issueType)
                                }}
                            />
                            :
                            null
                        }
                    </View>
                )
            })
            return checkboxes
        } else {
            return (
                <View style={styles.spinnerStyle}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        const { centerVertical, text, strong, subHeaderText, checkboxesContainer, buttons } = styles
        let content = null

        if (this.state.showDetail === false) {
            content = (
                <View style={centerVertical}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={text}>¿Deseas crear un reporte para <Text style={strong}>{this.props.currentMachine.name}</Text>?</Text>
                        <SensaiButton
                            text={I18n.t('error_report')}
                            buttonStyle={{ marginBottom: 10 }}
                            onPress={this.onReportPress}
                        />
                        <SensaiButton
                            text={I18n.t('error_report_abnormality')}
                            onPress={this.onAbnormalityPress}
                        />
                    </View>
                    <SensaiButton
                        text={I18n.t('cancel')}
                        onPress={this.onCancel}
                    />
                </View>
            )
        } else {
            content = (
                <View style={centerVertical}>
                    <ScrollView>
                        <Text style={subHeaderText}>{upperCase(I18n.t('error_abnormality_type'))}</Text>
                        <View style={checkboxesContainer}>
                            {this.renderCheckboxes()}
                        </View>
                        <View style={buttons}>
                            <SensaiButton
                                text={I18n.t('error_send_report')}
                                buttonStyle={{ marginBottom: 10 }}
                                onPress={this.onSend}
                                loading={this.state.isLoading}
                            />
                            <SensaiButton
                                text={I18n.t('cancel')}
                                onPress={this.onCancel}
                                loading={this.state.isLoading}
                            />
                        </View>
                    </ScrollView>
                </View>
            )
        }

        return (
            <View style={{flex: 1}}>
                <NavHeader enableBack={true} title={I18n.t('screen_newReport')} />
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centerVertical: {
        flex: 1,
        margin: 10,
    },
    text: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        marginLeft: 44,
        marginRight: 44,
        marginBottom: 30,
        color: colors.darkGreyBlue
    },
    strong: {
        fontWeight: 'bold'
    },
    subHeaderText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0.27,
        textAlign: 'left',
        color: colors.coolGrey,
        margin: 10,
        marginTop: 18,
    },
    checkboxesContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    buttons: {
        marginTop: 15
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    }
})

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        types: state.issues.issueTypes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchIssueTypes, sendReport, selectIssueType, deselectIssueType, setAbnormalityComment }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportFailure)