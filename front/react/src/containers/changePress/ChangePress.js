import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../store/user/actions";
import { getUserSession } from "../../store/user/reducer";
import styles from "./ChangePress.less";
import ls from "../../lib/localStorage";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import pressSchema from '../../components/Selector/PressSchema.json'
import plantSchema from '../../components/Selector/PlantSchema.json'
import { setActualSchema } from '../../store/user/actions'

class ChangePress extends Component {
  state = {
    username: "",
    password: "",
    active: false
  }
  shown = []
  constructor(props) {
		super(props);
		this.arrPlant = plantSchema;
		this.arrPress = pressSchema;
			this.state = {
					active: false,
		};
		let sess = this.props.session
		if(sess.LocaleID == 1){
			this.shown = [true,false]
		} else if(sess.LocaleID == 2){
			this.shown = [false,true]
		}
		
  }
	collapse(index){
		this.shown[index] = !this.shown[index]
		this.forceUpdate()
	}

	changePress(press){
		this.props.setActualSchema(press)
		ls.setItem("changePress",false)
		window.location.reload()
	}
	

  render() {
    return (
      <div className={`${styles.MainContent}` }>
        <Card raised={true} className={`${styles.CardSize}`}>
          <CardContent  className={`col-7 ${styles.ImgSpace}`}>
            <div className={`${styles.BackLogin}`}>
              {/* <img src={logo} width={200} alt="logo" /> */}
            </div>
          </CardContent>

         

		{ <CardContent className={`col-5 ${styles.selectPress}`}>
		<div className={`${styles.welcomeTitle}`} >
			<h1 className={ `${this.state.active ? 'your_className': null}`} onClick={this.toggleClass} > Bienvenido a ODiX </h1>
			<h2> Seleccionar Prensa </h2>
		</div>
		<div className={styles.planta} style={{overflowY: 'scroll', height: 300}}>
		{
			this.arrPlant.map((plant,index) => {
				return(
					<div>
						<div onClick={() => this.collapse(index)} className={styles.planta__region}>
							<div className={this.shown[index] ? styles.arrowDown : styles.arrowDownActive}></div>  {plant.label}
						</div>
						<div className={`${styles.planta__prensas}`}>
						{this.arrPress.map((press) => {
							if(this.shown[index] && press.plant == plant.region){
								return(
									<div onClick={() => this.changePress(press)} className={`${styles.planta__prensas__card}`}>
										<div className={`${styles.planta__prensas__card__line}`}>
											{press.fullname}
										</div>
										<div className={`${styles.planta__prensas__card__radio}`}>
											<div className={`${styles.radio}`}>
												<div  className={`${styles.radio__checked}`}></div>
											</div>
										</div>
									</div>
								)
							}
						
						})}
						</div>
					</div>
				)
			
			})
		}
		</div>
           
    </CardContent>}

        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
	session: getUserSession(state),
	schema: state.user.schema,
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setActualSchema }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePress);