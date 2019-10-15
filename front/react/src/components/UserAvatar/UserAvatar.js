import React from 'react'
import styles from './Avatar.less'

const UserAvatar = (props) => {
  const { name, lastname } = props
  let initials = ""
  if (name && lastname) {
    initials = `${name.toUpperCase().charAt(0)} ${lastname.toUpperCase().charAt(0)}`
  }
  return (
    <React.Fragment>
      <div className={`${styles.MainCard}`}>
        <div className={`${styles.UserInitials}`}>
          {initials}
        </div>
        <div className={`${styles.TxtLabel}`}>
          <span className={`${styles.txt}`}>Usuario</span>
        </div>
      </div>
    </React.Fragment>
  )
}
export default (UserAvatar)