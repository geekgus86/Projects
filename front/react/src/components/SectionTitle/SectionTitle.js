import React from 'react'
import styles from './SectionTitle.less'

export default (props) => {

  const Class = props.thisclass;

  return (
    <div className={`${styles.SectionTitle} ${styles.alignLeft} ${styles.MainTitle} ${styles.Display}` + Class }>
      <span>{props.title}</span>
      <div className={styles.Bottom}>{props.children}</div>
    </div>
    )
}