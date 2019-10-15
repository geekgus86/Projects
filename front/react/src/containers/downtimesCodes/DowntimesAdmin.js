import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import RoundedButton from '../../components/RoundedButton/RoundedButton'
import Section from '../../components/Section/Section'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
//import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import DowntimeTable from './DowntimeTable/DowntimeTable'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog'

class downtimeCodes_Admin extends Component {
    state = {
        activeTabPrincipal: 0,
        activeTabEstatusActual: 0,
        activeTabMedicion: 0,
        activeTabCasoUso: 0,
        activeTabEstado: 0,
        open: false,
        showDeleteDialog: false,
        selected: null,
        checkboxS: []
    }

    handleChecked = (event, checkboxS) => {
        this.setState({ checkboxS });
    }

    handleDeleteClicked = () => {
        this.setState({ showDeleteDialog: !this.state.showDeleteDialog })
    }

    handleCloseClicked = () => {
        this.setState({ showDeleteDialog: !this.state.showDeleteDialog })
    }

    cambiaTabPrincipal = (event, activeTabPrincipal) => {
        this.setState({ activeTabPrincipal });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    render() {

        let labelTab = " ";
        let buttonText = " ";
        let checkboxS = this.handleChecked;

        switch(this.state.activeTabPrincipal){
            case 0:    
                labelTab = "Producción"
                buttonText = "producción"
            break;
            case 1:
                labelTab = "Changeover"
                buttonText = "changeover"
            break;
            case 2:
                labelTab = "Tiempo Fuera"
                buttonText = "tiempo fuera"
            break;
            default:
                labelTab = " "
                buttonText = " "
            break;
        }

        return(
            <div>
                <Tabs
                    value={this.state.activeTabPrincipal}
                    onChange={this.cambiaTabPrincipal}
                    indicatorColor="primary"
                    >                        
                    <Tab label="Producción" />
                    <Tab label="Changeover" />
                    <Tab label="Tiempo fuera" />
                </Tabs>

                <Section>
                    <SectionTitle title={`Códigos de ${labelTab}`} >
                        <RoundedButton title={`Agregar paro de  ${buttonText}`} onClickButton={this.handleDeleteClicked} />
                    </SectionTitle>
                    
                    <span>{checkboxS.length}</span>

                    <Grid>
                        {this.state.activeTabPrincipal === 0 && 
                            <DowntimeTable
                                EditDowntime={this.handleDeleteClicked}
                                checkedBox={checkboxS}
                                changedBoxes={this.handleChecked}
                            />
                        }
                        {this.state.activeTabPrincipal === 1 && <div>Temporal 1</div>}
                        {this.state.activeTabPrincipal === 2 && <div>Temporal 2</div>}
                    </Grid>
                </Section>

                <DeleteDialog
                onCloseClicked={this.handleCloseClicked} 
                open={this.state.showDeleteDialog}
                title={`Eliminar paro de ${labelTab}`}
                content={
                    <div>
                        Eliminar paro(s) de {labelTab}
                        <br/>
                        ¿Deseas eliminarlo(s)?
                    </div>
                }
                />
            </div>
        )
    }
}

export default downtimeCodes_Admin