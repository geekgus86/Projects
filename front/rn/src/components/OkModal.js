import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, Modal, View, TouchableOpacity } from 'react-native'
import { colors } from '../styles/theme'
import { SensaiCard, SensaiButton } from './'

export class OkModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    showModal() {
        this.setState({
            modalVisible: true,
        })
    }

    hideModal() {
        if(this.props.onPress){
            this.props.onPress()
        }
        this.setState({
            modalVisible: false,
        })
    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible,
        })
    }

    onConfirm() {
        this.props.onConfirm(this.state.text);
    }

    render(){
        let areaColor = "#034ea2"
        let borderColor = "#034ea2"
        if(this.props.color){
            areaColor = this.props.color
            borderColor = (this.props.color === '#FFFFFF') ? colors.coolGrey : this.props.color
        }
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.hideModal()
                }}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity onPress={()=> {
                        this.hideModal()
                    }}>
                        <SensaiCard margin={[10,123,10,10]}>
                            <View style={{alignItems: 'center'}}>
                                <View style={styles.circle}>
                                    <Icon name={this.props.confirmIcon} style={styles.checkbox} size={50} />
                                </View>
                            </View>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.message}>{this.props.message}</Text>
                            {this.props.color?
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -20}}>
                                    <Text style={styles.message}>{this.props.area}</Text>
                                    <View style={[styles.areaColorIndicator, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, marginTop: 7 }]} />
                                </View>
                            :null}
                            {(this.props.womId != null || this.props.womMessage != null) && this.props.showAlertMaximo ? 
                                <Text style={styles.messageWom}>{this.props.womTitle}</Text>:null
                            }                            
                            {this.props.womId != null && this.props.showAlertMaximo ? 
                                <Text style={[styles.messageWom, { fontWeight: 'bold' }]}>
                                    {this.props.womId}
                                </Text>:null
                            }                            
                            {(this.props.womMessage != null && this.props.womId == null) && this.props.showAlertMaximo ? 
                                <Text style={[styles.messageWom, { fontWeight: 'bold', color: 'red' }]}>
                                    {this.props.womMessage}
                                </Text>:null
                            }
                            {(this.props.womId != null || this.props.womMessage != null) && this.props.showAlertMaximo ? 
                                <SensaiButton text={this.props.confirmText} onPress={this.onConfirm} buttonStyle={{marginBottom: 10, height: 40}} />:null
                            }
                        </SensaiCard>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: "rgba(50,61,80,0.5)",
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.azure,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 30,
    },
    checkbox: {
        color: colors.white,
    },
    title: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#0099ed",
        marginBottom: 20,
        marginTop: 10,
    },
    areaColorIndicator: {
        alignItems: 'flex-start',
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginLeft: 5
    },
    message: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "center",
        color: "#243746",
        marginBottom: 20, 
    },
    messageWom: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "center",
        color: "#243746", 
        marginBottom: 10
    }
}