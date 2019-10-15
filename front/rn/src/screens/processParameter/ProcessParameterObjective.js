import React, { Component } from 'react'
import { Alert, View, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { colors } from '../../styles/theme'
import I18n from '../../i18n/i18n'
import { SensaiRow, SensaiCheckbox, CardDivider } from '../../components'

export class ProcessParameterObjective extends Component {
	
	state = {
		correspond : -1,
		realValue: "",
		insideRange : false
	}

	constructor (props) {
		super(props)	
		//this.props.rowSize = [2.5, 1, 1.8, 1.5, 0.2] // Property received from the parent component

		this._onChangeRealValueInText = this._onChangeRealValueInText.bind(this)
		this._correspondOrNotToObjective = this._correspondOrNotToObjective.bind(this)
	}
	
	componentDidMount() {
		if (this.props.data.real || this.props.data.real == 0) {
			this._onChangeRealValueInText(this.props.data.real)
			this._correspondOrNotToObjective(this.props.data.real)
		}
	}

	_onChangeRealValueInText(value) {
		let realValue = value.toString();	
		realValue = realValue.replace(/(?!-)[^0-9.]+/g, "") // Removing unwanted characters. Accept just numeric digits and dot

		/*this.setState({ realValue : realValue, correspond : correspond })
		this.props.setRealValue(this.props.objectivePos, realValue);*/
		this.setState({ realValue : realValue, insideRange: (this.props.data.objective == realValue ? true : false) })
		this.props.setRealValue(this.props.objectivePos, realValue);
	}

	_correspondOrNotToObjective(realValue) {
		let { correspond, insideRange } = this.state; 
		correspond = (realValue == this.props.data.objective) ? 1 : 0;

		// Detect if it is MAX Or MIN 
		if ( /MAX/i.test(this.props.data.name) || /MIN/i.test(this.props.data.name) ) {
			let tolerance = this.props.data.objective * 0.10
			
			if (Math.sign(realValue) == -1) { // Returns the sign of a number, indicating whether is pos, neg or zero
				insideRange = ((realValue >= this.props.data.objective + tolerance)
								&& (realValue <= this.props.data.objective - tolerance)) ? true : false				
			} else {
				insideRange = ((realValue <= this.props.data.objective + tolerance)
								&& (realValue >= this.props.data.objective - tolerance)) ? true : false
			}
			console.log("insideRange : ", insideRange)
		}
		
		this.setState({ correspond : correspond, insideRange : insideRange })
	}

	_validate(e) {
		if (this.state.realValue) {
			// If don't acomplish the format -5.0 | -5 | 5.0 | 5 an alert appears
			// #Pass: (1.00), (0.00)		
			if (!/^(\-?[1-9]\d*|0)(\.\d{0,2})?$/.test(this.state.realValue)) {
				Alert.alert(
					I18n.t('processParameter_realValue_validationError_title'),
					I18n.t('processParameter_realValue_validationError_msg'),
					[
						{	text: I18n.t('ok'), 
							onPress: () => {							
								this.setState({ 
									realValue : '' 
								}, () => {
									 this.props.setRealValue(this.props.objectivePos, undefined)
									 this.input.focus()
								})
							}
						}
					],
					{ 
						onDismiss: () => {
							this.setState({ 
								realValue : '' 
							}, () => {
								this.props.setRealValue(this.props.objectivePos, undefined)
								this.input.focus()
							})
						} 
					},
					{ cancelable: false }
				)			
			} else {
				this._correspondOrNotToObjective(this.state.realValue)
			}
		} else {
			this.setState({ 
				correspond : -1 
			}, () => {
				this.props.setRealValue(this.props.objectivePos, undefined);	
			})
			
		}
	}

	render () {
		const { mainContainer, rowDescriptionText, rowText, checkStyle, checkContainerStyle, inputStyle, iconTrendContainer } = styles		
		let firstObjectiveStyle = {}

		if (this.props.posObjective == 0) {
			firstObjectiveStyle = { marginTop : 0, paddingTop: 10 }
		}

		let iconColor, icon;
		if (this.state.insideRange) {
			iconColor = { backgroundColor : colors.green }
			icon = 'trending-up'
		} else {
			iconColor = { backgroundColor : colors.orangeRed }
			icon = 'trending-down'
		}

		return (
			<View>
				<View style={[mainContainer, firstObjectiveStyle]}>
					<SensaiRow sizes={this.props.rowSize}>
						<View>
							<Text style={rowDescriptionText}>{this.props.data.name}</Text>
						</View>
						<View>
							<Text style={rowText}>{this.props.data.objective}</Text>
						</View>
						<View> 
							<Text style={rowText}>
								{this.props.data.old || this.props.data.old == 0 ?  this.props.data.old : '-'}
							</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <SensaiCheckbox
                                label={''}
                                checkStyle = {checkStyle}
                                checkContainerStyle = {checkContainerStyle}
                                checked={this.state.correspond==1}
                                onChange={(value) => {
                                	let correspond = this.state.correspond == 1 ? -1 : 1;
                                    const realValue = correspond == 1 ? this.props.data.objective : "";
                                    this.setState({ realValue : realValue, correspond : correspond, insideRange: true })
                                    this.props.setRealValue(this.props.objectivePos, realValue)
                                }} 
                            />
                            <SensaiCheckbox
                                label={''}
                                checkStyle = {[checkStyle, { marginLeft: 10 }]}
                                checked={this.state.correspond==0}
                                onChange={(value) => {                                	                              
                                	let correspond = this.state.correspond == 0 ? -1 : 0;
                                    this.setState({ realValue : '', correspond: correspond })
                                    this.props.setRealValue(this.props.objectivePos, undefined)
                                }} 
                            />
						</View>
						<View>
					        {	this.state.correspond == 0 ?
							        <TextInput
							          ref={input => { this.input = input }}
							          style={inputStyle}
							          autoCorrect={false}
							          autoFocus={true}
							          keyboardType={"numeric"}
							          autoCapitalize="none"
							          underlineColorAndroid='transparent'
							          value={`${this.state.realValue}`}
							          onChangeText={this._onChangeRealValueInText}
							          onBlur={this._validate.bind(this)}
							        />
								: <Text style={rowText}>{this.state.realValue}</Text>
					        }
						</View>
						{ this.state.correspond > -1 && this.state.realValue !== '' ?
							<View style={[iconTrendContainer, iconColor]}>
								{ this.state.correspond > -1 ? <Icon name={icon} size={20} color={colors.white} /> : null }
							</View>
						  : null								
						}
					</SensaiRow>
				</View>
				{ this.props.objectivePos == this.props.totalObjectives - 1 ? null : <CardDivider /> }
			</View>
		)
	}
}

const styles = StyleSheet.create({
    mainContainer: {
		padding: 15,
		paddingTop: 5,
		paddingBottom: 5, 
		margin: 10
    },
    rowDescriptionText: {
        fontFamily: 'Open Sans',
        fontSize: 18,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: '#243746'
    },
    rowText: {
        fontFamily: 'Open Sans',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'center',
        color: '#243746'    	
    },
    checkStyle: {
        paddingTop: 10,
        paddingBottom: 0, 
        width: '25%' 
    },
	checkContainerStyle: {
		paddingBottom:0, 
		margin:0, 
		marginLeft: 6, 
		width: '100%', 
		justifyContent: 'flex-start'
	},
    inputStyle: {
        width: '55%',
        height: 40,
        borderRadius: 2,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.silver,
        fontFamily: 'OpenSans',
        fontSize: 18,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.coolGrey,
        paddingLeft: 4,
        paddingRight: 4,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 40
    },
    iconTrendContainer: {
		width: 22, 
		height: 22, 
		marginLeft: 10, 
		borderRadius: 4, 
		padding: 1
    }	    
})