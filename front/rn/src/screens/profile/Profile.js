import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView } from 'react-native'
import { SensaiButton, UserHeader, Chart, NavHeader, Spinner, NavButtons } from '../../components'
import { logoutUser, fetchKpis } from './actions'
import { checkOut } from '../home/actions'
import I18n from '../../i18n/i18n'
import { colors, theme } from '../../styles/theme'
import { tracker } from '../../helpers'
import moment from 'moment-timezone'
import 'moment/locale/es'
import { checkForUpdates, updateLocale } from '../../screens/login/actions'
import { store } from '../../store'
class Profile extends Component {
    state = {
        isLoading: false,
        nav: null,
    }

    constructor(props) {
        super(props)
        this._mounted = false
    }

    componentDidMount() {
        tracker.trackScreenView('Profile')
        this._mounted = true
        this._getKpis()
    }

    componentWillUnmount() {
        this._mounted = false
    }

    onCheckout() {
        this.setState({ isLoading:true })
        tracker.trackEvent('user-actions', 'checkout')
        this.props.checkOut()
    }

    openFeedbackForm() {
        this.props.navigation.navigate('Feedback')
    }

    changeLanguage(){
        store.dispatch(updateLocale(this.props.session.profile.id, (I18n.locale == 'es') ? '2' : '1'))
        I18n.locale = (I18n.locale == 'es') ? 'en' : 'es'
        moment.locale((I18n.locale == 'es') ? 'en' : 'es');
        this.forceUpdate();
        store.dispatch(checkForUpdates())
        
    }

    _getKpis() {
        if(this.props.currentMachine){
            this.setState({ isLoading:true })
            this.props.fetchKpis(this.props.currentMachine.id, false).then(()=>{
                this.setState({ isLoading:false, nav: this.props.kpis.date })
            })
        }
    }

    _getKpisN() {
        this.setState({ isLoading:true })
        this.props.fetchKpis(this.props.currentMachine.id, moment(this.state.nav).add(12, 'hours').format('YYYY-MM-DD HH')).then(()=>{
            this.setState({ isLoading:false, nav: moment(this.state.nav).add(12, 'hours') })
        })
    }

    _getKpisL() {
        this.setState({ isLoading:true })
        this.props.fetchKpis(this.props.currentMachine.id, moment(this.state.nav).add(-12, 'hours').format('YYYY-MM-DD HH')).then(()=>{
            this.setState({ isLoading:false, nav: moment(this.state.nav).add(-12, 'hours') })
        })
    }

    render() {
        const { kpis } = this.props
        let data = {}
        let label = []
        let time = []
        let dataset = {}
        let array = {}
        let attr = 'hora'
        if(kpis.date){
            //Obtener labels del arreglo mayor
            if(kpis.kpis.actual.length < kpis.kpis.last.length){
                array = kpis.kpis.last
            }else{
                array = kpis.kpis.actual
            }
            array.forEach(function(value, i){
                time.push(moment(value[attr], 'YYYY-MM-DD HH:mm:ss').format('hh'))
            });
            //Recorrer ambos arreglos y llenar el dataset
            for (const [key, value] of Object.entries(kpis.kpis)) {
                obj = {}
                value.forEach(function(v, i){
                    obj[moment(v[attr], 'YYYY-MM-DD HH:mm:ss').format('hh')] = v.oa
                });
                label.push(key)
                dataset[key] = obj
            }
            //Llenar datos faltantes
            for (const [key, value] of Object.entries(dataset)) {
                time.forEach(function(v, i){
                    if(!value[v]){
                        value[v] = 0
                    }
                })
            }
            data = {
                time:time, label:label, dataset:dataset
            }
        }
        return (
            <View style={{flex: 1}}>
                <NavHeader
                    settings
                    onSettingsPress={() => {
                        this.props.navigation.navigate('Settings')
                    }}
                    title={I18n.t('screen_profileTitle')}
                    failure={this.props.currentFailure}
                    report={this.props.currentReport}
                />
                <UserHeader session={this.props.session} failure={this.props.currentFailure} report={this.props.currentReport}/>
                {
                    !this.state.isLoading?
                        <ScrollView>
                            
                            
                            
                            
                            {/*this.props.kpis.date&&this.props.currentMachine?
                                <View>
                                    <NavButtons
                                        back = {this._getKpisL.bind(this)}
                                        today = {this._getKpis.bind(this)}
                                        next = {this._getKpisN.bind(this)}
                                        validate = {moment(kpis.date) > moment().add(-24, 'hours')}
                                    />
                                    <Text style={{
                                        flex:1,
                                        textAlign: 'center', 
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {'Actual: '}{moment(kpis.date).add(12, 'hours').format('DD MMM hhA')} 
                                        {' - Last:'}{moment(kpis.date).format('DD MMM hhA')}
                                    </Text>
                                    <Chart 
                                        type = {'Line'} 
                                        data = {data}
                                    />
                                </View>
                                :
                                <SensaiButton
                                    text='Obtener KPIS'
                                    buttonStyle={{ margin: 10 }}
                                    onPress={() => this._getKpis()}
                                    loading={this.state.isLoading}
                                />
                            */}

                            <SensaiButton
                                text={I18n.t('home_change_asset')}
                                buttonStyle={{
                                    marginTop: 10,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginBottom: 10
                                }}
                                loading={this.state.isLoading}
                                onPress={this.onCheckout.bind(this)} />

                            {<SensaiButton
                                text={I18n.t('profile_feedback')}
                                buttonStyle={{
                                    marginTop: 10,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginBottom: 10
                                }}
                                loading={this.state.isLoading}
                                onPress={this.openFeedbackForm.bind(this)} />}
                            {<SensaiButton
                                text={I18n.t('change_language')}
                                buttonStyle={{
                                    marginTop: 10,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginBottom: 10
                                }}
                                loading={this.state.isLoading}
                                onPress={this.changeLanguage.bind(this)} />}
                                
                        </ScrollView>
                    :
                    <Spinner />
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        error: state.session.error,
        kpis: state.kpis,
        currentMachine: state.userMachine.machine,
        currentFailure: state.userMachine.inFailureMode,
        currentReport: state.userMachine.report,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser, fetchKpis, checkOut }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)