import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchLastProductionRecord, fetchProduction, fetchProfile, fetchReportsOfTheDay, fetchWeekProduction, fetchLastHour, updateLastHour } from "../../store/controlBoard/actions";
import { getGroupedData, getHeaderData } from "../../store/controlBoard/reducer";
import { FaCheck } from "react-icons/fa";
import ControlBoardTable from "./components/ControlBoardTable";
import ControlBoardRow from "./components/ControlBoardRow";
import TotalProduction from "./components/TotalProduction";
import LastRecord from "./components/LastRecord";
import moment from "moment-timezone";
import "moment/locale/es";
import styles from "./ControlBoard.less";
import { guid } from "../../lib/utils";
import { subscribeTo } from "../../lib/socket";
import ControlBoardLastRow from "./components/ControlBoardLastRow";
import { FormattedMessage } from "react-intl";

class ControlBoard extends PureComponent {
  _mounted = false;

  state = {
    currentTool: '',
    openModal: false,
    modalHeader: '',
    parts: null
  }


  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      4 * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


  async tick() {
    let { productionData } = this.props
    let lastProduction = productionData && productionData[productionData.length - 1]
    let now = moment()
    if(lastProduction == null){
      return
    }
    let endHour = moment(lastProduction.horaEnd)
    if (now > endHour) {
      await this.props.fetchProduction();
      await this.props.fetchReportsOfTheDay();
      await this.props.fetchWeekProduction();
    }

  }
  async refrechTryOut(){
    this.sleep(10000).then(() => {
      this.props.fetchProduction();
    })
  }

