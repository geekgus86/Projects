import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { colors } from '../../styles/theme'
import { upperCase } from '../../helpers';

class Notifications extends Component {
    componentDidMount() {
        this.props.navigation.navigate('DrawerOpen')
    }

    _renderItem(item) {
        const { iconCircle, eventTitle, timeStamp, card, commment } = styles
        let titleIcon = null
        let titleColor = null
        let title = null
        let introComment = null
        let data = JSON.parse(item.data);
        let backgroundColor = 'white'
        if(item.read == 1){
            backgroundColor = "rgba(166, 168, 171, 0.15)"
        }
        if(item.type == 'report-esc'){
            title = 'Escalamiento'
            titleColor = colors.orangeRed
            titleIcon = <View style={[iconCircle, { backgroundColor: titleColor }]}>
                <LineIcon name={'ban'} size={20} color={colors.white} />
            </View>
        }else if(item.type == 'report-an'){
            title = 'Reporte de Anormalidad'
            titleColor = colors.darkSkyBlue
            titleIcon = <View style={[iconCircle, { backgroundColor: colors.silver }]}>
                <LineIcon name={'user'} size={20} color={colors.white} />
            </View>
            introComment = 
            <Text style={commment}>
                <Text style={{fontWeight: "bold"}}>{item.nombre+' '+item.apellidoPaterno}</Text>                
                {' ha reportado una anormalidad del área de '}
                <Text style={{fontWeight: "bold"}}>{item.issueType+':'}</Text> 
            </Text>
        }
        return (
            <TouchableOpacity style={[card, { backgroundColor: backgroundColor }]} key = {item.id}
                onPress={()=>{
                    item.read=1
                }}
            >
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        { titleIcon }
                        <View style={{ marginLeft: 10 }}>
                            <Text style={[eventTitle, { color:  titleColor }]}>{ title }</Text>
                            <Text style={timeStamp}>{'20 Feb., 10:12 PM'}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        { introComment }
                        <Text style={[commment, { fontStyle: "italic" }]}>
                            "{data.message}"
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const data = [
            { id:1, type:'report-an', read:1, escalationLevel: 1, data:'{"message":"La pieza está saliendo con una rebaba y no se ha arreglado"}', id_user:5, issueType: "Operaciones", nombre: "Roberto",apellidoPaterno: "Osorio", apellidoMaterno: "Martínez" },
            { id:2, type:'report-esc', read:0, escalationLevel: 1, data:'{"message":"Paro #20 Schuler Press ha escalado a Segundo Combate."}', id_user:5, issueType: "Out of time" },
            { id:3, type:'report-an', read:0, escalationLevel: 1, data:'{"message":"La pieza está saliendo con una rebaba y no se ha arreglado"}', id_user:5, issueType: "Calidad", nombre: "Roberto",apellidoPaterno: "Osorio", apellidoMaterno: "Martínez" },
            { id:4, type:'report-esc', read:0, escalationLevel: 2, data:'{"message":"Paro #20 Schuler Press ha escalado a Segundo Combate."}', id_user:5, issueType: "Operaciones" },
            { id:5, type:'report-an', read:0, escalationLevel: 1, data:'{"message":"La pieza está saliendo con una rebaba y no se ha arreglado"}', id_user:5, issueType: "Logistica", nombre: "Roberto",apellidoPaterno: "Osorio", apellidoMaterno: "Martínez" },
            { id:6, type:'report-esc', read:1, escalationLevel: 3, data:'{"message":"Paro #20 Schuler Press ha escalado a Segundo Combate."}', id_user:5, issueType: "Calidad" },
            { id:7, type:'report-an', read:0, escalationLevel: 1, data:'{"message":"La pieza está saliendo con una rebaba y no se ha arreglado"}', id_user:5, issueType: "Herramientas", nombre: "Roberto",apellidoPaterno: "Osorio", apellidoMaterno: "Martínez" },
        ]
        let rows = data.map((value)=>{
            return this._renderItem(value)
        })
        return (
            <ScrollView style={{flex: 1}}>
                { rows }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({   
    card: {
        padding: 20,
        width: '100%',
        height: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: colors.silver,
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
        fontFamily: 'Open Sans',
        fontSize: 12,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#898b8e'
    },
    commment: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: colors.darkGreyBlue
    },
})

export default Notifications