import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Alert,
    RefreshControl
} from "react-native";
import { SensaiRow, SensaiButton, Spinner, NavButtons } from "../../components";
import { colors } from "../../styles/theme";
import { ToolDetailCard } from "./ToolDetailCard";
import { ToolInformationCard } from "./ToolInformationCard";
import { ToolHeader } from "./ToolHeader";
import { ChangeOverCard } from "./ChangeOverCard";
import { TimeInput } from "./TimeInput";
import { NumInput } from "./NumInput";
import { getVerifiedProduction } from "./actions";
import moment from "moment-timezone";
import "moment/locale/es";
import { RadioBox } from "./RadioBox";
import { closeProduction, prepareProduction, fetchDailyReportLog } from "./actions";
import { upperCase } from "../../helpers";
import I18n from "../../i18n/i18n";

class PreviousProduction extends Component {
    state = {
        isLoading: false,
        log: [],
        day: null
    };

    _mounted = false;

    constructor(props) {
        super(props)
        this.closeProduction = this.closeProduction.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
    }

    componentDidMount() {
        this._mounted = true;
        this._onRefresh()
    }

    _onRefresh(day) {
        this.setState({ isLoading: true, log: [], day: null })
        if(day){
            day = moment(day).format('YYYY-MM-DD')
        }
        this.props.fetchDailyReportLog(day).then(()=>{
            this.setState({ isLoading: false, day: this.props.log.day })
        })
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    closeProduction(value) {

        let success = true

        let data = {        
            UnitAuto: value.UnitAuto,
            UnitScrap: value.UnitScrap,
            UnitRework: value.UnitRework,
            termino_rollo: value.termino_rollo,
        };

        if(value.termino_rollo==1){
            data.numRollo2 = value.num_rollo2
            data.loteRollo2 = value.lote_rollo2
        }
    
        Object.keys(data).map(function (key) {
            if(!data[key] && key!='termino_rollo' && key!='UnitAuto'){
                success = false
            }
        })

        if(success){
            Alert.alert(
                I18n.t('confirm'),
                `${I18n.t('confirm_end_production_tool')} ${(value.Tool) ? value.Tool.DescTool : "-- "}`,
                [
                    { text: I18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                        text: I18n.t('confirm'),
                        onPress: () => {
                            this.setState({ isLoading: true, log: [] });
                            this.props.closeProduction(value.ID, data).then(() => {
                                this._onRefresh()
                                Alert.alert(I18n.t('production_finished'), `${I18n.t('production_of_tool')} ${(value.Tool) ? value.Tool.DescTool : "-- "} ${I18n.t('profuction_of_tool_finished')}`);
                            });
                        }
                    }
                ],
            )
        }else{
            alert(I18n.t('error_white_fields'))
        }
    }

    render() {
        const { listHeader, mainText, secondaryText } = styles 
        let { log } = this.props
        let workOrders = log.workOrders
        if(!log.data){
            log = []
        }else{
            log = log.data
        }
        let WorkOrderID = false
        let showHeader = false


        let lengthDW =log.length;
        let DescTool;
        let data_WorkOrderID;
        if(lengthDW > 0){
            DescTool = log[lengthDW-1].Tool.DescTool;
            data_WorkOrderID =log[lengthDW-1].WorkOrderDetail.WorkOrderID;
        }

        let content = log.map((value, i)=>{
            const startDate = moment(value.StartAt).utc().format("hh:mm A")
            const endDate = moment(value.EndAt).utc().format("hh:mm A")

            let newWorkOrderID = workOrders.filter((w)=> w.ID == value.WorkOrderDetail.WorkOrderID || w.ParentID == value.WorkOrderDetail.WorkOrderID)[0]
            let workStartDate = ''
            let workEndDate = ''
            let showRollo = true
            let Tool;

            if(newWorkOrderID&&WorkOrderID!=newWorkOrderID){
                WorkOrderID = newWorkOrderID
                showHeader = true
                workStartDate = moment(WorkOrderID.StartAt).format("hh:mm A")
                workStartDate = workStartDate=='Invalid date'? I18n.t('actual') : workStartDate
                workEndDate = moment(WorkOrderID.EndAt).format("hh:mm A")
                workEndDate = workEndDate=='Invalid date'? I18n.t('actual') : workEndDate

                Tool=WorkOrderID.Tool;
                if(data_WorkOrderID==value.WorkOrderDetail.WorkOrderID){
                    Tool = DescTool;
                }

            }else{
                showHeader = false
            }
            if(value.Tool){
                showRollo = value.Tool.ToolType==1?false:true
            }


            return (
                <View key={i} style={{ marginBottom: 10 }}>
                    {
                        showHeader?
                            <ToolHeader
                                number={Tool}
                                start={workStartDate}
                                end={workEndDate}
                                disabled={value.DailyStatusID==5}
                            />
                        :null
                    }
                    {/*<ToolHeader
                        number={value.Tool && value.Tool.DescTool}
                        start={startDate}
                        end={endDate}
                        disabled={value.DailyStatusID==5}
                        collapse
                        hideTool
                        onPress={()=>{
                            value.show = !value.show
                            this.forceUpdate()
                        }}
                        show={!value.show}
                    />*/}
                    {true/*!value.show*/?
                        <View>
                            <ToolInformationCard
                                tool={value.Tool}
                                blanco={value.LoteBlanco}
                                rollo={value.RolledNo}
                                lote={value.RolledLot}
                                numJuliano={value.JulianCode}
                                velocidad={value.DesignSpeed}
                                golpes={value.UnitAuto}
                                piezas={value.UnitAuto}
                            />
                            {value.WorkOrderDetail?
                                <ChangeOverCard item={value.WorkOrderDetail}/>
                            :null}
                            {value.DailyStatusID==4?
                            <View>
                                <View style={{ padding: 10 }}>
                                    {/*<SensaiRow sizes={[0.5, 0.5]}>
                                        <View style={styles.leftInput}>
                                            <NumInput
                                                label={upperCase(I18n.t('real_total_pieces'))}
                                                onChangeText={text => {
                                                    value.UnitAuto = text
                                                }}
                                            />
                                        </View>
                                    </SensaiRow>*/}
                                    <SensaiRow sizes={[0.5, 0.5]}>
                                        <View style={styles.leftInput}>
                                            <NumInput
                                                label={upperCase(I18n.t('garbage_pieces'))}
                                                onChangeText={text => {
                                                    value.UnitScrap = text
                                                }}
                                            />
                                        </View>
                                        <View style={styles.rightInput}>
                                            <NumInput
                                                label={upperCase(I18n.t('rework_pieces'))}
                                                onChangeText={text => {
                                                    value.UnitRework = text
                                                }}
                                            />
                                        </View>
                                    </SensaiRow>
                                    {showRollo?
                                    <SensaiRow sizes={[1]}>
                                        <RadioBox
                                            onChange={v => {
                                                value.termino_rollo = v
                                                this.forceUpdate()
                                            }}
                                            value={value.termino_rollo}
                                        />
                                    </SensaiRow>:null}                                    
                                    {value.termino_rollo==1&&showRollo?
                                    <SensaiRow sizes={[0.5, 0.5]}>
                                        <View style={styles.leftInput}>
                                            <NumInput
                                                label={upperCase(I18n.t('no_of_roll_2'))}
                                                onChangeText={text => {
                                                    value.num_rollo2 = text
                                                }}
                                            />
                                        </View>
                                        <View style={styles.rightInput}>
                                            <NumInput
                                                label={upperCase(I18n.t('batch_of_roll_2'))}
                                                onChangeText={text => {
                                                    value.lote_rollo2 = text
                                                }}
                                            />
                                        </View>
                                    </SensaiRow>:null}
                                </View>
                                <SensaiButton
                                    text={I18n.t('finish')}
                                    buttonStyle={{ marginBottom: 10, marginRight: 10, marginLeft: 10 }}
                                    loading={this.state.isLoading}
                                    onPress={this.closeProduction.bind(this, value)}
                                />
                            </View>
                            :
                            <View>
                                <ToolDetailCard
                                    item={value}
                                />
                            </View>}
                        </View>
                    :null}
                </View>
            )
        })
        let validate = moment(this.state.day) > moment().add(-1, 'days')
        return <ScrollView refreshControl={
            <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this._onRefresh}
            />
          }>
            <View style={listHeader}>
                <Text style={mainText}>{upperCase(I18n.t('production_of_day'))}</Text>
                <Text style={secondaryText}>{(this.state.isLoading)?null:this.state.day}</Text>
            </View>
            {this.state.isLoading?null:<NavButtons
                back = { ()=>{this._onRefresh(moment(this.state.day))}}
                today = { ()=>{this._onRefresh(null)}}
                next = { ()=>{this._onRefresh(moment(this.state.day).add(2, 'days'))}}
                validate = {validate}
            />}
            {this.state.isLoading?null:content}
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    listHeader: {
        borderRadius: 5,
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 5,
        padding: 10,
    },
    mainText: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    secondaryText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.darkGreyBlue
    },
    inputLabel: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#243746"
    },
    inputStyle: {
        height: 45,
        borderRadius: 2,
        backgroundColor: colors.white,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.silver,
        fontFamily: "OpenSans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "left",
        color: colors.coolGrey,
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 4
    },
    leftInput: {
        marginBottom: 10,
        marginRight: 10
    },
    rightInput: {
        marginBottom: 10,
        marginLeft: 10
    },
});

function mapStateToProps(state) {
    return {
        validated: state.production.validated,
        log: state.production.log,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getVerifiedProduction, closeProduction, prepareProduction, fetchDailyReportLog }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviousProduction);
