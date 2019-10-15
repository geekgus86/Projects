import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal, ListView, TextInput} from "react-native";
import { Calendar } from 'react-native-calendars';
import I18n from '../../i18n/i18n'
import { upperCase } from '../../helpers'
import { colors } from '../../styles/theme'
import { SensaiButton, SensaiCard, CardDivider, Spinner, SensaiCombo } from '../../components';
import { getToolTrends, getActualTrend, getJulianNumbers, getWorkOrders} from "./actions";
import moment from "moment-timezone";
import 'moment/locale/es';
import Icon from "react-native-vector-icons/Octicons";
import Julian from "julian";

const styles = StyleSheet.create({
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
    indicator: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        padding: 5,
        margin: 10
    },
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
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
    toolLabelView: {
        borderRadius: 5,
        padding: 5,
        height: 30,
        backgroundColor: "#46b978"
    },
});

var isMounted = false;

class InspectionsHistory extends Component {

    constructor(props){
        isMounted = false;
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            tool: "",
            running: false,
            dr: {},
            modalComments: false,
            modalJuliano: false,
            comments: ds.cloneWithRows([]),
            numJuliano: null,
            selectedValue: null,
            comboItems: [],
            selectedDate: moment().format("YYYY-MM-DD").toString(),
            lastInspection: 0
        }

