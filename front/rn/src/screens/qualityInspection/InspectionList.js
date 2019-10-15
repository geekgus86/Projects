import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { colors } from '../../styles/theme'
import { SensaiButton, SensaiRow, SensaiCard, Spinner, CardDivider, CardHeader } from '../../components'
import { upperCase } from '../../helpers'
import { getInspectionList } from './actions'
import moment from "moment-timezone";
import I18n from '../../i18n/i18n'
import Icon from "react-native-vector-icons/FontAwesome"
import { subscribeTo, unsubscribe } from '../../lib/Socket';

const styles = StyleSheet.create({
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
    },
    subText: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        marginTop: 5
    },
    headerContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        padding: 10,
    },
    headerText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    subHeaderText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    toolTitle: {
        fontFamily: "Gotham Rounded",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#898b8e"
    },
    toolTimeRange:{
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#243746"
    },
    toolLabelView: {
        borderRadius: 5,
        padding: 5,
        height: 30,
    },
    toolLabelText: {
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    },
    label: {
        fontWeight: 'bold'
    },
    subCard: {
        marginLeft: 15,
    },
    greyInspection: {
        borderStyle: "dashed",
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: 5,
        padding: 20,
        margin: 15
    }
})

var hasLastInspection = false;
var hasMiddleInspection = false;

class InspectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: {},
            hits: 0 ,
            drId: null,
            hasMiddleInspection: false,
            hasLastInspection: false,
            modalLast: false
        }
        this.getInspectionCard = this.getInspectionCard.bind(this);
        this.newInspection = this.newInspection.bind(this);
        this.getRows = this.getRows.bind(this);
        this.getLastInspection = this.getLastInspection.bind(this);
        this.getMiddleInspection = this.getMiddleInspection.bind(this);
        this.hitReceived = this.hitReceived.bind(this);
        this.getFirstInspection = this.getFirstInspection.bind(this);
        subscribeTo("prodtrack", this.hitReceived);
    }

    state = {
        isLoading : true
    }

    async componentWillMount() {
        if(this.props.navigation.state.params && this.props.navigation.state.params.id) {
            this.setState({
                tool: this.props.navigation.state.params.code,
                drId: this.props.navigation.state.params.id
            })
            await this.props.getInspectionList(this.props.navigation.state.params.id);
        }

        if(!this.props.inspection.dailyreport){
            Alert.alert(I18n.t('alert_notice'), I18n.t('qualityInspection_no_inspection_items'));
            this.props.navigation.navigate("Home");
        }

    }

    async hitReceived(data){
        await this.setState({hits: data.BoxingPartCounter});
    }

    newInspection(data) {
        if(data.type == "new"){
            if(this.state.hits > this.props.inspection.dailyreport.golpes_total / 2){
                data.type = "middle";
            }
        }
        this.props.navigation.navigate('InspectionSheet', {id: this.state.drId, drId: this.props.inspection.dailyreport.id, type: data.type, code: this.state.tool})
    }

    componentWillUnmount(){
        unsubscribe("prodtrack");
    }

    getTimeFromMins(mins) {

        var h = mins / 60 | 0,
            m = mins % 60 | 0;
        return moment.utc().hours(h).minutes(m).format("hh:mm:ss");
         
    }

    getFirstInspection(){
        if(this.props.inspection.inspections.length == 0 ){
            return (
                <View style={[styles.greyInspection, styles.twoColumns]}>
                    <View>
                        <Text style={styles.toolTitle}>{upperCase(I18n.t('qualityInspection_start_piece'))}</Text>
                        <Text style={{fontWeight: "400"}}>{I18n.t('qualityInspection_first_strike')}</Text>
                    </View>
                    <View>
                    </View>
                </View>
            )
        } 
    }

    getMiddleInspection(){
        let exists = false; 
        hasMiddleInspection = false;

        if(this.props.inspection && this.props.inspection.dailyreport){

            let totalHits = this.props.inspection.dailyreport.golpes_total / 2;
            let timeMin = totalHits / 20;
            let time = this.getTimeFromMins(timeMin);

            for(let inspection of this.props.inspection.inspections){
                if(inspection.mediumTrend || inspection.lastTrend){
                    exists = true;
                }
            }

            if(!exists){
                return(
                    <View style={[styles.greyInspection, styles.twoColumns]}>
                        <View>
                            <Text style={styles.toolTitle}>{upperCase(I18n.t('qualityInspection_middle_piece'))}</Text>
                            <Text style={{fontWeight: "400"}}>{I18n.t('qualityInspection_program_at')} {totalHits.toFixed(0)} {I18n.t('qualityInspection_strikes')}</Text>
                        </View>
                        <View>
                            <Text>{I18n.t('qualityInspection_estimated_time')}:</Text>
                            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                                <Icon style={{marginTop: 4, marginRight: 2}} name={"hourglass"} size={14} color={"#52c0d3"}/>
                                <Text style={styles.toolTitle}>{time}</Text>
                            </View>
                        </View>
                    </View>
                );
            }else{
                hasMiddleInspection = true;
            }

        }

    }

    getLastInspection(){

        let exists = false;
        hasLastInspection = false;

        if(this.props.inspection && this.props.inspection.dailyreport){
            
            let totalHits = this.props.inspection.dailyreport.golpes_total - 100;
            let RemainingHits = this.props.inspection.dailyreport.golpes_total - this.state.hits;
            let timeMin = RemainingHits / 20;
            let time = this.getTimeFromMins(timeMin);
            
            for(let inspection of this.props.inspection.inspections){
                if(inspection.lastTrend){
                    exists = true;
                }
            }

            if(!exists){
                return (
                    <View style={[styles.greyInspection, styles.twoColumns]}>
                        <View>
                            <Text style={styles.toolTitle}>{upperCase(I18n.t('qualityInspection_end_piece'))}</Text>
                            <Text style={{fontWeight: "400"}}>{I18n.t('qualityInspection_program_at')} {totalHits} {I18n.t('qualityInspection_strikes')}</Text>
                        </View>
                        <View>
                            <Text>{I18n.t('qualityInspection_estimated_time')}:</Text>
                            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                                <Icon style={{marginTop: 4, marginRight: 2}} name={"hourglass"} size={14} color={"#52c0d3"}/>
                                <Text style={styles.toolTitle}>{time}</Text>
                            </View>
                        </View>
                    </View>
                );
            }else {
                hasLastInspection = true;
            }
        
        }

    }

    getInspectionCard(ins){
        const startDate = moment(ins.hour, "HH:mm:ss").add(2, "hours").utc().format("hh:mm A")
        // const endDate = moment(ins.fin).utc().format("hh:mm A")

        const statusStr = (i) => [
            I18n.t("qualityInspection_s_noaprobada"),
            I18n.t("qualityInspection_s_aprobada"),
        ][i].toUpperCase()
        let sub_inspections = null;
        if(ins.sub_inspections && ins.sub_inspections.length > 0) {
            sub_inspections = (
                <View style={styles.subCard}>
                    {ins.sub_inspections.map(this.getInspectionCard)}
                </View>
            )
        }

        let title = <Text style={styles.toolTitle}>{I18n.t('qualityInspection_inspeccion')} #{ins.secuentialNumber}</Text>;
        if(ins.secuentialNumber == "1") {
            title = <Text style={styles.toolTitle}>{upperCase(I18n.t('qualityInspection_start_piece'))} ({I18n.t('qualityInspection_inspeccion')} #{ins.secuentialNumber})</Text>;
        }
        return (
            <View key={ins.id}>
                <SensaiCard>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{}}>
                        {/* <Text>{JSON.stringify(ins)}</Text> */}
                        <View style={styles.twoColumns}>
                            <View>
                                {title}
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.toolTimeRange,styles.label]}>{I18n.t('qualityInspection_timeLbl')}</Text>
                                    <Text style={styles.toolTimeRange}> {startDate}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.toolTimeRange,styles.label]}>{I18n.t('qualityInspection_tecnicoLbl')}</Text>
                                    <Text style={styles.toolTimeRange}> {ins.inspector}</Text>
                                </View>
                            </View>
                            <View style={[styles.toolLabelView,{backgroundColor: (ins.success == 1) ? "#46b978" : "#ff2c18"}]}>
                                <Text style={styles.toolLabelText} >{statusStr(ins.success)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </SensaiCard>
                {sub_inspections}
            </View>
        )
    }

    getRows() {
        const rows = []
        if(this.props.inspection == null ) {
            return <Text>asdasd</Text>
        }
        return this.props.inspection.inspections.map(this.getInspectionCard);
    }

    render() {
        if(!this.props.inspection) {
            return <Spinner />;
        }
        const nowDate = moment(new Date()).utc().format("DD MMM, YYYY")
        return (
            <View>

                <View>
                    <Modal transparent={true} visible={this.state.modalLast} animationType="fade" onRequestClose={() => this.setState({modalLast: false})}>
                        <View style={{height: "100%", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                            <View style={{width: "50%", marginLeft: "25%"}}>
                                <SensaiCard>
                                    <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 17}}>{I18n.t('qualityInspection_register_last_inspection')}</Text>
                                    <Text style={{textAlign: "center", marginTop: 10}}>{I18n.t('qualityInspection_register_last_inspection_adv')}</Text>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
                                        <View style={{width: "49%"}}><SensaiButton onPress={() => this.setState({modalLast: false}, () => this.newInspection({type: "last"}))} text={I18n.t('qualityInspection_accept')}/></View>
                                        <View style={{width: "49%"}}><SensaiButton outline={true} onPress={() => this.setState({modalLast: false})} text={I18n.t('processParameter_cancel_text')}/></View>
                                    </View>
                                </SensaiCard>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_title'))}</Text>
                    <Text style={styles.subHeaderText}>{I18n.t('qualityInspection_no_part')}: {this.state.tool}</Text>
                </View>
                <ScrollView>
                    {this.getRows()}
                    {this.getFirstInspection()}
                    {this.getMiddleInspection()}
                    {this.getLastInspection()}
                    {!hasLastInspection &&<View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{width: "48%"}}><SensaiButton text={I18n.t('qualityInspection_register_new_inspection')}  buttonStyle={{margin: 10, flex: 1}} onPress={() => !hasLastInspection && this.newInspection({type: "new"})}/></View>
                        <View style={{width: "48%", height: 52, marginTop: 19, marginRight: 25}}><SensaiButton text={I18n.t('qualityInspection_register_last_inspection')} outline={!hasMiddleInspection} buttonStyle={{flex: 1}} onPress={() => hasMiddleInspection && this.setState({modalLast: true})}/></View>
                    </View>}
                    <View style={{marginTop: 100}}/>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {        
        inspection: state.qualityInspection.inspection,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getInspectionList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectionList)