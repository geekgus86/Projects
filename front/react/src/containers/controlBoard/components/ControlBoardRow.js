import React, { PureComponent } from "react";
import styles from "../ControlBoard.less";
import { FaCheck, FaBan } from "react-icons/fa";
import moment from "moment-timezone";
import "moment/locale/es";
import { guid } from "../../../lib/utils";
import groupIcon from 'assets/group.png'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { MdTitle } from "react-icons/md";
import Tryout from 'assets/Tryout.png'

class ContolBoardRow extends PureComponent {
  state = {
    collapsed: true
  }

  toggleAccordion() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const displayStatus = (this.state.collapsed === true) ? "none" : "table-row";
    const { data } = this.props;
    const hour1 = data.dateperiod.split('-')[0].trim();
    const hour2 = data.dateperiod.split('-')[1].trim();

    let sumMicroDowntimes = (data.downtimes && data.downtimes['7']) || (data.downtimes && data.downtimes['null'])
        sumMicroDowntimes = (sumMicroDowntimes === 0) ? "< 1" : (Math.round(sumMicroDowntimes) || 0) 
    let oa_h = (data.oa_h || 0) + "%";
    let oa_a = (data.oa_a || 0) + "%";
    if(data.is_try_out){
      oa_h = <img alt='desc' src={Tryout} width='22px' height='22px'/>
      oa_a = <img alt='desc' src={Tryout} width='22px' height='22px'/>
    }

