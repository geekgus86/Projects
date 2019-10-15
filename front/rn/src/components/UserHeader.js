import React, { PureComponent } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '../styles/theme'
import Constants from '../Constants'
import { store } from '../store'
import config from '../../src/lib/config'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundedImage: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: colors.white,
        borderRadius: 35,
    },
    userNameText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: colors.white,
        marginTop: 10,
    },
    roleText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: colors.azure,
        marginTop: 5,
    }
})

export class UserHeader extends PureComponent {
    constructor(props) {
        super(props)
        this.onSettingsPressed = this.onSettingsPressed.bind(this)
    }

    onSettingsPressed() {
        this.props.navigation.navigate('Settings')
    }

    render() {
        const state = store.getState()
        const { container, roundedImage, userNameText, roleText } = styles
        const { info } = this.props.session
        const { name, apellidoPaterno, apellidoMaterno, aro, foto } = this.props.session.profile
        let source = ''
        if (foto.thumbnailUrl === "file/get/undefined") {
            source = false
        } else {
            source = `http://${state.session.domain}.sensai.net/${foto.thumbnailUrl}`
        }
        let background = { backgroundColor: colors.darkGreyBlue }
        if (this.props.failure === true) {
            if(this.props.report.issue_type== 5){
                background = { backgroundColor: colors.black }
            }else if(this.props.report.report_type == 2){
                background = { backgroundColor: '#ff6d10' }
            }else{
                background = { backgroundColor: colors.tomato }
            }
        }
        return (
            <View>
                <View style={[container, background]}>
                    <View>
                        <Image style={roundedImage} source={require('../assets/icon.png')} />
                        {/*!source ?
                            <Image style={roundedImage} source={require('../assets/icon.png')} />
                            :
                            <Image
                                resizeMode="cover"
                                style={roundedImage} source={{ uri: source }} />
                        */}
                    </View>
                    <Text style={userNameText}>{[name, apellidoPaterno, apellidoMaterno].join(' ').trim()}</Text>
                    <Text style={{fontSize: 11, marginTop: 10, color: 'white',flex:1,textAlign: 'center', justifyContent: 'center',alignItems: 'center'}}>
                        Version {config['version']}
                    </Text>
                    {/*<Text style={roleText}>{aro.alias}</Text>*/}
                </View>
            </View>
        )
    }
}