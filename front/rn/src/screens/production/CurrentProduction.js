import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScrollView, View, RefreshControl } from "react-native";
import { SensaiButton, Spinner } from "../../components";
import { tracker, navigate } from "../../helpers";
import { fetchCurrentProd } from "../checklist/actions";
import { ToolInformationCard } from "./ToolInformationCard";
import { ToolHeader } from "./ToolHeader";
import { ChangeOverCard } from "./ChangeOverCard";
import { getValidatedProduction, verfifyProduction, editProduction } from "./actions"
import { getValidatedTool, getField } from "./reducers";
import moment from "moment-timezone";
import "moment/locale/es";

import { subscribeTo, unsubscribe } from '../../lib/Socket'
import I18n from "../../i18n/i18n";

class CurrentProductionTab extends Component {
    state = {
        isLoading: false,
    };

    _mounted = false;

    constructor(props) {
        super(props);
        this._onRefresh = this._onRefresh.bind(this)
        this._editProduction = this._editProduction.bind(this)
    }

    componentDidMount() {
        this._mounted = true;
        tracker.trackScreenView("CurrentProductionTab");
        subscribeTo('setupmode', this._onRefresh)
        subscribeTo('editProduction', this._onRefresh)
        this._onRefresh()
        /*this.setState({ isLoading: true });
        if (this.props.validated === null && this.props.status!=1) {
            this.props.getValidatedProduction().then(() => {
                this.setState({ isLoading: false });
            });
        } else {
            this.setState({ isLoading: false });
        }*/
    }

    componentWillUnmount() {
        this._mounted = false;
        unsubscribe('setupmode')
        unsubscribe('editProduction')
    }

    _onRefresh() {
        this.setState({ isLoading: true })
        this.props.getValidatedProduction().then(()=>{
            this.setState({ isLoading: false })
        })
    }

    _editProduction() {
        this.setState({ isLoading: true })
        this.props.editProduction(this.props.validated.ID).then(()=>{
            this._onRefresh()
            this.props.navigation.navigate("NextProductionTab")
        })
    }

    verifyProduction() {
        if(this.props.tool_p){
            navigate('ProcessParameterModal')
        }else{
            alert(I18n.t('select_a_tool'))
            this.props.navigation.navigate("NextProductionTab")
        }
        /*if(this.props.validated){
            this.setState({ isLoading: true });
            /*this.props.verfifyProduction, getValidatedProduction(this.props.validated.id).then(() => {
                this.setState({ isLoading: false });
            });
        };*/
    }

    render() {
        let { validated } = this.props
        const startDate = validated && validated.StartAt !== null ? moment(validated.StartAt).utc().format("hh:mm A") : moment().format("hh:mm A");
        let content = <Spinner />;
        if(validated !== null){
            validated = (!Object.keys(validated).length)?null:validated
        }
        if (this.state.isLoading === false && validated !== null) {
            content = (
                <View>                    
                <ToolHeader
                    number={validated.tool && validated.tool.DescTool}
                    start={startDate}
                    end={I18n.t('actual')}
                />
                <ToolInformationCard
                    tool={validated.tool}
                    blanco={validated.LoteBlanco}
                    rollo={validated.RolledNo}
                    lote={validated.RolledLot}
                    numJuliano={moment().format("YY-DDDD")}
                    velocidad={validated.DesignSpeed}
                    golpes={validated.UnitAuto}
                    piezas={validated.UnitManual}
                />
                {this.props.changeover?
                    <ChangeOverCard item={this.props.changeover}/>
                :null}

                {/*<SensaiButton                                   
                    text={I18n.t('edit')}
                        buttonStyle={{
                        marginTop: 20,
                        marginRight: 20,
                        marginLeft: 20
                    }}
                    loading={this.state.isLoading}
                    onPress={this._editProduction.bind(this)}
                />*/}

                {/*this.props.tablet?
                <SensaiButton
                    text={"Revisar Parámetros"}
                    outline
                    buttonStyle={{
                    marginTop: 20,
                    marginRight: 20,
                    marginLeft: 20
                    }}
                    loading={this.state.isLoading}
                    onPress={this.verifyProduction.bind(this)}
                />:null*/}
                </View>
            );
        }else{
            content = null
        }
        return <ScrollView refreshControl={
            <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this._onRefresh}
            />
          }>{content}</ScrollView>;
    }
}

function mapStateToProps(state) {
    let tool = null
    let changeover = null

    if(state.production.validated){
        tool = state.production.validated.tool
        if(tool){
            tool_code = tool.DescTool
        }
        changeover = state.production.validated.WorkOrderDetail
    }

    return {
        tablet: state.session.tablet,
        validated: state.production.validated,
        tool_p: tool,
        changeover: changeover,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCurrentProd, getValidatedProduction, verfifyProduction, editProduction }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentProductionTab);
