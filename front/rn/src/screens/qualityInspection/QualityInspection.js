import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Picker } from 'react-native'
import { colors } from '../../styles/theme'
import { SensaiButton, SensaiRow, SensaiCard, Spinner, SensaiCombo } from '../../components'
import { upperCase } from '../../helpers'
import { getDailyReport, searchTools } from './actions'
import { logoutUser } from '../profile/actions'
import moment from "moment-timezone";
import 'moment/locale/es';
import I18n from '../../i18n/i18n'
import { subscribeTo, unsubscribe } from '../../lib/Socket';
import Orientation from 'react-native-orientation'

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
    }
})

var loading = false;

class QualityInspection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            corriendo: false,
            herramienta: "",
            searchText: "",
            picker: 0
        }
        this.getRows = this.getRows.bind(this);
        this.hitReceived = this.hitReceived.bind(this);
        this.onSearch = this.onSearch.bind(this);
        subscribeTo("andon", this.hitReceived)
        Orientation.lockToLandscape();
    }

    async componentWillMount() {
        await this.props.searchTools('code=&sort=DescTool&order=desc')
        loading = false;
    }

    hitReceived(data){
        if(data.CurrentStrokeRate)
            this.setState({ herramienta: data.DieName.split(" ")[0], corriendo: true });
        else 
            this.setState({ herramienta: data.DieName.split(" ")[0], corriendo: false });
    }

    getRows() {
        const rows = [];
        if(this.props.tools.length > 0){
            return this.props.tools.map((dr) => {
                var date = dr.last ? moment(dr.last).format('DD/MMMM/YYYY hh:mm a') : I18n.t("qualityInspection_noTimeLbl");
                
                const statusStr = (i) => [
                    I18n.t("qualityInspection_s_nuevo"),
                    I18n.t("qualityInspection_s_preparacion"),
                    I18n.t("qualityInspection_s_corriendo"),
                    I18n.t("qualityInspection_s_precierre"),
                    I18n.t("qualityInspection_s_cierre"),
                ][i-1].toUpperCase()
                return (
                    <SensaiCard key={dr.id}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=> this.props.navigation.navigate("InspectionsHistory", {dr, running: dr.DescTool == this.state.herramienta ? true : false})}>
                            <View style={styles.twoColumns}>
                                <View>
                                    <Text style={styles.toolTitle}>{dr.DescTool}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={[styles.toolTimeRange,styles.label]}>{I18n.t('qualityInspection_timeLbl')}:</Text>
                                        <Text style={styles.toolTimeRange}> {date}</Text>
                                    </View>
                                </View>
                                {
                                    dr.DescTool === this.state.herramienta && this.state.corriendo && <View style={[styles.toolLabelView,{backgroundColor: (dr.DescTool === this.state.herramienta) ? "#46b978" : "#898b8e"}]}>
                                        <Text style={styles.toolLabelText} >{I18n.t("qualityInspection_s_corriendo")}</Text>
                                    </View>
                                }
                                {
                                    dr.DescTool === this.state.herramienta && !this.state.corriendo && <View style={[styles.toolLabelView,{backgroundColor: (dr.DescTool === this.state.herramienta) ? "#b94646" : "#898b8e"}]}>
                                        <Text style={styles.toolLabelText} >{I18n.t("machine_failureStatus")}</Text>
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>
                    </SensaiCard>
                )
            });
        }else{
            return <Text style={{color: colors.darkGreyBlue, fontSize: 20, fontWeight: "500", textAlign: "center"}}>{I18n.t('qualityInspection_no_tool')}</Text>;
        }
    }

    async onSearch(picker = false){
        !picker && this.props.searchTools('code=' + this.state.searchText + '&sort=DescTool&order=desc');
        if(picker){
            let string = null;
            if(this.state.picker == 0){
                string = "desc";
            }else if(this.state.picker == 1){
                string = "asc";
            }
            let searchString = 'code=' + this.state.searchText + '&sort=DescTool&order=' + string;
            if(this.state.picker == 2){
                searchString = "code=" + this.state.searchText + '&sort=DescTool&order=desc&recent=desc';
            }

            await this.props.searchTools(searchString);
            loading = false;
        }
    }

    render() {
        if(loading) {
            return <Spinner />;
        }
        const nowDate = moment().format('DD/MMMM/YYYY');
        return (
            <View style={{flex:1}}>
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_title'))}</Text>
                        <Text style={styles.subHeaderText}>{nowDate}</Text>
                    </View>
                    <View style={{flexDirection: "row", padding: 10}}>
                        <View style={{flexDirection: "row", width: "62%"}}>
                            <View style={{width: "18%", marginTop: 8}}><Text style={{marginTop: 12, color: colors.darkGreyBlue, fontWeight: "600", fontSize: 16}}>{I18n.t('qualityInspection_no_part')}: </Text></View>
                            <View style={{width: "30%", marginTop: 7, marginLeft: 5}}><TextInput style={{borderRadius: 2, borderColor: "#bebebe", borderWidth: 1, backgroundColor: "#FFF"}} underlineColorAndroid="#FFF" onChange={async (event) => {await this.setState({searchText: event.nativeEvent.text});this.onSearch();}}/></View>
                            <View style={{width: "15%", marginLeft: 15}}><SensaiButton sm={true} extraStyles={true} onPress={() => this.onSearch()} text={I18n.t('qualityInspection_search')} /></View>
                        </View>
                        <View style={{flexDirection: "row", width: "38%"}}>
                            <View style={{width: "100%"}}>
                                <SensaiCombo horizontal={true} label={`${I18n.t('order_by')}:`} selected={this.state.selectedValue} onChange={(value, index) => this.setState({picker: value}, () => this.onSearch(true))} items={[{value: 0, label: I18n.t('qualityInspection_order_number_descending')}, {value: 1, label: I18n.t('qualityInspection_order_number_ascending')}, {value: 2, label: I18n.t('qualityInspection_order_recent_descending')}]}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <ScrollView>
                        {this.getRows()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {        
        tools: state.qualityInspection.tools,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getDailyReport, logoutUser, searchTools }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QualityInspection)