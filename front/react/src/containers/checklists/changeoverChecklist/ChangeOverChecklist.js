import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import ChecklistHeader from 'components/Checklists/ChecklistHeader/ChecklistHeader'
import ChecklistTable from 'components/Checklists/ChecklistTable/ChecklistTable'
import api from 'lib/api'
import moment from 'moment'
import options from './options'
import styles from './ChangeOverChecklist.less'
import ls from "../../../lib/localStorage"
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
        text: JSON.parse(ls.getItem('schema')).fullName,
        value: 1
      },
      group: {
        text: '40155',
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
   this.getTools()
  }

  render() {
    let header = this.header()
    return (
      <div>
        <ChecklistHeader title={
          <FormattedMessage id="checklists.changeoverChecklist.title" defaultMessage="CHECKLIST CHANGEOVER EXTERNO" />
        } onFilterChange={this.handleFilterChange} options={this.state.options} />
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
      type: 0, 
      //day: '2018-08-07',
      // machine: this.state.press.value, 
      tool: this.state.group.value, 
      // enn: this.state.enn.value, 
      end_date: moment(this.state.date).add(1, 'days').format('YYYY-MM-DD'), 
      start_date: moment(this.state.date).subtract(5, 'days').format('YYYY-MM-DD')
    }
    this.setState({ loading: true })
    api.get("/checklists/2", 
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

  getTools = async () => {
    let tools = await api.get("/tool")
    let options = []
    let mappedOptions = tools.data.map(tool => {
      return {
        text: tool.DescTool,
        value: tool.ID
      }
    })
    
    options.push({
      name: 'group',
      options: mappedOptions
    }) 

    this.setState({
      options: options,
      group: mappedOptions[0]
    })

  }

  header = () => {
    return `${this.state.enn.text}/${this.state.press.text}`
  }
}
