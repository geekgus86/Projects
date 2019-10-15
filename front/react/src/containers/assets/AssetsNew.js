
import React, { Component } from "react"
import LabelTitulo from '../../components/LabelTitulo/LabelTitulo'
import LabelSubtitulo from '../../components/LabelSubtitulo/LabelSubtitulo'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RoundedButton from '../../components/RoundedButton/RoundedButton'
import styles from './AssetsNew.less';
import { Link } from "react-router-dom";

class AssetsNew extends Component {
    render() {
        return (
            <main style={{ padding: '30px' }}>
                <LabelTitulo titulo="Prensas"/>
                <br/>
                <LabelSubtitulo subtitle={ ((this.props.match.params.id!==undefined) ? "Editar prensa: "+this.props.match.params.id : "Nueva prensa") } />                 
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Paper className={styles.leftPanel}>
                            <Avatar style={{  height: "130px", width: "130px" }} alt="Prensa" 
                                        src="https://i.ytimg.com/vi/wkyb81SK5bs/maxresdefault.jpg"/>
                            
                            <input 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                id="raised-button-file" 
                                type="file" 
                            />
                            <label htmlFor="raised-button-file"> 
                                <Button className={styles.btnSubir} component="span"> 
                                    Subir imagen 
                                </Button>
            

                            </label> 
                            <Button className={styles.btnEliminar}> 
                                Eliminar Imagen 
                            </Button>
                                        
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>                    
                        <Paper className={styles.rightPanel}>
                        <Grid container spacing={24}>          
                            <Grid item xs={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">Marca</InputLabel>
                                    <Select
                                        //value={this.state.age}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">ENN</InputLabel>
                                    <Select
                                        //value={this.state.age}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">SBU</InputLabel>
                                    <Select
                                        //value={this.state.age}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                   <span className={styles.spanText}>Tipo de alimentación</span>                                    
                                  {/* <FormControl style={{ width: "100%" }}>

                                    <FormControlLabel
                                        value="female"
                                        control={<Radio color="primary" />}
                                        label="Coil"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio color="primary" />}
                                        label="Destaker"
                                    />
                                    {/*<Radio
                                                    //checked={this.state.selectedValue === 'b'}
                                                    //onChange={this.handleChange}
                                                    color="primary"
                                                    value="b"
                                                    name="radio-button-demo"
                                                    aria-label="B"
                                                />* /}
                                    </FormControl>
*/}
                                        <FormControlLabel
                                                                                control={<Radio color="primary" />}

                                        label="Coil"
                                        />
                                        <FormControlLabel
                                                                                control={<Radio color="primary" />}

                                        label="Destaker"
                                        />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">Region</InputLabel>
                                    <Select
                                        //value={this.state.age}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">Pais</InputLabel>
                                    <Select
                                        //value={this.state.age}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">Planta</InputLabel>
                                    <Select
                                        //value={this.state.age}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>                           
                        </Paper>
                    </Grid>

                    <Grid item xs={12} className={styles.bottomPanel}>
                        <Link to='/admin/assets' style={{ textDecoration: 'none' }}>
                            <RoundedButton type="outlinedBlue" title="Cancelar"/>
                        </Link>
                        <RoundedButton className={styles.btnGuardar} title="Guardar"/>
                    </Grid>
                </Grid>
            </main>
        )
    }
}

export default AssetsNew;