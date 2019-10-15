import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors } from "../../styles/theme";

export class NumInput extends PureComponent {
  state = {
    text: ""
  };
  textChanged(value) {
    if (this.refs["input"]) {
      value = this.refs["input"].getRawValue();
    }
    this.setState({ text: value });
    this.props.onChangeText && this.props.onChangeText(value);
  }
  onPress = () => {
    this.props.onPress && this.props.onPress()
  }
  render() {
    if (this.props.value) {
      this.setState({ text: this.props.value });
    }
    return (
      <View>
        {this.props.label?
          <Text style={styles.inputLabel}>{this.props.label}:</Text>
        :null}
        <TextInput
          ref={input => {
            this.input = input;
          }}
          editable={ this.props.editable!==undefined ? this.props.editable : true }
          style={styles.inputStyle}
          autoCorrect={false}
          returnKeyType={this.props.returnKeyType}
          keyboardType={"numeric"}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          value={this.state.text}
          onChangeText={this.textChanged.bind(this)}
          onSubmitEditing={() => this.onPress()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputLabel: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#243746"
  },
  inputStyle: {
    height: 45,
    borderRadius: 2,
    backgroundColor: colors.white,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.silver,
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.39,
    textAlign: "left",
    color: colors.coolGrey,
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 4
  }
});
