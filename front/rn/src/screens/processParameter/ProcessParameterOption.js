import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { colors } from '../../styles/theme'
import { upperCase } from '../../helpers'
import { SensaiCard } from '../../components'

export class ProcessParameterOption extends Component {
	
    state = {
    	fieldsCompleted : 0,
    	isActive: false
    }
    	
    constructor(props) {
        super(props)
    }

    componentDidMount() {
		this._isActiveOrNot(this.props.activeOption)
    }

    componentWillReceiveProps(nextProps) {     	
    	this._isActiveOrNot(nextProps.activeOption)
    }

    _isActiveOrNot(activeOption) {
		let isActive = (this.props.optionPos === activeOption) ? true : false;    	
		this.setState({ isActive : isActive })
    }
        
	render () {
		const { mainContainer, threeColumns, mainText, counterContainer, counterText, iconContainer, buttonIcon } = styles				
		let colorCounter = !this.props.objectivesFilled.red ? { color : '#243746' } : { color : colors.orangeRed }
		//console.log("colorCounter ", colorCounter)
		let activeColor = this.state.isActive ? [colors.darkGreyBlue, colors.darkGreyBlue] : [colors.azure, colors.ceruleanBlue]

		return (
			<SensaiCard>
			    <TouchableOpacity
			        activeOpacity={0.8}
			        onPress={() => { this.props.onActiveOption(this.props.optionPos) }}>
			        <View style={mainContainer}>
			            <View style={threeColumns}>
			                <Text style={mainText}>{upperCase(this.props.content.name)}</Text>
			                <View style={counterContainer}>
			                    <Text style={[counterText, colorCounter]}>{this.props.objectivesFilled.objectivesFilled + '/' + this.props.content.data.length}</Text>
			                </View>                                
			                <View style={iconContainer}>
			                    <LinearGradient
			                        style={buttonIcon}
			                        colors={activeColor}
			                        startPoint={{ x: 0.0, y: 0.0 }} endPoint={{ x: 0.0, y: 1.0 }}>
			                        <Icon name='arrow-right' size={20} color={colors.white} />                                        
			                    </LinearGradient>                                
			                </View>
			            </View>
			        </View>
			    </TouchableOpacity>
			</SensaiCard> 
		)  
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'column',
		paddingLeft: 15
	},
    threeColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },	
    mainText: {
        flex : 1.3,
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue        
    },	
	counterContainer: {
		flex : 0.4, 
		alignItems: 'center'
	},
    counterText: {
        fontFamily: 'Open Sans',
        fontSize: 18,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left'
    },	
	iconContainer: {
		flex : 0.3, 
		alignItems: 'flex-end'
	},
	buttonIcon: {
	    width: 34,
	    height: 34,
	    borderRadius: 16,
	    backgroundColor: '#FFF',
	    margin: 0,
	    justifyContent: 'center',
	    alignItems: 'center'
	}
})