    return (
      <React.Fragment>
        <tr className={`${styles.RowColor}`}>
          <td className={`${styles.CenteredCell}  `}>
            <div>{hour1}</div>
            <div>{hour2}</div>
          </td>
          <td className={`${styles.CenteredCellTool}`}>
            <p>{
              data.tool
            }</p>
          </td>
          <td className={`${styles.CenteredCell}  `}>{data.spm}</td>
          <td className={` `}>
            <div className={`d-flex justify-content-around`}>
              <div>{data.piezas_p}</div>
              <div>{data.acumulado_p}</div>
            </div>
          </td>
          <td className={` `}>
            <div className={`d-flex justify-content-around`}>
              <div className={`${styles.CenteredCellStrokeR}`}>{data.piezas_s}</div>
              <div>{data.acumulado_r}</div>
            </div>
          </td>
          <td className={`${styles.CenteredCell} ${styles.thisWhite}`}>{oa_h}</td>
          <td className={`${styles.CenteredCell} ${styles.ThisBack}`}>{oa_a}</td>
          <td className={`${styles.thisWhite}`}>
            <div className={`d-flex justify-content-around`} onClick={this.toggleAccordion.bind(this)}>
              <div className={`${styles.AreaIndicator} ${styles.BlueCircle}`}>{Math.round(data.downtimes && data.downtimes['2']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.RedCircle}`}>{Math.round(data.downtimes && data.downtimes['4']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.GreenCircle}`}>{Math.round(data.downtimes && data.downtimes['3']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.OrangeCircle}`}>{Math.round(data.downtimes && data.downtimes['6']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.GrayCircle}`}>{Math.round(data.downtimes && data.downtimes['1']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.BlackCircle}`}>{Math.round(data.downtimes && data.downtimes['tnr']) || 0}</div>
            </div>
          </td>
          <td className={` `}>
            <div className={`d-flex justify-content-around`} onClick={this.toggleAccordion.bind(this)}>
              <div className={`${styles.AreaIndicator} ${styles.BlueCircle}`}>{Math.round(data.coDowntimes && data.coDowntimes['2']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.RedCircle}`}>{Math.round(data.coDowntimes && data.coDowntimes['4']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.GreenCircle}`}>{Math.round(data.coDowntimes && data.coDowntimes['3']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.OrangeCircle}`}>{Math.round(data.coDowntimes && data.coDowntimes['6']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.GrayCircle}`}>{Math.round(data.coDowntimes && data.coDowntimes['1']) || 0}</div>
              <div className={`${styles.AreaIndicator} ${styles.BlackCircle}`}>{Math.round(data.coDowntimes && data.coDowntimes['tnr']) || 0}</div>
            </div>
          </td>
          <td className={`${styles.CenteredCell} ${styles.thisWhite}`}>
            {sumMicroDowntimes}
          </td>
          <td className={`${styles.CenteredCell}  `}>
            {data.total ? Math.round(data.total) : '00'}
          </td>
          <td className={`${styles.CenteredCell} ${styles.thisWhite}`}>
            {Math.round(data.downtimes && data.downtimes['5']) || 0}
          </td>
          <td className={`${styles.CenteredCell}   `}>
            <div className={`d-flex justify-content-around`}>
              <FaCheck />
              <FaCheck />
            </div>
          </td>
        </tr>
        <tr style={{ display: displayStatus, backgroundColor: "#fff"}} className={`  `}>
          <td colSpan="16">
              {
                data.reports && data.reports.map((r) => {
                
                  let recordDesc = (r.id !== null) ? `${r.code} - ${r.desc}`: (<FormattedMessage id="controlBoard.noReportedTime" defaultMessage="Tiempo No Reportado" />);  
                  if (r.id === null && r.diff < 1) { 
                    recordDesc = (<FormattedMessage id="controlBoard.microdowntimes" defaultMessage="O998 - MICROPAROS" />);
                  }    

                  let recordType = this.props.intl.formatMessage({ id: 'controlBoard.downtime' }, { defaultMessage: 'Paro' })
                  
                  if(r.group){
                    recordType += " #" + r.group.ReportNumber;
                   }else if(r.report_number){
                      recordType += " #" + r.report_number
                  }
                  if(r.report_division){
                      recordType += " " + r.report_division
                  }

                  let iconBackGroundColor = "#FC0D1B"
                  let recordTypeColor = "#FC0D1B"
                  var prc = r.diff.toFixed(2)
                  if(r.report_type === 1 && r.report_status === 19){ //Baja Vel
                      recordType = (<FormattedMessage id="controlBoard.slowSpeed" defaultMessage="Baja vel." />)                  
                      recordTypeColor = "#8E65BA"
                      iconBackGroundColor = "#8E65BA"    
                      //prc = r.prcalc                      
                  }else if(r.report_type === 2){ //Changeover
                      recordType = this.props.intl.formatMessage({ id: 'controlBoard.changeover_dim' }, { defaultMessage: 'C/O' }) + " " + r.report_division
                      recordTypeColor = "#F49C20"   
                      iconBackGroundColor = "#F49C20"                              
                  }

                  let icon
                  if(r.is_grouped) {
                    iconBackGroundColor = 'transparent'
                    icon = <img alt="desc" src={groupIcon} width="26px" height="26px"/>
                  } else {
                    icon = <FaBan />
                  }

                  return (
                    <div key={guid()} className={`d-flex ${styles.ReportsContainer}`}>
                      <div className={`d-flex justify-content-center align-items-center ${styles.ReportIcon}`} style={{backgroundColor: iconBackGroundColor}}>
                        {icon}
                      </div>
                      <div className={`${styles.ReportLabel}`} style={{color: recordTypeColor}}>
                          {recordType}
                      </div>
                      <div style={{width: "140px"}}>
                        {`${moment.parseZone(r.createdAt).format("h:mm a")} - ${moment.parseZone(r.closedAt).format("h:mm a")}`}
                      </div>
                      <div style={{width: "80px"}}>
                        {`${prc} min`}
                      </div>
                      <div className={`d-flex flex-row`} style={{marginRight: "30px"}}>
                        <div className={`${styles.ReportDesc}`} style={{backgroundColor: r.color}}></div>
                        <div>{recordDesc}</div>
                        <div style={{fontWeight: 600}}>{r.comments || ""}</div>
                      </div>
                    </div>
                  );
              })}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

ContolBoardRow.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(ContolBoardRow);