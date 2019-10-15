import React, { PureComponent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import RoundedButton from '../RoundedButton/RoundedButton'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class CommentsDialog extends PureComponent {
  handleClose = reason => {
    this.props.onClose && this.props.onClose(reason)
  }

  render() {
    const styles = {
      title : {
        textAlign: 'center',
        color: "#0099ED !important", 
        fontSize: "18px"
      },
      closeBtn: {
        flex: 1,
        marginRight: "10px"
      },
      saveBtn: {
        flex: 1,
        marginLeft: "10px"
      }
    }
    return (
      <Dialog
        open={this.props.open}
        maxWidth="sm"
        fullWidth={true}
        keepMounted
        onBackdropClick={() => this.handleClose("backdrop")}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          {this.props.children}
        </DialogContent>
        <DialogActions>
          <RoundedButton style={styles.closeBtn} onClickButton={() => this.handleClose("close")} type="outlinedBlue" title="Cerrar"/>
        </DialogActions>
      </Dialog>
    )
  }
}
