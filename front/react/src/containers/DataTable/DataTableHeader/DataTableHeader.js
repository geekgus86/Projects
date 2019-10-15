import React, { Component } from 'react'
import styles from './DataTableHeader.less'

export default class DataTableHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: 'enn',
      order: 'desc'
    }
  }
  render() {
    return (
      <tr>
        {
          this.props.headers.map( (header, id) => 
            <td id={`header-${id}`} className={styles.header} key={id} data-value={header.toLowerCase()} onClick={this.handleClick}>{header}</td>
          )
        }
      </tr>
    )
  }

  handleClick = (e) => {
    let newSort = e.target.dataset.value;
    if(newSort === this.state.sort) {
      this.sort(this.state.sort, this.changeOrder(this.state.order))
    } else {
      this.setState({
        sort: newSort,
        order: 'desc'
      }, () => this.sort(this.state.sort, this.state.order))
    }
  }

  changeOrder = (order) => {
    let newOrder = order === 'asc' ? 'desc' : 'asc'
    this.setState({
      order: newOrder
    })
    return newOrder
  }

  sort = (sort, order) => {
    this.props.onSort(sort, order)
  }
}
