import React, { Component } from 'react'
import ChecklistCard from '../ChecklistCard/ChecklistCard'
import styles from './ChecklistTableHeader.less'

export default class ChecklistTableHeader extends Component {

  constructor(props) {
    super(props)
    let dateCount = props.data.date.length
    let newDateArray = Array.from(props.data.date)
    Array.from({length:8 - dateCount},(v,k)=>k+1).forEach( index =>
      newDateArray.unshift({})
    )
    this.state = { dates: newDateArray }
  }

  render() {
    return (
      <div className={`row`}>
        <div className={`${styles.header} col-4`}>
          <div>{this.props.header}</div>
          <div>{this.props.subHeader}</div>
        </div>
        
        <div className={`col-8 ${styles.ModifyPadd}`}>
          <div className={`row`}>
            {this.state.dates.map( (date, id) => 
              <ChecklistCard key={id} day={date} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
