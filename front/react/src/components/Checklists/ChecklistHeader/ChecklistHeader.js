import React, { Component } from 'react'
import Select from 'components/Select/Select'
import Datepicker from 'components/Datepicker/Datepicker'
import styles from './ChecklistHeader.less'

export default class ChecklistHeader extends Component {
  

  render() {
    console.log("TOOOOOOOOLS", this.props.options)
    return (
      <div className={styles.HeaderPadd}>
        <div className={styles.container}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.selectContainer}>
            {
              this.props.options && this.props.options.map( (option, index) =>
                <Select key={index} className={styles.filter} options={option.options} onSelect={this[`handle${this.capitalize(option.name)}Select`]} />
              )
            }
            <Datepicker onChange={this.handleDateChange} />
          </div>
        </div>
        <div className={styles.underline}></div>
      </div>
    )
  }

  handleFirstSelect = (value) => {
    this.changeFilter('first', value)
  }

  handleGroupSelect = (value) => {
    this.changeFilter('group', value)
  }

  handlePressSelect = (value) => {
    this.changeFilter('press', value)
  }

  handleDateChange = (value) => {
    this.changeFilter('date', value)
  }

  changeFilter = (filter, value) => {
    this.props.onFilterChange(filter, value)
  }

  capitalize = (str) => {
    return str.replace(/^\w/, c => c.toUpperCase())
  }
}
