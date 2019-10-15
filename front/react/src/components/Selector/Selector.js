import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import styles from "./Selector.less"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { FormattedMessage } from "react-intl";
//import { red } from '@material-ui/core/colors';
import Select from 'components/Select/Select'
import AssetCard from './AssetCard';
import RoundedButton from 'components/RoundedButton/RoundedButton'
import { FormattedMessage } from "react-intl";
import plantSchema from './PlantSchema.json'
import regionSchema from './RegionSchema.json'
import pressSchema from './PressSchema.json'
import { setActualSchema } from '../../store/user/actions'
import { getUserSession } from "../../store/user/reducer";

export class Selector extends Component {
	shown = [false,false]
	mounted = false;
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
			plant: [],
			press: [],
			plantEnable: false,
			pressEnable: false,
			regionSelected: 0,
			plantSelected: 0
		}; // state
		this.arrPlant = plantSchema;
		this.arrPress = pressSchema;
		this.noRegionItem = [{ value: -1, text: 'Seleccione Región', hidden: true }]
		this.noPlantItem = [{ value: -1, text: 'Seleccione Planta', hidden: true }]
		let sess = this.props.session
		let currP = this.props.schema.schema
		// console.log(currP)
		// if(sess.LocaleID == 1 || (currP && currP.includes('apo'))){
		// 	this.shown[0] = true
		// }  
		// if(sess.LocaleID == 2 || (currP && !currP.includes('apo'))){
		// 	this.shown[1] = true
		// }
		setTimeout(() => {
			this.iniciaPrensa()
		}, 250);
		this.optionsRegion = this.noRegionItem.concat(regionSchema.map(x => { return { value: x.value, text: x.label } }))
		this.optionsPlant = this.noRegionItem.concat(plantSchema.map(x => { return { value: x.value, text: x.label, region: x.region } }))
	}

	gPlant = []
	gPress = []

	componentDidMount() {
		this.props.onRef(this);
	}

	componentWillUnmount() {
		this.props.onRef(undefined);
	}

	open = () => {
		this.setState({ opened: true });
	}

	close = () => {
		this.setState({ opened: false });
	}

	iniciaPrensa(){
		if(this.mounted){return}
		this.mounted = true;
		let sess = this.props.session
		let currP = this.props.schema.schema
		console.log(this.props.schema)
		if((currP && !currP.includes('apo'))){
			this.shown[1] = true
			this.shown[0] = false
		}
		if((currP && currP.includes('apo'))){
			this.shown[1] = false
			this.shown[0] = true
		}
	}

	handleLogoutClicked() {
		this.props.onLogout && this.props.onLogout();
	}

	handleSelectRegion = (selectedOption) => {
		console.log(selectedOption)
		if (parseInt(selectedOption.value, 0) > 0) {
			this.gPlant = this.noPlantItem.concat(this.optionsPlant.filter(x => (x.region === parseInt(selectedOption.value, 0) || x.region === 0)))
			this.setState(
				{
					regionSelected: selectedOption.value,
					plantSelected: -1,
					plant: this.gPlant,
					plantEnable: selectedOption.value !== 0,
					pressEnable: false
				}
			)
		} else {
			this.setState({
				regionSelected: selectedOption.value,
				plantSelected: -1,
				plant: [],
				plantEnable: false,
				pressEnable: false
			})
		}
	}

	handleSelectPlant = (selectedOption) => {
		let value = parseInt(selectedOption.value, 0)
		if (value > 0) { 
			this.setState({
				plantSelected: value,
				pressEnable: selectedOption.value !== 0
			})
		} else {
			this.setState({
				plantSelected: value,
				pressEnable: false
			})
		}
	}

	collapse(index){
		this.shown[index] = !this.shown[index]
    this.forceUpdate()
	}

	changePress(press){
		this.props.setActualSchema(press)
		window.location.reload()
	}

	render() {
		const { user } = this.props

		return (
			<Drawer open={this.state.opened} onClose={this.close} anchor={'right'}>

				<section className={styles.RighMenuContainer}>

					<section className={styles.UserContainer}>
						<span className={styles.GrayCircle}>
							<span className={styles.txt}>{user.userNameAbbreviated}</span>
						</span>

						<section className={styles.UserNameContainer}>
							<span className={styles.UserName}>{user.name}</span>
							<br />
							<RoundedButton onClickButton={this.handleLogoutClicked.bind(this)} title={
								<FormattedMessage id="menu.logout" defaultMessage="Cerrar sesión" />
							} type="outlinedWhite" style={{ marginTop: "10px" }} />
						</section>
					</section>

					<section className={styles.SchulersContainer}>
						<span className={styles.ChangeSchulerTitle}>
							<FormattedMessage id="menu.changeSchuler" defaultMessage="CAMBIAR PRENSA" />
						</span>
					</section>
					{/* <br /> 
					<span className={styles.textSubtitle}>
						<FormattedMessage id="menu.selectRegion" defaultMessage="Selecciona región" />:
					</span>
					<Select
						className={styles.filter}
						onSelect={this.handleSelectRegion}
						options={this.optionsRegion}
					/>
					<br />
					{plant &&
						<div>
							<span className={styles.textSubtitle}>
								<FormattedMessage id="menu.selectPlant" defaultMessage="Selecciona planta" />:
						</span>
							<Select
								selected={valuePlant}
								className={styles.filter}
								onSelect={this.handleSelectPlant}
								options={filteredPlant}
							/>
							<br />
						</div>
					}
					{press &&
						<div>
							<span className={styles.textSubtitle}><FormattedMessage id="menu.connectTo" defaultMessage="Conectar a" />:</span>
							{
								this.props.arrAssets.filter(x => x.plant === valuePlant
								).map((asset) => (
									<AssetCard data={asset} schema={this.props.schema} onChangeSchema={this.props.onChangeSchema} />
								))
							}
						</div>
					} */}
						<div className={styles.planta}>
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
																					<div  className={((this.props.schema.schema ==  press.schema) ? `${styles.radio__checked__activated}` : `${styles.radio__checked}`)}></div>
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

            
				</section>
			</Drawer>
		) // return 
	} // render 
} // class
function mapStateToProps(state) {
  return {
		schema: state.user.schema,
    session: getUserSession(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActualSchema }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);