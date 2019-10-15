import React, { PureComponent } from 'react'
import styles from './ChecklistTableRow.less'
import ChecklistTableCell from '../ChecklistTableCell/ChecklistTableCell'

export default class ChecklistTableRow extends PureComponent {
  constructor(props) {
    super(props)
    let dateCount = props.data.data.length
    let newDateArray = Array.from(props.data.data)
    Array.from({length:8 - dateCount},(v,k)=>k+1).forEach( index =>
      newDateArray.unshift({})
    )
    this.state = { dates: newDateArray }
  }
  render() {
    return (
      <div className={`${styles.row} row align-items-center`}>
        <div className={`${styles.header} col-4 `}>
          <h5>
            {this.props.header}
          </h5>
        </div>
        <div className={`col-8`}>
          <div className={`row ${styles.TxtRow}`}>
            {
              this.state.dates.map( (date, index) =>
                <ChecklistTableCell key={index} data={date} />
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
