import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Check } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  circle : {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "#178CEA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#ffffff",
    fontSize: "70px"
  },
  title: {
    color: "#178CEA",
    fontSize: "24px",
    fontWeight: 600
  },
  text: {
    fontSize: "14px"
  }
}

const SuccessDialog = (props) => {
  const { classes } = props
  const handleClose = () => {
      props.onClose && props.onClose()
  }
  return (
    <Dialog
      open={props.open}
      maxWidth="xs"
      fullWidth={true}
      onBackdropClick={() => handleClose("backdrop")}>
      <DialogContent style={{ textAlign: "center" }} onClick={handleClose}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={24}>
          <Grid item>
            <div className={classes.circle}>
              <Check className={classes.icon} />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.title}>{props.title}</div>
          </Grid>
          <Grid item>
            <div className={classes.text}>{props.text}</div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
	);
};

export default withStyles(styles)(SuccessDialog)