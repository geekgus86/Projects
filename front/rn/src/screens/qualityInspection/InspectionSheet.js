import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findNodeHandle, View, Text, StyleSheet, ScrollView, Image, Alert, BackHandler, Modal, TextInput, ActivityIndicator } from 'react-native'
import { colors } from '../../styles/theme'
import BleManager from "react-native-ble-manager";
import { SensaiButton, SensaiCard, Spinner, CardDivider } from '../../components'
import { Chart } from '../../screens/qualityInspection/components/Chart'
import { upperCase } from '../../helpers'
import { getInspectionSheet, newInspection, getChecklistTrends, getToolTrends, getInspectionList, getActualTrend } from './actions'
import I18n from '../../i18n/i18n'
import NumberedTitle from './components/NumberedTitle';
import Inspection from './components/Inspection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { store } from '../../store'

const styles = StyleSheet.create({
    alignRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
    },
    headerContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        padding: 10,
    },
    visualAidHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    finishInspection: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: "#FFF", 
        textAlign: "center"
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
    circle: {
        width: 24,
        height: 24,
        borderRadius: 20,
        backgroundColor: colors.azure,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    text: {
        fontFamily: "OpenSans",
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    },
    visualAidCard: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
    },
    finalizaHeader : {
        backgroundColor: "#243746", 
        justifyContent: "center", 
        padding: 10, 
        borderTopLeftRadius: 8, 
        borderTopRightRadius: 8
    },
    selected: {
        borderColor: colors.lightishBlue,
        borderWidth: 1,
        borderRadius: 20
    },
    btnDisabled: {
        opacity: 0.5
    }
})

var isMounted = false;

class InspectionSheet extends Component {
    _didFocusSubscription;
    _willBlurSubscription;

    isMounted = false;

    constructor(props) {
        super(props);
        this.cards = {};
        this.state = {
            data: {
                checklist: {}
            },
            current: {
                image: {},
            },
            sending: false,
            drId: null,
            modalComments: false,
            comments: "",
            type: null,
            inspectionId: 0
        }
        this.getChecklistCards = this.getChecklistCards.bind(this);
        this.inspectionCheckSelected = this.inspectionCheckSelected.bind(this);
        this.onInspectionChange = this.onInspectionChange.bind(this);
        this.previousCheck = this.previousCheck.bind(this);
        this.nextCheck = this.nextCheck.bind(this);
        this.getRows = this.getRows.bind(this);
        this.finishInspection = this.finishInspection.bind(this);
        this.sendToHome = this.sendToHome.bind(this);
        this.onModal = this.onModal.bind(this);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }   

    state = {
        isLoading : true
    }

