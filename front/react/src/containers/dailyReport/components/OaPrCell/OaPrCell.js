import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styles from '../../DailyReport.less'
import { MdTitle } from "react-icons/md";
import Try_out from 'assets/Try-out.png'
import ReactTooltip from 'react-tooltip'
import { FormattedMessage, defineMessages, intlShape } from "react-intl";

const OaPrCell = (props, user) => {
  let colorClass = "";
  let icon = null
  let valueOa = null
  let language = user.language
  if (props.value.percentageOaPr > 85) {
    colorClass = styles.GreenCell;
    icon = <FaArrowUp/>;
  } else {
    colorClass = styles.RedCell;
    icon = <FaArrowDown/>;
  }
  if(props.value.IsTryOut){
    let messageTooltip = <FormattedMessage id="dpr.DailyReport.TryOutToolTip" defaultMessage="" />
    if(language == "es"){
      messageTooltip = "Indicador de Try Out. Los datos de esta fila no se cuentan para la producción del turno o día."
    }else{
      messageTooltip = "TryOut Indicator. The data on this row is not counted towards the shift or day production."
    }
    icon = <img data-tip={messageTooltip} alt='desc' src={Try_out} width='62px' height='22px'/>
    colorClass = styles.BlackCell;
  }else{
    valueOa = (props.value.percentageOaPr <= 100 ?  props.value.percentageOaPr  : 100) +"%"
  }
  return (
    <td className={`${colorClass}`}>
      <div className={`d-flex flex-row justify-content-start align-items-center ${styles.CenterOapr}`}>
        {valueOa}
        {icon}
      </div>
    </td>
  );
}

export default OaPrCell;