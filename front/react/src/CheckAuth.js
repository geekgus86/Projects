import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserSession, setError } from "./store/user/actions";
import { getUserSession } from "./store/user/reducer";
import SnackbarCustom from './components/SnackBar/snackbar.js'
import Home from "./containers/home/Home";
import ChangePress from "./containers/changePress/ChangePress";
import Login from "./containers/login/Login";
import amber from '@material-ui/core/colors/amber'
import FullScreenLoader from "./components/FullScreenLoader/FullScreenLoader";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { IntlProvider, addLocaleData } from "react-intl"
import locale_en from "react-intl/locale-data/en"
import locale_es from "react-intl/locale-data/es"
import messages_en from "./i18n/en.json"
import messages_es from "./i18n/es.json"
import ls from 'lib/localStorage'
import moment from 'moment'
const messages = {
  'en': messages_en,
  'es': messages_es
}

addLocaleData([...locale_en, ...locale_es])

class CheckAuth extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    await this.props.fetchUserSession()
    this.setState({ loading: false });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.setError(null);
  }

  render() {
    
    var background = {
      backgroundColor: amber[700]
    }
    const strSchema = ls.getItem('schema');
    //console.log("language<<<<<<<<<", strSchema.default_lg);
    let content = <FullScreenLoader />;
    let validaLang = null
    
    try{
      validaLang = ls.getItem('language');
    }
    catch(err){
      console.log("LANG INFO","No hay cambios de idioma")
    }

    let language = 'es' 
    let errorMsg = null;
    if (this.state.loading === false) {
      if (this.props.session !== null) {
        console.log("--------->>>", this.props);
        if(validaLang==null){
          language = this.props.session.language || "es";
          ls.setItem('language',this.props.session.language)
        }else{
          language = validaLang
        }
        moment.locale(this.props.session.language || 'es');
        if(ls.getItem('changePress') == 'true'){
          content = <ChangePress />;
        }else{
          content = <Home />;
        }
      } else {
        content = <Login />;
      }
    }
    if (this.props.error !== null) { 
      errorMsg = (
        <SnackbarCustom
          style={background}
          open={(this.props.error !== null)} 
          autoHideDuration={6000} 
          message={this.props.error}
          onClose={this.handleClose}
          icons={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          ]}/>
      )
    }
    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <React.Fragment>
          {content}
          {errorMsg}
        </React.Fragment>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: getUserSession(state),
    error: state.user.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserSession, setError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth);