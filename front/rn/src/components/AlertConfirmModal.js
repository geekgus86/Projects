import React, { Component } from 'react'
import { Text, Modal, View, TouchableOpacity } from 'react-native'
import { colors } from '../styles/theme'
import { SensaiCard, SensaiButton } from './'

export class AlertConfirmModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    onConfirm() {
        this.props.onConfirm && this.props.onConfirm();
        this.hideModal();
    }

    onCancel() {
        this.props.onCancel && this.props.onCancel();
        this.hideModal();
    }

    showModal() {
        this.setState({
            modalVisible: true,
        })
    }

    hideModal() {
        this.setState({
            modalVisible: false,
        })
    }

    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible,
        })
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
                        this.onCancel()
                    }}>
                        <SensaiCard margin={[10,123,10,10]}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.message}>{this.props.message}</Text>
                            {this.props.color?
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -20}}>
                                    <Text style={styles.message}>{this.props.area}</Text>
                                    <View style={[styles.areaColorIndicator, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, marginTop: 7 }]} />
                                </View>
                            :null}
                            <SensaiButton text={this.props.confirmText} onPress={this.onConfirm} buttonStyle={{marginBottom: 10, height: 40}} />
                            <SensaiButton outline={true} text={this.props.cancelText} onPress={this.onCancel} buttonStyle={{ height: 40}} />
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
    title: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "900",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#243746",
        marginBottom: 20,
        marginTop: 10,
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
    areaColorIndicator: {
        alignItems: 'flex-start',
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginLeft: 5
    },
}