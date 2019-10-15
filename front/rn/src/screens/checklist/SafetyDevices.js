import React, { PureComponent } from 'react'
import { Alert, View, ScrollView, Image, Text, StyleSheet, RefreshControl, AsyncStorage, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSafetyDevicesChecklist, postChecklistAnswers, setCurrentCheck } from './actions'
import { getSafetyChecklistItems, getCurrentCheck, getSafetyChecklistId } from './reducers'
import { colors } from '../../styles/theme'
import { guid, tracker, upperCase } from '../../helpers'
import { SensaiButton, SensaiCheckbox, FailureHeader, Spinner } from '../../components/'
import I18n from '../../i18n/i18n';

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-start'
    },
    imageContainer: {
        alignItems: 'center'
    },
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    headerContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        padding: 10,
    },
    headerText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    subHeaderText: {
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.azure,
        margin: 10,
        marginTop: 15,
    },
    questionText: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "left",
        color: colors.darkGreyBlueTwo,
        margin: 10,
        marginTop: 0,
    }
})

class SafetyDevices extends PureComponent {
    state = {
        isRefreshing: false,
        isLoading: true,
        answers: [],
    }
    _mounted = false

    constructor(props) {
        super(props)
        this.saveAnswer = this.saveAnswer.bind(this)
    }

    getSafetyDevicesChecklist() {
        if (this._mounted === true) {
            if (this.props.currentMachine !== null) {
                this.props.fetchSafetyDevicesChecklist(this.props.currentMachine.id, 4).then(() => {
                    this.setState({ isLoading: false, isRefreshing: false })
                })
            }
        }
    }

    saveAnswer(value) {
        const check = this.props.checklist[this.props.current]
        this.state.answers.push({
            'checklistitem_id': check.id,
            'response': value,
            'comment': null
        })
        if (this.props.checklist.length == this.props.current + 1) {
            let params = {
                user_id: this.props.user.id,
                checklist_id: this.props.checklistId,
                machine_id: this.props.currentMachine.id,
                shift: this.props.toDate,
                answers: this.state.answers
            }
            this.setState({ isLoading: true })
            this.props.postChecklistAnswers(params).then(() => {
                this.props.navigation.popToTop()
            })
        } else {
            this.props.setCurrentCheck(this.props.current + 1)
        }        
    }

    componentDidMount() {
        tracker.trackScreenView('SafetyDevicesChecklist')
        this._mounted = true
        this.getSafetyDevicesChecklist()
    }

    componentWillUnmount() {
        this._mounted = false
    }

    render() {
        let report = null
        let level = null
        let source = false 
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }
        
        let content = <Spinner />
        if (this.state.isLoading == false) {
            const check = this.props.checklist[this.props.current]
            console.log(check)
            if (check.picture.thumbnailUrl === "file/get/undefined") {
                source = false
            } else {
                source = `http://${this.props.domain}.sensai.net/${picture.thumbnailUrl}`
                // source = `http://localhost:1337/${check.picture.thumbnailUrl}`
            }
            content = (
                <View style={{ flex: 1 }}>
                    <Text style={styles.subHeaderText}>{`${upperCase(I18n.t('step'))} ${this.props.current + 1} ${upperCase(I18n.t('of'))} ${this.props.checklist.length}`}</Text>                    
                    <Text style={styles.questionText}>{check.question}</Text>  
                    <ScrollView> 
                        <View style={styles.imageContainer}>      
                            <Image
                                style={{ width: 350, height: 350, borderRadius: 5, marginTop: 10, marginBottom: 10 }}
                                resizeMode="contain"
                                source={{ uri: source }} />
                        </View>
                    </ScrollView>
                    <View style={styles.twoColumns}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <SensaiButton
                                outline
                                text={I18n.t('not_work')}
                                onPress={() => {
                                    this.saveAnswer(false)
                                }}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <SensaiButton
                                text={I18n.t('work')}
                                onPress={() => {
                                    this.saveAnswer(true)
                                }}
                            />
                        </View>
                    </View>
                </View>
            )
        }        
        
        return (
            <View style={{ flex: 1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{upperCase(I18n.t('security_devices'))}</Text>
                </View>
                {content}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        domain: state.session.domain,
        checklistId: getSafetyChecklistId(state),
        checklist: getSafetyChecklistItems(state),
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        user: state.session.info,
        current: getCurrentCheck(state),
        toDate: state.lastShift.toDate
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchSafetyDevicesChecklist, postChecklistAnswers, setCurrentCheck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SafetyDevices)
