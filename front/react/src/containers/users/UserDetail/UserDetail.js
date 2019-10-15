import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import UserAvatar from '../../../components/UserAvatar/UserAvatar'

const styles = {
  bold: {
    fontWeight: "bold",
  },
  margin: {
    marginTop: "10px"
  },
  label: {
    minWidth: "85px"
  }
}
const UserDetail = (props) => {
  const { classes, user } = props
  let fragment = null
  if (user) {    
    const displayName = `${user.nombre || ""} ${user.apellidoPaterno || ""} ${user.apellidoMaterno || ""}`
    
    fragment = (
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <Grid container justify="center">
          <UserAvatar name={user.nombre} lastname={user.apellidoPaterno} size={120} />
        </Grid>
        <Grid container direction="column">
          <Grid container direction="row" className={classes.margin}>
            <div className={classes.label}>Nombre: </div>
            <div className={classes.bold}>{displayName}</div>
          </Grid>
          <Grid container direction="row" className={classes.margin}>
            <div className={classes.label}>Email: </div>
            <div className={classes.bold}>{user.email}</div>
          </Grid>
          <Grid container direction="row" className={classes.margin}>
            <div className={classes.label}>Rol: </div>
            <div className={classes.bold}>{(user.aro && user.aro.alias) || ""}</div>
          </Grid>  
          <Grid container direction="row" className={classes.margin}>
            <div className={classes.label}>TADI: </div>
            <div className={classes.bold}>{user.tadi || ""}</div>
          </Grid>
          <Grid container direction="row" className={classes.margin}>
            <div className={classes.label}>Núm. Nómina: </div>
            <div className={classes.bold}>{user.num_nomina || ""}</div>
          </Grid>            
        </Grid>
      </Grid>
    )
  }  
  return fragment
}
export default withStyles(styles)(UserDetail)