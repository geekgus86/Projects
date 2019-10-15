import React, { PureComponent } from "react";
import { Image, TouchableHighlight, Alert, View, Text, AsyncStorage, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, RefreshControl, Modal, ActivityIndicator, ListView, Dimensions, NativeModules, NativeEventEmitter, NativeAppEventEmitter,AppState, Platform, PermissionsAndroid } from 'react-native';
import { SensaiCard } from "../../../components";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../styles/theme";
import API from '../../../lib/Network';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectDevice, startBleNotification } from "../actions";
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';
import ab2str from 'arraybuffer-to-string';

import { upperCase } from '../../../helpers'
import { SensaiButton } from '../../../components'
import { store } from '../../../store'
import I18n from "../../../i18n/i18n";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class InstrumentCard extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      devices: [],
      modal: false,
      scanning:false,
      peripherals: new Map(),
      appState: '',
      peripheral: null,
      peripheralInfo: null,
      numOfPeripherals: 0,
      selectedDevice: null,
      checked: false,
      value: this.props.value,
      connecting: false,
      subscribing: true,
      failure: false,
      intentos: 0
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.showDevicesList = this.showDevicesList.bind(this);
    this.notificationBtn = this.notificationBtn.bind(this);
    this.bondDevice = this.bondDevice.bind(this);
  }

  async componentWillMount(){
    await BleManager.start({showAlert: true});
    var peripheral = JSON.parse(await AsyncStorage.getItem(this.props.device.title));
    if(peripheral){
      await this.setState({peripheral});
      this.test(peripheral);
    }else{
      this.setState({subscribing: false})
    }
  }

  componentWillUnmount() {
      this.handlerDiscover.remove();
      this.handlerStop.remove();
      this.handlerDisconnect.remove();
      this.handlerUpdate.remove();
  }

  handleStopScan() {
      console.log('Scan is stopped');
      console.log("PERIPHERALS", this.state.peripherals);
      this.setState({ scanning: false, numOfPeripherals: this.state.peripherals.size });
  }

  handleDisconnectedPeripheral(data) {
    console.warn("Disconnected", data);
    if(this.state.peripheral && data.peripheral == this.state.peripheral.id){
      this.setState({connecting: true});
    }
    this.test(this.state.peripheral);
  }
  
  handleAppStateChange(nextAppState) {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!')
        BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
          console.log('Connected peripherals: ' + peripheralsArray.length);
        });
      }
      this.setState({appState: nextAppState});
  }
  handleUpdateValueForCharacteristic(data) {
    //console.warn('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    if(this.state.peripheral && data.peripheral == this.state.peripheral.id){
      this.setState({
        value: ab2str(data.value, "utf-8"),
        subscribing: false
      });
    }
  } 

  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
    if (results.length == 0) {
        console.log('No connected peripherals')
    }
    var peripherals = this.state.peripherals;
    for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
    }
    });
}
showDevicesList(item){
    this.setState({modal: true, connecting: false});
    this.startScan();
}

handleDiscoverPeripheral(peripheral){
    var peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id) && peripheral.name){
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })
    }
}

startScan() {
  if (!this.state.scanning) {
    this.setState({peripherals: new Map()});
    BleManager.scan([], 3, false,{scanMode: 2}).then((results) => {
      console.log('Scanning...');
      this.setState({scanning:true});
    });
  }
}

async bondDevice(peripheralId){
    try{
        await BleManager.createBond(peripheralId);
        await BleManager.connect(peripheralId);
    }catch(error){
        this.bondDevice(peripheralId);
    }
}


async test(peripheral) {
  this.setState({connecting: true, failure: false});
    if (peripheral){
      try{
        let peripherals = this.state.peripherals;
        let p = peripherals.get(peripheral.id);
        if (p) {
          p.connected = true;
          peripherals.set(peripheral.id, p);
          this.setState({peripherals, peripheral});
          //await AsyncStorage.setItem(this.props.device.title, JSON.stringify(peripheral));
        }

        var peripheralInfo = await BleManager.retrieveServices(peripheral.id);
        console.log("SERVICES", peripheralInfo);
        console.warn("SERVICES", peripheralInfo);
        this.setState({peripheralInfo, connecting: false, subscribing: true});

        setTimeout(() => this.notificationBtn(), 2000);
      }catch(err){
        console.log("ERROR", err);
        this.setState({connecting: false, failure: true, subscribing: false});
        Alert.alert(I18n.t('qualityInspection_error_connect'), I18n.t('qualityInspection_error_restart_bt'));
      }
    }
}

  async notificationBtn(){

    //12 -> PRESIONAR BOTON APP PARA REGISTRAR MEDIDA -- WRITEWITHOUTRESPONSE READ CHARACTERISTIC
    //13 -> PRESIONAR BOTON INSTRUMENTO PARA REGISTRAR MEDIDA -- NOTIFY READ CHARACTERISTIC

    await BleManager.startNotification(this.state.peripheral.id, this.props.device.service, this.props.device.characteristic);
    // await this.props.startBleNotification(this.state.peripheral.id, this.props.device.service, this.props.device.characteristic);
    console.log("DEVICE TITLE TO SAVE", this.props.device.title);
    console.log("PERIPHERAL TO SAVE", peripheral);
    await AsyncStorage.setItem(this.props.device.title, JSON.stringify(peripheral));
    //await BleManager.startNotification(this.state.peripheral.id, this.props.device.service, this.props.device.characteristic);
    this.setState({subscribing: false, connecting:false, checked: true, modal: false});

  }

  renderScanItem(item){
    return (
      <TouchableHighlight onPress={() => this.test(item) }>
        <SensaiCard>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10, fontWeight: "400"}}>{item.name}</Text>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
        </SensaiCard>
      </TouchableHighlight>
    );
  }

  renderScanFooter(){
    let loading = this.state.scanning && <ActivityIndicator size="small" color="#0000ff" />;
    let numOfPeripherals = !this.state.scanning && <Text>{this.state.numOfPeripherals} dispositivos encontrados</Text>
    let connecting = this.state.connecting && <Text>Conectando dispositivo...</Text>
    return(
      <View style={{marginTop: 15}}>
        {loading}
        {numOfPeripherals}
        {connecting}
      </View>
    );
  }

  renderScanHeader(){
    return(
      <View style={[styles.row, {marginBottom: 15}]}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_bt_devices'))}</Text>
            <Text style={styles.subHeaderText}>{I18n.t('qualityInspection_on_device')}</Text>
        </View>
        <SensaiButton
          text='Actualizar'
          buttonStyle={{ margin: 10 }}
          onPress={() =>this.startScan()} />
        {/* <TouchableOpacity onPress={() => this.startScan()}><View style={styles.headerBtnScan}><Text style={styles.btnScanText}>Actualizar</Text></View></TouchableOpacity> */}
      </View>
    );
  }

  closeModal(){
      this.setState({modal: false})
  }

  componentDidMount(){
    AppState.addEventListener('change', this.handleAppStateChange);

    //BleManager.start({showAlert: true});

    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        
        if (result) {
        
          console.log("Permission is OK");
        
        } else {
          
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            
            if (result) {
            
              console.log("User accept");
            
            } else {

              console.log("User refuse");
            
            }
          
          });
        
        }
      
      });
    
    }
  
  }

  callOnPress = async () => {
    var peripheral = JSON.parse(await AsyncStorage.getItem(this.props.device.title));
    if(peripheral){

      Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_bt_connect_another'),[
        {text: I18n.t('alert_yes'), onPress: async () => {
          await BleManager.disconnect(peripheral.id);
          this.showDevicesList()
        }},
        {text: I18n.t('qualityInspection_bt_use_previous'), onPress: async () => {

          await this.setState({peripheral, subscribing: true});
          this.test(peripheral);

        }}
      ]);
    }else{
      this.showDevicesList();
    }
    this.setState({selectedDevice: this.props.device});
  }

  render() {
    
    const list = Array.from(this.state.peripherals.values());
    const dataSource = ds.cloneWithRows(list);

    const {
      twoColumns,
      headerContainer,
      circle,
      circleText,
      headerText,
      textContainer,
      text
    } = styles;
    let disabledStyle = {};
    if (this.props.checked !== true) {
      disabledStyle = {
        backgroundColor: "#CCCCCC"
      };
    }
    if(this.props.disabled === true) {
      disabledStyle = {
        backgroundColor: colors.silver
      };
    }
    const gs = store.getState();
    return (
      <SensaiCard>
          <TouchableWithoutFeedback>

            <View>

              <View style={{width: "93%", flexDirection: 'row', justifyContent: 'center', marginLeft: 10}}>
                <Image source={{uri:`https://${gs.session.domain}.sensai.net/${this.props.thumbnailUrl}`}} style={styles.cardImage}/>
              </View>

              <ActivityIndicator animating={this.state.subscribing} size="small"/>

              <View style={headerContainer}>
                
                {this.state.checked ? <View style={[circle, disabledStyle, {marginLeft: "45%"}]}><Icon name={"check"} size={17} color={"green"} /></View> : <View style={[circle, disabledStyle, {marginLeft: "45%"}]}><Icon name={"close"} size={17} color={"grey"} /></View>}
                <Text style={headerText}>{this.props.title}</Text>
                <Text style={{textAlign: 'center'}}>[{this.state.value}]</Text>
                <SensaiButton buttonStyle={{marginTop: 10}} text={I18n.t('qualityInspection_search')} onPress={this.callOnPress.bind(this)}/>

              </View>

            </View>

          </TouchableWithoutFeedback>
          <Modal
          animationType="slide"
          visible={this.state.modal}
          onRequestClose={() => this.closeModal()}>
            <View style={{padding: 25}}>
              <ListView
                enableEmptySections={true}  
                dataSource={dataSource}
                renderHeader={() => this.renderScanHeader()}
                renderFooter={() => this.renderScanFooter()}
                renderRow={(item) => this.renderScanItem(item)}/>
            </View>
          </Modal>
      </SensaiCard>
    );
  }
}

const styles = StyleSheet.create({
  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
  headerContainer: {
    borderRadius: 5,
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
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.darkGreyBlue
},
  textContainer: {
    marginTop: 10,
    width: '90%'
  },
  text: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#243746"
  },
  cardImage: {
    height: 150,
    width: 150,
  },
  scanItem: {
      padding: 15,
      borderColor: "#cecece",
      borderWidth: 1
  },
  ScanText: {
      fontSize: 18,
      fontWeight: "400",
      paddingTop: 8
  },
  headerScan: {
      width: "75%"
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({connectDevice, startBleNotification}, dispatch);
}

export default connect(mapDispatchToProps, null)(InstrumentCard);











//DUDAS SOBRE COMPATIBILIDAD
// -- Que CARACTERISTICAS DE HARDWARE del dispositivo ANDROID son las mejores para poder leer datos de los instrumentos?  *En caso de que en realidad se ocupe un dispositivo android en especifico para leer los 3 instrumentos al mismo tiempo*.
//   -- Caracteristicas tales como la version de Bluetooth del dispositivo android, API Level.
// -- Podemos mantener 3 instrumentos conectados al dispositivo android al mismo tiempo? en caso de que no... un dongle seria la solucion?
// -- Se puede leer datos de 3 instrumentos SYLVAC al mismo tiempo en android?
// -- Cada cuando es necesario reiniciar el bluetooth del instrumento para poder leer datos de el?
// -- Se puede reconectar el instrumento al dispositivo android despues de que se pierde la conexion sin tener que reiniciar el instrumento de medicion, en caso de que si... Como.


// //DUDAS SOBRE CONEXION
// "PREFERENTEMENTE QUE NOS PASEN CODIGO FUENTE"
// EN CASO DE QUE SI QUIERAN PASAR CODIGO FUENTE, APARTE DE QUE NOS LO PASEN QUE NOS EXPLIQUEN LO SIGUIENTE SI ES POSIBLEXdxdDDDdxDd:

// -- Que flujo debemos seguir para vincular el instrumento luego conectarnos al instrumento y al final leer datos del instrumento.
// -- Como podemos resetear el instrumento a nivel codigo.
// -- Como podemos resetear el bluetooth del instrumento a nivel codigo.

// EN CASO DE QUE NO NOS QUIERAN PASAR CODIGO FUENTE:
// -- Que nos pasen el apk.
// -- Que nos exliquen el flujo de como nos conectamos al instrumento y como leemos datos del mismo.

// //DUDAS SOBRE COMPORTAMIENTO POR SI ES NECESARIO REPLICAR EL MISMO EN NUESTRAS APLICACIONES
// -- Al tratar de conectar un instrumento con el app de sylvac que esta en la play store, aveces el dispositivo se reinicia solo y se conecta, es necesario replicar este comportamiento?
// -- Podemos interactuar con el instrumento de medicion aunque no estemos conectados a el? por ejemplo: reiniciar el instrumento o reiniciar el  bluetooth del instrumento sin estar conectados al instrumento.

// //POR ULTIMO, SI PUEDEN QUE NOS DIGAN SOBRE MEJORES PRACTICAS A IMPLEMENTAR PARA USAR SUS INSTRUMENTOS VIA BLUETOOTH