    componentDidMount() {
        isMounted = true;
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
          BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => {
        Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_logout'), [
            {text: I18n.t('alert_yes'), onPress: () => this.props.navigation.navigate("Home")},
            {text: I18n.t('alert_no')}
        ])
        return true;
    };

    async componentWillMount() {
        BleManager.start({showAlert: false});
        isMounted = false;
        this.props.navigation.setParams({lockBack: true});
        var params  = this.props.navigation.state.params;
        if(this.props.navigation.state.params && this.props.navigation.state.params.id) {
            if(this.props.navigation.state.params.dummy){
                await this.props.getInspectionSheet(this.props.navigation.state.params.id, true, this.props.navigation.state.params.id);
            }else{
                await this.props.getInspectionSheet(null, null, params.id);
            }
            !this.props.sheet.checklist && this.sendToHome();
            this.props.navigation.state.params.type && this.setState({type: this.props.navigation.state.params.type});
        }

        this.setState({
            current: this.props.sheet.checklist[0],
            drId: this.props.navigation.state.params.id || null,
            dailyreport: this.props.navigation.state.params.drId,
            inspectionId: params.inspectionId && params.inspectionId,
            workOrderID: parseInt(params.workOrderID),
            numJuliano: params.numJuliano
        }, ()=> {
            this.inspectionCheckSelected(this.state.current);
        })
    }

    componentWillUnmount(){
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    async onInspectionChange(id, value, aproved, type = "") {
        const d = this.state.data;
        d.checklist[id] = {value, aproved};
        await this.setState({data: d});
        if(type == "numero" && value.length == 0){
            
            var datos = this.state.data;
            delete datos.checklist[id];
            await this.setState({data: datos});   
        
        }
    }

    previousCheck() {
        const { checklist } = this.props.sheet;
        const i = checklist.indexOf(this.state.current);
        if(i > 0) this.inspectionCheckSelected(checklist[i-1]);
    }

    nextCheck() {
        const { checklist } = this.props.sheet;
        const i = checklist.indexOf(this.state.current);
        if(i < checklist.length - 1) this.inspectionCheckSelected(checklist[i+1]);
    }

    async inspectionCheckSelected(check) {
        if(check){
            await this.props.getChecklistTrends(check.id);
            this.setState({
                current: check,
            })
        }
    }

    getChecklistCards(data){
        let icon = null;
        if(data.instrumento && data.instrumento.service){
            if(data.instrumento.title == "Micr├│metro"){
                icon = <Image style={{ height: 40, width: 40 }} source={require('../../assets/IconMicrometro.png')}/>;
            }else if(data.instrumento.title == "Vernier"){
                icon = <Image style={{ height: 40, width: 40 }} source={require('../../assets/IconVernier.png')}/>;
            }else if(data.instrumento.title == "Reloj Digital"){
                icon = <Image style={{ height: 40, width: 40 }} source={require('../../assets/IconRDigital.png')}/>;
            }
        }

        return (
            <SensaiCard key={data.id} border={this.state.current.id == data.id} padding={[0, 0, 0, 0]}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: "100%"}}>
                        <Inspection onChange={this.onInspectionChange} active={data.id == this.state.current.id} check={data} id={data.id} onPress={this.inspectionCheckSelected} current={this.state.current.id == data.id} />
                    </View>
                </View>
            </SensaiCard>
            );
        }
            

    async finishInspection(aproved){
        this.props.navigation.setParams({lockBack: false});
        var count = Object.keys(this.state.data.checklist).length;
        var checks = this.props.sheet.checklist.length;
        if(count == checks){

        
            var ChecklistArray = [];

            this.setState({sending: true});
            for(var key in this.state.data.checklist){
                if(!this.state.data.checklist.hasOwnProperty(key)) continue;
                ChecklistArray.push({
                    InspectionCheckID: Number(key),
                    InspectionValue: this.state.data.checklist[key].value,
                    InspectionApprove: this.state.data.checklist[key].aproved
                })
            }

            var data = {
                WorkOrderID: parseInt(this.state.workOrderID),
                ToolID: this.props.navigation.state.params.id,
                Success: aproved,
                JulianCode: this.state.numJuliano,
                inspection_approvals_attributes: ChecklistArray
            }

            var dataToSend = {
                inspection: data
            }
            
            if(this.state.type){
                data.type = this.state.type
            }

            if(aproved){
                if(data && data.inspection_approvals_attributes.length > 0){               
                    for(let row of data.inspection_approvals_attributes){
                        if(row.InspectionApprove == false){
                            this.setState({modalComments : true})
                            return false;
                        }
                    }

                    Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_approve_question'), [
                        {text: I18n.t('qualityInspection_back'), onPress: () => {}},
                        {text: I18n.t('qualityInspection_approve'), onPress: async () => {
                            !this.props.navigation.state.params.dummy && await this.props.newInspection(dataToSend);
                            Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_inspection_created_successfully'));
                            this.setState({sending: false});
                            this.props.navigation.setParams({lockBack: false});
                            if(this.props.navigation.state.params.dummy){
                                this.props.navigation.goBack();
                            }else{
                                await this.props.getToolTrends(this.props.navigation.state.params.id);
                                await this.props.getActualTrend(this.props.navigation.state.params.id);
                                setTimeout(() => this.props.navigation.goBack(), 2000);
                            }

                        }}
                    ])

                    
                }
            }else{

                Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_not_approve_question'), [
                    {text: I18n.t('qualityInspection_back'), onPress: () => {}},
                    {text: I18n.t('qualityInspection_not_approve'), onPress: async () => {


                        !this.props.navigation.state.params.dummy && await this.props.newInspection(dataToSend);
                        this.setState({sending: false});
                        Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_inspection_created_successfully'));
                        this.props.navigation.setParams({lockBack: false});
                        if(this.props.navigation.state.params.dummy){
                            this.props.navigation.goBack();
                        }else{
                            await this.props.getToolTrends(this.props.navigation.state.params.id);
                            await this.props.getActualTrend(this.props.navigation.state.params.id);
                            setTimeout(() => this.props.navigation.goBack(), 2000);
                        }

                    }}
                ])
                
            }

        } else {
            Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_fill_inspections'));
        }
        
    }
    

    getRows() {
        const rows = []
        if(this.props.sheet == null ) {
            return <View style={{margin: 20}}><Spinner /></View>
        }
        return this.props.sheet.checklist.map(this.getChecklistCards);
    }

    sendToHome(){
        Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_no_dailyreports')); 
        this.props.navigation.navigate("Home");
    }

    async onModal(){
        
        this.props.navigation.setParams({lockBack: false});
        this.setState({modalComments: false});

        var ChecklistArray = [];

        for(var key in this.state.data.checklist){
            if(!this.state.data.checklist.hasOwnProperty(key)) continue;
            ChecklistArray.push({
                InspectionCheckID: Number(key),
                InspectionValue: this.state.data.checklist[key].value,
                InspectionApprove: this.state.data.checklist[key].aproved
            })
        }


        var data = {
            WorkOrderID: parseInt(this.state.workOrderID),
            ToolID: this.props.navigation.state.params.id,
            Success: true,
            Remark: this.state.comments,
            JulianCode: this.state.numJuliano,
            inspection_approvals_attributes: ChecklistArray
        }

        var dataToSend = {
            inspection: data
        }

        !this.props.navigation.state.params.dummy && await this.props.newInspection(dataToSend);
        Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_inspection_created_successfully'));
        if(this.props.navigation.state.params.dummy){
            this.props.navigation.goBack();
        }else{
            await this.props.getToolTrends(this.props.navigation.state.params.id);
            await this.props.getActualTrend(this.props.navigation.state.params.id);
            setTimeout(() => this.props.navigation.goBack(), 2000);
        }
    }
    
    standardDeviation(values){
        var avg = this.average(values);
        
        var squareDiffs = values.map(function(value){
          var diff = value - avg;
          var sqrDiff = diff * diff;
          return sqrDiff;
        });
        
        var avgSquareDiff = this.average(squareDiffs);
       
        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    }
       
    average(data){
        var sum = data.reduce(function(sum, value){
          return sum + value;
        }, 0);
       
        var avg = sum / data.length;
        return avg;
    }

    render() {
        if(this.props.sheet == null || !isMounted){
            return <Spinner />;
        }
        let data = []

        let hasChart = this.state.current && this.state.current.caracteristica && this.state.current.caracteristica !== 'No.de Rack'

        if(this.props.trends){
            let dataset = {}
            let time = []
            let v1 = {}
            let v2 = {}
            let v3 = {}
            let v4 = {}
            let v5 = {}
            let v6 = {}
            //let promedio = 0
            let usl = 0, lsl = 0;
            let values = [];
            this.props.trends.map((value, i)=>{
                if(value.inspectionId){
                    r = value.checkListId
                    secuential = value.inspectionId.secuentialNumber;
                    label = '#'+(secuential || 1)
                    const tolerancia = parseFloat(r.tolerancia || 0);
                    usl = tolerancia + (parseFloat(r.tolerancia_sup) || 0)
                    lsl = tolerancia - (parseFloat(r.tolerancia_inf) || 0)
                    v1[label] = usl
                    v2[label] = tolerancia
                    v3[label] = lsl
                    if(r.input_type == "check"){
                        v4[label] = value.value == 1 ? 0 : 1;
                    } else if(r.input_type == "dblcheck") {
                        let splitValue = value.value.toString().split(".");
                        v4[label] = splitValue[0] == "1" ? 0 : 1;
                        v6[label] = splitValue[1] == "1" ? 0 : 1;
                    } else { 
                        v4[label] = value.value || 0;
                    }
                    //v4[label] = (Math.random() * (v1[label] - v3[label]) + v3[label]) || 0
                    v5[label] = value.value || 0
                    values.push(v4[label]);
                    //promedio += v4[label]
                    //promedio += (Math.random() * (v1[label] - v3[label]) + v3[label]) || 0
                    time.push(label)
                }
            })
            time = time.reverse().slice(-10);
            let promedio = this.average(values);
            let desviacion = this.standardDeviation(values);
            // console.warn(desviacion);
            //let SumaVarianza = 0;
            //promedio = promedio/(this.props.trends.length||1)
            Object.keys(v5).forEach((e,i) => {
                v5[e] = promedio;
                //SumaVarianza += Math.pow((v4[e]-promedio),2)
            })
            //let varianza = (SumaVarianza / this.props.trends.length-1) || 0
            //let desviacion = Math.sqrt(varianza) || 0
            let extraLabels = [];
            if(desviacion != 0) {
                let pp = ((usl - lsl)/(6*desviacion)) || 0 
                let cpl = ((promedio - lsl)/(3*desviacion)) || 0
                let cpu = ((usl - promedio)/(3*desviacion)) || 0
                let cpk = Math.min(cpl, cpu)
                // console.warn(pp,cpl,cpu,cpk, promedio, usl, lsl)
                // console.warn("pp " + pp,"cpl" + cpl,"cpu" + cpu,"cpk" + cpk," promedio" +  promedio," usl" +  usl," lsl" +  lsl)
                extraLabels = [`Pp: ${(pp).toFixed(2)}`,`Cpk: ${(cpk).toFixed(2)}`]
            }
            dataset={
                'Lim. Superior': { 
                    data: v1, 
                    config: { 
                        color: '#FF0000',
                        lineWidth: 1,
                        drawHighlightIndicators: false,
                        color: '#FF0000',
                        drawValues: false
                    }
                },
                'Objetivo': { 
                    data: v2, 
                    config: { 
                        color: '#000000',
                        lineWidth: 1,
                        drawHighlightIndicators: false,
                        drawValues: false,
                        dashedLine: {
                            lineLength: 5, // required
                            spaceLength: 5, // required
                            phase: 5
                        },
                    }
                }, 
                'Lim. Inferior': { 
                    data: v3, 
                    config: { 
                        color: '#FF0000',
                        lineWidth: 1,
                        drawHighlightIndicators: false,
                        color: '#FF0000',
                        drawValues: false
                    }
                },
                'Dato real': { 
                    data: v4, 
                    config: { 
                        color: '#039EC7',
                        lineWidth: 1,
                        drawCircles: true,
                        drawHighlightIndicators: false,
                        color: '#039EC7',
                        drawValues: false
                    }
                },
                'Promedio': { 
                    data: v5, 
                    config: { 
                        color: '#5865FE',
                        lineWidth: 1,
                        drawHighlightIndicators: false,
                        color: '#5865FE',
                        drawValues: false
                    }
                }
            }
            labels = ['Lim. Superior', 'Objetivo', 'Lim. Inferior', 'Dato real', 'Promedio'];
            if(Object.keys(v6).length > 0) {
                dataset['Alto'] = dataset['Dato real'];
                delete dataset['Dato real'];
                dataset['Ancho'] = { 
                    data: v6, 
                    config: { 
                        color: '#CCCC00',
                        lineWidth: 1,
                        drawCircles: true,
                        drawHighlightIndicators: false,
                        drawValues: false
                    }
                };
                labels.pop();
                labels.pop();
                labels.push("Alto");
                labels.push("Ancho");
                delete dataset['Promedio'];
            }
            data = {
                time: time,
                dataset: dataset,
                label: labels,
                extraLabels: extraLabels
            }
        }

        const gs = store.getState();
        return (
            this.state.current && isMounted? 
            
            <View style={[styles.twoColumns, {flex: 1}]}>
                    <View style={{flex: 1}}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_inspeccion') + " #" + this.state.inspectionId)}</Text>
                        </View>
                        <KeyboardAwareScrollView>
                            {this.props.sheet && this.props.sheet.checklist ? this.getRows() : null}
                            <SensaiCard padding={[0,0,0,0]}>
                                <View style={styles.finalizaHeader}>
                                    <Text style={styles.finishInspection}>{I18n.t('qualityInspection_finish')}</Text>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <View style={{flex:1, marginLeft: 12, marginTop: 12, marginBottom: 12}}>
                                        {/* <SensaiButton xs={true} text={I18n.t('qualityInspection_s_aprobada')} buttonStyle={[{margin: 5}, Object.keys(this.state.data.checklist).length != this.props.sheet.checklist.length && styles.btnDisabled]} onPress={() => Object.keys(this.state.data.checklist).length == this.props.sheet.checklist.length && this.finishInspection(true)}/> */}
                                        <SensaiButton xs={true} text={I18n.t('qualityInspection_s_aprobada')} buttonStyle={{margin: 5}} default={Object.keys(this.state.data.checklist).length < this.props.sheet.checklist.length && true} onPress={() => Object.keys(this.state.data.checklist).length >= this.props.sheet.checklist.length && this.finishInspection(true)}/>
                                    </View>
                                    <View style={{flex:1, marginRight: 12, marginTop: 12, marginBottom: 12}}>
                                        {/* <SensaiButton xs={true} text={I18n.t('qualityInspection_s_noaprobada')} buttonStyle={[{margin: 5}, Object.keys(this.state.data.checklist).length != this.props.sheet.checklist.length && styles.btnDisabled]} onPress={() => Object.keys(this.state.data.checklist).length == this.props.sheet.checklist.length && this.finishInspection(false)}/> */}
                                        <SensaiButton xs={true} text={I18n.t('qualityInspection_s_noaprobada')} buttonStyle={{margin: 5}} default={Object.keys(this.state.data.checklist).length < this.props.sheet.checklist.length && true} onPress={() => Object.keys(this.state.data.checklist).length >= this.props.sheet.checklist.length && this.finishInspection(false)}/>
                                    </View>
                                </View>
                            </SensaiCard>
                            <View style={{height: 105}}/>
                        </KeyboardAwareScrollView>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                        <ScrollView>
                        <View>
                            <View style={[styles.headerContainer, styles.visualAidHeader, {justifyContent: 'space-between', padding: 5}]}>
                                <View style={[styles.alignRow, { margin: 3 }]}>
                                    <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_ayudavisual'))}</Text>
                                    <View style={styles.circle}>
                                        <Text style={styles.text}>{this.state.current.numero}</Text>
                                    </View>
                                </View>
                                <View style={styles.alignRow}>
                                    <SensaiButton default={this.state.current == this.props.sheet.checklist[0]} xs={true} text={I18n.t('qualityInspection_anterior')} buttonStyle={{marginRight: 5}} onPress={this.previousCheck}/>
                                    <SensaiButton default={this.state.current == this.props.sheet.checklist[this.props.sheet.checklist.length - 1]} xs={true} text={I18n.t('qualityInspection_siguiente')} onPress={this.nextCheck}/>
                                </View>
                            </View>
                            <View style={[styles.visualAidCard, {height: 300}]}>
                                <NumberedTitle number={this.state.current.numero || ""} text={this.state.current.caracteristica}/>
                                <Image source={{uri: `https://mtesting.sensai.net/apo_schulerA/api/v1/asset/assets/${this.state.current.image}/image`}} style={{height: 250}}/>
                                {/* <Image source={{uri: `https://metalsa.sensai.net/${this.state.current.image.thumbnailUrl}`}} style={{height: 250}}/> */}
                            </View>
                        </View>
                        <View>
                            <View style={[styles.headerContainer, styles.visualAidHeader, {justifyContent: 'space-between', padding: 5}]}>
                                <View style={[styles.alignRow, { margin: 3 }]}>
                                    <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_tendencias'))}</Text>
                                    <View style={styles.circle}>
                                        <Text style={styles.text}>{this.state.current.numero}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                hasChart &&
                                <View style={[styles.visualAidCard, {height: 200}]}>
                                    {data.dataset?
                                    <Chart 
                                        styles={{
                                            marginTop: 10,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        type = {'Line'} 
                                        data = {data}
                                    />:<Text style={{textAlign: "center", fontWeight: "600", marginTop: 10}}>Ésta es la primera inspección de este Número de Parte. Aquí se mostrarán los valores de inspecciones previas.</Text>}
                                </View>
                            }
                        </View>
                        </ScrollView>
                    </View>
                    <View>
                        <Modal transparent={true} visible={this.state.modalComments} animationType="fade" onRequestClose={() => this.setState({modalComments: false})}>
                            <View style={{height: "100%", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                                <View style={{width: "50%", marginLeft: "25%"}}>
                                    <SensaiCard>
                                        <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 17}}>{I18n.t('qualityInspection_inspection_out_range')}</Text>
                                        <Text style={{textAlign: "center", marginTop: 10}}>{I18n.t('qualityInspection_inspection_out_range_text1')}</Text>
                                        <Text style={{textAlign: "center"}}>{I18n.t('qualityInspection_inspection_out_range_text2')}</Text>
                                        <TextInput value={this.state.comments} onChange={(event) => this.setState({comments: event.nativeEvent.text})} underlineColorAndroid={"#FFF"} style={{marginTop: 10,borderColor: "#bebebe", borderWidth: 1, borderRadius: 5}} multiline={true}/>
                                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                                            <View style={{width: "45%"}}>
                                                <SensaiButton default={!this.state.comments.trim()} buttonStyle={{margin: 5}} onPress={() => { this.state.comments.trim() && this.onModal() }} text={I18n.t('accept')}/>
                                            </View>
                                            <View style={{width: "45%", marginTop: 5}}>
                                                <SensaiButton xs={true} buttonStyle={{margin: 5}} outline={true} onPress={() => this.setState({modalComments : false, comments: ""})} text={I18n.t('cancel')}/>
                                            </View>
                                        </View>
                                    </SensaiCard>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            
            : <Text style={{margin: 20, fontSize: 20, fontWeight: "500", textAlign: "center", marginTop: 10}}>Los items de inspección para este número de parte serán dados de alta próximamente.</Text>
        )
    }
}

function mapStateToProps(state) {
    return {        
        sheet: state.qualityInspection.sheet,
        trends: state.qualityInspection.trends,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getInspectionSheet, getChecklistTrends, newInspection, getToolTrends, getInspectionList, getActualTrend }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectionSheet)