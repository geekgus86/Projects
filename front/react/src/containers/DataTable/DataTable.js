import React, { Component } from "react";
import styles from "./DataTable.less";
import DataTableRow from './DataTableRow/DataTableRow'
import DataTableHeader from './DataTableHeader/DataTableHeader'
import api from 'lib/api'
import moment from 'moment-timezone'
import { isObjectEmpty } from "../../lib/utils";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Datepicker from '../../components/Datepicker/Datepicker'
import { CSVLink } from "react-csv";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";

class DataTable extends Component{
    state = {
        data: null,
        reportType: null,
        startDate: moment().add(-1, 'day').toDate(),
        endDate: moment().toDate(),
        sort: 'enn',
        order: 'desc',
        selectedReport: "",
        dateRangeText: "",
        fileName: ""
    }

    componentDidMount() {
        //this.getNewData();
    }

    render() { 
        console.log(this.state.sort)
        let printArray = this.state.data && this.state.data.map(e => e[this.state.sort.toUpperCase()]);
        console.log(printArray)
        console.log(this.state.data)
        return (
            <div className={styles.DataTable}>
                <Grid container direction="row" className={styles.headerPadd}>
                    <Grid item xs={12}>
                        <div className={styles.title}>
                            <h2>
                                <FormattedMessage id="dataTable.DataTable.title" defaultMessage="Tabla de datos" />
                            </h2>
                        </div>
                    </Grid>
                </Grid>
                <Grid container direction="row" className={styles.InputsRow} justify="space-around" alignItems="center">
                    <Grid item className={styles.select}>
                        <div className={styles.Input}>
                            <FormattedMessage id="dataTable.DataTable.title" defaultMessage="Tabla de datos" />: 
                            <select onChange={this.handleReportChange.bind(this)}>
                                <option value="">
                                    { this.props.intl.formatMessage({ id: 'dataTable.DataTable.selectReport' }, { defaultMessage: 'Seleccione un reporte' }) }
                                </option>
                                <optgroup label={ this.props.intl.formatMessage({ id: 'dataTable.DataTable.checklist' }, { defaultMessage: 'Checklist Ext/Int' }) }>
                                    <option value="checkExternalCheckList">
                                        { this.props.intl.formatMessage({ id: 'dataTable.DataTable.checklistExternalChangeover' }, { defaultMessage: 'Checklist de Changeover Externo' }) }
                                    </option>
                                    <option value="checkInitialCheckList">
                                        { this.props.intl.formatMessage({ id: 'dataTable.DataTable.checklistInitial' }, { defaultMessage: 'Checklist Inicial' }) }
                                    </option>
                                </optgroup>
                                <optgroup label={ this.props.intl.formatMessage({ id: 'dataTable.DataTable.affectations' }, { defaultMessage: 'Afectaciones' }) }>
                                    <option value="checkAffect">
                                        { this.props.intl.formatMessage({ id: 'dataTable.DataTable.affectationsTable' }, { defaultMessage: 'Tabla de Afectaciones' }) }
                                    </option>
                                </optgroup>
                                <optgroup label={ this.props.intl.formatMessage({ id: 'dataTable.DataTable.indicators' }, { defaultMessage: 'Indicadores' }) }>
                                    <option value="checkIndicators">
                                        { this.props.intl.formatMessage({ id: 'dataTable.DataTable.indicatorsTable' }, { defaultMessage: 'Tabla de Indicadores' }) }
                                    </option>
                                </optgroup>
                                <optgroup label={ this.props.intl.formatMessage({ id: 'dataTable.DataTable.escalations' }, { defaultMessage: 'Escalations' }) }>
                                    <option value="checkDowntimeEscalationProcess">
                                        { this.props.intl.formatMessage({ id: 'dataTable.DataTable.downtimeEscalationProcess' }, { defaultMessage: 'Downtime Escalation Process' }) }
                                    </option>
                                </optgroup>
                                <optgroup label={ this.props.intl.formatMessage({ id: 'dataTable.DataTable.qualityInspection' }, { defaultMessage: 'Calidad de Inspección' }) }>
                                    <option value="checkRegisteredInspections">
                                        { this.props.intl.formatMessage({ id: 'dataTable.DataTable.registeredInspections' }, { defaultMessage: 'Inspecciones registradas' }) }
                                    </option>
                                </optgroup>                    
                            </select> 
                        </div>
                    </Grid>
                    <Grid item className={styles.inputs}>
                        <div className={styles.Input}>
                           <Datepicker label={
                               <FormattedMessage id="dataTable.DataTable.from" defaultMessage="Desde" />
                           } onChange={this.handleStartDateChange} date={this.state.startDate}/>
                        </div>
                    </Grid>
                    <Grid item className={styles.inputs}>
                        <div className={styles.Input}>
                            <Datepicker label={
                                <FormattedMessage id="dataTable.DataTable.to" defaultMessage="Hasta" />
                            } onChange={this.handleEndDateChange} date={this.state.endDate}/>
                        </div>
                    </Grid>
                    <Grid item className={`d-flex ${styles.buttonsArea}`}>
                        <div className={`${styles.Input} ${styles.ButtonsSearch}`}>
                            <RoundedButton title={
                                <FormattedMessage id="dataTable.DataTable.search" defaultMessage="Buscar" />
                            } onClickButton={this.getNewData} />
                        </div>
                        <div className={`${styles.Input} ${styles.ButtonsDownload}`}>
                        {
                            !isObjectEmpty(this.state.data) && 
                            <CSVLink data={this.state.data} filename={this.state.fileName}>
                                <RoundedButton title={
                                    <FormattedMessage id="dataTable.DataTable.donwloadCsv" defaultMessage="Descargar CSV" />
                                } />
                            </CSVLink>
                        }
                        </div>
                    </Grid>
                </Grid>
                <Card className={styles.TitleTable}>
                    <CardHeader
                        title={(!isObjectEmpty(this.state.data)) ? this.state.selectedReport : ""}
                        subheader={
                            (() => {
                                if (!isObjectEmpty(this.state.data)) {
                                    return this.state.dateRangeText
                                } else {
                                    return null;
                                }
                            })()
                        }
                        />
                    <CardContent
                        style={{overflow: "scroll"}}
                        className={styles.TableStyle}
                    >
                    {
                        (() => {
                            if(!isObjectEmpty(this.state.data)) {
                                return (
                                    <table className={styles.Sortable}>
                                        <tbody className={styles.BodyTable}>
                                            <DataTableHeader headers={Object.keys(this.state.data[0])} onSort={this.handleSort}/>
                                                {
                                                    this.state.data
                                                    .sort((a,b) => {
                                                        let comparationFunction = (a, b) => {
                                                            if(!a) return 1;
                                                            if(!b) return -1;
                                                            if(typeof a === "number") return a - b;
                                                            if(moment(a).isValid())
                                                                return moment(a).isAfter(moment(b)) ? 1 : -1;
                                                            return a > b ? -1 : 1;
                                                        }
                                                        let sort = this.state.sort.toUpperCase();
                                                        return this.state.order === 'asc' ? comparationFunction(a[sort], b[sort]) : comparationFunction(b[sort], a[sort]);
                                                        // if(this.state.order === 'asc') {
                                                        //     return a[this.state.sort] > b[this.state.sort] ? 1 : -1
                                                        // }
                                                        // return b[this.state.sort] < a[this.state.sort] ? 1 : -1

                                                    })
                                                    .map( (row, index) => 
                                                        <DataTableRow key={index} row={row} />
                                                    )
                                                }
                                        </tbody>
                                    </table>
                                )
                            } else {
                                return <div className={styles.MarginLeft}>
                                    <FormattedMessage id="dataTable.DataTable.noDataMsg" defaultMessage="No hay datos que mostrar" />
                                </div>
                            }
                        })()
                    }
                    </CardContent>
                </Card>
            </div>
        );
    }

