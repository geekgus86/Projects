import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { colors } from '../../../styles/theme'
import { SensaiCard, SensaiButton} from "../../../components";
import moment from 'moment-timezone'
import { upperCase } from '../../../helpers';
import I18n from '../../../i18n/i18n'


export default ParoRegisterCard = (props) => {
    let creationDate = props.date
    let item = props.item
    let button = null;
    if(props.showButton){
        button = <SensaiButton xs={true} text={I18n.t('register_assistance')} onPress={()=>{
            props.onPress && props.onPress();
        }} />
    }
    let areaColor = null
    let borderColor = null
    if(props.color){
        areaColor = props.color
        borderColor = (props.color === '#FFFFFF') ? colors.coolGrey : props.color
    }
    let showWo = item.show_wo
    let lblWOM = I18n.t('wo_title_row')
    let txtMaximo = (item.wo_maximo != null) ? (
        <Text style={[styles.woMaximoStyle, { fontWeight: "normal"}]}>{item.wo_maximo}</Text>
    ) : (<Text style={[styles.woMaximoStyle, { fontWeight: "bold",  color: "red"}]}>[Error: {item.wo_maximoMsg}]</Text>)

    let viewMaximo = (showWo && (item.wo_maximo != null || item.wo_maximoMsg != null)) ? (
        <View style={styles.rowStyle}>
            <Text style={[styles.woMaximoStyle, { fontWeight: "600"}]}>{lblWOM}: </Text>
            {txtMaximo}
        </View>
    ) : null;

    return (
        <SensaiCard>
            <View style={styles.twoColumns}>
                <View style={styles.twoColumns}>
                    <View style={[styles.iconCircle, { backgroundColor: props.report_type == 1 ? colors.tomato : colors.orange }]}>
                        <LineIcon name={"ban"} size={20} color={colors.white} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.eventTitle, { color: props.report_type == 1  ? colors.tomato: colors.orange }]}> {props.report_type == 1 ? I18n.t('stop') + ( (props.paro && ` #${props.paro}`) || '')  : I18n.t('changeover')}</Text>
                        <Text style={styles.timeStamp}>{creationDate}</Text>
                    </View>
                </View>
                <View>
                    {button}
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.failureText}>{upperCase(props.text)}</Text>
                {viewMaximo}
                <View style={[styles.twoColumns, { justifyContent: 'flex-end' }]}>
                    <Text style={styles.testTypeText}>{props.category}</Text>
                    <View style={[styles.areaColorIndicatior, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, }]} />
                </View>
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
    eventTitle: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.orangeRed,
    },
    timeStamp: {
        fontFamily: "OpenSans",
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#898b8e"
    },
    failureText: {
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#323d50"
    },
    woMaximoStyle: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    },
    rowStyle: {
        marginTop: 5,
        flex: 1,
        flexDirection: "row"
    },
    testTypeText: {
        fontFamily: "OpenSans",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: "#243746"
    },
    dotIcon: {
        color: "#46b978",
    },
    areaColorIndicatior: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginLeft: 5
    },
}