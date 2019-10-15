import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import homeIcon from "../../assets/Home2.png";
import feebackicon from "../../assets/feedback-icon.svg";
import dprIcon from "../../assets/Daily_Production_Report.png";
import hxhIcon from "../../assets/Production_Control_Board.png";
import kpiIcon from "../../assets/KPIS_Dashboard.png";
//import { Link } from "react-router-dom";
// import digiBinderIcon from "../../assets/Digital_Binder.png";
// import rtmIcon from "../../assets/Real_Time_Monitor.png";
// import startupIcon from "../../assets/Startup-Checklist@2x.png";
import realtimeIcon from "../../assets/Real_Time_Monitor.png";
// import changeoverIcon from "../../assets/External-Checklist@2x.png";
import MenuItem from "./MenuItem"
import styles from "./Menu.less"
import { FaYoutube, FaFile } from "react-icons/fa"
//import config from "../../lib/config";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setComments } from '../../store/comments/actions'
import { getUserSession } from '../../store/user/reducer'

class Menu extends Component {
  state = {
    opened: false
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  
  open = () => {
    this.setState({ opened: true, comments: false })
  }
  
  close = () => {
    this.setState({ opened: false, comments: false });
  }
  
  handleToggleComments = () => {
    this.setState({ comments: true })
  }
  
  fetchSendComments = () => {
    this.setState({ comments: false })
    this.props.setComments(this.state.commentsVal, this.props.session)
  }

  setComments = (event) => {
    this.setState({commentsVal: event.target.value })
  }

  render() {
    const { user } = this.props;

    return (
      <Drawer open={this.state.opened} onClose={this.close}>
        <List>
          <MenuItem
            linkClose={this.close}
            text={<FormattedMessage id="menu.home" defaultMessage="Home" />}
            img={homeIcon}
            url="/"
          />

          <MenuItem
            linkClose={this.close}
            img={dprIcon}
            url="/"
            text={<FormattedMessage id="menu.dpr" defaultMessage="Daily Production Report" />}
            videoUrl="https://www.youtube.com/watch?v=g3msSchFJAg&feature=youtu.be"
            fileUrl="https://drive.google.com/open?id=1ZGKvDPNKmzHU6htEleVS5tEfe--j9lYc"
          />

          {/* <MenuItem
            linkClose={this.close}
            url="/track-equipment"
            img={hxhIcon}
            text={<FormattedMessage id="menu.pcm" defaultMessage="Press Condition Monitor" />}
            videoUrl="https://www.youtube.com/watch?v=rRCTYBX8IMA&feature=youtu.be"
          /> */}

          <MenuItem
            linkClose={this.close}
            url="/dsd"
            text={<FormattedMessage id="menu.dsd" defaultMessage="Production Control Board" />}
            img={hxhIcon}
            videoUrl="https://www.youtube.com/watch?v=PoPH2QlK9Uw&feature=youtu.be"
            fileUrl="https://drive.google.com/open?id=1hBKM_RLf_hJt4XYaKnMATl09mBBdR8x3"
          />

          {/* <MenuItem
            linkClose={this.close}
            img={startupIcon}
            text={<FormattedMessage id="menu.initialChecklist" defaultMessage="Checklist Inicial" />}
            videoUrl="https://www.youtube.com/watch?v=9lljFU5u9VU&feature=youtu.be"
            fileUrl="https://drive.google.com/open?id=1n3_ZyYX3xgtvyonyRo5bCFK1NvBlpBeH"
            url="/checklists/initial"
          /> */}

          {/* <MenuItem
            linkClose={this.close}
            img={changeoverIcon}
            text={<FormattedMessage id="menu.externalChecklist" defaultMessage="Checklist Changeover Externo" />}
            videoUrl="https://www.youtube.com/watch?v=VAhd9XA-nCA&feature=youtu.be"
            fileUrl="https://drive.google.com/open?id=1X657i6IDKH4KL40KIO3FSwDzvu6DPtHX"
            url="/checklists/changeover"
          /> */}

          <MenuItem
            linkClose={this.close}
            img={kpiIcon}
            //url="/kpi-dashboard"
            url={(this.props.schema.plant == 2) ? "http://odix.metalsa.com/odix/kpi/etown" : "http://odix.metalsa.com/odix/kpi/apodaca" }
            target="_blank"
            rel="noopener noreferrer"
            text={<FormattedMessage id="menu.kpi" defaultMessage="KPI Dashboard" />}
            videoUrl="https://www.youtube.com/watch?v=K5S_AfQ_568&feature=youtu.be"
            fileUrl="https://drive.google.com/open?id=1KmddtT0Ua67R1stFt1Zc8K6XUcy3Xlo5"
          />          

          <MenuItem
            linkClose={this.close}
            img={dprIcon}
            text={<FormattedMessage id="menu.dataTable" defaultMessage="Tabla de Datos" />}
            url="/data-table"
          />

          {/*<a className={`${styles.MenuItem}`} href={this.props.schema.andonURL + '?lang=' + (user.language || "es")} target="_blank" rel="noopener noreferrer">
            <ListItem button onClick={this.close} className={`${styles.MenuObjs}`}>
              <img src={realtimeIcon} alt="Real Time Monitor" width={28} height={28} />
              <span className={`${styles.MenuContent}`}>
                <span className={`${styles.txt}`}>
                  <FormattedMessage id="menu.rtm" defaultMessage="Real Time Monitor" />
                </span>
                <a href="https://www.youtube.com/watch?v=jvMGtpWTfb0&feature=youtu.be" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                <a href="https://docs.google.com/presentation/d/1E7L96GMNDRaxlMd7LWDlxa5Lk-CvOVwFgOmebZcE7mk/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><FaFile /></a>
              </span>
            </ListItem>
          </a>
        */}

          <MenuItem
            linkClose={this.close}
            img={realtimeIcon}
            url={this.props.schema.andonURL + '?lang=' + (user.language || "es")}
            target="_blank"
            rel="noopener noreferrer"
            text={<FormattedMessage id="menu.rtm" defaultMessage="Real Time Monitor" />}
            videoUrl="https://www.youtube.com/watch?v=jvMGtpWTfb0&feature=youtu.be"
            fileUrl="https://docs.google.com/presentation/d/1E7L96GMNDRaxlMd7LWDlxa5Lk-CvOVwFgOmebZcE7mk/edit?usp=sharing"
          /> 


          {/* <MenuItem
            linkClose={this.close}
            img={digiBinderIcon}
            url="/digital-binder"
            text="Digital Binder"
          // videoUrl="https://www.youtube.com/watch?v=K5S_AfQ_568&feature=youtu.be" 
          // fileUrl="https://drive.google.com/open?id=1KmddtT0Ua67R1stFt1Zc8K6XUcy3Xlo5"
          /> */}

          {/*<ListItem button onClick={this.handleLogoutClicked.bind(this)} className={`${styles.Bold}`}>
            <ListItemText primary={<FormattedMessage id="menu.logout" defaultMessage="Cerrar Sesion"/>}/>
            </ListItem>*/}
        </List>

        {/* Feedback Section */}
        <div className={`${styles.feedback}`}>

          <div className={`${styles.feedback__comment}` + (!this.state.show && 'away')}>
            <div className={`${styles.feedback__comment__title}`}>{<FormattedMessage id="menu.mejorar" />}</div>

            <div className={`${styles.feedback__item}`} onClick={this.handleToggleComments}>
              <img src={feebackicon} alt="" width={20} height={20} />
              <div className={`${styles.feedback__item__text}`}>{<FormattedMessage id="menu.comentario" />}</div>
            </div>

            {
              this.state.comments && (
                <form>
                  <div className={`${styles.feedback__comment__textArea}`}>
                    <textarea cols="42" rows="3" placeholder=" " onChange={this.setComments} />
                  </div>

                  <div className={`${styles.feedback__comment__button}`}>
                    <button type="button" onClick={this.fetchSendComments}> {<FormattedMessage id="menu.enviar" defaultMessage="Send" />} </button>
                  </div>
                </form>
              )
            }
          </div>

        </div>

        {/* //Feedback Section */}

        {/* Report Section */}

        {/* <div className={`${styles.report}`}>

          <div className={`${styles.report__comment}`+ (!this.state.show && 'away')}>
            <div className={`${styles.report__comment__title}`}>Reporta una falla</div>
            <div className={`${styles.report__comment__textArea}`}>
              <textarea cols="42" rows="3" placeholder="Tu opinión es importante, comparte tu experiencia con nosotros"></textarea>
            </div>
            <div className={`${styles.report__comment__button}`}>
              <button type="button"> Reportar </button>
            </div>
          </div>

          <div className={`${styles.report__item}`}>
            <img src={issueicon} alt="" width={20} height={20} />
            <div className={`${styles.report__item__text}`}>Reportar falla</div>
          </div>

        </div> */}

        {/* //Report Section */}

      </Drawer>
    )
  }
}




function mapStateToProps(state) {
  return {
    session: getUserSession(state),
    schema: state.user.schema
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);