import React, { PureComponent } from 'react'
import { Alert, View, ScrollView, Text, StyleSheet, RefreshControl, AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchInitialChecklist, postChecklistAnswers } from './actions'
import { getChecklistSections } from './reducers'
import { colors } from '../../styles/theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import { guid, tracker, upperCase } from '../../helpers'
import I18n from '../../i18n/i18n'
import { SensaiButton, SensaiCheckbox, FailureHeader, Spinner } from '../../components/'

import moment from 'moment-timezone'
import 'moment/locale/es'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start'
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
})

class CheckList extends PureComponent {
    state = {
        answers: {},
        isRefreshing: false,
        isLoading: true,
        selectedId: 0,
        items: [],
        timer: '',
    }

    _mounted = false
    timer = null
    start = null

    constructor(props) {
        super(props)
        this.setAnswer = this.setAnswer.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this.save = this.save.bind(this)
        this.tick = this.tick.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.didFocusListener = this.props.navigation.addListener (
            'didFocus',
            (obj) => {
                this._onRefresh()
            }
        );
    }

    async componentDidMount() {
        tracker.trackScreenView('InitialChecklist')
        this._mounted = true
        this.getInitialCheckList()

        // if(this.timer === null){
        //     clearInterval(this.timer)
        //     this.timer = setInterval(this.tick, 1000)
        // }
        this.start = await AsyncStorage.getItem('@AppStore:timer-answers');
        if (this.start !== null) {
            this.startTimer()
        }
    }

    componentWillUnmount() {
        this._mounted = false
        clearInterval(this.timer)
        this.didFocusListener.remove();
    }

    async startTimer() {
        if (this.start === null) {
            this.start = moment().format('YYYY-MM-DD HH:mm:ss');
            await AsyncStorage.setItem('@AppStore:timer-answers', this.start);
        }
        this.timer = setInterval(this.tick, 1000);
    }

    async tick() {
        try {
            if(!this.start){
                this.start = await AsyncStorage.getItem('@AppStore:timer-answers');
            }
            let now = new Date().getTime()
            let creation = new Date(moment(this.start).format()).getTime()
            let diff = Math.round((now - creation) / 1000)
            let h = Math.floor(diff / (60 * 60))
            diff = diff - (h * 60 * 60)
            let m = Math.floor(diff / (60))
            diff = diff - (m * 60)
            let s = diff
            this.setState({ timer: `${(h < 10) ? '0' + h : h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}` })
        } catch (error) {
            console.log(error)
        }
    }

    save() {
        tracker.trackEvent('user-actions', 'save-checklist')
        let validChecking = true
        let params = {
            user_id: this.props.user.id,
            checklist_type: 1,
            machine_id: 2,
            shift: this.props.toDate,
            answers: []
        }
        this.props.checklist.forEach(section => {
            section.questions.forEach(check => {
                let response = false
                let comment = ''
                if(this.state.answers[check.ID]){
                    response = this.state.answers[check.ID].response
                    comment = this.state.answers[check.ID].comment
                }
                params.answers.push({
                    'checklistitem_id': check.ID,
                    'section_id': section.ID,
                    'response': response || false,
                    'comment': comment
                })
                if(!response && comment==''){
                    validChecking = false
                }
            })            
        })
        if(validChecking){
            this.setState({ isLoading: true })
            if(this.props.tablet){
                this.props.navigation.navigate('ValidateUser', params)
            }else{
                this.props.postChecklistAnswers(params).then(() => {
                    this.props.navigation.popToTop()
                })
            }
        }else{
            Alert.alert(I18n.t('alert_warning'), I18n.t('checklist_empty'))
        }
    }

    setAnswer(id, data, comment, name) {
        const { answers } = this.state
        answers[id] = {response: data, comment: comment, name: name}
        this.setState({ answers })
        if (this.timer === null) {
            this.startTimer()
        }
    }

    getInitialCheckList() {
        if (this._mounted === true) {
            if (this.props.currentMachine !== null) {
                this.props.fetchInitialChecklist(this.props.currentMachine.id, 1).then(() => {
                    this.setState({ isLoading: false, isRefreshing: false })
                    let array = []
                    this.props.checklist.map((value)=>{
                        value.show = true
                        array.push(value)
                    })
                    this.setState({ items: array })
                })
            }
        }
    }

    async _onRefresh() {
        tracker.trackEvent('user-actions', 'refreshing-checklist')
        this.setState({ isRefreshing: true })
        await AsyncStorage.removeItem('initialChecklist')
        this.getInitialCheckList()
    }

    _selectedId(id) {
        this.setState({ selectedId: id })
    }

    renderCheckListItems() {
        if (!this.state.isLoading && this.props.checklist) {
            const sections = this.state.items.map((section, i) => {
                let total = 0;
                const checks = section.questions.map((item) => {
                    let checked = false
                    let comment = false
                    if(this.state.answers[item.ID]){
                        total+=(this.state.answers[item.ID].name==section.DescSection?1:0)
                        checked = this.state.answers[item.ID].response
                        comment = this.state.answers[item.ID].comment
                    }
                    return (
                        <View key={item.ID} style={{ marginBottom: 10 }}>
                            <SensaiCheckbox
                                label={item.DescQuestion}
                                showButton={true}
                                checked={checked}
                                comment={comment}
                                selectedId={{id: item.ID, selectedId: this.state.selectedId, returnF: this._selectedId.bind(this)}}
                                onChange={(value, comment) => {
                                    this.setAnswer(item.ID, value, comment, section.DescSection)
                                }} />
                        </View>
                    )
                })
                return (
                    <View key={section.ID}>
                        <View style={[styles.headerContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row' }}
                                onPress={()=>{
                                    this.state.items[i].show = !section.show
                                    this.forceUpdate()
                                }}
                            >
                                <Icon name={section.show?"caret-down":"caret-right"} size={27} color={colors.darkGreyBlue} style={{ marginRight: 10 }}/>
                                <Text style={[styles.headerText, { textAlign: 'left' }]}>{upperCase(section.DescSection)}</Text>
                            </TouchableOpacity>
                            {/*<Text style={[styles.headerText, { textAlign: 'right' }]}>{total+'/'+section.checks.length}</Text>*/}
                        </View>
                        {section.show?checks:null}
                    </View>
                )
            })
            return sections
        }
        return (
            <Spinner />
        )
    }

    render() {
        let report = null
        let level = null
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }
        return (
            <View style={{ flex: 1 }}>
                <FailureHeader
                    enableBack={true}
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                />
                <View style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{upperCase(I18n.t('checklist_header'))}</Text>
                    </View>
                    <ScrollView style={{ marginTop: 10 }} refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        {this.state.timer?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
                                <Text style={{ fontSize: 16 }}>{I18n.t('checklist_timer')}</Text>
                                <Text style={{ justifyContent: 'space-between', fontSize: 16 }}>
                                    <Icon name={"clock-o"} size={20} color={colors.darkGreyBlue}/>{'  '+this.state.timer}
                                </Text>
                            </View>
                        :null}
                        {this.renderCheckListItems()}
                        <SensaiButton
                            text={I18n.t('checklist_beginShift')}
                            buttonStyle={{ margin: 10 }}
                            onPress={this.save}
                            loading={this.state.isLoading} />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        tablet: state.session.tablet,
        checklist: getChecklistSections(state),
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        user: state.session.info,
        answersSaved: state.checklist.answersSaved,
        toDate: state.lastShift.toDate,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchInitialChecklist, postChecklistAnswers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckList)
