import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import UserAvatar from '../../../components/UserAvatar/UserAvatar'

const styles = {
  spacer: {
    marginRight: "15px"
  },
  bold: {
    fontWeight: "bold",
  }
}
const UserInfo = (props) => {
  const { classes, user } = props
  let displayName = ""
  if (user.nombre && user.apellidoPaterno) {
    displayName = `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno || ""}`
  } else {
    displayName = user.email
  }
  return (
    <Grid container>
      <Grid item className={classes.spacer}>
        <UserAvatar name={user.nombre} lastname={user.apellidoPaterno} />
      </Grid>
      <Grid item>
        <div className={classes.bold}>{displayName}</div>
        <div>{user.aro.alias}</div>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(UserInfo)