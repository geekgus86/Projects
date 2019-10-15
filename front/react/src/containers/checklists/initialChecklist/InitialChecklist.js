import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import ChecklistHeader from 'components/Checklists/ChecklistHeader/ChecklistHeader'
import ChecklistTable from 'components/Checklists/ChecklistTable/ChecklistTable'
import api from 'lib/api'
import moment from 'moment'
import options from './options'
import styles from './InitialChecklist.less'
import { FormattedMessage } from "react-intl";

export default class InitialChecklist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      enn: {
        text: 'ENN 6',
        value: 6
      },
      press: {
        text: 'SCHULER A',
        value: 1
      },
      group: {
        text: 'Grupo A',
        value: 1
      },
      date: new Date(),
      data: null,
      loading: false
    }
    this.options = options
  }

  componentDidMount() {
   this.getNewData()
  }

  render() {
    let header = this.header()
    return (
      <div>
        <ChecklistHeader title={
          <FormattedMessage id="checklists.InitialChecklist.title" defaultMessage="CHECKLIST INICIAL" />
        } onFilterChange={this.handleFilterChange} options={this.options} />
        {
          (() => {
            if (!this.state.loading) {
              return <ChecklistTable header={header} subHeader={this.state.group.text} data={this.state.data}/>
            }
            return <div className={styles.progressContainer}><CircularProgress color="inherit" /></div>
          })()
        }
      </div>
    )
  }

  handleFilterChange = ((filter, value) => {
    let newState = {}
    newState[filter] = value
    this.setState( newState, () => this.getNewData())
  })

  getNewData = () => {
    let params = {
      // machine: this.state.press.value, 
      group: this.state.group.value, 
      // enn: this.state.enn.value, 
      start_date: moment(this.state.date).subtract(5, 'days').format('YYYY-MM-DD'),
      end_date: moment(this.state.date).add(1, 'days').format('YYYY-MM-DD')
    }
    this.setState({ loading: true })
    api.get("/checklist/1", 
        params).then( (response) => {
          let success = false
          if(response.data) {
            if(response.data.datos) {
              if (response.data.datos.header) {
                if(response.data.datos.header.date.length > 0) {
                  success = true
                }
              }
            }
          }
          this.setState({
            data: success ? response.data.datos : null,
            loading: false
          })
        }
    )
  }

  header = () => {
    return `${this.state.enn.text}/${this.state.press.text}`
  }
}
