import React, { PureComponent } from "react";
import { TouchableOpacity, ActivityIndicator, View, AsyncStorage, StyleSheet, Text, NativeModules, NativeEventEmitter, Alert, Image} from 'react-native';
import SensaiCard from "../../../components/SensaiCard";
import NumberedTitle from "./NumberedTitle";
import LabeledText from "./LabeledText";
import { CardDivider } from "../../../components";
import OkNoOk from './OkNoOk';
import I18n from "../../../i18n/i18n";
import InputComponent from "./InputComponent";
import { upperCase } from "../../../helpers"
import Icon from "react-native-vector-icons/FontAwesome"

import BleManager from 'react-native-ble-manager';

import ab2str from 'arraybuffer-to-string';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const styles = StyleSheet.create({
    topTag: {
        backgroundColor: "#a6a8ab",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    topTagText: {
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 2,
        textAlign: "center",
        color: "#ffffff"
    },
    checktext: {
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#000"
    }
})

export default class Inspection extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            value: null,
            peripheral: null,
            status: "none",
            connected: false,
            failure: false,
            desiredDisconnect: false,
            dblCheckVal: ['0', '0'],
            intents: 0,
            alertShown: false
        }

        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.connect = this.connect.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.validateValue = this.validateValue.bind(this);
        this.txtonChange = this.txtonChange.bind(this);
        this.onCheckBox = this.onCheckBox.bind(this);
        this.onCheck1 = this.onCheck1.bind(this);
        this.onCheck2 = this.onCheck2.bind(this);
        this.onSync = this.onSync.bind(this);
        this.loadInstrument = this.loadInstrument.bind(this);

    }

    async componentDidMount(){
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
    }

    async loadInstrument(){
        let peripheral = null;
        if(this.props.check.instrumento && this.props.check.instrumento.title){
            console.log("LOAD INSTRUMENT", this.props.check.instrumento.title)
            peripheral = JSON.parse(await AsyncStorage.getItem(this.props.check.instrumento.title));
            console.log("LOAD INSTRUMENT PERIPHERAL", peripheral);
            if(peripheral){
                await this.setState({peripheral});
            }
        }
    }

    componentWillMount(){
        if(this.props.check.input_type == "numero"){
            if(this.props.check.tolerancia || this.props.check.tolerancia == 0){
                console.log("PROPS CON TELERANCIA");
            }else{
                console.log("PROPS SIN TOLERANCIA", this.props.check);
            }
        }
    }

    async handleDisconnectedPeripheral(data) {
        if(this.state.peripheral && this.props.active){
            console.warn("Disconnected", data);
            this.connect(this.state.peripheral);
        }
      }

    async connect(peripheral){
        var intents = this.state.intents + 1;
        await this.setState({loading: true, failure: false, connected: false, intents});
        if(intents <= 10){
            try{
                await BleManager.connect(peripheral.id);
                await BleManager.retrieveServices(peripheral.id);
                await this.subscribe();
                // setTimeout(() => this.subscribe(), 2000);
            }catch(err){
                if(this.state.intents > 10){
                
                    Alert.alert(I18n.t('qualityInspection_error_connect'), I18n.t('qualityInspection_error_restart_bt'));
                    await this.setState({loading: false, failure: true});
                }  
            }
        }
    }

    async subscribe(){
        await BleManager.startNotification(this.state.peripheral.id, this.props.check.instrumento.service, this.props.check.instrumento.characteristic);
        await this.setState({loading: false, connected: true, intents: 0});
    }

    componentWillUnmount(){
        this.handlerUpdate && this.handlerUpdate.remove();
    }

    onCheckBox(data){
        this.props.onChange && this.props.onChange(this.props.check.id, data, data == 1? true : false, "check");
    }

    async handleUpdateValueForCharacteristic(data){
        if(this.props.active && this.props.check.instrumento && this.state.peripheral && this.state.peripheral.id === data.peripheral){
            let valor = Number(ab2str(data.value, "utf-8"));
            // let limInf = this.props.check.tolerancia - this.props.check.tolerancia_inf;
            // let limSup = this.props.check.tolerancia + this.props.check.tolerancia_sup; 

            await this.setState({value: "" + valor});

            if(this.props.check.tolerancia < 0 || this.props.check.tolerancia == 0){
                this.validateValue(valor, (this.props.check.tolerancia + this.props.check.tolerancia_inf).toFixed(2), (this.props.check.tolerancia + this.props.check.tolerancia_sup).toFixed(2));
            }else if(this.props.check.tolerancia > 0){
                this.validateValue(valor, (this.props.check.tolerancia - this.props.check.tolerancia_inf).toFixed(2), (this.props.check.tolerancia + this.props.check.tolerancia_sup).toFixed(2));
            }else{
                valor.length > 0 && this.setState({status: 'accepted'});
                this.props.onChange && this.props.onChange(this.props.check.id, valor, true, "numero");
            }
            
            // this.validateValue(valor, limInf, limSup);
        }
    }

    async validateValue(valor, limInf, limSup){
        if(valor.length == 0){
            this.setState({status: "none"});
            this.props.onChange && this.props.onChange(this.props.check.id, "", false, "numero");
        }else{
            valor = Number(valor);
            valor >= limInf && valor <= limSup ? this.setState({status: "accepted"}) : this.setState({status: "rejected"});
        
            this.props.onChange && this.props .onChange(this.props.check.id, valor, valor >= limInf && valor <= limSup ? true : false, "numero");
        }
    }

    async julianOnChange(evt) {
        let text =  evt.nativeEvent.text;
        text.length == 0 && this.setState({status: 'none'});
        if(text.length == 0){
            text = "";
        }

        
        this.setState({value: text});
        let valid = /^[0-9]{2}-[0-9]{3}$/g.test(text);
        text = text.toString().replace("-", ".");
        console.log("TEXTO DE JULIAN EN INSPECTION", text)
        let status = valid ? 'accepted' : 'rejected';
        this.setState({status: status});
        this.props.onChange && this.props.onChange(this.props.check.id, text, valid, "juliano");
    }

    async txtonChange(evt){
        let text =  evt.nativeEvent.text;
        text.length == 0 && this.setState({status: 'none'});
        if(text.length == 0){
            text = "";
        }
        await this.setState({value: text});
    
        if(this.props.check.tolerancia < 0 || this.props.check.tolerancia == 0){
            this.validateValue(text, (this.props.check.tolerancia + this.props.check.tolerancia_inf).toFixed(2), (this.props.check.tolerancia + this.props.check.tolerancia_sup).toFixed(2));
        }else if(this.props.check.tolerancia > 0){
            this.validateValue(text, (this.props.check.tolerancia - this.props.check.tolerancia_inf).toFixed(2), (this.props.check.tolerancia + this.props.check.tolerancia_sup).toFixed(2));
        }else{
            text.length > 0 && this.setState({status: 'accepted'});
            this.props.onChange && this.props.onChange(this.props.check.id, text, true, "numero");
        }

    }

    onCheck1(data){
        var currValue = this.state.dblCheckVal;
        currValue[0] = data;
        this.setState({ dblCheckVal : currValue });
        if(this.state.dblCheckVal.length > 1){
            this.props.onChange && this.props.onChange(this.props.check.id, this.state.dblCheckVal[0] + "." + this.state.dblCheckVal[1], data, "dblcheck");
        }
    }

    onCheck2(data){
        var currValue = this.state.dblCheckVal;
        currValue[1] = data;
        this.setState({ dblCheckVal : currValue });
        if(this.state.dblCheckVal.length > 1){
            this.props.onChange && this.props.onChange(this.props.check.id, this.state.dblCheckVal[0] + "." + this.state.dblCheckVal[1], data, "dblcheck");
        }
    }

    async onSync() {
        console.log("CHECK TAPPED", this.props.check);
        // this.props.onPress && this.props.onPress(this.props.check);
        if(this.props.check.instrumento && this.props.check.instrumento.characteristic){
            await this.loadInstrument();
            if(!this.state.peripheral) {
                // setTimeout(()=>{
                    Alert.alert(I18n.t('qualityInspection_error_there_is_not') + " " + this.props.check.instrumento.title + " " + I18n.t('qualityInspection_error_sync_with_this_device'));
                    await this.setState({alertShown: true})
                // }, 500)
            } else {
                this.setState({intents: 0, syncing: true}, () => {
                    this.connect(this.state.peripheral);
                });
            }
        }
    }

    render(){
        let txtInstrument = this.props.check.instrumentLbl + "";
        let icon = null;
        let connecting = this.state.loading && <View><ActivityIndicator style={{marginLeft: 5}} animating={this.state.loading} size="small"/></View>;

        if(this.props.check.instrumento){
            const { instrumento } = this.props.check;
            if(instrumento.title == "Micr├│metro" || instrumento.title == "Micrómetro"){
                icon = <Image style={{ height: 40, width: 40, marginLeft: 5}} source={require('../../../assets/IconMicrometro.png')}/>;
            }else if (instrumento.title == "Vernier"){
                icon = <Image style={{ height: 40, width: 40, marginLeft: 5}} source={require('../../../assets/IconVernier.png')}/>;
            }else if (instrumento.title == "Reloj Digital"){
                icon = <Image style={{ height: 40, width: 40, marginLeft: 5}} source={require('../../../assets/IconRDigital.png')}/>;
            }
        }

        let loading = this.props.check.input_type != "check" ?
        <View style={{flexDirection: "row"}}>
            <View>
                <LabeledText label={I18n.t('qualityInspection_instrumento')} text={txtInstrument} />
            </View>
            {this.props.check && this.props.check.instrumento && this.props.check.instrumento.characteristic && <View style={{flexDirection: "row"}}>
                {connecting}
                {/* {this.state.connected ? <Image style={{width: 40, height: 40}} source={require('../../../assets/bton.png')}/>: <Image style={{width: 20, height: 20}} source={require('../../../assets/btoff.png')}/>}
                {this.state.failure && <Image style={{width: 20, height: 20}} source={require('../../../assets/btoff.png')}/>} */}
            </View>}
        </View> :
        <LabeledText label={I18n.t('qualityInspection_instrumento')} text={txtInstrument} />;
        let input = <InputComponent onChange={(event) => this.txtonChange(event)} editable={true} status={this.state.status} value={this.state.value}/>;
        if(this.props.check.input_type == "check") {
            input = <OkNoOk onChange={this.onCheckBox} />
        }else if(this.props.check.input_type == "dblcheck"){
            input = <View><View><Text style={styles.checktext}>{I18n.t('qualityInspection_height')}</Text><OkNoOk onChange={this.onCheck1}/></View><View style={{height: 10}}/><View><Text style={styles.checktext}>{I18n.t('qualityInspection_width')}</Text><OkNoOk onChange={this.onCheck2}/></View></View>
        } else if(this.props.check.input_type == "juliano") {

            // /^[0-9]{2}-[0-9]{3}$/g
            input = <InputComponent onChange={(event) => this.julianOnChange(event)} editable={true} status={this.state.status} value={this.state.value}/>;
        }

        let topTag = null;
        if(this.props.check.desviacion) {
            topTag = (
                <View style={styles.topTag}>
                    <Text style={styles.topTagText}>{upperCase(I18n.t('qualityInspection_desviacion'))}</Text>
                </View>
            );
        }

        let connected = null;

        if(!this.state.loading){
            if(this.state.connected && this.props.check && this.props.check.instrumento && this.props.check.instrumento.characteristic){
                connected = <View><Image style={{width: 20, height: 20}} source={require('../../../assets/bton.png')}/></View>;
            }else if(!this.state.connected && this.props.check && this.props.check.instrumento &&  this.props.check.instrumento.characteristic){
                connected = <View><Image style={{width: 20, height: 20}} source={require('../../../assets/btoff.png')}/></View>;
            }
        }else{
            // connected = <View><ActivityIndicator style={{marginLeft: 5}} animating={true} size="small"/></View>;
        }

        if(!this.props.active && this.props.check.instrumento && this.props.check.instrumento.characteristic){
            connected = <View><Image style={{width: 20, height: 20}} source={require('../../../assets/btoff.png')}/></View>;
        }

        let failure = null;

        if(this.state.failure && this.props.check && this.props.check.instrumento && this.props.check.instrumento.characteristic){
            //failure = <View><Image style={{width: 20, height: 20}} source={require('../../../assets/btoff.png')}/></View>;
        }

        if(this.props.current && !this.state.syncing && !this.state.alertShown) {
            this.onSync()
        } 
    
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={async ()=>{
                    if(!this.props.current) {
                      this.props.onPress && this.props.onPress(this.props.check);
                    }
                    // this.onSync();
                }}>
                {topTag}
                <View style={{padding: 10}}>  
                <View style={{flexDirection: "row"}}>
                    <View style={{width: "85%"}}><NumberedTitle number={this.props.check.numero || ""} text={this.props.check.caracteristica} /></View>
                    <View style={{width: "15%"}}>{icon}</View>
                </View>
                <LabeledText label={I18n.t('qualityInspection_referencia')} text={this.props.check.referencia} />
                <LabeledText label={I18n.t('qualityInspection_especif')} text={this.props.check.especificacion} />
                <View style={{flexDirection: "row"}}>
                    {loading}
                    {connected}
                    {failure}
                </View>
                <CardDivider />
                {input}
                <Text>{this.props.active}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}