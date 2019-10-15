import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../store/user/actions";
import { getUserSession } from "../../store/user/reducer";
import styles from "./Login.less";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import logoMetalsa from "../../assets/logo-metalsa.png";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RoundedButton from '../../components/RoundedButton/RoundedButton'
import { FormattedMessage } from "react-intl";

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({[target.name]: event.target.value});
  }

  handleSubmit(event) {
    const credentials = {
      user: {
        email: this.state.username,
        password: this.state.password,
      }      
    }
    this.props.loginUser(credentials);
    event.preventDefault();
  }

  render() {
    return (
      <div className={`${styles.MainContent}`}>
        <Card raised={true} className={`${styles.CardSize}`}>
          <CardContent className={`col-7 ${styles.ImgSpace}`}>
            <div className={`${styles.BackLogin}`}>
              {/* <img src={logo} width={200} alt="logo" /> */}
            </div>
          </CardContent>
          <CardContent className={`col-5`}>
            <div className={`${styles.LoginMargin}`}>
                <span>
                  <img src={logoMetalsa} width={200} alt="logo" />
                </span>
                <form onSubmit={this.handleSubmit} noValidate autoComplete="off" className={`${styles.FormLogin}`}>
                  <FormControl fullWidth={true} margin={"dense"}>
                    <TextField
                      label={
                        <FormattedMessage id="login.username" defaultMessage="Usuario" />
                      }
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl fullWidth={true} margin={"dense"}>
                    <TextField
                      label={
                        <FormattedMessage id="login.password" defaultMessage="Password" />
                      }
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                  </FormControl>
                  <div className={`${styles.MarginTop} ${styles.login}`}>
                    <RoundedButton type="submit" title="Log in" id="login.loginBtn" />
                  </div>
                </form>
              </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: getUserSession(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);