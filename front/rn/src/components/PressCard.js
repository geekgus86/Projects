import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { SensaiButton } from './'
import { colors } from '../styles/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import I18n from '../i18n/i18n'

export const PressCard = (props) => {

    let { type, name } = props.press
    const checkboxStyle = {
        width: 36,
        height: 36,
        borderRadius: 6,
        backgroundColor: colors.white,
        borderStyle: "solid",
        borderWidth: 1.5,
        borderColor: colors.azure,
      };
    let selectedStyle = props.selected ? { backgroundColor: colors.azure } : {}
    return (
        
        <View style={styles.mainContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.leftTextType}>{type} <Text style={styles.leftTextName}>{name}</Text></Text>
                {/*
                <View>
                    <Text style={styles.statusText}><Icon name='circle' size={10} color={colors.darkMint} /> {I18n.t('machine_okStatus')}</Text>
                </View>*/
                }
            </View>
            <View style={styles.rightContainer}>
                {/* <SensaiButton
                    text={I18n.t('connect')}
                    buttonStyle={styles.buttonSpacer}
                    loading={false}
                    sm={true}
                    onPress={props.onPress}
                /> */}
                <TouchableWithoutFeedback onPress={props.onPress}>
                    <View style={[styles.checkboxContainer]}>
                        <View style={[checkboxStyle, selectedStyle]}>
                            <Icon name="check" style={styles.checkbox} size={32} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = {
    mainContainer: {
        flexWrap: 'wrap',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    leftContainer: {
        //backgroundColor: 'red',
        width: "85%",
        justifyContent: "center"
    },
    checkbox: {
        color: colors.white
      },
    checkboxLabel: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "center",
        color: "#243746",
        marginRight: 5
      },
    checkboxContainer: {
        
    },
    statusText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        letterSpacing: 0,
        color: colors.darkGreyBlue,
    },
    leftTextType: {
        fontFamily: 'Gotham Rounded',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        letterSpacing: 0,
        color: colors.darkGreyBlue
    },
    leftTextName: {
        fontFamily: 'Gotham Rounded',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        color: colors.darkGreyBlue
    },
    rightContainer: {
        width: "15%",
        paddingVertical: 10
    },
}