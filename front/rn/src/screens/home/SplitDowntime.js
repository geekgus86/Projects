import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BackHandler, View, Text, FlatList,KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { SensaiButton, LogCard, Spinner, CardDivider, NavHeader } from '../../components'

import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { guid, tracker, upperCase, navigate } from '../../helpers'

class SplitDowntime extends Component {

    state = {
        isLoading: false,
        item: null,
        list: [],
        total: 0,
        showOptions: true,
        showMenu: false,
    }

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this._renderItem = this._renderItem.bind(this)
        this._addItem = this._addItem.bind(this)
        this._removeItem = this._removeItem.bind(this)
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this._split = this._split.bind(this)
        this._getTotal = this._getTotal.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    handleBackButton() {
        this.props.navigation.goBack()
        return true
    }

    _keyboardDidShow () {
        this.setState({ showOptions: false })
    }
    
    _keyboardDidHide () {
        this.setState({ showOptions: true })
    }

    componentWillMount() {
        this.setState({ item: this.params.item})
        this._addItem() 
        this._addItem()
    }

    _getTotal(list){
        let total = 0
        for (let i = 0; i < list.length; i++) {
            const value = list[i].open_minutes*1
            if(value>0){
                total+=(value*1)
            }
        }
        this.setState({ total: total })
    }

    _addItem() {
        if(this.state.list.length>=10){
            alert(I18n.t('no_add_divide'))
        }else{
            let list = this.state.list
            let item =  Object.assign({}, this.params.item)
            item.report_division = upperCase(this.alphabet[list.length])
            item.open_minutes = 0
            item.issue = item.desc = item.issueType =null,
            list.push(item)
            this.setState({ list: list })
            this._getTotal(list)
        }
    }

    _removeItem(index) {
        let list = this.state.list
        list.splice(index, 1)
        for (let i = 0; i < list.length; i++) {
            list[i].report_division = upperCase(this.alphabet[i])
        }
        this.setState({ list: list })
        this._getTotal(list)
    }