  async componentWillMount() {
    await this.props.fetchProduction();
    await this.props.fetchReportsOfTheDay();
    this.props.fetchProfile();
    this.props.fetchWeekProduction();
    this.props.fetchLastProductionRecord();

    this.runIndicators = this.runIndicators.bind(this);
    this.refreshWeek = this.refreshWeek.bind(this);
    this.refrechTryOut = this.refrechTryOut.bind(this);

    subscribeTo('report-closed', this.runIndicators);
    subscribeTo('isTryOut', this.refrechTryOut);
    subscribeTo('hxhproduction-created', this.refreshWeek);
    subscribeTo('report-issueIdentified', this.runIndicators);
    subscribeTo('report-typeChanged', this.runIndicators);
    subscribeTo('report-divided', this.runIndicators);
    subscribeTo('report-grouped', this.runIndicators);
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async refreshWeek() {
    //FIX ME esto no deberia estar asi es solo temporal lo prometo :(
    // this.sleep(10000).then(() => {
    //   if (this._mounted === true) {
    //     this.runIndicators()
    //     this.props.fetchWeekProduction()
    //   }
    // })
  }

  async runIndicators() {
    if (this._mounted === true) {
      await this.props.fetchReportsOfTheDay();
      await this.props.fetchProduction();
    }
  }

  handleCloseModal = () => {
    this.setState({ currentTool: '', openModal: false })
  }

  render() {
    const { profile, targetOA } = this.props
    const tl = (profile !== null) ? profile.tl : ""
    const gl = (profile !== null) ? profile.gl : ""
    const shift = (profile !== null) ? profile.shift : ""
    let lastHourData = null
    let acumulado_r = 0
    let acumulado_p = 0
    let pieces_try = 0
    let limit = 0
    let showTryOutMessage = ""
    let isOuts = false;
    if (this.props.productionData) {
      limit = this.props.productionData.length - 1
      lastHourData = Object.assign({}, this.props.productionData[limit])

      let start = moment.parseZone(lastHourData.hora)
      let end = moment.parseZone(lastHourData.horaEnd)
      let recordIsFromCurrentHour = moment().isBetween(start, end, 'milliseconds', '[)')

      if (!recordIsFromCurrentHour) {
        limit = this.props.productionData.length
        lastHourData.start = start
        lastHourData.end = end
        lastHourData.dateperiod = `${moment().format('hh A')} - ${moment().add(1, 'hour').format('hh A')}`
        lastHourData.total = 0
      }
      
      this.props.productionData.forEach((value, i) => {
        if (i !== limit) {
          acumulado_r += value.piezas || 0
          acumulado_p += value.piezas_p || 0
          pieces_try += value.pieces_try || 0
        }
        if(!isOuts){
          isOuts = value.in_out_f
        }
      })
      acumulado_r -= pieces_try
    }
    if(isOuts){
      showTryOutMessage = <div className={`d-flex justify-content-between`}>
          <div className={`d-flex`}>
            <div className={`d-flex ${styles.RightMargin}`}>
              <div className={`${styles.TryOutMessage}`}>
                <FormattedMessage id="controlBoard.ControlBoardTable.TryOutToolTip" defaultMessage="" />
              </div>
            </div>
          </div>
        </div>
    }
    return (
      <div className={`${styles.ControlBoard}`}>
        <div className={`d-flex justify-content-between ${styles.ControlBoardHeader}`}>
          <div className={`d-flex`}>
            <div className={`d-flex ${styles.RightMargin}`}>
              <div className={`${styles.HeaderLabel}`}>
                <FormattedMessage id="controlBoard.dateLbl" defaultMessage="Fecha:" />
              </div>
              <div className={`${styles.HeaderValue}`}>{moment().format("DD/MM/YYYY")}</div>
            </div>
            <div className={`d-flex ${styles.RightMargin}`}>
              <div className={`${styles.HeaderLabel}`}>
                <FormattedMessage id="controlBoard.shiftLbl" defaultMessage="TURNO:" />
              </div>
              <div className={`${styles.HeaderValue}`}>{shift}</div>
            </div>
            <div className={`d-flex ${styles.RightMargin}`}>
              <div className={`${styles.HeaderLabel}`}>
                <FormattedMessage id="controlBoard.glLbl" defaultMessage="GL:" />
              </div>
              <div className={`${styles.HeaderValue}`}>{tl}</div>
              <div className={`${styles.HeaderIcon} d-flex justify-content-center align-items-center`}>
                <FaCheck color={"#ffffff"} />
              </div>
            </div>
            <div className={`d-flex ${styles.RightMargin}`}>
              <div className={`${styles.HeaderLabel}`}>
                <FormattedMessage id="controlBoard.tlLbl" defaultMessage="TL:" />
              </div>
              <div className={`${styles.HeaderValue}`}>{gl}</div>
              <div className={`${styles.HeaderIcon} d-flex justify-content-center align-items-center`}>
                <FaCheck color={"#ffffff"} />
              </div>
            </div>
          </div>
          <div className={`d-flex`}>
            <div className={`d-flex`}>
              <div className={`${styles.HeaderLabel}`}>
                <FormattedMessage id="controlBoard.oaprLbl" defaultMessage="OBJETIVO OA X PR:" />
              </div>
              <div className={`${styles.HeaderValue}`}>{targetOA}%</div>
            </div>
          </div>
        </div>

        {showTryOutMessage}

        <div className={`${styles.TableArea}`}>
          <div className={`${styles.headerTitle}`}>
            <h4><FormattedMessage id="controlBoard.prodPlanLbl" defaultMessage="Plan de producción" /></h4>
          </div>
          <ControlBoardTable>
            {
              (() => {
                if (this.props.productionData) {
                  return this.props.productionData.map((pd, i) => {
                    if (i !== limit) {
                      return <ControlBoardRow index={i++} key={guid()} data={pd} />
                    } else {
                      return null
                    }
                  })
                } else {
                  return null;
                }
              })()
            }
            {
              lastHourData && <ControlBoardLastRow data={lastHourData} acumP={acumulado_p} acumR={acumulado_r} />
            }
          </ControlBoardTable>
        </div>

        <div className={`${styles.TableArea}`}>
          <div className={`${styles.headerTitle}`}>
            <h4><FormattedMessage id="controlBoard.totalProdLbl" defaultMessage="PRODUCCIÓN TOTAL" /></h4>
          </div>
          <TotalProduction data={this.props.weekProduction} />
        </div>

        <div className={`${styles.TableArea}`}>
          <div className={`${styles.headerTitle}`}>
            <h4><FormattedMessage id="controlBoard.lastRecordLbl" defaultMessage="ÚLTIMO RÉCORD DE PRODUCCIÓN" /></h4>
          </div>
          <LastRecord data={this.props.lastRecord} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    productionData: getGroupedData(state),
    targetOA: state.prodControl.productionControlOA,
    lastRecord: state.prodControl.lastRecord,
    weekProduction: state.prodControl.weekProduction,
    profile: getHeaderData(state),
    error: state.prodControl.error,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLastProductionRecord, fetchProduction, fetchProfile, fetchReportsOfTheDay, fetchWeekProduction, fetchLastHour, updateLastHour }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBoard);