import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { SensaiCard, SensaiRow, CardLabel } from "../../components";
import { colors } from "../../styles/theme";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import { subscribeTo, unsubscribe } from '../../lib/Socket'
import moment from 'moment-timezone';
import 'moment/locale/es';
import I18n from '../../i18n/i18n';

export class ChangeOverCard extends PureComponent{
  state = {
    diff: 0,
    timer: null,
    minutes: 0,
  }

  _mounted = false

  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
    this.escalationTime = this.escalationTime.bind(this)
  }

  componentDidMount() {
    this._mounted = true    
    if (this.state.timer === null && this.props.item.OpenMinutes === undefined) {
      //subscribeTo('escalation-time', this.escalationTime)
      if (this.state.timer === null) {
        clearInterval(this.state.timer)
        let timer = setInterval(this.tick, 1000)
        this.setState({ timer })
      }
    }else{
      //unsubscribe('escalation-time')
      this.setState({ diff: moment.utc(this.props.item.OpenSecond*1000).format('HH:mm:ss'), minutes: this.props.item.OpenMinutes })
    }
  }

  componentWillUnmount() {
      clearInterval(this.state.timer)
      //unsubscribe('escalation-time')
      this._mounted = false
  }

  componentDidUpdate(prevProps, prevState) {
    if(this._mounted){
      if(prevProps.item.OpenMinutes!=this.props.item.OpenMinutes){
        if (this.props.item.OpenMinutes === null) {
          /*clearInterval(this.state.timer)
          let timer = setInterval(this.tick, 1000)
          this.setState({ timer })*/
        }else{ 
          //clearInterval(this.state.timer)
          //unsubscribe('escalation-time')
          this.setState({ diff: this.props.item.OpenMinutes, minutes: this.props.item.OpenMinutes })
        }
      }
    }
  }

  escalationTime(data){
    if (this._mounted === true) {
        let diff = Math.round(data.currentEscalationTime/1000)
        if(data.extraDowntime){
            diff+=(data.extraDowntime*1)
        }
        let h = Math.floor(diff / (60 * 60))
        diff = diff - (h * 60 * 60)
        let m = Math.floor(diff / (60))
        diff = diff - (m * 60)
        let s = diff
        this.setState({ diff: `${h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}` })
    }
  }

  tick() {
    const report  = this.props.item
    if (report !== null) {
        let now = new Date().getTime()
        let creation = new Date(moment(report.StartAt).format()).getTime()
        let diff = Math.round((now - creation) / 1000)
        let h = Math.floor(diff / (60 * 60))
        let minutes = Math.floor(diff / 60)
        diff = diff - (h * 60 * 60)
        let m = Math.floor(diff / (60))
        diff = diff - (m * 60)
        let s = diff
        if(this._mounted){
            this.setState({ diff: `${h}:${(m < 10) ? '0' + m : m}:${(s < 10) ? '0' + s : s}`, minutes: minutes })
        }
    }
  }

  render(){ 
    const { item } = this.props
    let timestamp = moment(item.CreatedAt).format('DD/MMMM, h:mmA')
    let objective = 17
    return (
      <SensaiCard>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={[styles.iconCircle, { backgroundColor: "#FC6D27" }]}>
            <LineIcon name={"ban"} size={20} color={colors.white} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.eventTitle, { color: "#FC6D27" }]}>{I18n.t('change_over')}</Text>
            <Text style={styles.timeStamp}>{timestamp}</Text>
          </View>
        </View>
        <SensaiRow sizes={[0.5, 0.5]}>
          <View style={styles.twoColumns}>
            <Text style={[styles.labelText, styles.bold]}>{I18n.t('objective')}: </Text>
            <Text stlye={styles.labelText}>{objective} {I18n.t('minutes_dim')}</Text>
          </View>
          <View style={styles.twoColumns}>
            <Text style={[styles.labelText, styles.bold]}>{I18n.t('real')}: </Text>
            <Text stlye={styles.labelText}>{this.state.diff} {I18n.t('minutes_dim')}</Text>
            <CardLabel
                title={''}
                value={this.state.minutes}
                hideValue
                inverted
                threshold={objective}
                unit={'min'}
                margin
            />
          </View>
        </SensaiRow>
      </SensaiCard>
    );
  }
};

const styles = StyleSheet.create({
  twoColumns: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5
  },
  labelText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.39,
    color: "#243746"
  },
  bold: {
    fontWeight: "bold"
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  eventTitle: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: colors.orangeRed
  },
  timeStamp: {
    fontFamily: "Open Sans",
    fontSize: 12,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#898b8e"
  }
});
