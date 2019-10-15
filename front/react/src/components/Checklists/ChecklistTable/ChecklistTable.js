import React, { Component } from 'react'
import ChecklistTableHeader from '../ChecklistTableHeader/ChecklistTableHeader'
import ChecklistTableSection from '../ChecklistTableSection/ChecklistTableSection'
import styles from './ChecklistTable.less'
import { isObjectEmpty } from 'lib/utils'
import { FormattedMessage } from "react-intl";

export default class ChecklistTable extends Component {
  render() {
    return (
      <div className={styles.container + ' container-fluid'}>
      {
        (() => {
          if(!isObjectEmpty(this.props.data)) {
            return (
              <div className={styles.table + ' container-fluid'}>
                <ChecklistTableHeader header={this.props.header} subHeader={this.props.subHeader} data={this.props.data.header} />
                <div className={styles.Overflow}>
                  {
                    Object.keys(this.props.data.datos).map( (key, id) => 
                      <ChecklistTableSection key={id} header={key} data={this.props.data.datos[key]} />
                    )
                  }
                </div>
              </div>
            )
          }
          return <div className={styles.empty}>
            <FormattedMessage id="checklists.ChecklistTable.noDataMsg" defaultMessage="No hay datos que mostrar" />
          </div>
        })()
      }
      </div>
    )
  }
}
