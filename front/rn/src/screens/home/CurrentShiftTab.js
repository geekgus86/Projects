import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, LogCard, CommentBox, Spinner, LogCardChecklist } from '../../components'
import { fetchCurrentShiftLog, postCommentToLog, deleteLog, updateLog } from './actions'
import { guid, tracker, upperCase, navigate  } from '../../helpers'

class CurrentShiftTab extends PureComponent {
    state = {
        isLoading: true,
        isRefreshing: false,
        showBox: false,
        showMenu: true,
        commentText: '',
        item: null,
        checklist: false,
        items: [],
        list: [],
        paros: 0,
        min: 0,
    }
    _mounted = false

    constructor(props) {
        super(props)
        this.onWriteComment = this.onWriteComment.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this.getCurrentShiftLog = this.getCurrentShiftLog.bind(this)
        this._failureOptions = this._failureOptions.bind(this)
        this._checked = this._checked.bind(this)
        this._merge = this._merge.bind(this)
    }

    componentDidMount() {
        this._mounted = true
        this.getCurrentShiftLog()
        tracker.trackScreenView('CurrentShiftLog')
    }

    getCurrentShiftLog() {
        if (this.props.currentMachine !== null) {
            this.props.fetchCurrentShiftLog(this.props.currentMachine.id, 'current').then(() => {
                this.setState({ isLoading: false, isRefreshing: false, items: this.props.items })
            })
        }
    }

    componentWillUnmount() {
        this._mounted = false
    }

    onWriteComment(comment) {
        if (comment !== '' && this.props.currentMachine !== null) {
            tracker.trackEvent('user-actions', 'write-comment')
            comment = comment.replace(/['"]+/g, '')
            this.setState({ isLoading: true })
            this.props.postCommentToLog(this.props.currentMachine.id, comment).then(()=>{
                this.setState({ showBox: false, commentText: '', item: null })
                this._onRefresh()
            })
        }
    }

    _merge() {
        if(this.state.list.length<=1){
            Alert.alert(I18n.t('alert_title'), I18n.t('select_two_stops'))
        }else{
            let sortable = this.state.list
            sortable.sort(function(a, b) {
                return a.id - b.id;
            });
            let total = 0
            sortable.map(function(value){
                total+=value.open_minutes
            })
            let item = sortable[0]
            item.issue = item.issueType = item.desc = null
            item.open_minutes = total
            navigate('MergeDowntime', { list: [ item ], merge: sortable, returnFunction: this._onRefresh.bind(this), type:"merge" })
        }
    }

    _failureOptions(item, value) {
        switch(value){
            case 0:
                if(item.report_division || item.report_statusID===19){
                    Alert.alert(I18n.t('alert_title'), I18n.t('no_agroup_stop'))
                }else{
                    this.setState({ checklist: true, showMenu: false, list: [], paros: 0, min: 0, item: item  })
                }
                break;
            case 1:
                if(item.open_minutes<=1 || item.report_division || item.report_statusID===19){
                    Alert.alert(I18n.t('alert_title'), I18n.t('no_agroup_stop'))
                }else{
                    navigate('SplitDowntime', { item: item, returnFunction: this._onRefresh.bind(this) })
                }
                break;
            default:
                this.setState({ checklist: false, item: null, isLoading: true, items: [] })
                this.getCurrentShiftLog()
                break;
        }
    }

    _checked(checked, item) {
        let list = this.state.list
        if(checked){
            list.push(item)
        }else{
            list = list.filter(el => el.id !== item.id);
        }
        let minutos = 0
        list.map(function(value){ minutos = minutos+value.open_minutes })
        this.setState({ list: list, paros: list.length, min: minutos })
        if(list.length==0){
            this._failureOptions(null, -1)
        }
    }

    _renderItem({ item }) {
        //validators for edit and delete
        if (item.type === 'report-closed') {
            return <LogCard item={item} returnFunction={this._onRefresh.bind(this)} showOptions={true} failureFunction={this._failureOptions.bind(this)} showButton={true} />
        }else if(item.type === 'shift-comment' && !this.state.checklist){
            return <LogCard item={item} selectedItem={this.state.item} returnFunction={this._commentOptions.bind(this)} showButton={this.props.user.id==item.id_user}/>
        }
        return null
    }

    _getItemLayout(data, index) {
        return { length: 150, offset: 150 * index, index }
    }

    _onRefresh() {
        this._failureOptions(null, -1)
        tracker.trackEvent('user-actions', 'pull-to-refresh-current-shift-log')
        this.setState({ isLoading: true, isRefreshing: true, items: [] })
        this.getCurrentShiftLog()
    }

    componentWillReceiveProps(nextProps) {
        if (this._mounted == true) {
            if (nextProps.canReload == true) {
                this.getCurrentShiftLog()
            }
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

    _commentOptions(item, index){
        switch(index){
            case 0:
                //Editar
                data = JSON.parse(item.data)
                this.setState({ showBox: true, commentText: data.message, item: item })
                break;
            case 1:
                //Borrar
                Alert.alert(
                    I18n.t('delete_feedback_question'),
                    I18n.t('delete_feedback_confirm'),
                    [
                        {text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: I18n.t('confirm'), onPress: () => {
                            this.setState({ isLoading: true })
                            this.props.deleteLog(item.id).then(()=>{
                                this._onRefresh();
                            })
                        }},
                    ],
                    { cancelable: false }
                )
                break;
            default:
                this.setState({ showBox: false, commentText: '', item: null })
                break;
        }
    }

    _updateLog(comment){
        let item = this.state.item
        this.setState({ isLoading: true })
        if(item){
            this.props.updateLog(item.id, '{"message":"'+comment+'"}').then(()=>{
                this.setState({ showBox: false, commentText: '', item: null })
                this._onRefresh()
            })
        }
    }

    render() {
        const { mainContainer, itemList, verticalLine, mainText, modalContainer, rectangle } = styles

        let logEntries = null
        if(this.state.checklist){
            logEntries = (
                <ScrollView style={{ marginBottom: 76 }}>
                    {this.state.items.map((item, i) => {
                        if (item.type === 'report-closed' && !item.report_division) {
                            return <LogCardChecklist key={i} item={item} onChange={this._checked.bind(this)} checked={item.id==this.state.item.id} />
                        }
                        return null
                    })}
                </ScrollView>
            )
        }else{
            logEntries = (
                <FlatList
                    data={this.state.items}
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
                    initialNumToRender={7}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                />
            )
        }
        let commentEvent = null
        let placeholder = false
        if(this.state.showBox){
            placeholder = I18n.t('edit_feedback')
            commentEvent = this._updateLog.bind(this)
        }else{
            commentEvent = this.onWriteComment.bind(this)
        }
        return (
            <View style={mainContainer}>
                {this.state.isLoading ?
                    this.renderLoader()
                    :
                    null
                }
                {
                    this.state.checklist?
                    <View style={modalContainer}>
                        <Text style={mainText}>
                            {upperCase(I18n.t('home_production_merge'))}
                        </Text>
                    </View>:null
                }
                { logEntries }
                {
                    !this.state.checklist?
                        <CommentBox commentText={this.state.commentText} 
                        placeholder = {placeholder}
                        onSendPress = {commentEvent}/>
                    :
                        <View style={{
                            position: 'absolute',
                            bottom: (this.state.showMenu?0:-108),
                            paddingLeft: 10,
                            paddingRight: 10,
                            width:'100%',
                            backgroundColor: "rgba(209, 209, 212, 1)"
                        }}>
                            <TouchableOpacity style={{ alignItems:'center', height:30}} 
                                onPress={()=>this.setState({ showMenu: !this.state.showMenu })}>
                                <View style={ rectangle }></View>
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[mainText, {fontWeight: 'normal'}]}>{`${I18n.t('selected_stops')}:`}
                                    <Text style={ mainText }>{this.state.paros}</Text>
                                </Text>
                                <Text style={ mainText }>{upperCase(`${I18n.t('total')}: ${this.state.min} ${I18n.t('minutes_dim')}`)}</Text>
                            </View>
                            <SensaiButton
                                text = {I18n.t('grouping')}
                                buttonStyle={{ marginTop: 10 }}
                                onPress={() => this._merge()}
                            />
                            <SensaiButton
                                text = {I18n.t('cancel')}
                                outline
                                buttonStyle={{ marginTop: 10, marginBottom: 10 }}
                                onPress={() => this._failureOptions(null, -1)}
                            />
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemList: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        left: 14,
        bottom: 65,
        borderLeftWidth: 1,
        borderLeftColor: colors.azure,
    },
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 5,
        padding: 10,
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

function mapStateToProps(state) {
    return {
        user: state.session.info,
        currentMachine: state.userMachine.machine,
        items: state.userMachine.currentShiftLog,
        canReload: state.userMachine.reloadShift,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCurrentShiftLog, postCommentToLog, deleteLog, updateLog }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentShiftTab)