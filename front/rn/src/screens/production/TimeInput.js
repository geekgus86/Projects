import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { colors } from "../../styles/theme";
import moment from "moment-timezone";
import "moment/locale/es";

export class TimeInput extends PureComponent {
  state = {
    isPickerVisible: false,
    displayDate: ''
  }
  handleSelection(date) {
    let time = moment(date).format("hh:mm A");
    this.setState({ isPickerVisible: false, displayDate: time});
    this.props.onSelect && this.props.onSelect({
      displayDate: this.state.displayDate,
      rawDate: date
    })
  }
  render() {
    if (this.props.value && this.state.displayDate === '') {
      this.setState({ displayDate: this.props.value });
    }
    return (
      <View>
        <DateTimePicker
          isVisible={this.state.isPickerVisible}
          onConfirm={this.handleSelection.bind(this)}
          onCancel={() => {
            this.setState({ isPickerVisible: false });
          }}
          mode="time"
        />
        <Text style={styles.inputLabel}>{this.props.label}:</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ isPickerVisible: true });
          }}
        >
          <View style={styles.inputStyleForView}>
            <Text style={styles.inputText}>{this.state.displayDate}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }  
};

const styles = StyleSheet.create({
  inputLabel: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#243746"
  },
  inputStyleForView: {
    height: 45,
    borderRadius: 2,
    backgroundColor: colors.white,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.silver,
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 4,
    justifyContent: "center"
  },
  inputText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.39,
    textAlign: "left",
    color: colors.coolGrey
  }
});
