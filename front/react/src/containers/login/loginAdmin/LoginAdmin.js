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
// import Select from '../../components/Select/Select'

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
          <CardContent className={`col-8 ${styles.ImgSpace}`}>
            <div className={`${styles.BackLogin}`}>
              {/* <img src={logo} width={200} alt="logo" /> */}
            </div>
          </CardContent>
          <CardContent className={`col-4`}>
            <div className={`${styles.LoginMargin}`}>
                <span>
                  <img src={logoMetalsa} width={200} alt="logo" />
                </span>
                <form onSubmit={this.handleSubmit} noValidate autoComplete="off" className={`${styles.FormLogin}`}>
                  <FormControl fullWidth={true} margin={"dense"}>
                    <select>
                      <option>asd</option>
                      <option>asd</option>
                      <option>asd</option>
                    </select>
                    <select>
                      <option>asd</option>
                      <option>asd</option>
                      <option>asd</option>
                    </select>
                    <select>
                      <option>asd</option>
                      <option>asd</option>
                      <option>asd</option>
                    </select>
                    <select>
                      <option>asd</option>
                      <option>asd</option>
                      <option>asd</option>
                    </select>
                  </FormControl>
                  <div className={`${styles.MarginTop} ${styles.adminbtn}`}>
                    <RoundedButton type="outlinedBlue" title="Cerrar Sesión" id="login.loginBtn" />
                    <RoundedButton  type="submit" title="continuar" id="login.loginBtn" />
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