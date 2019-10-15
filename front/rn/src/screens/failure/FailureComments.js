import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, FlatList, Vibration } from 'react-native'
import { FailureHeader, SensaiButton, Spinner } from '../../components'
import { colors } from '../../styles/theme'
import { FailureCard } from './FailureCard'
import { fetchComments, newComment, cleanComments } from './actions'
import { guid, tracker } from '../../helpers'
import { subscribeTo, unsubscribe } from '../../lib/Socket'
import I18n from '../../i18n/i18n';

class FailureComments extends Component {
    state = {
        isLoading: false,
        showMenu: false,
        showButton: true,
        comment:'',
    }

    _mounted = false

    constructor(props){
        super(props)
        this.params = this.props.navigation.state.params
        this._toggleMenu = this._toggleMenu.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this._commentAdded = this._commentAdded.bind(this)
    }

    componentWillUnmount() {
        this._mounted = false
        this.props.cleanComments()
        unsubscribe('comment-added')
    }

    componentDidMount() {
        this._mounted = true
        subscribeTo('comment-added', this._commentAdded)
        tracker.trackScreenView('FailureComments')
        this._onRefresh()
    }

    _commentAdded() {
        this._onRefresh()
        Vibration.vibrate(1000)
    }

    _onRefresh() {
        if(this._mounted){
            this.setState({ isLoading:true })
            this.props.fetchComments(this.params.report).then(()=>{
                this.setState({ isLoading:false })
            })
        }
    }

    _toggleMenu() {
        this.setState({ showMenu:!this.state.showMenu })
    }

    _newComment(){
        if(this.state.comment){
            let data = '{"message": "'+this.state.comment+'"}'
            this.setState({ isLoading:true })
            this.props.newComment(this.params.report, data, this.props.session.info.id).then(()=>{
                this.setState({ isLoading:false, showMenu:false, comment:'' })
                this.input.blur()
            })
        }
    }

    _assistance(type){
        let data = ''
        if(type=='assist'){
            this.setState({ showButton: false })
            data = `{"message": "${I18n.t('technical_assistance')}"}`
        }else if(type=='escalation' && this.props.selected.escalationLevel < 5){
            data = `{"message": "${I18n.t('stop_manual_escalade')}"}`
        }
        if(data != ''){
            this.setState({ isLoading:true })
            this.props.newComment(this.params.report, data, this.props.session.info.id, type).then(()=>{
                this.setState({ isLoading:false, showMenu:false })
                if(type=='escalation'){
                    Alert.alert(
                        I18n.t('level_manual_escalade'),
                        I18n.t('stop_manual_escalade'),
                        [
                            {text: I18n.t('accept')}
                        ],
                        { cancelable: false }
                    )
                }
            })
        }else{
            Alert.alert(I18n.t('alert_title'), I18n.t('no_escale_stop'))
        }
    }

    renderLoader(){
        return(
            <View style={{
                position: 'absolute',
                height:'100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 9999,
            }}>
                <Spinner />
            </View>
        );
    }

    _renderItem({ item }) {
        let user = {
            nombre: item.nombre,
            apellidoPaterno: item.apellidoPaterno,
            apellidoMaterno: item.apellidoMaterno,
            domain: this.props.session.domain,
            thumbnailUrl: item.thumbnailUrl
        }
        return (
            <FailureCard item={item} user={user} showButton={false}/>
        )
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }

    render() {
        const items = this.props.items
        let report = null
        let level = null
        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }
        return (
            <View style={{ flex:1 }}>
                <FailureHeader
                    enableBack
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                />
                {this.state.isLoading ?
                    this.renderLoader()
                    :
                    null
                }
                <FlatList
                    data={items}
                    style={{
                        marginBottom:85,
                    }}
                    shouldItemUpdate={(props, nextProps) => {
                        return props.item !== nextProps.item
                    }}
                    getItemLayout={this._getItemLayout.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={item => {
                        return guid()
                    }}
                    removeClippedSubviews
                    disableVirtualization
                    initialNumToRender={4}
                    refreshing={this.state.isLoading}
                    onRefresh={this._onRefresh}
                    ListFooterComponent={()=>{
                        let item = this.params
                        return(
                            <FailureCard item={{id: null, data:'{"message":"'+this.props.currentMachine.name+' se ha detenido"}', type:'failure', createdAt: item.createdAt, user:null, report_number: item.report_number, report_division: item.report_division, report_type: item.report_type}} 
                            onPress={this._assistance.bind(this, 'assist')} showButton={this.state.showButton}/>
                        )
                    }}
                />
                <View style={{
                    position: 'absolute',
                    bottom: (this.state.showMenu?0:-108),
                    paddingLeft: 10,
                    paddingRight: 10,
                    width:'100%',
                    backgroundColor: "rgba(209, 209, 212, 0.5)"
                }}>
                    <TouchableOpacity style={{ alignItems:'center', height:30}} 
                    onPress={()=>this._toggleMenu()}>
                        <View style={styles.rectangle}></View>
                    </TouchableOpacity>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:'space-between',
                    }}>
                        <TextInput style={styles.input}
                            ref={(input) => { this.input = input }}
                            autoCorrect={false}
                            placeholder = {I18n.t('write_message')}
                            keyboardType={this.props.keyboardType}
                            autoCapitalize='none'
                            underlineColorAndroid='transparent'
                            value={this.state.comment}
                            onChangeText={(value)=>this.setState({comment:value})}
                        />
                        <SensaiButton
                            xs
                            text='Publicar'
                            buttonStyle={{ marginTop: 5 }}
                            onPress={() => this._newComment()}
                        />
                    </View>
                    <SensaiButton
                        text = {I18n.t('ask_assistance')}
                        buttonStyle={{ marginTop: 10 }}
                        onPress={() => this._assistance('assist')}
                    />
                    <SensaiButton
                        text = {I18n.t('manual_escalation')}
                        buttonStyle={{ marginTop: 10 }}
                        onPress={() => this._assistance('escalation')}
                    />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
        currentEscalation: state.userMachine.escalation,
        items: state.forumComments.comments,
        selected: state.forumComments.selectedReport,
        currentMachine: state.userMachine.machine,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchComments, newComment, cleanComments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FailureComments)

const styles = StyleSheet.create({
    input: {
        width: '78%',
        height: 40,
        borderRadius: 2,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.silver,
        fontFamily: 'OpenSans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.coolGrey,
        paddingLeft: 4,
        paddingRight: 4
    },
    rectangle: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: 40,
        height: 2,
        borderRadius: 2,
        backgroundColor: colors.coolGrey
    }
})