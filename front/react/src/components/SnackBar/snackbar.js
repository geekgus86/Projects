import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

// const styles1 = theme => ({
//     success: {
//       backgroundColor: green[600],
//     },
//     error: {
//       backgroundColor: theme.palette.error.dark,
//     },
//     info: {
//       backgroundColor: theme.palette.primary.dark,
//     },
//     warning: {
//       backgroundColor: amber[700],
//     },
//     icon: {
//       fontSize: 20,
//     },
//     iconVariant: {
//       opacity: 0.9,
//       marginRight: theme.spacing.unit,
//     },
//     message: {
//       display: 'flex',
//       alignItems: 'center',
//     },
//   });

class MessageBlock extends React.Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    
    const { vertical, horizontal } = this.state;
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={(this.props.error !== null)}
          autoHideDuration={6000} 
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          variant={this.props.success}
          message={
            <span id="message-id">
                {this.props.message}
            </span>
            }
          action={
              <span>
                  {this.props.icons}
              </span>
          }
        />
      </React.Fragment>
    );
  }
}

export default MessageBlock;