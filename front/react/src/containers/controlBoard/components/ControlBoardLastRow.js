import React, { PureComponent } from "react";
import { connect } from "react-redux";
//import { bindActionCreators } from "redux";
import moment from "moment-timezone";
import "moment/locale/es";
import ContolBoardRow from "./ControlBoardRow";
import { subscribeTo } from "../../../lib/socket";
import { getDownTimes } from "../../../store/controlBoard/reducer";

class ContolBoardLastRow extends PureComponent {
  _mounted = false
  
  state = {
    rowData: null,
  }

  setProdValues(data) {
    if (this._mounted && this.props.data) {    
      let propsData = Object.assign({}, this.props.data)
      let values = this.props.data;
      let piezas_s = values.piezas_s
      const isOut = values.in_out_f

      let arr_piezas = piezas_s.split("/")
      let summa = 0
      arr_piezas.forEach((value, i) => {
          if(i != (arr_piezas.length - 1 )){
            summa +=  parseInt(arr_piezas[i].replace("*",''));
          }
      })
      
      let totalPeizas = data.parts - data.parts_out
      propsData.piezas = data.parts
      propsData.piezas_p = data.acum
      propsData.acumulado_p = this.props.acumP+data.acum
      propsData.acumulado_r = totalPeizas + this.props.acumR
      propsData.oa_h = Math.min(Math.round((totalPeizas / data.acum) * 100), 100)//values.oa_h//data.oa
      propsData.oa_a = Math.min(Math.round((propsData.acumulado_r / propsData.acumulado_p) * 100), 100)
      propsData.oa_a = values.in_out ? 0 : propsData.oa_a 
      propsData.oa_h = values.in_out ? 0 : propsData.oa_h
      propsData.tool = values.tool
      propsData.spm = values.spm
      data.parts -= summa
      //propsData.tool = data.diename
      
      const limit = arr_piezas.length - 1
      arr_piezas[limit] = isOut ? `${data.parts}*` : data.parts
      propsData.piezas_s = arr_piezas.join("/");

      let lastHourReports
      if (this.props.reports !== null) {
        let currentDate = moment(propsData.hora)//.startOf('hour').format('YYYY-MM-DD HH:mm:SS')
        let nextDate = moment(propsData.horaEnd)//.startOf('hour').add(1,'hour').format('YYYY-MM-DD HH:mm:SS') 
        lastHourReports = this.props.reports.filter((reportRecord) => {
          return moment(reportRecord.createdAt).isBetween(currentDate, nextDate, 'milliseconds', '[)'); // right inclusive
        })
      }

      let downtimes = getDownTimes(lastHourReports)
      propsData.downtimes = downtimes['downtime']
      propsData.coDowntimes = downtimes['changeOver']
      this.setState({ rowData: propsData })
    }
  }

  componentDidMount() {
    this._mounted = true
    this.setState({ rowData: this.props.data }) 
    this.setProdValues = this.setProdValues.bind(this)
    subscribeTo('partsByHour', this.setProdValues)
  }

  componentWillUnmount() {
    this._mounted = false
  }

  render() {    
    let content = null
    if (this.state.rowData !== null) {
      content = <ContolBoardRow data={this.state.rowData} />
    }
    return content
  }
}

function mapStateToProps(state) {
  return {
    reports: state.prodControl.reports
  }
}

export default connect(mapStateToProps, null)(ContolBoardLastRow)