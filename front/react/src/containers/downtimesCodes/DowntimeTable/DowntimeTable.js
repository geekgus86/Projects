import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Grid } from '@material-ui/core'
import styles from '../DowntimesAdmin.less'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import RoundedButton from '../../../components/RoundedButton/RoundedButton';
import EditDialog from '../../../components/EditDialog/editDialog.js'
import EditIcon from "../../../assets/square-edit-outline48.png"

const DowntimeTable = (props) => {
    return(
        <Grid className={`d-flex`} container spacing={24}>
            <Grid item xs={3}>
            <FormControl className={`col-12`}>
                <InputLabel htmlFor="age-simple">Categoría</InputLabel>
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
                    <MenuItem value={10}>Value</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid item xs={3}>
            <FormControl className={`col-12`}>
            <InputLabel htmlFor="age-simple">Código</InputLabel>
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
                    <MenuItem value={10}>Apodaca, N.L.</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid container spacing={24} className={styles.TableContainer}>
                <table className={`${styles.MainTable} col-12`}>
                    <thead>
                        <tr>
                            <td colSpan="6">
                                Paros de producción
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={props.checkedBox}
                                    onChange={props.changedBoxes}
                                    value="areas"
                                    />
                                }
                                label="Áreas"
                                />
                            </td>
                            <td>Categoría</td>
                            <td>Código</td>
                            <td>Descripción</td>
                            <td>Fecha de modificación</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={props.checkedBox}
                                onChange={props.changedBoxes}
                                value="antoine"
                                />
                            }
                            className={`${styles.formControlLabel}`}
                            label="Herramientas"
                            />
                            
                            </td>
                            <td>
                                <span>-</span>
                            </td>
                            <td>
                                <span>HD-152</span>
                            </td>
                            <td>
                                <span>Materia prima fuera</span>
                            </td>
                            <td>
                                <span>Ago/10/2018 3:14 PM</span>
                            </td>
                            <td>
                                <EditDialog 
                                    clickProps={props.EditDowntime}
                                    img={EditIcon}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={props.checkedBox}
                                onChange={props.changedBoxes}
                                value="antoine2"
                                />
                            }
                            className={`${styles.formControlLabel}`}
                            label="Herramientas"
                            />
                            </td>
                            <td>
                                <span>-</span>
                            </td>
                            <td>
                                <span>HD-152</span>
                            </td>
                            <td>
                                <span>Materia prima fuera</span>
                            </td>
                            <td>
                                <span>Ago/10/2018 3:14 PM</span>
                            </td>
                            <td>
                                <EditDialog 
                                    clickProps={props.EditDowntime}
                                    img={EditIcon}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={props.checkedBox}
                                onChange={props.changedBoxes}
                                value="antoine1"
                                />
                            }
                            className={`${styles.formControlLabel}`}
                            label="Herramientas"
                            />
                            </td>
                            <td>
                                <span>-</span>
                            </td>
                            <td>
                                <span>HD-152</span>
                            </td>
                            <td>
                                <span>Materia prima fuera</span>
                            </td>
                            <td>
                                <span>Ago/10/2018 3:14 PM</span>
                            </td>
                            <td>
                                <EditDialog 
                                    clickProps={props.EditDowntime}
                                    img={EditIcon}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Grid>
        </Grid>
    )
}

export default DowntimeTable