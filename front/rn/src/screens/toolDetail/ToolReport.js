import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { FailureHeader, SensaiInput, SensaiCheckbox, SensaiButton, SensaiCombo, Spinner } from '../../components'
import { tracker, upperCase } from '../../helpers'
import { colors, theme } from '../../styles/theme'
import { fetchTools, updateReport } from './actions'

import moment from 'moment-timezone'
import 'moment/locale/es'
import I18n from '../../i18n/i18n';

class ToolReport extends Component{
    state = {
        isLoading:true,
        items: [],
    }

    constructor(props){
        super(props)
        this._mounted = false
        this.params = this.props.navigation.state.params
        this._assignParams = this._assignParams.bind(this)
    }

    componentDidMount() {
        this._mounted = true
        tracker.trackScreenView('ToolReport')
        this.props.fetchTools().then(()=>{
            if(this._mounted){
                arr = []
                if(this.props.tools.length>0){
                    (this.props.tools).map((value) => {
                        arr.push({label:value.code, value:value.id})
                    })
                }
                this._assignParams(this.params.data)
                this.setState({ 
                    isLoading: false, 
                    items:arr
                })
            }
        })
    }

    componentWillUnmount() {
        this._mounted = false
    }

    _assignParams(data) {
        this.setState({ 
            tool: data.tool,
            golpes_total: data.golpes_total,
            id: data.id,
            lote_rollo: (data.lote_rollo?data.lote_rollo:''),
            num_juliano: (data.num_juliano?data.num_juliano:''),
            num_rollo: (data.num_rollo?data.num_rollo:''),
            org: data.org,
            piezas: data.piezas,
            piezas_chat: (data.piezas_chat?data.piezas_chat:''),
            piezas_ret: (data.piezas_ret?data.piezas_ret:''),
            spm: data.spm,
            termino_rollo: data.termino_rollo,
            velocidad: data.velocidad,
            inicio: (data.inicio?moment(data.inicio).utc().format('HH:mm'):''),
            fin: (data.fin?moment(data.fin).utc().format('HH:mm'):''),
        })
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

    render() {
        let report = null
        let level = null

        if (this.props.currentFailure !== false) {
            report = this.props.currentReport
            level = this.props.currentEscalation ? this.props.currentEscalation.label : ''
        }

        if(this.state.isLoading){
            return this.renderLoader()
        }
        return(
            <View style={{ flex:1 }}>
                <FailureHeader
                    machineName={this.props.currentMachine.label}
                    failure={this.props.currentFailure}
                    escalationLevel={level}
                    report={report}
                    enableBack={true}
                />
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.mainText}>
                            {`${upperCase(I18n.t('tool'))} ${this.params.data.code}`}
                        </Text>
                        {
                            this.params.data.inicio&&this.params.data.fin?
                                <Text style={styles.secondaryText}>
                                    {`${moment(this.params.data.inicio).utc().format('DD MMM h:mm A')} - ${moment(this.params.data.fin).utc().format('DD MMM h:mm A')}`}
                                </Text>
                            :   
                                <Text style={styles.secondaryText}>
                                    {`${moment(this.params.data.inicio).utc().format('DD MMM h:mm A')} - ${I18n.t('actual')}`}
                                </Text>
                        }
                    </View>
                </View>
                <ScrollView style={styles.mainContainer}>
                    <Text style={styles.mainTitle}>
                        {upperCase(I18n.t('tool'))}
                    </Text>
                    <SensaiCombo
                        label = {I18n.t('no_tool')} 
                        selected = {this.state.tool}
                        items = {this.state.items}
                        onChange = {(value, key) => {
                            this.params.data.code = this.state.items[key].label
                            this.params.data.tool = value
                            this.setState({ tool:value })
                        }}
                    />
                    <View
                        style={{
                            flex:1,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}
                    >
                        <View style={styles.field}>
                            <Text style={styles.label}>{`${upperCase(I18n.t('no_of_roll'))}:`}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt1 = input
                                }}
                                placeholder="0000"
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.num_rollo}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ num_rollo: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt2.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>{`${upperCase(I18n.t('batch_of_roll'))}:`}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt2 = input
                                }}
                                placeholder="0000"
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.lote_rollo}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ lote_rollo: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt4.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label, {color:colors.coolGrey}]}>{upperCase(I18n.t('design_speed'))}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt3 = input
                                }}
                                editable={false}
                                placeholder={`(${I18n.t('gpm')})`}
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.velocidad}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ velocidad: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt4.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>{upperCase(I18n.t('no_julian'))}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt4 = input
                                }}
                                placeholder="0000"
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.num_juliano}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ num_juliano: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt9.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label, {color:colors.coolGrey}]}>{`${upperCase(I18n.t('start_hour'))}:`}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt5 = input
                                }}
                                editable={false}
                                placeholder="00:00"
                                style={styles.inputText}
                                value={`${this.state.inicio}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ inicio: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt6.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label, {color:colors.coolGrey}]}>{`${upperCase(I18n.t('end_hour'))}:`}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt6 = input
                                }}
                                editable={false}
                                placeholder="00:00"
                                style={styles.inputText}
                                value={`${this.state.fin}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ fin: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt7.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label, {color:colors.coolGrey}]}>{upperCase(I18n.t('real_strikes'))}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt7 = input
                                }}
                                editable={false}
                                placeholder="0000"
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.golpes_total}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ golpes_total: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt8.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={[styles.label, {color:colors.coolGrey}]}>{upperCase(I18n.t('total_pieces'))}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt8 = input
                                }}
                                editable={false}
                                placeholder="0000"
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.piezas}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ piezas: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt9.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>{upperCase(`${I18n.t('garbage_pieces')}`)}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt9 = input
                                }}
                                placeholder="0000"
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.piezas_chat}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ piezas_chat: value })
                                }}
                                onSubmitEditing={()=>{
                                    this.txt10.focus()
                                }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>{upperCase(`${I18n.t('rework_pieces')}:`)}</Text>
                            <TextInput
                                ref={(input)=>{
                                    this.txt10 = input
                                }}
                                placeholder="0000"
                                keyboardType={"numeric"}
                                style={styles.inputText}
                                value={`${this.state.piezas_ret}`}
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => {
                                    this.setState({ piezas_ret: value })
                                }}
                            />
                        </View>
                        <Text style={styles.label}>{`${upperCase(I18n.t('end_of_roll'))}:`}</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-start', width:'100%'}}>
                            <SensaiCheckbox
                                label={I18n.t('alert_yes')}
                                checkStyle = {styles.checkStyle}
                                checked={this.state.termino_rollo==1}
                                onChange={(value) => {
                                    this.setState({ termino_rollo: 1 })
                                }} 
                            />
                            <SensaiCheckbox
                                label={I18n.t('alert_no')}
                                checkStyle = {styles.checkStyle}
                                checked={this.state.termino_rollo==0}
                                onChange={(value) => {
                                    this.setState({ termino_rollo: 0 })
                                }} 
                            />
                        </View>
                    </View>
                    <SensaiButton
                        text={I18n.t('next')}
                        buttonStyle={{ margin: 10 }}
                        onPress={() =>{
                            let inicio = moment(this.state.inicio, 'HH:mm').format('HH:mm')
                            let fin = moment(this.state.fin, 'HH:mm').format('HH:mm')
                            if(moment(inicio, 'HH:mm').isValid() && moment(fin, 'HH:mm').isValid()){
                                let data = Object.assign({}, this.state);
                                data.items = null
                                data.inicio = moment(this.params.data.inicio).format('YYYY-MM-DD '+inicio+':ss')
                                data.fin = moment(this.params.data.fin).format('YYYY-MM-DD '+fin+':ss')
                                this.setState({ isLoading: true })
                                this.props.updateReport(data).then(()=>{
                                    this.props.navigation.state.params.returnFunction()
                                    this.props.navigation.goBack()
                                    this.props.navigation.navigate('ToolChangeOver', this.params)
                                })
                            }else{
                                alert(I18n.t('error_date_format'))
                            }
                        }}
                        loading={this.state.isLoading}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        marginLeft: 10,
        marginRight: 10,
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
    mainTitle:{
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.azure
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
    secondaryText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    field:{
        marginBottom: 5,
        marginTop: 5,
        width: '49%'
    },
    inputText: {
        height: 45,
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
    label:{
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginTop: 5,
        width: '100%',
        marginBottom: 5,
        color: 'black'
    },
    checkStyle:{
        paddingTop: 5, 
        width:'25%'
    }
})

function mapStateToProps(state) {
    return {
        tools: state.tools.tools,
        currentMachine: state.userMachine.machine,
        currentReport: state.userMachine.report,
        currentFailure: state.userMachine.inFailureMode,
        currentEscalation: state.userMachine.escalation,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchTools, updateReport }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolReport)