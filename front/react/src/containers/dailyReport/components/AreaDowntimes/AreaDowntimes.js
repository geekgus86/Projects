import React from "react"
import styles from '../../DailyReport.less'
import './AreaDowntimes.css'

const AreaDowntimes = (props) => {
  return (
    <div className={`d-flex flex-shrink-1 Area-Container  ${styles.col3}`}>
      <div className="d-flex justify-content-center align-items-center Area-Icon" style={{ backgroundColor: props.color}}>
        <div>{props.name.charAt(0)}</div>
      </div>
      <div className="Area-Info">
        <div className="Area-Name" style={{ color: props.color}}>{props.name}</div>
        <table className="Area-Table">
          <tbody>
            <tr>
              <td className="Area-Table-Label">DOWNTIME:</td>
              <td>{props.dt} {props.unit || "min"}</td>
            </tr>
            <tr>
              <td className="Area-Table-Label">C/O:</td>
              <td>{props.co} {props.unit || "min"}</td>
            </tr>
            <tr>
              <td className="Area-Table-Label Bold-Label Uppercase-Label">Total:</td>
              <td className="Bold-Label" style={{ color: props.color }}>{ (props.dt + props.co).toFixed(2) } {props.unit || "min"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AreaDowntimes;