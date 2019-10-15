import React, { PureComponent } from 'react'
import styles from './ChecklistTableCell.less'
import Close from '@material-ui/icons/Close'
import CustomizedTooltip from '../../Tooltip/tooltip.js'

export default class ChecklistTableCell extends PureComponent {
  constructor(props) {
    super(props)

    let date = Object.keys(props.data)[0]
    let statusClass
    let comment

    if(date) {
      statusClass = props.data[date].status ? styles.success : styles.alert
      comment = props.data[date].comment
    }

    this.state = { 
      statusClass: statusClass,
      comment: comment
    }
  }
  render() {
    return (
      <div className={styles.cell + ' col justify-content-center'}>
        <div className={styles.status + ' ' + this.state.statusClass}>
          {
            this.state.statusClass === styles.alert &&
            <CustomizedTooltip error title={this.state.comment}>
              <Close />
            </CustomizedTooltip>
          }
        </div>
      </div>
    )
  }
}
