import React, { Component } from "react";
import styles from "./Header.less";
import metalsaLogo from "../../assets/Metalsa-Logo-Blanco_3x.png";
import en from "../../assets/lang-eu.png";
import es from "../../assets/lang-mx.png";
import sensaiLogo from "../../assets/odix-icon-3.svg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import ls from 'lib/localStorage'

import Grid from "@material-ui/core/Grid";


class Header extends Component {

  handleMenuButtonClick() {
    this.props.onMenuButtonClick && this.props.onMenuButtonClick();
  }

  handleSelectorButtonClick() {
    this.props.onSelectorButtonClick && this.props.onSelectorButtonClick();
  }

  handleChange(e){
    let {name, value} = e.target;
    let validaSame = ls.getItem('language');
    if(validaSame != value){
      if(value!='0'){
        ls.setItem('language', value);
        window.location.reload();
      }
    }
  }

  render() {
    const { user, schema } = this.props
    let validaFlag = ls.getItem('language') ? ls.getItem('language') : user.language;
    let flag = null
    let selected = null
    let unselected = null
    let finalSel = null
    let finalUnSel = null
    if(validaFlag=='en'){
      user.language = validaFlag
      user.LocaleID = 2
      flag = en;
      selected = 'en'
      unselected = 'es'
      finalSel = selected + '-US'
      finalUnSel = unselected + '-MX'
    }else{
      user.language = validaFlag
      user.LocaleID = 1
      flag = es;
      selected = 'es'
      unselected = 'en'
      finalSel = selected + '-MX'
      finalUnSel = unselected + '-US'
    }

    return (
      <AppBar position="static" style={{ backgroundColor: "#323D50" }} className={`${styles.MainHeader}`}>
        <Toolbar>
          <Grid container spacing={24}>

            <Grid item xs={2}>

              <Grid container alignItems="center" justify="flex-start" spacing={24}>
                <Grid item xs={3} xl={2}>
                  <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleMenuButtonClick.bind(this)}>
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item xs xl={6}>
                  <img className={`img-fluid ${styles.MetalsaLogo}`} src={metalsaLogo} alt="Metalsa" />
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={7}>
            </Grid>

            <Grid item xs={3} className={styles.RigthMenuContainer} >
            <img  width="20" height="20" src={flag}/>
              <select class="languageselect" onChange={this.handleChange}>
                      <option value={selected} selected>{finalSel}</option>
                      <option value={unselected}>{finalUnSel}</option>
              </select> 
              &nbsp;
              <span className={styles.RigthMenuUser} onClick={this.handleSelectorButtonClick.bind(this)}>
                <span className={styles.SchulerName} >{schema.type} <strong>{schema.name}</strong></span>
                <section className={styles.UserCircleContainer}>
                  <span className={`${styles.GrayCircle}`}>
                    <span className={`${styles.txt}`}>{user.userNameAbbreviated}</span>
                  </span>
                  <ArrowDropDown />
                </section>
              </span>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Header;