import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { SensaiCard } from "./SensaiCard";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/theme";

export class NavCard extends PureComponent {
  callOnPress = () => {
    !this.props.disabled && this.props.onPress && this.props.onPress();
  }
  render() {
    const {
      twoColumns,
      headerContainer,
      circle,
      circleText,
      headerText,
      textContainer,
      text
    } = styles;
    let disabledStyle = {};
    if (this.props.checked !== true) {
      disabledStyle = {
        backgroundColor: "#0099ed"
      };
    }
    if(this.props.disabled === true) {
      disabledStyle = {
        backgroundColor: colors.silver
      };
    }
    return <SensaiCard>
        <TouchableWithoutFeedback onPress={this.callOnPress.bind(this)}>
          <View style={twoColumns}>
            <View>
              <View style={headerContainer}>
                <View style={[circle, disabledStyle]}>
                  {this.props.checked === true?
                    <Icon name={"check"} size={17} color={"white"} />
                    :
                    <Text style={circleText}>{this.props.number}</Text>
                  }
                </View>
                <Text style={headerText}>{this.props.title}</Text>
              </View>
              <View style={textContainer}>
                <Text style={text}>{this.props.text}</Text>
              </View>
            </View>
            <View style={{ width: 40 }}>
              <LineIcon name={"arrow-right"} size={30} color={"#a6a8ab"} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SensaiCard>;
  }
}

const styles = StyleSheet.create({
  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
  headerText: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#323d50",
    marginLeft: 4
  },
  textContainer: {
    marginTop: 10,
    width: '90%'
  },
  text: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#243746"
  }
});
