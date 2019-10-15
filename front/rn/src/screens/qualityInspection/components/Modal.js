import React, { Component } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { SensaiCard, SensaiButton } from "../../../components/";

const styles = StyleSheet.create({

});

export default class Modal extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Modal animationType="fade" transparent={false} visible={true} onRequestClose={() => console.warn("close")}>
                    <SensaiCard>
                        <Text>Modal</Text>
                    </SensaiCard>
                </Modal>
            </View>
        );
    }
}