    getNewData = () => {
        
        let params = {
            day: moment().format('YYYY-MM-DD'),
            type: this.state.reportType, 
            start_date: moment(this.state.startDate).format('YYYY-MM-DD') + ' 06:00:00', 
            end_date: moment(this.state.endDate).add(1, 'day').format('YYYY-MM-DD') + ' 05:59:59'
        }

        api.get(`/datatables/${params.type}`, params).then( (response) => {

            /**
             * Converting keys to capital case
             */

            let newData = response.data.datos.map( element => {
                Object.keys(element).forEach( key => {
                    var k = key.toUpperCase();
                    if (key.toUpperCase() === '{:ABBR_DAY_NAMES=>["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"], :ABBR_MONTH_NAMES=>[NIL, "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"], :DAY_NAMES=>["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"], :FORMATS=>{:DEFAULT=>"%-D/%-M/%Y", :LONG=>"%-D DE %B DE %Y", :SHORT=>"%-D DE %B"}, :MONTH_NAMES=>[NIL, "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"], :ORDER=>[:DAY, :MONTH, :YEAR]}')
                    {
                        k = 'FECHA'
                    }
                    if(key.toUpperCase() === '{:AM=>"AM", :FORMATS=>{:DEFAULT=>"%A, %-D DE %B DE %Y %H:%M:%S %Z", :LONG=>"%-D DE %B DE %Y %H:%M", :SHORT=>"%-D DE %B %H:%M"}, :PM=>"PM"}')
                    {
                        k = 'HORA'
                    }

                    if (key.toUpperCase() === '{:FORMATS=>{:DEFAULT=>"%Y-%M-%D", :SHORT=>"%B %D", :LONG=>"%B %D, %Y"}, :DAY_NAMES=>["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"], :ABBR_DAY_NAMES=>["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], :MONTH_NAMES=>[NIL, "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"], :ABBR_MONTH_NAMES=>[NIL, "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], :ORDER=>[:YEAR, :MONTH, :DAY]}')
                    {
                        k = 'DATE'
                    }
                    if (key.toUpperCase() === '{:FORMATS=>{:DEFAULT=>"%A, %D %B %Y %H:%M:%S %Z", :SHORT=>"%D %B %H:%M", :LONG=>"%B %D, %Y %H:%M"}, :AM=>"AM", :PM=>"PM"}')
                    {
                        k = 'HOUR'
                    }

                    if (k !== key) {
                        //console.log(k)
                        element[k] = element[key];
                        delete element[key];
                    }
                })
                return element
            })

            this.setState({
                data: newData,
                dateRangeText: `${moment(this.state.startDate).format('YYYY-MM-DD')}, 6:00:00AM - ${moment(this.state.endDate).add(1, 'day').format('YYYY-MM-DD')}, 5:59:59AM`,
                fileName: `${this.state.selectedReport}_${moment(this.state.startDate).format('YYYY-MM-DD')}_6:00:00AM-${moment(this.state.endDate).add(1, 'day').format('YYYY-MM-DD')}_5:59:59AM.csv`
            })
        })
    }

    handleReportChange(e) {
        let selectedIndex = e.nativeEvent.target.selectedIndex;
        if (selectedIndex !== 0) {
            this.setState({
                reportType: e.target.value,
                selectedReport: e.nativeEvent.target[selectedIndex].text
            })
        }
    }

    handleStartDateChange = (date) => {
        this.setState({
            startDate: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        })
    }

    handleSort = (sort, order) => {
        this.setState({
            sort: sort,
            order: order
        })
    }
}

DataTable.propTypes = {
    intl: intlShape.isRequired,
}

export default injectIntl(DataTable);

