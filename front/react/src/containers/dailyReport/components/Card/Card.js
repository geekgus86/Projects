import React, { PureComponent } from "react";
import stylesCards from "./Card.less";
import RoundedButton from "../../../../components/RoundedButton/RoundedButton";

class Card extends PureComponent {
  state = {
    buttonText: (this.props.user.language === "es") ? "ver detalles" : "view details"
  }

  buttonPressed = () => {
    const { buttonText } = this.state;
    let { user } = this.props;
    //Fixme please, sometimes dont get the user :( sorry about the fix but it was hard-coded
    if(user===undefined){
      user = {}
      user.language="es"
    }

    const cond = (user.language === "es") ? "ver detalles" : "view details"
    if (buttonText === cond) {
      this.setState({ buttonText: (user.language === "es") ? "ocultar detalles" : "hide details" }, () => {
        this.props.onButtonPress && this.props.onButtonPress({ hidden: true });
      });
    } else {
      this.setState({ buttonText: (user.language === "es") ? "ver detalles" : "view details" }, () => {
        this.props.onButtonPress && this.props.onButtonPress({ hidden: false });
      });
    }   
  }


  render() {
    let cardStyle = {};
    let { user } = this.props;

    console.log(this.props)

    //Fixme please, sometimes dont get the user :( sorry about the fix but it was hard-coded
    if(user===undefined){
      user = {}
      user.language="es"
    }

    const cond = (user.language === "es") ? "ocultar detalles" : "hide details"
    
    if (this.props.borderColor) {
      cardStyle = {border: `solid 1px ${this.props.borderColor}`}
    }
    if (this.state.buttonText === cond) {
      cardStyle = {border: "solid 1px #0099ed"}
    }
    return (
      <div className={`${stylesCards.Card} d-flex flex-column`} style={cardStyle}>
        <div className={`${stylesCards.CardTitle} d-flex justify-content-between`}>
          <div>
            {this.props.title}
            <div className={`${stylesCards.CardSubtitle}`}>{this.props.subtitle}</div>
          </div>
          {(this.props.showButton) ? <RoundedButton title={this.state.buttonText} onClickButton={this.buttonPressed.bind(this)}/> : null}
        </div>
        <div className={`${stylesCards.CardContent}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Card;