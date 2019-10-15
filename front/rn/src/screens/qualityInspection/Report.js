import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, WebView, Modal } from "react-native";
import { CardDivider, SensaiCard, Spinner } from "../../components";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTrendReport, getReport } from "./actions";
import I18n from '../../i18n/i18n'
import { upperCase } from '../../helpers'
import { colors } from '../../styles/theme'
import { store } from '../../store'
import moment from "moment-timezone";
import 'moment/locale/es';
import Network from "../../lib/Network";
import Icon from "react-native-vector-icons/Octicons";

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
    WebView: {
        flex: 1,
        margin: 10,
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 2,
        shadowRadius: 4,
        shadowOpacity: 1,
        backgroundColor: colors.white,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
    }
})

const widthInspection = 300;
const heightRow = 30;
const borderWidth = 0.4;

class InspectionsReport extends Component {

    constructor(props) {
        super(props);
        // var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        
        this.state = {
            tool: null,
            data: [],
            loading: true,
            // data: data,
            commentsModal: false,
            code: null,
            dr: null
        }

        this.renderRowOne = this.renderRowOne.bind(this);
        this.renderSpecialRowOne = this.renderSpecialRowOne.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderHeadersOne = this.renderHeadersOne.bind(this);
        this.renderHeaders = this.renderHeaders.bind(this);
        this.getColumnWidth = this.getColumnWidth.bind(this);
        this.getColumnContent = this.getColumnContent.bind(this);
        this.renderRowTwoTitle = this.renderRowTwoTitle.bind(this);
        this.renderRowTwoFooter = this.renderRowTwoFooter.bind(this);
        this.renderCommentsModal = this.renderCommentsModal.bind(this);
        Orientation.lockToLandscape();
    }

    async componentWillMount() {
        if (this.props.navigation.state.params) {
            const { julian, workOrderID, toolID, day, toolName: { DescTool } } = this.props.navigation.state.params;
            let response = await Network.get(`/inspections/report/${workOrderID}`);
            if (response.success) {
				console.log("QUALITY REPORT", response);
                this.setState({julian, toolID, day, DescTool, data: response.data, loading: false});
            }
        }
    }

    renderHeadersOne(headers) {
        return (
            <View>
                <View style={{ flexDirection: "row" }}>
                    {
                        headers.map((element, index) => {
                            let size = this.getColumnWidth(index);
                            return (
                                <View style={{ width: size, borderWidth: borderWidth, borderColor: colors.silver }}>
                                    <Text style={{ color: colors.darkGreyBlue, fontWeight: "500" }}>{element}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    renderHeaders(data) {
        return (
            <View>
                <View style={{ flexDirection: "row" }}>
                    {
                        data.map((element, index) => {
                            return (
                                <View style={{ width: widthInspection, borderWidth: borderWidth, borderColor: colors.silver }}>
                                    <Text style={{ color: colors.darkGreyBlue, fontWeight: "500" }}>{element}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    renderRowOne(data) {
        return (
            <View style={{ flexDirection: "row" }}>
                {
                    Object.keys(data).map((element, index) => {
                        let size = this.getColumnWidth(index);
                        return (
                            <View style={{ height: heightRow, width: size, borderColor: colors.silver, borderWidth: borderWidth }}>
                                <Text style={{ color: colors.black }}>{data[element]}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    renderSpecialRowOne(title) {
        let content = ['',title,'',''];
        
        return (
            <View style={{ flexDirection: "row" }}>
            {
                content.map((element, index) => {
                    let size = this.getColumnWidth(index);
                    return (
                        <View style={{ height: heightRow, width: size, borderColor: colors.silver, borderWidth: borderWidth }}>
                            <Text style={{ color: colors.black }}>{element}</Text>
                        </View>
                    )
                })
            }
            </View>
        )
    }

    renderRow (data) {
        return (
            <View style={{ flexDirection: "row" }}>
                {
                    data.map(element => {
                        element = this.getColumnContent(element)
                        return (
                            <View style={{ height: heightRow, width: widthInspection, borderColor: colors.silver, borderWidth: borderWidth }}>
                                <Text style={{ color: element.color }}>{element.value}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    renderRowTwoTitle (data) {
        return (
            <View style={{ flexDirection: "row" }}>
                {
                    data.map(element => {
                        let backgroundColor = element ? colors.greenishTeal : colors.tomato;
                        let content = element ? I18n.t('qualityInspection_s_aprobada') : I18n.t('qualityInspection_s_noaprobada');
                        return (
                            <View style={{ height: heightRow, width: widthInspection, borderColor: colors.silver, borderWidth: borderWidth, backgroundColor: backgroundColor }}>
                                <Text style={{ color: colors.white }}>{content}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    renderRowTwoFooter (data) {
        return (
            <View style={{ flexDirection: "row" }}>
                {
                    data.map(element => {
                        return (
                            <View style={{ height: heightRow, width: widthInspection, borderColor: colors.silver, borderWidth: borderWidth }}>
                                <Text style={{ color: colors.black }}>{element}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    renderRowTwoComments (data) {

        return (
            <View style={{flexDirection: "row"}}>
                {
                    data.map(element => {
                        return (
                            <TouchableOpacity style={{width: widthInspection}} onPress={()=> this.setState({commentsModal: true, comment: element}) }>
                                <View style={{ height: heightRow, width: widthInspection, borderColor: colors.silver, borderWidth: borderWidth, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style ={{borderRadius: 15, backgroundColor: colors.azure, width: widthInspection, height: heightRow,  justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: colors.white, textAlign: 'center'}}>{I18n.t('qualityInspection_comments')}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    renderCommentsModal (data) {
       return (
            <View>
                <Modal transparent={true} visible={true} animationType="fade" onRequestClose={() => this.setState({commentsModal: false})}>
                
                    <View style={{height: "100%", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                        <View style={{width: "50%", height: "90%", marginLeft: "25%", marginBottom: "5%"}}>
                        <SensaiCard>

                            <View style={{flexDirection: "row"}}>
                                <View style={{width: "95%"}}><Text style={{textAlign: "center", color: colors.darkGreyBlue, fontSize: 17}}>{I18n.t('qualityInspection_comment')}</Text></View>
                                <View style={{width: "5%", paddingTop: 7}}><Icon  size={20} onPress={() => this.setState({commentsModal: false})} name={"x"}/></View>
                            </View>


                            <View style={{padding: 10, marginBottom: 10}}>
                                <Text>{this.state.comment}</Text>
                            </View>
                        </SensaiCard>
                        </View>
                    </View>

                </Modal>
            </View>
       )
    }

    getColumnWidth(index = -1) {
        switch(index) {
            case 0: return 35;
            case 1: return 300;
            case 2: return 175;
            case 3: return 175;
            default: return 0
        }
    }

    getColumnContent(data) {
        let { value = 'Sin valor', type = '', approve = '' } = data;

        switch(type) {
            case 'check':
                if(approve) 
                    return {
                        value: I18n.t('qualityInspection_s_aprobada'),
                        color: colors.black
                    }
                else 
                    return {
                        value: I18n.t('qualityInspection_s_noaprobada'),
                        color: colors.tomato
                    }
            case 'dblcheck':
                if(approve) 
                    return {
                        value: I18n.t('qualityInspection_s_aprobada'),
                        color: colors.black
                    }
                else 
                    return {
                        value: I18n.t('qualityInspection_s_noaprobada'),
                        color: colors.tomato
                    }
            case 'numero':
                if(approve) 
                    return {
                        value,
                        color: colors.black
                    }
                else 
                    return {
                        value,
                        color: colors.tomato
                    }
            case 'juliano': 
                let pad = (s, size) => {
                    while (s.length < (size || 2)) {s = s + "0";}
                    return s;
                }
                value = value ? value.toString().replace(".", "-") : "18-333";
                value = value.includes("-") ? value.split(/-/)[0] + "-" + pad(value.split(/-/)[1], 3) : value;
                if(approve) 
                    return {
                        value,
                        color: colors.black
                    }
                else 
                    return {
                        value,
                        color: colors.tomato
                    }

            default:
                if(approve) 
                    return {
                        value,
                        color: colors.black
                    }
                else 
                    return {
                        value,
                        color: colors.tomato
                    }
        }
    }



    render() {
        if(this.state.loading)
            return <Spinner />

        let { data } = this.state;

        if(!data || data.length < 1) return <View><Text>{I18n.t('qualityInspection_no_inspeccion')}</Text></View>;
        if(!data.checkLists || !data.checkLists[0]) return <View><Text>{I18n.t('qualityInspection_no_inspeccion')}</Text></View>;
            
        let dataOne = data.checkLists.map(e => {
            delete e.id;
            return e;
        });
        let [ headersOne ] = dataOne;
        let headersTwo = data.inspections.map((element, index) => `${I18n.t('qualityInspection_inspeccion')} # ${index + 1}`);
        let rowTwoTitle = data.inspections.map(element => element.result);
        let rowTwoDate = data.inspections.map(element => moment(element.date).format('DD/MM/YYYY HH:mm'))
        let rowTwoComment = data.inspections.map(element => element.message);
        let elements = data.inspections.map(element => element.element);

        _elements = []; 
        elements.forEach(element => 
            element.forEach((element_, index) => {
                if(!_elements[index])
                    _elements[index] = [];

                _elements[index].push(element_)
            })
        );
        
        return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{upperCase(I18n.t('qualityInspection_report_title'))}</Text>
                        <Text style={styles.subHeaderText}>{I18n.t('qualityInspection_no_part')} {this.state.DescTool} / {this.state.julian} - {moment(this.state.day).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.WebView}>
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                {this.renderHeadersOne(Object.keys(headersOne))}
                                {this.renderSpecialRowOne('Juicio de Inspección')}
                            </View>

                            <ScrollView 
                                horizontal={true}
                                ref={scrollView => { this._topScrollView = scrollView }}
                                scrollEventThrottle={16}
                                onScroll = { 
                                    e => {
                                        if (!this.topIsScrolling) {
                                            this.bottomIsScrolling = true;
                                            this._bottomScrollView.scrollTo({ x:  e.nativeEvent.contentOffset.x });
                                        }
                                        this.topIsScrolling = false;
                                    }
                                }
                                showsHorizontalScrollIndicator={false}
                                >
                                <View>
                                    {this.renderHeaders(headersTwo)}
                                    {this.renderRowTwoTitle(rowTwoTitle)}
                                </View>
                            </ScrollView>
                        </View>


                        <ScrollView onScroll={(e) => console.log(e.nativeEvent.contentOffset.y) }>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    {/* {this.renderHeadersOne(Object.keys(headersOne))}
                                    {this.renderSpecialRowOne('Juicio de Inspección')} */}
                                    {dataOne.map(element => this.renderRowOne(element))}
                                    {this.renderSpecialRowOne(I18n.t('date'))}
                                    {this.renderSpecialRowOne(I18n.t('comment'))}
                                </View>

                                <ScrollView 
                                    horizontal={true}
                                    ref={scrollView => { this._bottomScrollView = scrollView }}
                                    scrollEventThrottle={16}
                                    onScroll = { 
                                        e => {
                                            if (!this.bottomIsScrolling) {
                                                this.topIsScrolling = true;
                                                this._topScrollView.scrollTo({ x:  e.nativeEvent.contentOffset.x });
                                            }
                                            this.bottomIsScrolling = false;
                                        }
                                    }
                                    showsHorizontalScrollIndicator={false}
                                    >
                                    <View>
                                        {/* {this.renderHeaders(headersTwo)}
                                        {this.renderRowTwoTitle(rowTwoTitle)} */}
                                        {
                                            _elements.map(element => this.renderRow(element))
                                        } 
                                        {this.renderRowTwoFooter(rowTwoDate)}
                                        {this.renderRowTwoComments(rowTwoComment)}
                                    </View>
                                </ScrollView>      
                            </View>
                        </ScrollView>


                        {/* <WebView
                            source={{uri: `https://metalsa.sensai.net/report/trendsReportView/80`}}
                            style={{flex: 1}} /> */}

                            
                    </View>
                    {
                        this.state.commentsModal && this.renderCommentsModal()
                    }
                </View>
        
        )
    }
}

const mapStateToProps = state => {
    return { trendReport: state.qualityInspection.trendReport };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getTrendReport, getReport }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectionsReport);