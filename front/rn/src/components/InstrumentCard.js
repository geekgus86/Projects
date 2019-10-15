import React, { PureComponent } from "react";
import { Image, TouchableHighlight, Alert, View, Text, AsyncStorage, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, RefreshControl, Modal, ActivityIndicator, ListView, Dimensions, NativeModules, NativeEventEmitter, NativeAppEventEmitter,AppState, Platform, PermissionsAndroid } from 'react-native';
import { SensaiCard } from "./SensaiCard";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/theme";
import API from '../lib/Network';
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';
import ab2str from 'arraybuffer-to-string';
import { upperCase } from '../helpers'
import { SensaiButton } from '../components'
import { store } from '../store'
import I18n from '../i18n/i18n'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export class InstrumentCard extends PureComponent {

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
      desiredDisconnect: false,
      intents: 0,
      lastPeripherals: new Map(),
      scanAvailable: true
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.showDevicesList = this.showDevicesList.bind(this);
    this.notificationBtn = this.notificationBtn.bind(this);
    this.switchScan = this.switchScan.bind(this);
  }

  async componentWillMount(){
    await BleManager.start({showAlert: false});
    var peripheral = JSON.parse(await AsyncStorage.getItem(this.props.device.title));
    if(peripheral){
      console.log("PERIPHERAL TO LOAD", this.props.device.title);
      await this.setState({peripheral});
      this.test(peripheral);
    }else{
      this.setState({subscribing: false})
    }
  }

  async componentWillUnmount() {
      this.handlerDiscover.remove();
      this.handlerStop.remove();
      this.handlerDisconnect.remove();
      this.handlerUpdate.remove();
  }

  handleStopScan() {
      this.setState({ scanning: false, numOfPeripherals: this.state.peripherals.size, scanAvailable: true });

  }

  handleDisconnectedPeripheral(data) {
    if(this.state.peripheral && data.peripheral == this.state.peripheral.id){
      this.setState({checked: false}, () => {
        if(!this.state.desiredDisconnect){
          this.test(this.state.peripheral);
        }
      });
    }
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
          console.log('No connected peripherals');
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
      this.setState({modal: true, connecting: false, peripherals: new Map(), scanAvailable: true}, () => {
        this.startScan();
      });
  }

  handleDiscoverPeripheral(peripheral){
    if(peripheral.name && peripheral.name.startsWith("SY")){
      var peripherals = this.state.peripherals;
      if(!peripherals.has(peripheral.id)){
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }

    }
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map(), scanAvailable: false});
      BleManager.scan([], 3, true).then((results) => {
        this.setState({scanning:true, intents: 0});
      });
    }
  }


  async test(peripheral) {
    var intents = this.state.intents + 1;
    await this.setState({connecting: true, failure: false, intents});
      if (peripheral && this.state.intents <= 10){
        try{
          await BleManager.connect(peripheral.id)
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals, peripheral});
          }

          var peripheralInfo = await BleManager.retrieveServices(peripheral.id);
          this.setState({peripheralInfo, connecting: false, subscribing: true});

          setTimeout(() => this.notificationBtn(), 2000);
        }catch(err){
          if(!this.state.desiredDisconnect){
            console.log("ERROR CONNECT", err);
            this.setState({connecting: false, failure: true, subscribing: false});
            if(this.state.intents == 10){
              await BleManager.stopScan();
              Alert.alert(I18n.t('qualityInspection_error_connect'), I18n.t('qualityInspection_error_restart_bt'));
            }

            if(this.state.desiredDisconnect){
              await BleManager.removeBond(peripheral.id);
              Alert.alert(I18n.t('qualityInspection_error_connect'), I18n.t('qualityInspection_error_restart_bt'));              
            }
          }
        }
      }
  }

  async notificationBtn(){

    //12 -> PRESIONAR BOTON APP PARA REGISTRAR MEDIDA -- WRITEWITHOUTRESPONSE READ CHARACTERISTIC
    //13 -> PRESIONAR BOTON INSTRUMENTO PARA REGISTRAR MEDIDA -- NOTIFY READ CHARACTERISTIC
    try{

      await BleManager.startNotification(this.state.peripheral.id, this.props.device.service, this.props.device.characteristic);
      await AsyncStorage.setItem(this.props.device.title, JSON.stringify(this.state.peripheral));
      await BleManager.stopScan();
      this.setState({subscribing: false, connecting:false, checked: true, modal: false, desiredDisconnect: false, intents: 0});
    }catch(ex){
      console.warn("EX", ex);
    }

  }

  renderScanItem(item){
    return (
      <TouchableHighlight onPress={() => {this.setState({intents: 0}, () => this.test(item))} }>
        <SensaiCard>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10, fontWeight: "400"}}>{item.name}</Text>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
        </SensaiCard>
      </TouchableHighlight>
    );
  }

  renderScanFooter(){
    let loading = this.state.scanning && <ActivityIndicator size="small" color="#0000ff" />;
    let numOfPeripherals = !this.state.scanning && <Text>{this.state.numOfPeripherals} {I18n.t('qualityInspection_found_devices')}</Text>
    let connecting = this.state.connecting && <Text>{I18n.t('qualityInspection_connecting_device')}...</Text>
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
          text={I18n.t('qualityInspection_s_update')}
          buttonStyle={{ margin: 10 }}
          onPress={async () =>  this.state.scanAvailable && this.switchScan()} />
        {/* <TouchableOpacity onPress={() => this.startScan()}><View style={styles.headerBtnScan}><Text style={styles.btnScanText}>Actualizar</Text></View></TouchableOpacity> */}
      </View>
    );
  }

  async switchScan(){
    await this.setState({scanAvailable: false}, async () => {
      await BleManager.stopScan(); 
      setTimeout(() => {
        this.startScan();
      }, 500);
    });
  }

  async closeModal(){
      //await BleManager.stopScan();
      this.setState({modal: false})
  }

  componentDidMount(){
    AppState.addEventListener('change', this.handleAppStateChange);
    console.log("CHARACTERISTIC", this.props.device.characteristic);
    console.log("SERVICE", this.props.device.service);
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
    await BleManager.stopScan();
    this.startScan();
    var peripheral = JSON.parse(await AsyncStorage.getItem(this.props.device.title));
    if(peripheral){

      Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_bt_connect_another'),[
        {text: I18n.t('alert_yes'), onPress: async () => {
          this.showDevicesList()
          await this.setState({desiredDisconnect: true, intents: 0});
          await AsyncStorage.removeItem(this.props.device.title);
          await BleManager.disconnect(peripheral.id);
          await BleManager.removeBond(peripheral.id);
          await BleManager.removePeripheral(peripheral.id);
        }},
        {text: I18n.t('qualityInspection_bt_use_previous'), onPress: async () => {

          await this.setState({peripheral, subscribing: true, intents: 0});
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
                <Image source={{uri:`https://mtesting.sensai.net/apo_schulerA/api/v1/asset/assets/${this.props.thumbnailUrl}/image`}} style={styles.cardImage}/>
              </View>

              <ActivityIndicator animating={this.state.subscribing} size="small"/>

              <View style={headerContainer}>
                
                {this.state.checked? <View style={[circle, disabledStyle, {marginLeft: "45%"}]}><Icon name={"check"} size={17} color={"green"} /></View> : <View style={[circle, disabledStyle, {marginLeft: "45%"}]}><Icon name={"close"} size={17} color={"red"} /></View>}
                <Text style={headerText}>{this.props.title}</Text>
                <Text style={{textAlign: 'center'}}>[{this.state.value}]</Text>
                <SensaiButton buttonStyle={{marginTop: 10}} text={upperCase(I18n.t('qualityInspection_search'))} onPress={this.callOnPress.bind(this)}/>

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
