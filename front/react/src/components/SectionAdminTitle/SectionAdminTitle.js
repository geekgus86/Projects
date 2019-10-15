import React from 'react'
import styles from './AdminTitle.less'

export default (props) => {

  return (
    <div className={`${styles.SectionTitle} ${styles.alignLeft} ${styles.MainTitle} ${styles.Display} ${props.block}`}>
      <p>{props.title}</p>
      <div className={`${styles.Bottom} ${styles.full}`}>
        <div>{props.row1}</div>
        <div>{props.row2}</div>
      </div>
    </div>
    )
}