        this.getRows = this.getRows.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.viewReport = this.viewReport.bind(this);
        this.getActualTrend = this.getActualTrend.bind(this);
        this.mostrarModal = this.mostrarModal.bind(this);
        this.onDayPress = this.onDayPress.bind(this);
        this.getJulianCode = this.getJulianCode.bind(this);
    }

    async componentWillMount(){

        this.props.navigation.addListener('willFocus', async (payload) => {
            
            if(this.props.navigation.state.params){
                const { dr, running } = this.props.navigation.state.params;
                // await this.props.getToolTrends(dr.ID);
                await this.props.getWorkOrders(dr.ID);
                await this.props.getActualTrend(dr.ID);
                if(!running){
                    await this.props.getJulianNumbers(dr.ID);
                }
                await this.setState({
                    tool: dr.DescTool,
                    running,
                    dr,
                    selected: {},
                    currentDr: {},
                });

                if(running) {
                    let actualTrend = this.props.workOrders[this.props.workOrders.length - 1];
                    await this.setState({workOrderID: actualTrend.ID, currentWorkOrderID: actualTrend.ID})
                    console.log("STATE IF RUNNING", this.state.workOrderID)
                }

            } else {
                const { dr, running } = this.state;
                await this.props.getWorkOrders(dr.ID);
                await this.props.getActualTrend(dr.ID);
                if(running){
                    let actualTrend = this.props.workOrders[this.props.workOrders.length - 1];
                    await this.setState({workOrderID: actualTrend.ID, currentWorkOrderID: actualTrend.ID})
                    console.log("STATE IF RUNNING", this.state.workOrderID)
                } else {
                    await this.props.getJulianNumbers(dr.ID);
                }
            }
            
        });
        
    }

    componentDidMount(){
        isMounted = true;
    }

    getRows(){
        if(this.props.workOrders.length > 0){

            return this.props.workOrders.map((workOrder, i) => {
                const { julian }= workOrder;
                const startDate = moment(workOrder.CreatedAt).format("DD/MMMM/YYYY hh:mm a");
                
                let totalComments = 0;
                workOrder.inspections.forEach(fila => {
                    if(fila && fila.Remark) {
                        totalComments += 1;
                    }
                    !this.state.lastInspection && this.setState({lastInspection: fila.ID});
                });

                let day = moment(workOrder.CreatedAt).format('YYYY-MM-DD');
                let toolID = workOrder.ToolID;

                return (
    
                    <SensaiCard key={workOrder.ID}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("TrendReport", {julian, workOrderID: workOrder.ID, toolID: toolID, day: day, toolName: this.state.dr })}>
                            <View style={{flexDirection: "row"}}>
                                <View style={{width: "95%"}}>
                                    <View style={{padding: 10}}>
                                        <Text style={{fontWeight: "600"}}>{julian} - {startDate}</Text>
                                        <View style={{flexDirection: "row"}}><Text style={{color: colors.darkGreyBlue, fontSize: 15, fontWeight: "400"}}>{I18n.t("qualityInspection_InspectionsHistory_NumOfInspections")}: </Text><Text>{workOrder.inspections.length}</Text></View>
                                        <TouchableOpacity style={{width: 160}} onPress={() => totalComments > 0 && this.setState({ currentJulian: julian, currentWorkOrderID: workOrder.ID, currentDr: workOrder.inspections, modalComments:true, comments: this.state.comments.cloneWithRows(workOrder.inspections)}, () => console.log("COMMENTS CLONED", workOrder.inspections))}>
                                            <View style={{flexDirection: "row", borderRadius: 15, borderColor: "#0099ed", borderWidth: 2, width: 160, padding: 3, justifyContent: "center", marginTop: 6}}>
                                                <View><Icon size={20} name="comment-discussion" color="#0099ed"/></View>
                                                <View style={{width: 5}}/>
                                                <View><Text style={{color: "#0099ed"}}>{totalComments} {I18n.t('qualityInspection_comments')}</Text></View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </SensaiCard>
                );
            });
        } else {
            return (
                <View style={{padding:10}}><Text style={{color: colors.darkGreyBlue, fontSize: 20, fontWeight: "500", textAlign: "center"}}>{I18n.t('qualityInspection_s_no_runnings')}</Text></View>
            );
        }
        
    }

    renderRow(data){
        if(data && data.Remark){

            let insName = I18n.t('qualityInspection_s_no_register');
            if(data.Inspector && data.Inspector.name){
                insName = data.Inspector.name;
            }

            return(
                <View style={{padding: 10, marginBottom: 10}}>
                    {/* <Text style={{fontSize: 15, color: "#8b8b8b", fontWeight: "600"}}>INSPECCION #{data.SecuencialNumber}</Text> */}
                    <Text>{I18n.t('qualityInspection_inspection_hour')}: {moment(data.InspectionAt).format("YYYY-MM-DD hh:mm")}</Text>
                    <Text style={{color: "#000", marginTop: 5, fontWeight: "600"}}>{insName} {I18n.t('commented')}:</Text>
                    <Text style={{marginTop: 2, fontStyle: "italic"}}>"{data.Remark}"</Text>
                    <CardDivider/>
                </View>
            );
        }else {
            return null;
        }
    }

    viewReport(){
        this.setState({modalComments : false});
        this.props.navigation.navigate("TrendReport", {julian: this.state.currentJulian, workOrderID: this.state.currentWorkOrderID, toolName: this.state.dr, dr: this.state.currentDr, code: this.state.tool });
    }

    renderFooter(){
        return(
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{width: "45%"}}>
                    <SensaiButton buttonStyle={{margin: 5}} text={I18n.t('qualityInspection_view_report')} onPress={() => this.viewReport()}/>
                </View>
                <View style={{width: "45%", marginTop: 3}}>
                    <SensaiButton outline={true} buttonStyle={{margin: 5}} text={I18n.t('qualityInspection_close')} onPress={()=>this.setState({modalComments : false})}/>
                </View>
                <View style={{marginTop: 10, height: 30}}/>
            </View>
        );
    }

    getActualTrend(){
        let runningData = null;
        let params = this.props.navigation.state.params;
        
        let actualTrend = this.props.workOrders[this.props.workOrders.length - 1];

        if(this.state.running && actualTrend){

            let date = moment(actualTrend.CreatedAt).format('DD/MMMM/YYYY').toString();
            let julian = moment(actualTrend.CreatedAt).format('YY-DDDD');

            let totalComments = 0;
            actualTrend.inspections.forEach(fila => {
                if(fila && fila.Remark) {
                    totalComments += 1;
                }
            });

            // this.setState({workOrderID: actualTrend})

            runningData = 
                <SensaiCard>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("TrendReport", { julian, workOrderID: this.state.workOrderID, toolName: this.state.dr, tool: this.state.dr, dr: this.state.dr, code: this.state.tool})}>
                        <View style={{padding: 10}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontWeight: "600"}}>{julian} - {date}</Text>
                                <Text style={{color: colors.green, fontWeight: "600"}}> {I18n.t('qualityInspection_s_corriendo')}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{color: colors.darkGreyBlue, fontSize: 15, fontWeight: "400"}}>{I18n.t("qualityInspection_InspectionsHistory_NumOfInspections")}: </Text>
                                <Text>{actualTrend.inspections.length}</Text>
                            </View>
                            <TouchableOpacity onPress={() => actualTrend.inspections.length > 0 && this.setState({ julian, currentDr: this.props.actualTrend, modalComments:true, comments: this.state.comments.cloneWithRows(this.props.actualTrend[0])}, () => console.log("COMMENTS CLONED", this.props.actualTrend[0]))}>
                                <View style={{flexDirection: "row", borderRadius: 15, borderColor: "#0099ed", borderWidth: 2, width: 160, padding: 3, justifyContent: "center"}}>
                                    <View><Icon size={20} name="comment-discussion" color="#0099ed"/></View>
                                    <View style={{width: 5}}/>
                                    <View><Text style={{color: "#0099ed"}}>{totalComments} {I18n.t('qualityInspection_s_corriendo')}</Text></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </SensaiCard>;
        } else {
            // runningData = 
            // <SensaiCard>
            //     <TouchableOpacity onPress={() => this.props.navigation.navigate("TrendReport", {tool: this.state.dr, dr: this.state.dr, code: this.state.tool})}>
            //         <View style={{padding: 10}}>
            //             <View style={{flexDirection: "row"}}>
            //                 <Text style={{fontWeight: "600"}}>{julian} - {date}</Text>
            //                 <Text style={{color: colors.green, fontWeight: "600"}}> CORRIENDO</Text>
            //             </View>
            //             <View style={{flexDirection: "row"}}>
            //                 <Text style={{color: colors.darkGreyBlue, fontSize: 15, fontWeight: "400"}}>{I18n.t("qualityInspection_InspectionsHistory_NumOfInspections")}: </Text>
            //                 <Text>{totalInspections}</Text>
            //             </View>
            //             <TouchableOpacity onPress={() => totalComments > 0 && this.setState({ currentDr: this.props.actualTrend,modalComments:true, comments: this.state.comments.cloneWithRows(this.props.actualTrend[0])}, () => console.log("COMMENTS CLONED", this.props.actualTrend[0]))}>
            //                 <View style={{flexDirection: "row", borderRadius: 15, borderColor: "#0099ed", borderWidth: 2, width: 160, padding: 3, justifyContent: "center"}}>
            //                     <View><Icon size={20} name="comment-discussion" color="#0099ed"/></View>
            //                     <View style={{width: 5}}/>
            //                     <View><Text style={{color: "#0099ed"}}>{totalComments} Comentarios</Text></View>
            //                 </View>
            //             </TouchableOpacity>
            //         </View>
            //     </TouchableOpacity>
            // </SensaiCard>;
        }

        var julianCode = this.getJulianCode();

        let card = (
                <View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{width: "49%", marginLeft: 8}}><SensaiButton text={I18n.t('qualityInspection_register_test_inspection')} outline={true} buttonStyle={{padding: 10, marginTop: 10}} onPress={ () => this.props.navigation.navigate("InspectionSheet", {id: params.dr.ID, dummy: true, code: params.dr.DescTool, inspectionId: this.state.lastInspection})}/></View>
                        <View style={{width: "49%"}}><SensaiButton default={this.props.tooltrends && this.props.actualTrend && this.props.julianNumbers ? false : true} text={I18n.t('qualityInspection_register_real_inspection')} buttonStyle={{padding: 10}} onPress={ () => this.state.running ? this.props.navigation.navigate("InspectionSheet", { workOrderID: this.state.workOrderID, id: params.dr.ID, dummy: false, code: params.dr.DescTool, numJuliano: julianCode, inspectionId: this.state.lastInspection}) : this.mostrarModal()}/></View>
                    </View>
                </View>
            )


        return <View>{runningData}{card}</View>;
    }

    mostrarModal(){
        
        var data = this.props.julianNumbers;
        if(data){

            let arr = data.map(e => {
                return {
                    value: `${e.inspection}/${e.julian}`,
                    label: `${e.julian} - ${moment(e.date).format('DD/MMMM/YYYY hh:mm a')}`
                }
            })
            
            if(arr.length){
                this.setState({workOrderID: arr[0].value.split("/")[0], selectedValue: {value: arr[arr.length - 1].value, label: arr[arr.length - 1].label}, comboItems: arr, numJuliano: arr[arr.length - 1].value});
            }else{
                var julianCode = this.getJulianCode();
                this.setState({numJuliano: julianCode});
            }
            this.setState({modalJuliano: true});
        }
    }

    getJulianCode(){
        var year = moment().get('year');
        return year.toString().split("0")[1] + "-" + Julian(new Date()).toString().substr(0, 3);
    }

    async onDayPress(day){
        var fecha = new Date(day.timestamp);
        var d = Julian(fecha);
        var julianDay = d.substring(0, 3);
        await this.setState({numJuliano: day.year + "-" + julianDay, selectedDate: day.dateString, modalJuliano: false}, () => this.props.navigation.navigate("InspectionSheet", {id: this.state.dr.ID, dummy: false, code: this.state.dr.DescTool, numJuliano: this.state.numJuliano, inspectionId: this.state.lastInspection}));
    }

    render(){

        if(!isMounted || !this.props.workOrders){
            return <Spinner />
        }
        
        return(
            <View style={{flex:1}}>
                <View>
                    <Modal transparent={true} visible={this.state.modalComments} animationType="fade" onRequestClose={() => this.setState({modalComments: false})}>
                    
                        <View style={{height: "100%", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                            <View style={{width: "50%", height: "90%", marginLeft: "25%", marginBottom: "5%"}}>
                            <SensaiCard>

                                <View style={{flexDirection: "row"}}>
                                    <View style={{width: "95%"}}><Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 17}}>{I18n.t('qualityInspection_comments')}</Text></View>
                                    <View style={{width: "5%", paddingTop: 7}}><Icon size={20} onPress={() => this.setState({modalComments: false})} name={"x"}/></View>
                                </View>
                                
                                <ListView 
                                    enableEmptySections={true}
                                    dataSource={this.state.comments}
                                    renderRow={this.renderRow}
                                    renderFooter={this.renderFooter}/>

                            </SensaiCard>
                            </View>
                        </View>

                    </Modal>
                </View>


                <View>
                    <Modal transparent={true} visible={this.state.modalJuliano} animationType="fade" onRequestClose={() => this.setState({modalJuliano: false})}>
                        
                        <View style={{height: "100%", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                            <View style={{width: "50%", height: "90%", marginLeft: "25%", marginBottom: "2%"}}>
                            <SensaiCard>

                                <View style={{flexDirection: "row"}}>
                                    <View style={{width: "95%"}}><Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 17}}>{I18n.t('qualityInspection_new_inspection')}</Text></View>
                                    <View style={{width: "5%", paddingTop: 7}}><Icon size={20} onPress={() => this.setState({modalJuliano: false})} name={"x"}/></View>
                                </View>
                                <View style={{marginTop: 10}}/>

                                {this.state.comboItems.length > 0 && 
                                <View>
                                    <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 13}}>{I18n.t('qualityInspection_select_julian_1')}</Text>
                                    <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 13}}>{I18n.t('qualityInspection_select_julian_2')}</Text>
                                    <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 13}}>{I18n.t('qualityInspection_select_julian_3')}</Text>
                                </View>}
                                
                                
                                {this.state.comboItems.length > 0 ? <SensaiCombo horizontal={true} label="" selected={this.state.selectedValue} onChange={(value, index) => this.setState({selectedValue: value, workOrderID: value.split("/")[0], numJuliano: value.split("/")[1]})} items={this.state.comboItems}/> : 
                                <View style={{marginTop: 5}}>

                                    <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 13}}>{I18n.t('qualityInspection_select_no_run_1')}</Text>
                                    <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 13}}>{I18n.t('qualityInspection_select_no_run_2')}</Text>
                                    <Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 13, marginTop: 5, fontWeight: "600"}}>{I18n.t('qualityInspection_select_no_run_3')}</Text>

                                    <Calendar
                                        current={this.state.selectedDate}
                                        minDate={'2012-05-10'}
                                        maxDate={'3012-05-29'}
                                        onDayPress={this.onDayPress}
                                        firstDay={1}
                                        hideArrows={true}
                                    />
                                </View>
                                }

                                <View style={{flexDirection: "row", marginTop: 20}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <View style={{width: "49%", marginLeft: 8}}><SensaiButton text={I18n.t('processParameter_cancel_text')} outline={true} buttonStyle={{padding: 10, marginTop: 10}} onPress={ () => this.setState({modalJuliano: false})}/></View>
                                        <View style={{width: "49%"}}><SensaiButton text={I18n.t('qualityInspection_start_inspection')} buttonStyle={{padding: 10}} onPress={()=> this.setState({modalJuliano: false}, () => this.props.navigation.navigate("InspectionSheet", {id: this.state.dr.ID, dummy: false, code: this.state.dr.DescTool, numJuliano: this.state.numJuliano, inspectionId: this.state.lastInspection, workOrderID: this.state.workOrderID}))}/></View>
                                    </View>
                                </View>

                            </SensaiCard>
                            </View>
                        </View>

                    </Modal>
                </View>

                <View style={{flex:1}}>
                    <View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_title'))}</Text>
                            <Text style={styles.subHeaderText}>{I18n.t('qualityInspection_no_part')}: {this.state.tool}</Text>
                        </View>
                        {this.getActualTrend()}
                        <View style={styles.indicator}><Text style={{textAlign: "center", fontWeight: "600", color: colors.darkGreyBlue}}>{upperCase(I18n.t("qualityInspection_InspectionsHistory_HistoricTrends"))}</Text></View>
                    </View>
                    <ScrollView>
                        {this.getRows()}
                    </ScrollView>
                </View>
            </View>
        );
    }

}

function mapStateToProps(state) {
    return {        
        tooltrends: state.qualityInspection.tooltrends,
        actualTrend: state.qualityInspection.actualTrend,
        julianNumbers: state.qualityInspection.julianNumbers,
        workOrders: state.qualityInspection.workOrders
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getToolTrends, getActualTrend, getJulianNumbers, getWorkOrders}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectionsHistory);