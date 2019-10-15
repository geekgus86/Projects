import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, Modal, View, TouchableOpacity,Image } from 'react-native'
import { colors } from '../../styles/theme'
import { upperCase } from '../../helpers'
import { SensaiCard, SensaiButton } from '../../components'
import { NavCard, Spinner } from "../../components";
import { tracker, navigate } from "../../helpers";
// import NextProduction from "../../screens/production/NextProduction";


export class ConfirmModalOut extends Component {
    


    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            resultActive:false,
        }

        this.showModalConfirm = this.showModalConfirm.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    showModalConfirm(resultActive) {
        this.setState({
            modalVisible: true,
            resultActive: resultActive,
        })
    }

    onConfirm() {
        // this.props.onConfirm && this.props.onConfirm();
        this.props.onCancel && this.props.onCancel();
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
                        
                            {this.state.resultActive == true?
                                <View style={{alignItems: 'center'}}>
                                    <View style={styles.circle}>
                                        <Icon name={this.props.confirmIcon} style={styles.checkbox} size={50} />
                                    </View>
                                </View>
                            :
                            <View style={{alignItems: 'center', marginTop: 30,marginBottom:20 }}>
                                <Image style={{ height: 100, width: 100 }} source={require('../../assets/icons/denegate.png')} />
                            </View>
                            }

                            {this.state.resultActive == true?
                                 <Text style={styles.titleSuc}>{this.props.title}</Text>
                            :
                                <Text style={styles.titleError}>{this.props.title}</Text>
                            }
                           
                            <Text style={styles.message}>{this.props.message}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -20}}>
                                    <Text style={styles.user}>{this.props.user}</Text>
                            </View>


                            {this.state.resultActive == true?
                                <SensaiButton text={this.props.confirmText} onPress={this.onConfirm} buttonStyle={{marginBottom: 10, height: 40}} />
                            :
                                <SensaiButton outline={true} text={this.props.cancelText} onPress={this.onCancel} buttonStyle={{ height: 40}} />
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
    titleSuc: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "900",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#0099ed",
        marginBottom: 20,
        marginTop: 10,
    },
    titleError: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "900",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ed2400",
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
    user: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "900",
        fontStyle: "normal",
        letterSpacing: 0,
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
