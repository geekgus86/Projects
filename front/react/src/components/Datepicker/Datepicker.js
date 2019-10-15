import React, { Component } from 'react'
import styles from './Datepicker.less'
import moment from 'moment'
import DatePicker from 'material-ui-pickers/DatePicker'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

export default class Datepicker extends Component {
  constructor(props) {
    super(props)
    let incomingDate = moment(this.props.date)
    this.state = {
      now: incomingDate.isValid() ? incomingDate : null
    }
  }  
  render() {
    return (
      <div className={styles.picker}>
        <div className={styles.pickerLabel}>{(this.props.label) ? this.props.label : ''}</div>
        <div className={styles.pickerControl}>
          <DatePicker
            className={styles.input}
            value={this.state.now}
            format={'YYYY-MM-DD'}
            onChange={this.handleChange}
            leftArrowIcon={<KeyboardArrowLeft/>}
            rightArrowIcon={<KeyboardArrowRight/>}
            autoOk={true}
            />
        </div>
      </div>
    )
  }

  handleChange = (date) => {
    this.setState({
      now: date.toDate()
    }, () => {
      this.props.onChange && this.props.onChange(date.toDate())
    })
  }
}
