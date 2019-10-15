import React, { Component } from 'react'
import { Text, Modal, View, TouchableOpacity,Image } from 'react-native'
import { colors } from '../../styles/theme'
import { SensaiCard, SensaiButton } from '../../components'
import I18n from '../../i18n/i18n'



export class CloseTryOutModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        }

        this.showModalStop = this.showModalStop.bind(this);
        this.onConfirmStop = this.onConfirmStop.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    showModalStop() {
        this.setState({
            modalVisible: true
        })
    }

    onConfirmStop() {
        this.props.onConfirmStop && this.props.onConfirmStop();
        this.hideModal();
    }


    onCancel() {
        this.props.onCancel && this.props.onCancel();
        this.hideModal();
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


  
        let title=''
        let message=''
        let btnTest=''
        
        if(this.props.is_try_out1){ // try Out 
            title=I18n.t('stop_mode_tryout_title')
            message=I18n.t('stop_mode_tryout_msg')
            btnTest=I18n.t('confirm_stop_mode_tryout')
        }

        if(this.props.is_out){ // Out Sustained
            title=I18n.t('stop_mode_title_NOUT')
            message=I18n.t('stop_mode_msg_NOUT')
            btnTest=I18n.t('confirm_stop_mode_NOUT')
        }

        
        return (
            
            

            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.onCancel()
                }}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity onPress={()=> {
                        this.onCancel()
                    }}>
                        <SensaiCard margin={[10,123,10,10]}>

                            <View style={{alignItems: 'center', marginTop: 20,marginBottom:20 }}>
                                <Image style={{ height: 90, width: 90 }} source={require('../../assets/icons/try_out.png')} />
                            </View>

                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.message}>{message}</Text>
                            {this.props.color?
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -20}}>
                                    <Text style={styles.message}>{this.props.area}</Text>
                                    <View style={[styles.areaColorIndicator, { backgroundColor: areaColor, borderColor: borderColor, borderWidth: 1, marginTop: 7 }]} />
                                </View>
                            :null}
                            <SensaiButton text={btnTest} onPress={this.onConfirmStop} buttonStyle={{marginBottom: 10, height: 40}} />
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