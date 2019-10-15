import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { colors } from "../../styles/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import I18n from "../../i18n/i18n";

export class FeedbackOptions extends PureComponent {
  state = {
    val: true
  };

  constructor(props) {
    super(props);
    this.onCheckboxPressed = this.onCheckboxPressed.bind(this);
  }

  componentDidMount() {
    if(this.props.value){
      this.onCheckboxPressed(this.props.value)
    }
  }

  onCheckboxPressed(v) {
    if (v === 1) {
      this.setState({ val: false });
      this.props.onChange && this.props.onChange(v);
    } else {
      this.setState({ val: true });
      this.props.onChange && this.props.onChange(v);
    }
  }

  render() {
    const checkboxStyle = {
      width: 22,
      height: 22,
      borderRadius: 6,
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
    } else {
      no = { backgroundColor: colors.azure };
    }
    return (
      <View style={{margin:10}}>
        <Text style={styles.inputLabel}>{I18n.t('report_type')}:</Text>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => { this.onCheckboxPressed(0) }}>
            <View style={[styles.checkboxContainer, { marginRight: 10 }]}>
              <Text style={styles.checkboxLabel}>{I18n.t('comment')}</Text>
              <View style={[checkboxStyle, yes]}>
                <Icon name="check" style={styles.checkbox} size={12} />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.onCheckboxPressed(1) }}>
            <View style={[styles.checkboxContainer, { marginLeft: 10 }]}>
              <Text style={styles.checkboxLabel}>{I18n.t('failure')}</Text>
              <View style={[checkboxStyle, no]}>
                <Icon name="check" style={styles.checkbox} size={12} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
    letterSpacing: -0.39,
    textAlign: "center",
    color: "#243746",
    marginRight: 5
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
