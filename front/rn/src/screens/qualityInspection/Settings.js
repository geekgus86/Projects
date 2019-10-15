import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  ScrollView,
  AppState,
  Dimensions,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';
import ab2str from 'arraybuffer-to-string';
import API from '../../lib/Network';
import I18n from '../../i18n/i18n'

const Globals = {
    HOST: "http://testing.sensai.net"
}
const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const dsDevices = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class HomeScreen extends Component {
  constructor(){
    super()

    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: '',
      peripheral: null,
      peripheralInfo: null,
      devices: dsDevices.cloneWithRows([]),
      modal: false,
      numOfPeripherals: 0,
      selectedDevice: null
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    // this.readData = this.readData.bind(this);
    this.listener = this.listener.bind(this);
    this.showDevicesList = this.showDevicesList.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false});

    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );



    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
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

  componentWillUnmount(){
      bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
      bleManagerEmitter.removeListener('BleManagerStopScan', this.handleStopScan );
      bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
      bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
  }

  async componentWillMount(){
    var response = await API.get('/instrumentos?where={"physical":true}');
    for(var i = 0; i < response.length; i++){
      response[i].paired = false;
      response[i].peripheral = null; 
      response[i].dataIndex = i;
    }
    response && this.setState({devices: this.state.devices.cloneWithRows(response)});
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

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data) {
    //console.warn('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    console.warn('Data value', ab2str(data.value, "utf-8"));
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false, numOfPeripherals: this.state.peripherals._mapData.length });
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        this.setState({scanning:true});
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

  handleDiscoverPeripheral(peripheral){
    var peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id) && peripheral.name){
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })
    }
  }

async test(peripheral) {

    if (peripheral){
      if (peripheral.connected){
        //BleManager.disconnect(peripheral.id);
        this.readData(peripheral.id, peripheralInfo);
      }else{
        await BleManager.connect(peripheral.id);
        let peripherals = this.state.peripherals;
        let p = peripherals.get(peripheral.id);
        if (p) {
          p.connected = true;
          peripherals.set(peripheral.id, p);
          this.setState({peripherals, peripheral});
        } 

        var peripheralInfo = await BleManager.retrieveServices(peripheral.id);
        this.setState({peripheralInfo});

        setTimeout(() => this.notificationBtn(), 2000);
        
      }
    }
  }

  /*async readData(peripheralID, peripheralInfo){

    peripheralInfo.characteristics.forEach( async (charac) => {
      console.warn("cHARAC", charac.service, charac.characteristic);
    });

    try {
      var resultData = await BleManager.read(peripheralID, "c1b25000-caaf-6d0e-4c33-7dae30052840", 'c1b25013-caaf-6d0e-4c33-7dae30052840');
      console.warn('RESULTDATA', resultData);
      console.warn("BUFFER DECODED", ab2str(resultData, 'utf-8'));
    } catch (err) {
        
    }
    setTimeout(() => { this.notificationBtn() }, 2000);
  }*/

  async notificationBtn(){
    BleManager.startNotification(this.state.peripheral.id, this.state.selectedDevice.service, 'c1b25010-caaf-6d0e-4c33-7dae30052840').then(()=>{
      console.warn("notification started");
      BleManager.startNotification(this.state.peripheral.id, this.state.selectedDevice.service, this.state.selectedDevice.characteristic).then(async ()=>{
        console.warn("notification started");
        var data = {
            service: this.state.selectedDevice.service,
            characteristic: this.state.selectedDevice.characteristic,
            deviceId: this.state.selectedDevice.id
        }
        var selectedDevice = this.state.selectedDevice;
        selectedDevice.paired = true;
        await this.setState({selectedDevice});
        await AsyncStorage.setItem("peripheral-" + this.state.peripheral.id, JSON.stringify(data));
      }).catch((err) => {
        console.warn("notification failed13", err);
      }); 
    }).catch((err) => {
      console.warn("notification failed13", err);
    });
  }

  async writeBtn(){

    BleManager.writeWithoutResponse(this.state.peripheral.id, "c1b25000-caaf-6d0e-4c33-7dae30052840", 'c1b25010-caaf-6d0e-4c33-7dae30052840', stringToBytes("?\r")).then(()=>{
      //12 -> PRESIONAR BOTON APP PARA REGISTRAR MEDIDA -- WRITEWITHOUTRESPONSE READ CHARACTERISTIC
      //13 -> PRESIONAR BOTON INSTRUMENTO PARA REGISTRAR MEDIDA -- NOTIFY READ CHARACTERISTIC
      console.warn("WRITE started 13");
      
    }).catch((err) => {

      console.warn("WIRTE failed13", err);

    });

  }

  listener(data){

    console.warn("IN LISTENER", data);

  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const dataSource = ds.cloneWithRows(list);


    return (
      <View style={styles.container}>
        <ListView 
          dataSource={this.state.devices}
          renderRow={(item) => this.renderDevice(item)}
          renderFooter={() => <SensaiButton text={I18n.t('profile_logoutButton')} buttonStyle={{margin: 10}}/>}
        />
        <View>
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
                renderRow={(item) => this.renderScanItem(item)}
              />
            </View>
          </Modal>
        </View>
      </View>
    );
  }

  closeModal(){
    this.setState({modal: false});
    var index = this.state.devices.getRowData(0, this.state.selectedDevice.dataIndex);
    console.log("DEVIVCE", index);
  }

  renderScanItem(item){
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => this.test(item) }>
        <View style={[styles.row, {backgroundColor: color}, styles.scanItem]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10, fontWeight: "400"}}>{item.name}</Text>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderScanFooter(){
    let loading = this.state.scanning && <ActivityIndicator size="small" color="#0000ff" />;
    let numOfPeripherals = !this.state.scanning && <Text>{this.state.numOfPeripherals} {I18n.t('qualityInspection_found_devices')}</Text>
    return(
      <View style={{marginTop: 15}}>
        {loading}
        {numOfPeripherals}
      </View>
    );
  }

  renderScanHeader(){
    return(
      <View style={[styles.row, {marginBottom: 15}]}>
        <View style={styles.headerScan}><Text style={styles.ScanText}>{I18n.t('qualityInspection_found_devices')}</Text></View>
        <TouchableOpacity onPress={() => this.startScan()}><View style={styles.headerBtnScan}><Text style={styles.btnScanText}>{I18n.t('qualityInspection_s_update')}</Text></View></TouchableOpacity>
      </View>
    );
  }

  showDevicesList(item){
    this.setState({modal: true});
    this.startScan();
  }

  renderDevice(item){
    let URL = Globals.HOST + '/' + item.picture.thumbnailUrl;
    var paired = false;
    const device = item;

    let icon = item.paired ? <Image source={{uri: "https://cdn4.iconfinder.com/data/icons/ios7-active-tab/512/ok-512.png"}} style={styles.ImageIcon}/> : <Image source={{uri: "https://valion.ch/wp-content/uploads/2017/06/Kreuz.png"}} style={styles.ImageIcon}/>;
    let testButton = paired && <View style={styles.testBtn}><Text style={styles.textTest}>TEST</Text></View>
    let value = paired && <Text style={styles.textValue}>--.--</Text>;
    return(
      <TouchableOpacity onPress={() => {this.showDevicesList(item); this.setState({selectedDevice: device})}}>
        <View style={styles.card}>

          <View style={styles.row}>
            <Image source={{uri: URL}} style={styles.cardImage}/>
            <View style={styles.indicators}>
              {icon}
              {testButton}
              {value}
            </View>
          </View>
          
          <Text style={styles.deviceTitle}>{item.instrumentLbl}</Text>
          
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
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
  headerBtnScan: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  btnScanText: {
    fontSize: 18,
    fontWeight: "400",
    color: "white"
  },
  ImageIcon: {
    width: 30,
    height: 30,
    marginBottom: 10
  },
  card: {
    borderRadius: 5,
    marginTop: 15,
    width: "100%",
    height: 230,
    overflow: "hidden",
    borderColor: "#cecece",
    borderWidth: 1
  },
  testBtn: {
    padding: 10,
    borderColor: "#cecece",
    borderWidth: 0.5,
    width: 60,
    marginBottom: 10
  },
  textTest: {
    textAlign: "center"
  },
  cardImage: {
    width: "50%", 
    height: 150
  },
  indicators: {
    width: "50%",
    height: 150,
    marginLeft: "20%",
    justifyContent: "center"
  },
  deviceTitle: {
    lineHeight: 50,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "600"
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height,
    padding: 20
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
});