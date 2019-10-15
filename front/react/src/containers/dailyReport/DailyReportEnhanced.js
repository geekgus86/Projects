import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaBan } from "react-icons/fa";
import groupIcon from 'assets/group.png'
import { fetchShifts, fetchShiftsRealStrokesHeader, fetchDowntimesPerArea, fetchRealStrokesHeader, fetchDailyReportDetail, fetchToolReports, fetchRollos, fetchDailyReportData } from "../../store/dailyReport/actions_enhanced";
import { fetchProfile } from "../../store/controlBoard/actions";
import AreaDowntimes from "./components/AreaDowntimes/AreaDowntimes";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import DailyReportTable from "./components/DailyReportTable/DailyReportTable";
import DailyReportDetailTable from "./components/DailyReportDetailTable/DailyReportDetailTable";
import DailyReportDetailRow from "./components/DailyReportDetailRow/DailyReportDetailRow";
import Datepicker from '../../components/Datepicker/Datepicker'
import { guid } from "../../lib/utils";
import styleDaily from "./DailyReport.less";
import moment from "moment-timezone";
import "moment/locale/es";
import { FormattedMessage } from "react-intl";

class DailyReportEnhanced extends PureComponent {
  state = {
    totalTime: 0,
    // TODO: FBB20180928 Let date be settable from parent again
    // Stubbing it because of a bug
    // Last known date to work: 2018-09-27
    startDate: moment(),
    //startDate: moment('2018-09-27'),
    dateRangeStr: "",
    loading: true,
    groupLeader: "",
    teamLeader: ""
  }

  constructor(props) {
    super(props);
    this.getShifts = this.getShifts.bind(this);
    this.getDowntimes = this.getDowntimes.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggleReports = this.toggleReports.bind(this);
    this.renderReports = this.renderReports.bind(this);
    this.toggleRollos = this.toggleRollos.bind(this);
    this.renderRollos = this.renderRollos.bind(this);
  }

  async componentDidMount() {
    this.getDowntimes();
  }

  handleDateChange(date) {
    this.setState({ startDate: date });
  }

  async getShifts() {
    let date = this.state.startDate; 
    date = moment(date).hour(12).minute(0).seconds(0).milliseconds(0).toString();
    await this.props.fetchShifts(date);
  }

  getDateRange() {
    let from = moment().format('YYYY-MM-DD');
    let to = moment().add(1, 'day').format('YYYY-MM-DD');
    
    let fromStr = moment().format('dddd DD YYYY, 6:00');
    let toStr = moment().add(1, "day").format('dddd DD YYYY, 5:59');

    if (this.state.startDate !== "") {
      from = moment(this.state.startDate).format('YYYY-MM-DD');
      fromStr = moment(this.state.startDate).format('dddd DD YYYY, 6:00');

      to = moment(this.state.startDate).add(1, "day").format('YYYY-MM-DD');
      toStr = moment(this.state.startDate).add(1, "day").format('dddd DD YYYY, 5:59');
    }
    return {
      from: from,
      to: to,
      rangeStr: `${fromStr} A.M. - ${toStr} A.M.`
    }
  }

  toggleInnerRow(tool, id, section, status, workOrderID) {
    if (section === "rollos") {
      this.toggleRollos(tool, id, status, workOrderID);
    } else {
      this.getShifts();
      let workingDay = this.props.shifts.rangeShift;
      //va de nuez fix
      this.props.fetchDowntimesPerArea(workingDay.startAt, workingDay.endAt);
      this.toggleReports(tool, id, status, workOrderID);
    }
  }

  toggleReports(tool, id, status, workOrderID) {
    const range = this.getDateRange();
    
    if (status === true) {
      if (id === "Turno1") {
        this.props.fetchToolReports(range.from + " 06:00:00", range.from + " 17:59:59", tool, id, workOrderID);
      } else {
        this.props.fetchToolReports(range.from + " 18:00:00", range.to + " 05:59:59", tool, id, workOrderID);
      }
    }else{
        this.props.reports[`${tool}-${id}`] = null
    }

  }

  toggleRollos(tool, id, status, workOrderID) {
    const range = this.getDateRange();
    if (status === true) {
      if (id === "Turno1") {
        this.props.fetchRollos(range.from + " 06", range.from + " 17", tool, id);
      } else {
        this.props.fetchRollos(range.from + " 18", range.to + " 05", tool, id);
      }
    }
  }

  toggleDetails(shift) {
    this.showDetails(shift)
  }

  showDetails(shift) {
    // this.props.fetchDailyReportDetail(shift);
  }

  async getDowntimes() {
    this.setState({ loading: true });
    await this.getShifts();
    // const range = this.getDateRange();
    let workingDay = this.props.shifts.rangeShift;
    let shifts = this.props.shifts.shifts;
    
    await this.props.fetchDowntimesPerArea(workingDay.startAt, workingDay.endAt);
    // await this.props.fetchRealStrokesHeader(workingDay.startAt, workingDay.endAt, "Resumen");
    // await this.props.fetchShiftsRealStrokesHeader(shifts);

    await this.props.fetchDailyReportData(workingDay.startAt, workingDay.endAt);
    // await this.props.fetchDowntimesPerArea(range.from + " 06:00:00", range.to + " 05:59:59");
    // await this.props.fetchRealStrokesHeader(range.from + " 06:00:00", range.to + " 05:59:59", "Resumen");
    // await this.props.fetchRealStrokesHeader(range.from + " 06:00:00", range.from + " 17:59:59", "Turno1");
    // await this.props.fetchRealStrokesHeader(range.from + " 18:00:00", range.to + " 05:59:59", "Turno2");
    await this.props.fetchProfile();
    let total = 0
   
    if (this.props.downtimes !== null) {
      this.props.downtimes.forEach((d) => {
        // Sum the main areas, exclude OUT TIME, Microparos and No asignado
        if (d.id !== 5 && d.id !== "NULL" && d.id !== 7) {
          total += d.downtime + d.downtime_co;
        }
      });
    }

    if (this.props.profile !== null) {
      if (this.props.profile.tl) {
        this.setState({ teamMember: `${this.props.profile.tl.nombre} ${this.props.profile.tl.apellidoPaterno} ${this.props.profile.tl.apellidoMaterno}` });
      }
      if (this.props.profile.gl) {
        this.setState({ groupLeader: `${this.props.profile.gl.nombre} ${this.props.profile.gl.apellidoPaterno} ${this.props.profile.gl.apellidoMaterno}` });
      }
    }

    this.setState({
      totalTime: total.toFixed(2),
      loading: false,
      // dateRangeStr: range.rangeStr
    });
  }

  renderAreas() {
    const { downtimes } = this.props;
    let fragment = null
    if (downtimes !== null) {
      fragment = (
        <React.Fragment>
            <AreaDowntimes dt={downtimes[1].downtime} co={downtimes[1].downtime_co} name={downtimes[1].title} color="#034ea2" />
            <AreaDowntimes dt={downtimes[3].downtime} co={downtimes[3].downtime_co} name={downtimes[3].title} color="#ff2c18" />
            <AreaDowntimes dt={downtimes[2].downtime} co={downtimes[2].downtime_co} name={downtimes[2].title} color="#46b978" />
            <AreaDowntimes dt={downtimes[0].downtime} co={downtimes[0].downtime_co} name={downtimes[0].title} color="#898b8e" />
            <AreaDowntimes dt={downtimes[4].downtime} co={downtimes[4].downtime_co} name={downtimes[4].title} color="#ff6d10" />
        </React.Fragment>
      );
    }
    return fragment;
  }

  renderReports(tool, id) {
    let fragment = null;
    const data = this.props.reports[`${tool}-${id}`];

    if (data) {
      let i = 0;
      fragment = data.map((d) => {
        let icon
        if(d.is_grouped) {
          icon = <img alt="desc" src={groupIcon} width="22px" height="22px"/>
        } else {
          icon = <FaBan style={{ color:  d.color_report }} className={styleDaily.IconParo} />
        }
        if(d.stop.includes('MICROPARO')){
          d.stop = this.props.user.language === 'es' ? 'MICROPARO' : 'MICRODOWNTIME'
          let codEvent = d.start_at.split(" ")[0]
          d.start_at = this.props.user.language === 'es' ? codEvent + ' EVENTOS' : codEvent + ' EVENTS'
          let codMicro = d.detalle_dt.split(" ")[0]
          d.detalle_dt = this.props.user.language === 'es' ? codMicro + ' MICROPARO' : codMicro + ' MICRODOWNTIME'
        }else if(d.stop.includes('BAJA VEL')){
          d.stop = this.props.user.language === 'es' ? 'BAJA VEL.' : 'LOW VEL.'
        }else if(d.stop.includes('PARO')){
          let numParo = d.stop.substring(4,d.stop.length)
          d.stop = this.props.user.language === 'es' ? 'PARO ' + numParo : 'DOWNTIME ' + numParo
        }
        return (
          <div key={`report-${i++}`} className={styleDaily.ColSpacer + ` d-flex`}>           
            <div className="d-flex" style={{width: "600px"}}>
              {icon}
              <div style={{ color:  d.color_report }} className={styleDaily.BoldCell}>                
                {d.stop}
              </div>
            </div>
            <div className="col-2">{d.start_at}</div>
            <div className="col-1">{d.time_total.toFixed(2)} MIN</div>
            <div className="col-7" style={{ textAlign: "left" }}>
              <span style={{ height: "10px", width: "10px", 
                backgroundColor: d.color, borderRadius: "50%", 
                display: "inline-block", borderStyle: "solid",
                borderWidth: "1px", marginRight: "10px" }}>
              </span>          
              {d.detalle_dt}
            </div>
          </div>
        );
      });
    }
    return fragment
  }