    _renderItem(item, i) {
        const { mainText, iconCircle, label } = styles
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 10 }} key={i}>
                <View style={[iconCircle, (item.report_type==3?{backgroundColor: '#ff6d10'}:null)]}>
                    <LineIcon name={'ban'} size={20} color={colors.white} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={[mainText, (item.report_type==3?{color: '#ff6d10'}:{color: colors.orangeRed})]}>
                        {`${I18n.t('stop')} ${item.report_division}`}
                    </Text>
                    <Text style={mainText}>{I18n.t('no_identified_stop')}</Text>
                    <View style={{ 
                            flex:1, 
                            flexDirection: 'row',
                            marginTop: 10,
                            alignItems: 'center',
                        }}>
                        <Text style={label}>{upperCase(`${I18n.t('duration')}:`)}</Text>
                        <TextInput 
                            keyboardType={'numeric'}
                            autoCapitalize='none'
                            returnKeyType={'done'}
                            underlineColorAndroid='transparent'
                            placeholder={I18n.t('minutes_dim')}
                            onChangeText={(text)=>{
                                let list = this.state.list
                                list[i].open_minutes = text*1
                                this.setState({ list: list })
                                this._getTotal(list)
                            }}
                            style={{
                                width: 155,
                                height: 45,
                                borderRadius: 2,
                                backgroundColor: colors.white,
                                borderStyle: 'solid',
                                borderWidth: 1,
                                paddingLeft: 4,
                                paddingRight: 4,
                                textAlign: 'left',
                                borderColor: colors.silver,
                                marginLeft: 10
                            }}
                        />
                        {i>=2?
                            <TouchableOpacity 
                                style={{ marginLeft: 8 }} 
                                onPress={()=> this._removeItem(i) }
                            >
                                <Icon name="trash-o" size={32} />
                            </TouchableOpacity>:null
                        }
                    </View>
                </View>
            </View>
        )
    }

    _split() {
        if(this.state.list[0].open_minutes>=1 && this.state.list[1].open_minutes>=1){
            console.log("DIVISION ISSUE:",this.state.total.toFixed(2) + ' = ' + this.state.item.open_minutes.toFixed(2))
            if(this.state.total.toFixed(2)==this.state.item.open_minutes.toFixed(2)){
                let list = this.state.list
                let array = []
                let actual = 0
                for (let i = 0; i < list.length; i++) {
                    if(i>1){
                        if(list[i].open_minutes>=1){
                            list[i].report_division = upperCase(this.alphabet[actual])
                            array.push(list[i])
                            actual++
                        }
                    }else{
                        array.push(list[i])
                        actual++
                    }
                }
                this.props.navigation.goBack()
                navigate('MergeDowntime', { list: array, returnFunction: this.params.returnFunction, type:"split" })
            }else{
                alert(I18n.t('error_time_stop'))

            }
        }else{
            alert(I18n.t('error_white_fields'))
        }
    }

    render() {
        const { modalContainer, mainText, totalLabel, rectangle } = styles

        const entries = this.state.list.map((item, i)=>{
            return this._renderItem(item, i)
        })

        return (
            <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
                <NavHeader enableBack={true} title={upperCase(I18n.t('divide_stop') + (this.state.item.report_number?' # '+this.state.item.report_number:''))} />
                <View style={{flex: 1, justifyContent: 'flex-start',}}>
                    <LogCard item={this.state.item} showButton={false} />
                    <View style={{ margin: 10 }}>
                        <CardDivider />
                        <Text style={[ mainText, { marginLeft: 10 } ]}>
                            {`${I18n.t('divided_stop_on')}: ${this.state.list.length}`}
                        </Text>
                        <ScrollView style={{ marginTop: 10, marginBottom: (this.state.showOptions?240:160) }}>
                            { entries }
                            <CardDivider />
                            <SensaiButton
                                text={I18n.t('add_divide')}
                                outline
                                onPress={()=>this._addItem()}
                            />
                        </ScrollView>
                    </View>
                </View>
                {this.state.showOptions?
                    <View style={{
                        position: 'absolute',
                        bottom: (this.state.showMenu?0:-125),
                        paddingLeft: 10,
                        paddingRight: 10,
                        width:'100%',
                        backgroundColor: "rgba(209, 209, 212, 1)"
                    }}>
                        <TouchableOpacity style={{ alignItems:'center', height:30}} 
                            onPress={()=>this.setState({ showMenu: !this.state.showMenu })}>
                            <View style={ rectangle }></View>
                        </TouchableOpacity>
                        {
                            this.state.total>this.state.item.open_minutes?
                            <Text style={[totalLabel, { color: colors.orangeRed }]}>{upperCase(I18n.t('error_sum_exceeds_time'))}</Text>
                            :
                            <Text style={totalLabel}>{upperCase(I18n.t('divide_total_time') + ' ' + this.state.total.toFixed(2) + ' ' + I18n.t('minutes_dim') + ' / '+this.state.item.open_minutes + ' ' + I18n.t('minutes_dim'))}</Text>
                        }
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}></View>
                        <SensaiButton
                            text={I18n.t('divide')}
                            buttonStyle={{ marginTop: 10 }}
                            onPress={() => this._split()}
                        />
                        <SensaiButton
                            text={I18n.t('cancel')}
                            outline
                            buttonStyle={{ marginTop: 10, marginBottom: 10 }}
                            onPress={() => {
                                this.props.navigation.state.params.returnFunction()
                                this.props.navigation.goBack()
                            }}
                        />
                    </View>:null
                }
            </KeyboardAvoidingView>
        )
    }

}

function mapStateToProps(state) {
    return {
        currentMachine: state.userMachine.machine,
        currentReport: state.userMachine.report,
        currentFailure: state.userMachine.inFailureMode,
        currentEscalation: state.userMachine.escalation,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitDowntime)

const styles = StyleSheet.create({
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
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
    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.orangeRed
    },
    label: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#9b9b9b"
    },
    totalLabel: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textAlign: "center",
        letterSpacing: 0,
        color: colors.darkGreyBlueTwo
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