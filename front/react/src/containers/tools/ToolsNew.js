
import React, { Component } from "react"

import Grid from '@material-ui/core/Grid';
import RoundedButton from '../../components/RoundedButton/RoundedButton'

import { Link } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Section from '../../components/Section/Section'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SectionSubtitle from '../../components/SectionSubtitle/SectionSubtitle'
import styles from './ToolsNew.less'

class ToolsNew extends Component {

    state = {
        DescTool: ''
    }

    handleChange = (event) =>{
        console.log(event.target)
        this.setState({DescTool: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target);
        for (var pair of data.entries())
        {
            console.log(pair[0]+ ' --> '+ pair[1]); 
        }
    }

    render() {
        return (                
        <form onSubmit={this.handleSubmit}>
            <Section>
                <SectionTitle title="Herramientas"/>
                <SectionSubtitle subtitle={ ((this.props.match.params.id!==undefined) ? "Editar herramienta: "+this.props.match.params.id : "Nueva herramienta") }/>
                
                    
                <Paper className={styles.mainPaper}>
                    <Grid container spacing={24}>

                        <Grid item xs={4}>
                            <TextField
                                label="Nombre de herramienta"
                                fullWidth
                                inputProps={{
                                    maxLength: 30,
                                    minLength: 5
                                }}
                                name="DescTool"
                                value={this.state.DescTool}                                
                                onChange={this.handleChange}
                                type="text"
                                required                                
                            /> 
                            <input type="url" name="website" required pattern="https?://.+"/>
                        </Grid>


                        <Grid item xs={12}>
                            <SectionSubtitle subtitle="Caracteristicas"/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-name"
                                label="Fabricante"
                                margin="normal"
                                
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-name"
                                label="Tool ID"
                                margin="normal"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-name"
                                label="Peso"
                                margin="normal"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-name"
                                label="Prensa principal"
                                margin="normal"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <br/>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-name"
                                label="Prensa alternativa"
                                margin="normal"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    </Grid> 
                </Paper>
                <br/>
                <Grid container>
                    <Link to='/admin/tools' style={{ textDecoration: 'none' }}>
                        <RoundedButton type="outlinedBlue" title="Cancelar"/>
                    </Link>
                    <RoundedButton className={styles.btnGuardar} title="Guardar"/>
                    <input type="submit" value="Submit" />
                </Grid>
            </Section>
        </form>
        )
    }
}

export default ToolsNew