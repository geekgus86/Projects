import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default FailureCombatHeader = (props) => {
    return (
        <View style={styles.grayTextRow}>
            <Text style={styles.grayLabel}>{props.combate}</Text>
            <View style={{flexDirection: 'row'}}>
                <Icon name="clock" style={styles.grayIcon} size={18} />
                <Text style={styles.grayLabel}>{props.tiempo}</Text>
            </View>
        </View>
    )
}

const styles = {
    grayTextRow:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginLeft: 8.5, 
        marginTop: 10, 
        marginBottom: 10, 
        marginRight: 8.5
    },
    grayIcon: {
        color: "#898b8e",
        padding: 1,
    },
    grayLabel:{
        fontFamily: "OpenSans",
        fontSize: 16,
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "center",
        color: "#898b8e"
    },
}