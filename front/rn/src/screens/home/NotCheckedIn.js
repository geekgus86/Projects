import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { CollapsibleHeader } from '../../screens/production/CollapsibleHeader'

import { checkIn, fetchCurrentFailure } from './actions'

import I18n from '../../i18n/i18n'
import { colors } from '../../styles/theme'
import { CardTitle, Spinner, LabelTitle, SensaiCombo, PressCard } from '../../components'
import { calendarFormat } from 'moment';

const IOT_TAG = '[CF:21:F2:FA:9E:82]'

class NotCheckedIn extends PureComponent {
    _mounted = null
    state = {
        isLoading: false,
        selectedLocation: '',
        selectedPlant: ''
    }


    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        this.checkInUser = this.checkInUser.bind(this)

        this.plantScheme = require('../../static/plantScheme')
        this.arrPress = this.plantScheme["arrPress"]
        this.plantComboEnabled = false
        this.shown = []
        this.arrRegions = this.plantScheme["arrRegions"]
        this.arrPlants = this.plantScheme["arrPlants"]
        this.shown[0] = false;
        this.shown[1] = false;
        let currP = this.props.currentPress
        if((this.props.currentUser && (this.props.currentUser.LocaleID == 2))){
            this.shown[1] = true;
        }
        if((this.props.currentUser && (this.props.currentUser.LocaleID == 1))){
            this.shown[0] = true;
        }
        if((currP && currP.name.includes('apo'))){
            this.shown[0] = true;
            this.shown[1] = false;
        }
        if((currP && !currP.name.includes('apo'))){
            this.shown[0] = false;
            this.shown[1] = true;
        }
    }

    componentDidMount() {
        this._mounted = true
    }

    componentWillUnmount() {
        this._mounted = false
    }

    checkInUser(schema) {
        if (this._mounted === true) {
            this.setState({ isLoading: true })
            this.props.checkIn(IOT_TAG, this.props.currentUser.id, schema)
        }
    }

    onLocationChange(val, i) {
        if (val > 0) {
            this.arrPlants = this.plantScheme["arrPlants"].filter(v => v.region == val)
            console.log(this.arrPlants)
            this.plantComboEnabled = true;
            this.arrPress = []
            this.setState({ selectedLocation: val, selectedPlant: 0 });
        } else {
            this.arrPlants = []
            this.plantComboEnabled = false;
            this.arrPress = []
            this.setState({ selectedLocation: val, selectedPlant: 0 });
        }
    }

    onPlantChange(val, i) {
        this.arrPress = this.plantScheme["arrPress"].filter(v => v.plant == val);
        this.setState({ selectedPlant: val });
    }
    render() {

        if (this.state.isLoading) {
            return (<View style={styles.centerVertical}><Spinner /></View>)
        }

        return (
            <ScrollView style={styles.container}>
                <CardTitle title={I18n.t('select_press_menu')} />
                {
                   this.arrPlants.map((plant,index) => {
                       return(
                           <View>
                               <CollapsibleHeader
                                    text={plant.label}
                                    collapse
                                    onPress={()=>{
                                        this.shown[index] = !this.shown[index]
                                        this.forceUpdate()
                                    }}
                                    show={this.shown[index]}
                                />
                                <View>
                                {this.arrPress.map((press) => {
                                    if(this.shown[index] && press.plant == plant.region){
                                        return(
                                            <PressCard
                                                selected={(this.props.currentPress) && (this.props.currentPress.name == press.asset)}
                                                press={press}
                                                buttonStyle={styles.buttonSpacer}
                                                loading={this.state.isLoading}
                                                onPress={this.checkInUser.bind(this, press.schema)} />
                                        )
                                    }
                                
                                })}
                                </View>
                           </View>
                       )
                       
                   })
                   
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    centerVertical: {
        flex: 1,
        justifyContent: "center"
    },
    buttonSpacer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    text: {
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        marginLeft: 25,
        marginRight: 25,
        color: colors.darkGreyBlue
    },
    container: {
        backgroundColor: "#F5F7F9",
        padding: 10
    }
})

function mapStateToProps(state) {
    return {
        currentPress: state.userMachine.currentPress,
        currentUser: state.session.profile,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ checkIn, fetchCurrentFailure }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotCheckedIn)