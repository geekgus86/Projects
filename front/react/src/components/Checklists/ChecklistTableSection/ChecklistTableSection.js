import React, { PureComponent } from 'react'
import styles from './ChecklistTableSection.less'
import ChecklistTableRow from '../ChecklistTableRow/ChecklistTableRow'

export default class ChecklistTableSection extends PureComponent {
  render() {
    return (
      <div className={`${styles.SectionPadd}`}>
        <div className={`${styles.header} row`}>{this.props.header}</div>
        {
          Object.keys(this.props.data).map( (row, id) =>
            <ChecklistTableRow key={id} header={row} data={this.props.data[row]}/>
          )
        }
      </div>
    )
  }
}
