import React from 'react'
import { Text, View } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { colors } from '../../../styles/theme'
import { SensaiCard, SensaiButton} from "../../../components";
import moment from 'moment-timezone'
import I18n from '../../../i18n/i18n'


export default ParoRegisterCard = (props) => {
    //let creationDate = moment(props.date).tz('America/Monterrey').format('DD MMMM, h:mm A')
    let button = null;
    let iconColor = colors.azure
    let iconName = "clock"
    if(props.showButton){
        button = <SensaiButton xs={true} text={I18n.t('register_assistance')} />
    }
    if(props.checkIcon){
        iconColor = colors.green
        iconName = "check"
    }
    if(props.ban){
        iconColor = colors.orangeRed
        iconName = "ban"
    }
    return (
        <SensaiCard>
            <View style={styles.twoColumns}>
                <View style={styles.twoColumns}>
                    <View style={[styles.iconCircle, { backgroundColor: iconColor, marginRight: 12 }]}>
                        <LineIcon name={iconName} size={20} color={colors.white} />
                    </View>
                    <Text style={styles.failureText}>{props.text}:</Text>
                </View>
                <Text style={styles.timeValueText}>{props.time}</Text>
            </View>
        </SensaiCard>
    )
}

const styles = {
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    failureText: {
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#323d50"
    },
    timeValueText: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        color: "#243746" 
    }
}