import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colors, theme } from '../styles/theme'
import IconFeather from 'react-native-vector-icons/Feather'
import { goBack } from '../helpers'

import RunningMachine from './RunningMachine';

export class NavHeader extends PureComponent {
    callOnSettingsPress() {
        this.props.onSettingsPress && this.props.onSettingsPress()
    }
    render() {
        const { header, titleWrapper, title, button, buttonWrapper, right, left } = styles
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
        let hitSlop = { top: 10, left: 10, bottom: 10, right: 10 }
        let settings = null;
        if (this.props.settings) {
            settings = (
                <TouchableOpacity style={[button, background]} onPress={this.callOnSettingsPress.bind(this)} hitSlop={hitSlop}>
                    <IconFeather name='settings' size={30} color={colors.white} />
                </TouchableOpacity>
            )
        }
        let back = null
        if (this.props.enableBack) {
            back = (
                <TouchableOpacity style={[button, background]} onPress={(e) => {goBack()}} hitSlop={hitSlop}>
                    <MaterialIcon name='arrow-back' size={30} color={colors.white} />
                </TouchableOpacity>
            )
        }

        let running = null;
        if (this.props.qualityExtra){
            running = <RunningMachine/>
        }
        return (
            <View style={[header, background]}>
                <View style={[buttonWrapper, left]}>
                    {back}
                    {running}
                </View>
                <View style={titleWrapper}>
                    <Text style={[theme.headerText, title]}>{this.props.title}</Text>
                </View>
                <View style={[buttonWrapper, right]}>
                    {settings}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: (Platform.OS === 'ios' ? 76 : 48),
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    titleWrapper: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {        
        marginBottom: 12
    },
    button: {
        height: 34,
        width: 34,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 12,
    },
    right: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    left: {
        alignItems: 'flex-start',
        marginLeft: 10,
    },
})