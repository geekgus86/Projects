import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"

const styles = StyleSheet.create({
    success: {
        borderColor: "#1fff2e",
        borderWidth: 0.5,
        borderRadius: 5
    },
    error: {
        borderColor: "#ff411f",
        borderWidth: 0.5,
        borderRadius: 5
    },
    none: {
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 5
    }
});

export default class InputComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            status: "none"
        }
    }

    render(){
        let icon = <View/>; 
        let border = <View/>;
        if(this.props.status == "accepted"){
            border = styles.success;
            icon = <Icon style={{marginTop: 15}} name={"check"} size={17} color={"green"}/>;
        }else if(this.props.status == "rejected"){
            border = styles.error;
            icon = <Icon style={{marginTop: 15}} name={"close"} size={17} color={"red"}/>
        }else if(this.props.status == "none"){
            border = styles.none;
        }

        return(
            <View style={[{flexDirection: "row"}, border]}>
                <View style={{width: "90%"}}>
                    <TextInput keyboardType="numeric" editable={this.props.editable} underlineColorAndroid="#FFF" value={this.props.value} onChange={this.props.onChange}/>
                </View>
                <View>
                    {icon}
                </View>
            </View>
        );
    }
}