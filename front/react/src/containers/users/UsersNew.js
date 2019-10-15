import React, { PureComponent } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchUser } from '../../store/user/actions'
import Section from '../../components/Section/Section'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SectionAdmin from '../../components/SectionAdminTitle/SectionAdminTitle'
import SectionSubtitle from '../../components/SectionSubtitle/SectionSubtitle'
// import { TextField, Paper, FormControl, Grid } from '@material-ui/core'
//import Dropdown from '../../components/Dropdown/Dropdown'
import UserAvatar from '../../components/UserAvatar/UserAvatar'
import RoundedButton from '../../components/RoundedButton/RoundedButton'
//import SuccessDialog from '../../components/SuccessDialog/SuccessDialog'
import stylesUsers from './Users.less'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog'
import InputLabel from '@material-ui/core/InputLabel'
// import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

class UsersNew extends PureComponent {
  state = {
    open: false,
    mode: "new",
    sectionTitle: "Nuevo Usuario",
    username: "",
    password: "",
    email: "",
    name: "",
    firstLastname: "",
    secondLastname: ""
  }

  componentDidMount() {
    const isEdit = (this.props.match.path === "/admin/users/edit/:id")
    if (isEdit) {
      this.props.fetchUser(this.props.match.params.id)
      this.setState({ mode: isEdit, sectionTitle: "Editar Usuario" })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = () => {
    this.setState({ open: !this.state.open })
  }

  handleDissmissAlert = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <Section>
        <SectionTitle title="Usuarios"/>
        <SectionSubtitle subtitle={this.state.sectionTitle}></SectionSubtitle>
        
          <Grid container spacing={16}>
            <Grid item md={4} className={`${stylesUsers.Avatar}`}  spacing={4}>
              <Paper>
                <UserAvatar name={this.state.name} lastname={this.state.firstLastname} />
              </Paper>
            </Grid>

            <Grid item md={8} className={`${stylesUsers.FormContent}`}>
            <Paper className={`${stylesUsers.ContainerPaper}`}>
              <form noValidate autoComplete="off">
                <Grid container md={12} justify="center" spacing={4}>
                  <Grid item md={12}>

                    <Grid item direction="row" className={`${stylesUsers.InfoContent}`}>
                      <SectionAdmin 
                        title="Información General"
                        row1={
                          <div className={`${stylesUsers.flex}`}>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                  Nombre(s):
                                </InputLabel>
                                <TextField
                                id={`${stylesUsers.txtField}`}
                                className={`${stylesUsers.marginEdited}`}
                                // placeholder="Name"
                                margin="normal"
                                variant="outlined"
                                />
                            </div>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                Apellido Paterno:
                                </InputLabel>
                              <TextField 
                                className={`${stylesUsers.marginEdited}`}
                                id={`${stylesUsers.txtField}`}
                                // placeholder="Apellido Paterno"
                                name="secondLastname"
                                value={this.state.secondLastname}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                              />
                            </div>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                Apellido Materno:
                                </InputLabel>
                              <TextField 
                                className={`${stylesUsers.marginEdited}`}
                                id={`${stylesUsers.txtField}`}
                                // placeholder="Apellido Materno"
                                name="secondLastnameM"
                                value={this.state.username}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                              />
                            </div>
                          </div>
                        }
                        row2={
                          <div className={`${stylesUsers.flex}`}>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                  Número de Nómina:
                                </InputLabel>
                                <TextField
                                id={`${stylesUsers.txtField}`}
                                className={`${stylesUsers.marginEdited}`}
                                // placeholder="Name"
                                margin="normal"
                                variant="outlined"
                                />
                            </div>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                TADI:
                                </InputLabel>
                              <TextField 
                                className={`${stylesUsers.marginEdited}`}
                                id={`${stylesUsers.txtField}`}
                                // placeholder="Apellido Paterno"
                                name="secondLastname"
                                value={this.state.secondLastname}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                              />
                            </div>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                Idioma:
                                </InputLabel>
                              <TextField 
                                className={`${stylesUsers.marginEdited}`}
                                id={`${stylesUsers.txtField}`}
                                // placeholder="Apellido Materno"
                                name="secondLastnameM"
                                value={this.state.username}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                              />
                            </div>
                          </div>
                        }
                      />
                    </Grid>

                    <Grid item direction="row" className={`${stylesUsers.InfoContent}`}>
                    <div className={`${stylesUsers.DisplayBlock}`}>
                      <SectionAdmin 
                        title="Rol en Compañía"
                        block={`${stylesUsers.block}`}
                        row1={
                          <div>
                            <Select
                              // value={this.state.age}
                              onChange={this.handleChange}
                              name="age"
                              displayEmpty
                              className={`${stylesUsers.UserInput}`}
                            >
                              <MenuItem value="" disabled>
                                Placeholder
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <Select
                              // value={this.state.age}
                              onChange={this.handleChange}
                              name="age"
                              displayEmpty
                              className={`${stylesUsers.UserInput}`}
                            >
                              <MenuItem value="" disabled>
                                Placeholder
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </div>
                        }
                      />
                    </div>
                        
                    </Grid>
                    
                    <Grid item direction="row" className={`${stylesUsers.InfoContent}`}>
                    <SectionAdmin 
                        title="Cuenta Sensai"
                        row1={
                          <div className={`${stylesUsers.flex}`}>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                  Label 1
                                </InputLabel>
                                <TextField
                                id={`${stylesUsers.txtField}`}
                                className={`${stylesUsers.marginEdited}`}
                                // placeholder="Name"
                                margin="normal"
                                variant="outlined"
                                />
                            </div>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                Email:
                                </InputLabel>
                              <TextField 
                                className={`${stylesUsers.marginEdited}`}
                                id={`${stylesUsers.txtField}`}
                                // placeholder="Apellido Paterno"
                                name="secondLastname"
                                value={this.state.secondLastname}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                              />
                            </div>
                            <div className={`${stylesUsers.UserInput}`}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                Password:
                                </InputLabel>
                              <TextField 
                                className={`${stylesUsers.marginEdited}`}
                                id={`${stylesUsers.txtField}`}
                                // placeholder="Apellido Materno"
                                name="secondLastnameM"
                                value={this.state.username}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                              />
                            </div>
                          </div>
                        }
                      />
                    </Grid>

                    {/* <FormControl fullWidth={true}>
                      <Dropdown label="Grupo" />
                    </FormControl>                 */}
                    
                  </Grid>
                </Grid>
              </form>
              </Paper>

              {/* <Paper>
                <FormControl>
                  <InputLabel shrink htmlFor="bootstrap-input" className={`${stylesUsers.UserInput}`}>
                    Bootstrap
                  </InputLabel>
                  <InputBase
                    id="bootstrap-input"
                    defaultValue="react-bootstrap"
                    className={`${stylesUsers.UserInput}`}
                  />
                </FormControl>
              </Paper> */}

              <Grid container spacing={4} direction="row" md={12} justify="flex-end" className={`${stylesUsers.buttons}`}>
                <Grid item xs={2}>
                  <RoundedButton title={"Cancelar"} type="outlinedBlue" onClickButton={() => this.props.history.goBack()} />
                </Grid>
                <Grid item xs={3}>
                  <RoundedButton title={"Guardar Cambios"} onClickButton={this.handleSave} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        {/* <SuccessDialog 
          title="Usuario creado"
          text="Se ha agregado exitosamente un nuevo usuario."
          open={this.state.open} 
          onClose={this.handleDissmissAlert}/> */}

          <DeleteDialog
            title="Modificar información"
            open={this.state.open}
            onCloseClicked={this.handleDissmissAlert}
            content={
              <div>Estás a punto de modificar la información.
                <br />
                ¿Quieres guardar los cambios?
              </div>
            }
          />
        
      </Section>
    )
  }
}

function mapStateToProps(state) {
  return {
    edit: state.user.edit
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersNew);