import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { logoutUser, setActualSchema, fetchSchema, fetchChangeLang } from "../../store/user/actions"
import { getUserSession } from "../../store/user/reducer"
import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from "../../Routes"
import Header from "../../components/Header/Header"
import styles from "./Home.less"
import Menu from 'components/Menu/Menu'
import Selector from 'components/Selector/Selector'

class Home extends Component {
	state = {
		isMenuOpened: false
	}

	componentDidMount() {
		this.saveLang(this.props.session.id,this.props.session.LocaleID);
		this.props.fetchSchema()
	}

	handleLogout() {
		this.props.logoutUser()
	}

	openMenu() {
		this.menu.open()
	}

	openSelector() {
		this.selector.open()
	}

	changeSchema = (schema) => (e) => {
		this.props.setActualSchema(schema)
		window.location.reload()
	}

	async saveLang(id,locale){
		await this.props.fetchChangeLang(id,locale);
	}

	render() {

		let user = this.props.session
		const name = user.name.split(" ")
		user.userNameAbbreviated = ((name[0] && name[0][0]) ? name[0][0] : "").toUpperCase() + ((name[1] && name[1][0]) ? name[1][0] : "")

		return (
			<Router>
				<div className={`${styles.App}`}>
					<Header user={user} schema={this.props.schema} onMenuButtonClick={this.openMenu.bind(this)} onSelectorButtonClick={this.openSelector.bind(this)} />
					<Menu onRef={ref => (this.menu = ref)} onSelect={this.handleSelect} user={user} schema={this.props.schema} />
					<section>
						<Routes />
					</section>
					<Selector arrAssets={this.props.arrAssets} onRef={ref => (this.selector = ref)} onLogout={this.handleLogout.bind(this)} user={user} onChangeSchema={this.changeSchema.bind(this)} schema={this.props.schema} />
				</div>
			</Router>
		)
	}

	handleSelect = () => {
		this.setState({
			isMenuOpened: false
		})
	}
}

function mapStateToProps(state) {
	return {
		session: getUserSession(state),
		schema: state.user.schema,
		arrAssets: state.user.arrAssets
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ logoutUser, setActualSchema, fetchSchema, fetchChangeLang }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)