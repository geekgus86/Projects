import React, { PureComponent } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { SensaiButton } from '../components'
import Constants from '../Constants'
import I18n from '../i18n/i18n';

export class EmptyPage extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{
                    width: 80,
                    height: 80
                }} source={require('../assets/icon.png')} />
                <Text style={{ fontWeight: 'bold', width:'100%', textAlign:'center', paddingTop: 20, paddingBottom: 20 }}>{I18n.t('in_development')}</Text>
                <Text style={{
                    position: 'absolute',
                    bottom: 35,
                    right: 0,
                    margin: 10,
                    width:'100%', 
                    textAlign:'right',
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>{`v${Constants.VERSION}`}</Text>
                <Text style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 0,
                    margin: 10,
                    width:'100%', 
                    textAlign:'right',
                    fontSize: 18,
                    color: '#3974a4',
                    fontWeight: 'bold'
                }} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sensai')}>{I18n.t('update_version')}</Text>
            </View>
        )
    }
}