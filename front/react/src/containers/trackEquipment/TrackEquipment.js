import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import stylesPress from './TrackEquipment.less';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Doughnut from '../../components/Doughnut/Doughnut'
import Linechart from '../../components/Linechart/Linechart'
import FullScreenLoader from '../../components/FullScreenLoader/FullScreenLoader'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { fetchLastestSensorLog, fetchLastestValuesBySensor } from "../../store/trackEquipment/actions";
import moment from "moment-timezone";
import "moment/locale/es";
import openSocket from 'socket.io-client';
import { Chart } from "react-chartjs-2";
import SensorImg from '../../assets/press-image.png';
import { FormattedMessage, injectIntl, intlShape } from "react-intl";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class TrackEquipment extends Component {
    state = {
        loading: true,
        activeTabPrincipal: 0,
        activeTabEstatusActual: 0,
        activeTabMedicion: 0,
        activeTabCasoUso: 0,
        activeTabEstado: 0,
        sensors: [], 
        fechaUltimaActualizacion: [], 
        modalAbierto: false,
        vidaPrensa: {
            data: {
                labels: [
                    this.props.intl.formatMessage({ id: 'trackEquipment.graphTitle' }, { defaultMessage: 'barfoo' }),
                    "",
                ],
                datasets: [{
                    data: [90, 10],
                    backgroundColor: [
                        "#96cc5b", "#eeeeee", 
                    ],
                    hoverBackgroundColor: [
                        "#96cc5b", "#eeeeee", 
                    ]
                }]
            }, 
            options: {
                refName: "chartVidaPrensa",
                title: {
                    text: this.props.intl.formatMessage({ id: 'trackEquipment.graphTitle' }, { defaultMessage: 'barfoo' }),
                    display: true,
                },
                legend: {
                    display: false
                },
                elements: {
                    Center: {
                        text: '20%',
                        color: '#000000', // Default is #000000
                        fontStyle: 'Arial', // Default is Arial
                        sidePadding: 20 // Defualt is 20 (as a percentage)
                    }
                }
            }
        },
        sensorModal: {
            sensor: {},
            data: {
                labels: [],
                datasets: []
            }, 
            options: {
                responsive: true,
                title: {
                    display: false,
                },
                tooltips: {
                    mode: 'x',
                    xAlign: 'center',
                    yAlign: 'center'
                },
                legend: {
                    position: 'bottom',
                    onClick: (e) => e.stopPropagation()
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'HORA'
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        } 
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }  
                    }]
                }
            }
        }
    };

    getColor(sensor){
        let value = parseFloat(sensor.Value)
        let maximum = parseFloat(sensor.MaxValue)
        let minimum = parseFloat(sensor.MinValue)
        let cmaximum = parseFloat(sensor.CMaxValue)
        let cminimum = parseFloat(sensor.CMinValue)
        
        let colorClass = 'green'        
        if(cmaximum > cminimum){
            if(value>=minimum && value<=maximum){
                colorClass = 'green'
            }else{
                if(value>=cminimum && value<=cmaximum){
                    colorClass = 'yellow'
                }else{
                    colorClass = 'red'
                }
            }
        }else{
            if(value>=minimum){
                colorClass = 'green'
            }else{
                if(value>=cmaximum && value<=cminimum){
                    colorClass = 'red'
                }else{
                    colorClass = 'yellow'
                }
            }
        }

        return colorClass
    }
    
    componentDidMount() {
        const socket = openSocket('https://sfms.metalsa.com:9999');
        //let socket = io.connect('http://i40appmasterqa.westus.cloudapp.azure.com:9999');
        //let socket = io.connect('http://localhost:9999');
        socket.on('sensors', data => {
            this.setState({  fechaUltimaActualizacion: moment().format('DD/MMM/YYYY, HH:mm')});            
            this.updateValue(data);    
            this.calculateHealth()
        });

        //Este es como el document ready, aqui buscamos los valores de los sensores en el backend
        this.props.fetchLastestSensorLog().then(() => {            

            this.setState({ loading: false });

            console.log(this.props.arrSensors)

            if (this.props.arrSensors.length!==0){
                let lastValueUpdate = (this.props.arrSensors.sort(function(a,b){
                    return new Date(b.dateLastUpdated) + new Date(a.dateLastUpdated);
                }))[0];
                
                this.setState({fechaUltimaActualizacion: moment(lastValueUpdate.dateLastUpdated).format('DD/MMM/YYYY, HH:mm')});               
                this.setState({ sensors: this.props.arrSensors.map(sensor => { 
                    let newSensor = sensor;
                        newSensor.color = this.getColor(sensor);                
                        return newSensor;
                    })
                })
            }
            
            //Calculemos la vida de la prensa
            this.calculateHealth()
        });
    }

    updateValue(data){
        const index = this.state.sensors.findIndex(s => s.DataTag===data.sensorid);
        const sensores = this.state.sensors;
        //Es necesario ya que hay sensores no registrados
        if(sensores[index]!==undefined){
            sensores[index].Value = data.value;
            sensores[index].color = this.getColor(sensores[index]);    
            this.forceUpdate();
        }
    }

    calculateHealth(){       

        let resultado = this.state.sensors.reduce((suma, sensor) => {
            if(sensor.color==="yellow"){
                suma-=sensor.HWarning
            }else if(sensor.color==="red"){
                suma-=sensor.HCritical
            }
            return suma
        }, 100);

        let colorPrensa = "#4CB676";
        if(resultado>=70 && resultado < 90){
            colorPrensa = "#FAC943";
        }else if(resultado < 70){
            colorPrensa = "#EA5557";
        }

        const vidaPrensa = this.state.vidaPrensa;
                vidaPrensa.data.datasets[0].data = [resultado,(100-resultado)];                
                vidaPrensa.data.datasets[0].backgroundColor = [colorPrensa, "#eeeeee"];
                vidaPrensa.data.datasets[0].hoverBackgroundColor = [colorPrensa, "#eeeeee"];
        this.forceUpdate();
        
        Chart.plugins.register({
			beforeDraw: function(chart) {

                if(chart.config.options.refName!=="chartVidaPrensa"){
                    return
                }
                
                let ctx = chart.ctx;
                let fontStyle = 'Arial';
                let color = '#000';
                let sidePadding = 0;
                let sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "10px " + fontStyle;
                
                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                let stringWidth = ctx.measureText(resultado).width;
                let elementWidth = (chart.innerRadius * 5) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                let widthRatio = elementWidth / stringWidth;
                let newFontSize = Math.floor(2 * widthRatio);
                let elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                let fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse+"px " + fontStyle;

                //Este despinta :D el numero anterior
                ctx.clearRect(25, 20, centerX, centerY);

                ctx.fillStyle = color;                
                ctx.fillText(resultado + "%", centerX, centerY);                
            }
        });
    }

    cambiaTabPrincipal = (event, activeTabPrincipal) => {
        this.setState({ activeTabPrincipal });
    };

    cambiaTabEstatusActual = (event) => { 
        this.setState({ activeTabEstatusActual: event.target.value })
    }

    cambiaTabMedicion = (event) => { 
        this.setState({ activeTabMedicion: event.target.value })
    }

    cambiaTabCasoUso = (event) => { 
        this.setState({ activeTabCasoUso: event.target.value })
    }

    cambiaTabEstado = (event) => { 
        this.setState({ activeTabEstado: event.target.value })
    }
    
    renderRowEstatusActual = (sensor,i) => {
        let currentColor = stylesPress.PointGreen;

        if(sensor.color === 'yellow'){
            currentColor = stylesPress.PointYellow
        }else if(sensor.color === 'red'){
            currentColor = stylesPress.PointRed
        }

        return (
            <tr key={i}>
                <td onClick={() => { this.abrirModalGrafica(sensor) }} style={{ cursor: 'pointer' }}>                    
                    <span className={ stylesPress.PointAlert + ` ` + currentColor }></span>{sensor.Reference}
                </td>
                <td>{sensor.Location}</td>
                <td>{sensor.FunctionType}</td>
                <td>{sensor.Value} {sensor.Unit}</td>
                <td>{sensor.CMinValue} {sensor.Unit}</td>
                <td>{sensor.CMaxValue} {sensor.Unit}</td>
                <td>N/A</td>
            </tr>
        );
    }


    renderSensorsByMedicion = () => {         
        let arrMedicion = this.state.sensors.map(a => a.FunctionType);
        let sensorsByMedicion = [...new Set(arrMedicion)];

        //Haciendo sort del array base a custom strings
        let orderMedicion = ['Flujo', 'Nivel', 'Temperatura', 'Presion', 'Proximidad'];
        sensorsByMedicion.sort(function(a, b) {
            return orderMedicion.indexOf(a) - orderMedicion.indexOf(b);
        });

        //Haciendo sort del array base a custom strings
        let contentMedicion = this.state.sensors.filter(sensor => sensor.FunctionType===sensorsByMedicion[this.state.activeTabMedicion]);        
        let sortOrder = ['red', 'yellow', 'green'];
        contentMedicion.sort(function(a, b) {
            return sortOrder.indexOf(a.color) - sortOrder.indexOf(b.color);
        });

        return (
            <div className={`${stylesPress.tabsEstatusContainer} tab-content`}>
                <div role="tabpanel" className={stylesPress.NoPadd + ` ` + stylesPress.Overflow} id="medicion">
                    <div>
                        <ul className={`nav ${stylesPress.NavTabs}`} role="tablist">      
                            {sensorsByMedicion.map((medicionGroup,i) => (                        
                                <li key={i} value={i} onClick={this.cambiaTabMedicion} className={this.state.activeTabMedicion === i ? stylesPress.active : undefined}>
                                    {medicionGroup}
                                </li>
                            ))}
                        </ul>
                    </div>                                    
                    <table border="1" className={`col-12 ` + stylesPress.TabPane + ` `+ stylesPress.FormatTable + ` ` + stylesPress.active} id="tableFlujoMedicion">
                        <thead>
                            <tr>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.sendorId" defaultMessage="Sensor ID" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.location" defaultMessage="Ubicación" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.type" defaultMessage="Tipo" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.value" defaultMessage="Valor" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.inferiorLimit" defaultMessage="Límite Inferior" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.upperLimit" defaultMessage="Límite Superior" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.workOrder" defaultMessage="Orden de Trabajo" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className={stylesPress.FormatBodyTable}>
                            {contentMedicion.map((sensor, i) => (                        
                                this.renderRowEstatusActual(sensor, i)
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>                   
        );
    }

    renderSensorsByCasoUso = () => {        
        let arrCasoUso = this.state.sensors.map(a => a.UseCase);        
        let sensorsByCasoUso = [...new Set(arrCasoUso)];        
            //Filtrando el caso de uso no disponible :)
            sensorsByCasoUso = sensorsByCasoUso.filter(usecase => {
                return usecase !== "No disponible"
            });
            sensorsByCasoUso.sort();
        
        let contentCasoUso = this.state.sensors.filter(sensor => sensor.UseCase===sensorsByCasoUso[this.state.activeTabCasoUso]);
        
        //Haciendo sort del array base a custom strings
        let sortOrder = ['red', 'yellow', 'green'];
        contentCasoUso.sort(function(a, b) {
            return sortOrder.indexOf(a.color) - sortOrder.indexOf(b.color);
        });

        return (
            <div className={`${stylesPress.tabsEstatusContainer} tab-content`}>
                <div role="tabpanel" className={stylesPress.NoPadd + ` ` + stylesPress.Overflow} id="medicion">
                    <div>
                        <ul className={`nav ${stylesPress.NavTabs}`} role="tablist">                            
                            {sensorsByCasoUso.map((casoUsoGroup,i) => (                        
                                <li key={i} value={i} onClick={this.cambiaTabCasoUso} className={this.state.activeTabCasoUso === i ? stylesPress.active : undefined}>
                                    {casoUsoGroup}
                                </li>
                            ))}
                        </ul>
                    </div>                                    
                    <table border="1" className={`col-12 ${stylesPress.FormatTable} ${stylesPress.TabPane} ${stylesPress.active}`} id="tableFlujoMedicion">
                        <thead>
                            <tr>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.sendorId" defaultMessage="Sensor ID" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.location" defaultMessage="Ubicación" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.type" defaultMessage="Tipo" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.value" defaultMessage="Valor" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.inferiorLimit" defaultMessage="Límite Inferior" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.upperLimit" defaultMessage="Límite Superior" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.workOrder" defaultMessage="Orden de Trabajo" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className={stylesPress.FormatBodyTable}>
                            {contentCasoUso.map((sensor, i) => (                        
                                this.renderRowEstatusActual(sensor, i)
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>                   
        );
    }
    
    renderSensorsByEstatus = () => {
        
        let contentEstado = [];
        if(this.state.activeTabEstado === 0){
            contentEstado = this.state.sensors.filter(sensor => sensor.color === "red")
        }else if (this.state.activeTabEstado === 1){
            contentEstado = this.state.sensors.filter(sensor => sensor.color === "yellow")
        }else if (this.state.activeTabEstado === 2){
            contentEstado = this.state.sensors.filter(sensor => sensor.color === "green")
        }

        return (
            <div className={`${stylesPress.tabsEstatusContainer} tab-content`}>
                <div role="tabpanel" className={ stylesPress.NoPadd + ` ` + stylesPress.TabPane+ ` ` + stylesPress.Overflow} id="medicion">
                    <div>
                        <ul className={` nav ${stylesPress.NavTabs}`} role="tablist">                                  
                            <li value={0} onClick={this.cambiaTabEstado} className={this.state.activeTabEstado === 0 ? stylesPress.active : undefined}>
                                <FormattedMessage id="trackEquipment.table.critic" defaultMessage="Crítico" />
                            </li>
                            <li value={1} onClick={this.cambiaTabEstado} className={this.state.activeTabEstado === 1 ? stylesPress.active : undefined}>
                                <FormattedMessage id="trackEquipment.table.alert" defaultMessage="Alerta" />
                            </li>
                            <li value={2} onClick={this.cambiaTabEstado} className={this.state.activeTabEstado === 2 ? stylesPress.active : undefined}>
                                <FormattedMessage id="trackEquipment.table.goodState" defaultMessage="Buen estado" />
                            </li>  
                        </ul>
                    </div>                                    
                    <table border="1" className={`col-12 ${stylesPress.FormatTable} ${stylesPress.TabPane} ${stylesPress.active}`} id="tableFlujoMedicion">
                        <thead>
                            <tr>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.sendorId" defaultMessage="Sensor ID" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.location" defaultMessage="Ubicación" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.type" defaultMessage="Tipo" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.value" defaultMessage="Valor" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.inferiorLimit" defaultMessage="Límite Inferior" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.upperLimit" defaultMessage="Límite Superior" />
                                </th>
                                <th className={stylesPress.first}>
                                    <FormattedMessage id="trackEquipment.table.workOrder" defaultMessage="Orden de Trabajo" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className={stylesPress.FormatBodyTable}>
                            {contentEstado.map((sensor,i) => (                        
                                this.renderRowEstatusActual(sensor,i)
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>                   
        );
    }

    abrirModalGrafica = (sensor) => {
        const sensorModal = this.state.sensorModal;
            sensorModal.sensor = sensor;

        this.props.fetchLastestValuesBySensor(sensor.ID).then(() => {
            let arrData = this.props.arrLastestValuesBySensor;
            sensorModal.sensor.lastTimestamp = arrData[0].CreatedAt;

            let labels = []
            let dataValues = []
            let usl = []
            let lsl = []
            let arrWarningMinium = []
            let arrWarningMaxium = []

            for (let data of arrData) {
                dataValues.push(data.Value)
                labels.push(moment(data.CreatedAt).format('HH:mm'))

                lsl.push(sensor.CMinValue)
                usl.push(sensor.CMaxValue)

                arrWarningMinium.push(sensor.MinValue)
                arrWarningMaxium.push(sensor.MaxValue)
            }

            let datasets = [{
                    label: 'USL',//Maximo
                    backgroundColor: 'red',
                    borderColor: 'red',
                    data: usl,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'WMax',//WMaximo
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    data: arrWarningMaxium,
                    fill: false,
                    pointRadius: 0
                }, {
                    label: 'Medición',
                    fill: false,
                    backgroundColor: 'black',
                    borderColor: 'black',
                    data: dataValues
                }, 
                {
                    label: 'WMin',//WLower
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    data: arrWarningMinium,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'LSL',//Lower
                    backgroundColor: 'red',
                    borderColor: 'red',
                    data: lsl,
                    fill: false,
                    pointRadius: 0
                }
            ];

            sensorModal.data.labels = labels;
            sensorModal.data.datasets = datasets;
            
            this.forceUpdate();
            this.setState({ modalAbierto: true });
        });
    };

    cerrarModalGrafica = () => {
        this.setState({ modalAbierto: false });
    };

    render() {
        let redSensors = this.state.sensors.filter(sensor => sensor.color === "red");
        let yellowSensors = this.state.sensors.filter(sensor => sensor.color === "yellow");
        //let greenSensors = this.state.sensors.filter(sensor => sensor.color === "green");        
        let currentColor = this.state.sensorModal.sensor.color;

        if (this.state.sensorModal.sensor.color === 'yellow') {
            currentColor = stylesPress.PointYellow
        } else if (this.state.sensorModal.sensor.color === 'red') {
            currentColor = stylesPress.PointRed
        } else if (this.state.sensorModal.sensor.color === 'green') {
            currentColor = stylesPress.PointGreen
        }
        
        if (this.state.loading === true) {
            return (<FullScreenLoader />)
        }

        return (
            <div>
                <Dialog
                    open={this.state.modalAbierto}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className={stylesPress.DialogWidth}
                    fullWidth={true}
                    maxWidth="md"
                    >                    
                    <DialogContent className={`${stylesPress.ScrollOverlay}`}>                        
                            <Grid className={`d-flex`}>
                                <div className={`col-6`}>
                                    <h4>
                                        <FormattedMessage id="trackEquipment.modal.sensorLbl" defaultMessage="Sensor" />
                                    </h4>
                                    <h6>
                                        <span className={stylesPress.PointAlert + ` ` + currentColor}></span> {this.state.sensorModal.sensor.Reference}
                                    </h6>
                                </div>
                            <div className={`col-6 ${stylesPress.Right}`}>
                                <h4>
                                    <FormattedMessage id="trackEquipment.modal.lastUpdateLbl" defaultMessage="Última actualización" />
                                </h4>
                                <h6 className={stylesPress.Uppercase}>
                                    {moment(this.state.sensorModal.sensor.lastTimestamp).format('DD/MMM/YYYY, HH:mm')}
                                </h6>
                            </div>                            
                            </Grid>
                            <Grid item>
                                <Linechart data={this.state.sensorModal.data} options={this.state.sensorModal.options} />
                            </Grid>
                    </DialogContent>
                    <DialogActions>                        
                        <Button onClick={this.cerrarModalGrafica} className={`${stylesPress.ButtonClose}`}>
                            <FormattedMessage id="trackEquipment.modal.closeBtn" defaultMessage="Cerrar" />
                        </Button>
                    </DialogActions>
                </Dialog>


                <Grid item xs={12}>
                    <Tabs
                        value={this.state.activeTabPrincipal}
                        onChange={this.cambiaTabPrincipal}
                        className={stylesPress.MainTabs}
                        indicatorColor="primary"
                        >                        
                        <Tab className={stylesPress.tabsTxt} label={
                            <FormattedMessage id="trackEquipment.tabs.board" defaultMessage="Tablero" />
                        }/>
                        <Tab className={stylesPress.tabsTxt} label={
                            <FormattedMessage id="trackEquipment.tabs.alarms" defaultMessage="Alarmas y Notificaciones" />
                        }/>
                        <Tab className={stylesPress.tabsTxt} label={
                            <FormattedMessage id="trackEquipment.tabs.historyTrends" defaultMessage="Historial y Tendencias" />
                        }/>
                        <Tab className={stylesPress.tabsTxt} label={
                            <FormattedMessage id="trackEquipment.tabs.prediction" defaultMessage="Predicción" />
                        }/>
                        <Tab className={stylesPress.tabsTxt} label={
                            <FormattedMessage id="trackEquipment.tabs.criticallity" defaultMessage="Matriz de Criticidad" />
                        }/>
                    </Tabs>
                </Grid>
                <Grid container style={{ padding: '10px 40px',  marginTop:20 }}>                        
                        {this.state.activeTabPrincipal === 0 && 
                            <React.Fragment>                                
                                <Grid container className="d-flex">
                                    <Grid item xs={4} className={stylesPress.DivSpace}>
                                        <div className={stylesPress.TitleBottom}>
                                            <h3 className={stylesPress.Uppercase}>
                                                <FormattedMessage id="trackEquipment.pressHealth" defaultMessage="Salud de prensa" />
                                            </h3>
                                        </div>
                                        <div className={stylesPress.DivContent + ` ` + stylesPress.ShadowBox + ` d-flex`}>
                                            <div className={stylesPress.VidaPrensa}>
                                                <Doughnut 
                                                    data={this.state.vidaPrensa.data} 
                                                    options={this.state.vidaPrensa.options} 
                                                    className={stylesPress.CanvaDoughnut} 
                                                    width={500}
                                                    height={500}
                                                />
                                            </div>
                                            <div className={stylesPress.InfoPrensa}>
                                                <h5>
                                                    <FormattedMessage id="trackEquipment.press" defaultMessage="Prensa" />
                                                </h5>
                                                <p>Schuler A</p>
                                                <h5>
                                                    <FormattedMessage id="trackEquipment.lastUpdate" defaultMessage="Última actualización" />
                                                </h5>
                                                <p className={stylesPress.resumenTimeStamp + ` ` + stylesPress.Uppercase}>
                                                    { this.state.fechaUltimaActualizacion }
                                                </p>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={stylesPress.TitleBottom}>
                                            <h3 className={stylesPress.Uppercase}>
                                                <FormattedMessage id="trackEquipment.sensorStatusTitle" defaultMessage="ESTATUS DE LOS SENSORES" />
                                            </h3>
                                        </div>
                                        <Grid container className="d-flex">
                                            <Grid item xs={6} className={`${stylesPress.DivSpace}`}>
                                                <table className={stylesPress.ResTable}>
                                                    <thead className={stylesPress.HeaderTable}>
                                                        <tr className={stylesPress.HeaderTableRed}>
                                                            <th className={stylesPress.FontWhite}>
                                                                <FormattedMessage id="trackEquipment.table.critic" defaultMessage="Crítico" />
                                                            </th>
                                                            <th className={stylesPress.FontWhite + ` ` + stylesPress.Center}>{redSensors.length}</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                                <div className={stylesPress.Container + ` ` + stylesPress.NoPadd + ` ` + stylesPress.ShadowBox}>
                                                    <table className={`${stylesPress.ResTable} ${stylesPress.OverflowInside}`}>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.sensorLbl" defaultMessage="Sensor" />
                                                                </th>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.value" defaultMessage="Valor" />
                                                                </th>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.inferiorLimit" defaultMessage="Límite Inferior" />
                                                                </th>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.upperLimit" defaultMessage="Límite Superior" />
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {redSensors.map((sensor,i) => (
                                                                <tr key={i}>
                                                                    <td onClick={() => { this.abrirModalGrafica(sensor) }} style={{ cursor: 'pointer' }}>                    
                                                                        <span className={stylesPress.PointAlert + ` ` + stylesPress.PointRed}></span>{sensor.Reference}
                                                                    </td>
                                                                    <td>{sensor.Value} {sensor.Unit || '°'}</td>
                                                                    <td>{sensor.CMinValue} {sensor.Unit || '°'}</td>
                                                                    <td>{sensor.CMaxValue} {sensor.Unit || '°'}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} className={stylesPress.DivSpace}>
                                                <table className={stylesPress.ResTable}>
                                                    <thead className={stylesPress.HeaderTable}>
                                                        <tr className={stylesPress.HeaderTableYellow}>
                                                            <th className={stylesPress.FontWhite}>
                                                                <FormattedMessage id="trackEquipment.table.alert" defaultMessage="Alerta" />
                                                            </th>
                                                            <th className={stylesPress.FontWhite + ` ` + stylesPress.Center}>{yellowSensors.length}</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                                <div className={stylesPress.Container + ` ` + stylesPress.NoPadd + ` ` + stylesPress.ShadowBox}>                                                
                                                    <table className={`${stylesPress.ResTable} ${stylesPress.OverflowInside}`}>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.sensorLbl" defaultMessage="Sensor" />
                                                                </th>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.value" defaultMessage="Valor" />
                                                                </th>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.inferiorLimit" defaultMessage="Límite Inferior" />
                                                                </th>
                                                                <th>
                                                                    <FormattedMessage id="trackEquipment.table.upperLimit" defaultMessage="Límite Superior" />
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {yellowSensors.map((sensor,i) => (
                                                                <tr key={i}>                 
                                                                    <td onClick={() => { this.abrirModalGrafica(sensor) }} style={{ cursor: 'pointer' }}>                    
                                                                        <span className={stylesPress.PointAlert + ` ` + stylesPress.PointYellow}></span>{sensor.Reference}
                                                                    </td>
                                                                    <td>{sensor.Value} {sensor.Unit || '°'}</td>
                                                                    <td>{sensor.MinValue} {sensor.Unit || '°'}</td>
                                                                    <td>{sensor.MaxValue} {sensor.Unit || '°'}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid> 
                                
                                <Grid container style={{ marginTop:20 }} className="d-flex">
                                    <Grid item xs={3} className={stylesPress.DivSpace}>
                                        <div className={stylesPress.TitleBottom}>
                                            <h3 className={stylesPress.Uppercase}>
                                                <FormattedMessage id="trackEquipment.sensorLocation" defaultMessage="UBICACIÓN DE SENSORES" />
                                            </h3>
                                        </div>
                                        <div className={stylesPress.DivContent + ` ` + stylesPress.ShadowBox}>
                                            <img alt="sensores" src={SensorImg} className={stylesPress.ImageStyle}/>
                                        </div>                                        
                                    </Grid>
                                    <Grid item xs={9} className={`${stylesPress.DivSpace} ${stylesPress.PaddModify}`}>
                                        <div className={stylesPress.TitleBottom}>
                                            <h3 className={stylesPress.Uppercase}>
                                                <FormattedMessage id="trackEquipment.sensorCurrrentStatus" defaultMessage="ESTATUS ACTUAL DE SENSORES" />
                                            </h3>
                                        </div>
                                        <div className={`${stylesPress.TabButtons} d-flex`}>
                                            <ul className={`${stylesPress.NavTabs} ${stylesPress.PaddTabs}  d-flex`} role="tablist">
                                                <li value="0" onClick={this.cambiaTabEstatusActual} role="presentation" className={this.state.activeTabEstatusActual === 0 ? stylesPress.active : undefined}>
                                                    <FormattedMessage id="trackEquipment.measurement" defaultMessage="Medición" />
                                                </li>
                                                <li value="1" onClick={this.cambiaTabEstatusActual} role="presentation" className={this.state.activeTabEstatusActual === 1 ? stylesPress.active : undefined}>
                                                    <FormattedMessage id="trackEquipment.useCase" defaultMessage="Caso de uso" />
                                                </li>
                                                <li value="2" onClick={this.cambiaTabEstatusActual} role="presentation" className={this.state.activeTabEstatusActual === 2 ? stylesPress.active : undefined}>
                                                    <FormattedMessage id="trackEquipment.sensorStatus" defaultMessage="Estatus" />
                                                </li>
                                            </ul>
                                        </div>
                                                                             
                                        {this.state.activeTabEstatusActual === 0 && this.renderSensorsByMedicion()}
                                        {this.state.activeTabEstatusActual === 1 && this.renderSensorsByCasoUso()}
                                        {this.state.activeTabEstatusActual === 2 && this.renderSensorsByEstatus()}
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        }
                        {this.state.activeTabPrincipal === 1 && <div>Temporal 1</div>}
                        {this.state.activeTabPrincipal === 2 && <div>Temporal 2</div>}
                        {this.state.activeTabPrincipal === 3 && <div>Temporal 3</div>}
                        {this.state.activeTabPrincipal === 4 && <div>Temporal 4</div>}
                </Grid>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        arrSensors: state.trackEquipment.arrSensors,
        arrLastestValuesBySensor: state.trackEquipment.arrLastestValuesBySensor      
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchLastestSensorLog, fetchLastestValuesBySensor }, dispatch);
}

TrackEquipment.propTypes = {
    intl: intlShape.isRequired,
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TrackEquipment));