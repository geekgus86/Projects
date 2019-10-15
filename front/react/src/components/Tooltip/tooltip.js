import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import PersonOutline from '@material-ui/icons/PersonOutline'
import ErrorIcon from '@material-ui/icons/Error'
import CardStyles from '../Checklists/ChecklistCard/ChecklistCard.less'

const styles = theme => ({
  lightTooltip: {
    color: theme.palette.common.white,
    background: theme.palette.grey[900],
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
  arrowPopper: {
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: '-1em',
      height: '1.7em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.grey[900]}`,
      },
    },
  },
  arrowArrow: {
    position: 'absolute',
    fontSize: 5,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
});

class CustomizedTooltips extends React.Component {
  state = {
    arrowRef: null,
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip
            placement={'left'}
          title={
            <React.Fragment>
                {this.props.title}
              <span className={classes.arrowArrow} ref={this.handleArrowRef} />
            </React.Fragment>
          }
          classes={{ popper: classes.arrowPopper, tooltip: classes.lightTooltip }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(this.state.arrowRef),
                  element: this.state.arrowRef,
                },
              },
            },
          }}
        >

        { this.props.error ? 
        
          <div className={`${CardStyles.error}`}>
              <ErrorIcon className={`${CardStyles.icon}`}/>
          </div>
          : 
          <div className={`${CardStyles.user}`}>
              <PersonOutline className={`${CardStyles.icon}`}/>
          </div>
        
        }
        </Tooltip>
      </React.Fragment>
    );
  }
}

CustomizedTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTooltips);