import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/theme";

import Icon from 'react-native-vector-icons/FontAwesome';

export class CollapsibleHeader extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const {text, disabled, collapse, onPress, show, hideTool } = this.props
    return (
      <TouchableOpacity style={[styles.toolInfo, { flexDirection: 'row'}]} onPress={onPress}>
        {collapse?
          <Icon name={show?"caret-down":"caret-up"} size={27} color={colors.darkGreyBlue} style={{ marginRight: 10 }}/>
        :null}
        <View >
          
          <Text >{text}</Text>
        </View>
        
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  toolInfo: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(209, 209, 212, 0.5)",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 0,
    marginLeft: 0
  },
  toolLabel: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.39,
    color: "#243746",
    marginRight: 5
  },
  hourLabel: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#0099ed"
  }
});
