import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SensaiCard from "../../../components/SensaiCard";
import SensaiButton from "../../../components/SensaiButton";

const styles = StyleSheet.create({
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
    },
    toolTitle: {
        fontFamily: "Gotham Rounded",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#898b8e"
    }
});

class VisualHelp extends Component { 
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <SensaiCard>
                {/*<View style={styles.twoColumns}>

                    <View>
                        <Text style={styles.toolTitle}>AYUDA VISUAL</Text>
                    </View>

                    <View>
                        <View style={{flexDirection: "row"}}>

                            <SensaiButton text="< Anterior"/>
                            <SensaiButton text="Siguiente >"/>

                        </View>
                    </View>

                </View>*/}
            </SensaiCard>
        );
    }
}

export default VisualHelp;