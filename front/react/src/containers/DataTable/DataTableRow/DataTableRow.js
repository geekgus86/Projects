import React, { PureComponent } from 'react'
import styles from './DataTableRow.less'
import stylesTable from '../DataTable.less'

export default class DataTableRow extends PureComponent {
  render() {
    return (
      <tr className={`${styles.row} ${stylesTable.TableContent}`}>
        {
          Object.keys(this.props.row).map( (key, index) =>
            <td key={index} className={styles.cell}>{this.props.row[key]}</td>
          )
        }
      </tr>
    )
  }
}
