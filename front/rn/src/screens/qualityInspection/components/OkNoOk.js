import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { colors } from "../../../styles/theme";
import I18n from '../../../i18n/i18n'
import Icon from "react-native-vector-icons/FontAwesome";

export default class OkNoOk extends PureComponent {
  state = {
    val: null
  };

  constructor(props) {
    super(props);
    this.onCheckboxPressed = this.onCheckboxPressed.bind(this);
  }

  onCheckboxPressed(v) {
    if (v === 1) {
      this.setState({ val: true });
      this.props.onChange && this.props.onChange(v);
    } else {
      this.setState({ val: false });
      this.props.onChange && this.props.onChange(v);
    }
  }

  render() {
    const checkboxStyle = {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.white,
      borderStyle: "solid",
      borderWidth: 1.5,
      borderColor: colors.azure,
      justifyContent: "center",
      alignItems: "center"
    };
    let yes = {};
    let no = {};
    if (this.state.val === true) {
      yes = { backgroundColor: colors.azure }
    } else if (this.state.val === false) {
      no = { backgroundColor: colors.reddish, borderColor: colors.reddish };
    }
    return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => { this.onCheckboxPressed(1) }}>
            <View style={[styles.checkboxContainer, { marginRight: 10 }]}>
              <View style={[checkboxStyle, yes]}>
                <Icon name="check" style={styles.checkbox} size={32} />
              </View>
              <Text style={styles.checkboxLabel}>{I18n.t('qualityInspection_s_aprobada')}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.onCheckboxPressed(0) }}>
            <View style={[styles.checkboxContainer, { marginLeft: 10 }]}>
              <View style={[checkboxStyle, no]}>
                <Icon name="times" style={styles.checkbox} size={32} />
              </View>
              <Text style={styles.checkboxLabel}>{I18n.t('qualityInspection_s_noaprobada')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  checkbox: {
    color: colors.white
  },
  checkboxLabel: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#243746",
    marginLeft: 5
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputLabel: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#243746"
  }
});
