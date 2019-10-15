import React, { Component } from 'react'
import { Alert, View, Text, ScrollView, StyleSheet } from 'react-native'

import { colors } from '../../styles/theme'
import { upperCase } from '../../helpers'
import I18n from '../../i18n/i18n'
import { SensaiRow, SensaiCard } from '../../components'
import { ProcessParameterObjective } from './ProcessParameterObjective'

export class ProcessParameterSection extends Component {
	
	state = {
		isLoading : false
	}

	constructor(props) {
		super(props)

		// Properties received from the parent container
		//this.props.rowSize = [2, 1, 1, 1.5, 1.3, 0.2]
		//this.props.containerWidth {flex: 2.7}
		//this.props.objectivePadding [2, 5, 2, 5]
		//this.props.objectiveMargin [10, 12, 10, 10]

		this._setRealObjectiveValue = this._setRealObjectiveValue.bind(this);
	}

	_setRealObjectiveValue(objectivePos, realValue) {
		this.props.setRealValue(this.props.sectionPosBelongs, objectivePos, realValue)	
	}	

	renderHeader () {
		const { headerContainer, header, firstColumnHeader } = styles

		return (
		    <View style={headerContainer}>
		        <SensaiRow sizes={this.props.rowSize}>
		            <Text style={firstColumnHeader}>
		                {upperCase(this.props.name)}
		            </Text>
		            <Text style={header}>
		                {I18n.t('processParameter_2nd_columnHeader')}
		            </Text>		            
		            <Text style={header}>
		                {I18n.t('processParameter_3rd_columnHeader')}
		            </Text>		            
		            <Text style={header}>
		                 {I18n.t('processParameter_4th_columnHeader')}
		            </Text>
		            <Text style={header}>
		                {I18n.t('processParameter_5th_columnHeader')}
		            </Text>
		            <View></View>
		        </SensaiRow>                          
		    </View>  
		)
	}

	renderObjectives () {
		const objectives = 	this.props.objectives.map((objective, i) => {
								return (											
									<ProcessParameterObjective 
										rowSize={this.props.rowSize} 
										key={this.props.sectionPosBelongs + 'objective-' + i} 
										data={objective} 
										objectivePos={i}
										totalObjectives={this.props.objectives.length} 
										setRealValue={this._setRealObjectiveValue}
									/>
								)
							})
		return (
			<View>
				<SensaiRow sizes={this.props.rowSize} margin={{ marginTop: 0, marginBottom: 0}} customStyle={{padding: 0}}>				
					<View></View>
					<View></View>
					<View></View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<View style={{ flexDirection: 'column' }}>						
							<Text style={styles.header}>{I18n.t('alert_yes')}</Text>
						</View>
						<View style={{ flexDirection: 'column' }}>
							<Text style={styles.header}>{I18n.t('alert_no')}</Text>
						</View>
					</View>
					<View></View>
					<View></View>
				</SensaiRow>			
				{objectives}
			</View>
		)
	}

	render () {
		return (
			<View style={{ flex: this.props.containerWidth }}>
				{this.renderHeader()}
				<ScrollView style={{ flexGrow: 0 }}>
					<View style={{ flex : 1 }}>
						<SensaiCard padding={this.props.objectivePadding} margin={this.props.objectiveMargin}>
							{this.renderObjectives()}
						</SensaiCard>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    headerContainer: {
	    borderRadius: 5,
	    backgroundColor: 'rgba(209, 209, 212, 0.5)',
	    margin: 10,
	    padding: 25,
	    paddingTop: 4,
	    paddingBottom: 4,
	    height: 55
    },
    header: {
        fontFamily: 'Gotham Rounded',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.coolGrey
    },
    firstColumnHeader: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue
    }    
})