  renderRollos(tool, id) {
    let fragment = null;
    const data = this.props.rollos[`${tool}-${id}`];
    if (data) {
      let i = 0;
      fragment = data.map((d) => {
        return (
          <div key={`rollo-${i}`} className={styleDaily.ColSpacer + ` d-flex`}>
            <div className="d-flex col-2">
              <div className={styleDaily.BoldCell}>{`Rollo ${i++}: ${d.numRollo || ""}`}</div>
            </div>
            <div className="col-1">{`Lote: ${d.lote}`}</div>
            <div className="col-2">{`Hora de Ajuste: ${d.start} - ${d.end}`}</div>
            <div className="col-7">{`Duración: ${d.diff}`}</div>
          </div>
        );
      });
    }
    return fragment
  }

  render() {
    let content = (
      <div style={{ display: "flex", felxDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </div>
    );
    if (this.state.loading === false) {
      content = (
        <React.Fragment>
          <DailyReportTable 
            cardTitle={<FormattedMessage id="dpr.DailyReport.summaryMainTitle" defaultMessage="RESUMEN DEL DÍA " />} 
            cardSubtitle={this.state.dateRangeStr} 
            showButton={false} 
            user={this.props.user}
            data={this.props.dpr.headerPrincipal} 
            borderColor="#46b978">
          </DailyReportTable>

          {
            this.props.dpr.shiftDetails && this.props.dpr.shiftDetails.map(shiftStrokes => {
              return (
                <DailyReportTable 
                  cardTitle={shiftStrokes.Description} 
                  cardSubtitle="" 
                  showButton={true} 
                  data={shiftStrokes} 
                  user={this.props.user}
                  onToggleDetail={(status) => this.toggleDetails(shiftStrokes)}>
                  <DailyReportDetailTable>
                    {
                      shiftStrokes.details && shiftStrokes.details.map((d) => {
                        return <DailyReportDetailRow 
                          id={shiftStrokes.Description} 
                          key={guid()} 
                          data={d} 
                          user={this.props.user}
                          paros={this.renderReports(d.workOrderID, shiftStrokes.Description)} 
                          //rollos={this.renderRollos(d.tools, "Turno1")} 
                          onTogglePress={this.toggleInnerRow.bind(this)}/>
                      })
                    }
                  </DailyReportDetailTable>
                </DailyReportTable>
              )
            })
          }
        </React.Fragment>
      );
    }

    return (
        <div className={styleDaily.DprContainer}>
          <div className={`${styleDaily.SectionTitle} ${styleDaily.MainTitle} d-flex`}>
            <FormattedMessage id="dpr.DailyReport.title" defaultMessage="Reporte Diario de Producción" />
          </div>
          
          <div className={`${styleDaily.SectionContent} d-flex flex-column`}>
            <div className={`${styleDaily.FiltersArea} d-flex`}>
              <div className={styleDaily.BoldCell}>
                  <FormattedMessage id="dpr.DailyReport.date" defaultMessage="Fecha" />:
              </div>
              <Datepicker onChange={this.handleDateChange} date={this.state.startDate}/>
              {/* <input type="date" className={styleDaily.SelectInput} value={this.state.startDate} onChange={this.handleDateChange}/> */}
              <RoundedButton className={styleDaily.ButtonCheck} title={
                <FormattedMessage id="dpr.DailyReport.searchBtn" defaultMessage="Revisar" />
              } onClickButton={()=> this.getDowntimes()} />
            </div>

            <div className={styleDaily.AreaSummary}>
              <div className={`${styleDaily.SectionTitle} ${styleDaily.SubTitle}`}>
                <FormattedMessage id="dpr.DailyReport.sumaryTitle" defaultMessage="RESUMEN DE AFECTACIONES" />
              </div>
              <div className={`${styleDaily.AreasOverflow}`}>
                <div className={`${styleDaily.Areas} d-flex`}>
                  {this.renderAreas()}
                </div>
              </div>
              <div className={styleDaily.AreasFooter}>
                <div>
                  <FormattedMessage id="dpr.DailyReport.totalTnr" defaultMessage="Tiempo Total No Reportado: " />
                  <span className={styleDaily.ValueLabel}>{ ((this.props.dpr) ? this.props.dpr.headerPrincipal.time_tnr.toFixed(2) : 0) } min</span></div>
                <div className={styleDaily.BoldCell}>
                  <FormattedMessage id="dpr.DailyReport.totalAffect" defaultMessage="TIEMPO TOTAL AFECTACIÓN: " />
                <span className={styleDaily.ValueLabel}>{this.state.totalTime} min</span></div>
              </div>
            </div>
            {content}
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shifts: state.dailyReport.shifts,
    shiftsStrokes: state.dailyReport.shiftsStrokes,
    downtimes: state.dailyReport.areaDowntimes,
    summary: state.dailyReport.summary,
    dpr: state.dailyReport.dpr,
    secondShift: state.dailyReport.secondShift,
    secondShiftDetail: state.dailyReport.secondShiftDetail,
    reports: state.dailyReport.reports,
    rollos: state.dailyReport.rollos,
    profile: state.prodControl.profile,
    error: state.dailyReport.error,
    user: state.user.session
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchShifts, fetchShiftsRealStrokesHeader, fetchDowntimesPerArea, fetchRealStrokesHeader, fetchDailyReportDetail, fetchToolReports, fetchProfile, fetchRollos, fetchDailyReportData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyReportEnhanced);