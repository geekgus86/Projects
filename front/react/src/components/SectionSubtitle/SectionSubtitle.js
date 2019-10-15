import React from 'react'
import styles from './SectionSubtitle.less'

export default (props) => {
  const { SectionSubtitle, SubTitle } =  styles
  return (
    <div className={`${SectionSubtitle} ${SubTitle} d-flex`}>
      <span>{props.subtitle}</span>
      {props.children}
    </div>
  )
}