import React, { PureComponent } from 'react'
import styles from './ChecklistCard.less'
import CustomizedTooltip from '../../Tooltip/tooltip.js'

export default class ChecklistCard extends PureComponent {
  render() {
    return (
      <div className={styles.container + ' col'}>
        <div className={styles.content}>
          <div className={styles.text}>
            <div className={styles.day}>{this.props.day.day1}</div>
            <div className={styles.date}>{this.props.day.day2}</div>
          </div>
          { this.props.day.day1 && 
            // <Tooltip placement="right" title={`Team Member ${this.props.day.group}: ${this.props.day.user}, ${this.props.day.timeTotal} min`}>
            <CustomizedTooltip title={
              <div>
                <p className={`${styles.marginNull}`}>Team Member {this.props.day.group}</p>
                <p className={`${styles.marginNull} ${styles.bold}`}>{this.props.day.user}</p>
                <p className={`${styles.marginNull}`}>{this.props.day.timeTotal} min</p>
              </div>
              }/>
          }
        </div>
      </div>
    )
  }
}