import React, { PureComponent } from "react";
import styleDaily from "../../DailyReport.less";
import OaPrCell from "../OaPrCell/OaPrCell";
import { FaAngleDown } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import Tryout from 'assets/Tryout.png'
import ReactTooltip from 'react-tooltip'
import { FormattedMessage, defineMessages, intlShape } from "react-intl";

class DailyReportDetailRow extends PureComponent {
  state = {
    collapsedParos: (this.props.paros === null),
    collapsedRollos: (this.props.rollos === null),
    sectionId: "",
  }

  toggleAccordion(tool, id, section, workOrderID) {
    if (section === "rollos") {
      this.setState({ collapsedRollos: !this.state.collapsedRollos, sectionId: section });
      this.props.onTogglePress && this.props.onTogglePress(tool, id, section, this.state.collapsedRollos, workOrderID);
    } else {
      this.setState({ collapsedParos: !this.state.collapsedParos, sectionId: section });
      this.props.onTogglePress && this.props.onTogglePress(tool, id, section, this.state.collapsedParos, workOrderID);
    }   
  }

  render() {
    const { data, rollos, paros } = this.props;
    const { collapsedParos, collapsedRollos } = this.state;
    let displayStatusRollos = "";
    if (rollos === null) {
      displayStatusRollos = "none";      
    } else {
      displayStatusRollos = (collapsedRollos === true) ? "none" : "table-row";
    }    

    let borderBottom = "1px solid gray";
    let displayStatusParos = "none";      
    if (paros !== null && collapsedParos===false){
        displayStatusParos = "table-row";
    }
    
    if (data.percentageOaPr == null) {
       data.percentageOaPr = 0;
    }
    if (data.changeover <0) {
      data.changeover = 0;
    }
    let isTryOut = "";
    let messageTooltip = <FormattedMessage id="dpr.DailyReport.TryOutToolTip" defaultMessage="" />
    let language = this.props.user.language
    if(language == "es"){
      messageTooltip = "Indicador de Try Out. Los datos de esta fila no se cuentan para la producción del turno o día."
    }else{
      messageTooltip = "TryOut Indicator. The data on this row is not counted towards the shift or day production."
    }
    
    if(data.IsTryOut){
      isTryOut = <img data-tip={messageTooltip} alt='desc' src={Tryout} width='22px' height='22px'/>
    }
    if(data.gspm == null){
      data.gspm = 0
    }
    return (
      <React.Fragment>
        <tbody className={`${styleDaily.TableColor}`}>
          <tr>
            <td className={styleDaily.BoldCell}>
              <p>
                {data.tools}
                {isTryOut}
              </p>
            </td>
            <td>{data.dateperiod}</td>
            <td>{data.tnd}</td>
            <td>{data.veldis}</td>
            <td>{data.RealSpeed}</td>
            <td>{data.gspm}</td>
            <td>{data.golpes}</td>
            <td>{data.num_juliano}</td>
            <td>
              <div className={`d-flex flex-row justify-content-start align-items-center ${styleDaily.centerParo}`} 
                style={{cursor: "pointer"}}
                onClick={() => this.toggleAccordion(data.tools, this.props.id, "rollos")}>
                <div>{data.rollos || 0}</div>
                <FaAngleDown/>
              </div>
            </td>
            <td>{data.scrap}</td>
            <td>{data.retrabajo}</td>
            <td isInt="true" >{data.changeover} min </td>
          
            <td className={styleDaily.BlueCell}>
              <div className={`d-flex justify-content-start align-items-center ${styleDaily.centerParo}`}
                style={{cursor: "pointer"}}
                onClick={() => this.toggleAccordion(data.workOrderID, this.props.id, "paros", data.workOrderID)}>
                {data.paros}
                <FaAngleDown/>
              </div>
            </td>
            <OaPrCell value={data} user={this.props.user} />
          </tr>
          <tr style={{ display: displayStatusRollos }}>
            <td colSpan="13" className={styleDaily.BackWhite}>
              <div>
                {rollos}
              </div>
            </td>
          </tr>
          <tr style={{ display: displayStatusParos, borderBottom: borderBottom }}>
            <td colSpan="13" className={styleDaily.BackWhite}>
              <div>
                {paros}
              </div>
            </td>
          </tr>
        </tbody>
        <ReactTooltip />          
      </React.Fragment>
    );
  }
}

export default DailyReportDetailRow;