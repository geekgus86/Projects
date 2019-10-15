import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Image, TouchableHighlight, Alert, View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, RefreshControl, Modal, ActivityIndicator, ListView, Dimensions, NativeModules, NativeEventEmitter, NativeAppEventEmitter,AppState, Platform, PermissionsAndroid } from 'react-native'
import { colors } from '../../styles/theme'
import { logoutUser } from '../profile/actions'
import { checkOut } from '../home/actions'
import Network from "../../lib/Network";
import I18n from '../../i18n/i18n'

import BleManager from 'react-native-ble-manager';
import { stringToBytes } from 'convert-string';
import ab2str from 'arraybuffer-to-string';

import { SensaiButton, SensaiCheckbox, FailureHeader, Spinner, InstrumentCard } from '../../components/'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row"
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
    spacing:{
        height: 150
    },
    itemCard: {
        width: 100
    }
})


class SettingsUI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: [],
        }
    }

    state = {
        isLoading : true
    }

    async componentWillMount(){
        var response = await Network.get('/instruments');
        console.log("RESPONSE SETTINGS UI", response);
        if(response.data){
            var result = response.data.filter(instrument => instrument.service && instrument.service.length > 3);
            await this.setState({devices: result});
        }
        //await BleManager.start({showAlert: true});
    }

    
    render() {
        let devices = this.state.devices.map((device, key) => 
            <View key={key} style={{width: "30%"}}>
                <InstrumentCard
                    number={key}
                    title={device.title}
                    value={"000.00"}
                    thumbnailUrl={device.picture}
                    device={device}
                    />
            </View>
        );

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{I18n.t('qualityInspection_relate_instruments')}</Text>
                    </View>
                    <ScrollView style={{ marginTop: 10 }}>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                            {devices}
                        </View>
                        <SensaiButton text={I18n.t('profile_logoutButton')} buttonStyle={{margin: 10}} 
                            onPress={
                                () => {
                                    this.props.checkOut();
                                    this.props.logoutUser();
                                }
                        }/>
                        <View style={styles.spacing}/>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser, checkOut }, dispatch)
}

export default connect(null, mapDispatchToProps)(SettingsUI)