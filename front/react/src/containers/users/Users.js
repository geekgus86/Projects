import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUserList } from '../../store/user/actions'
//import { guid } from "../../lib/utils";

//import { Link } from 'react-router-dom'
import RoundedButton from '../../components/RoundedButton/RoundedButton'
import Section from '../../components/Section/Section'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
//import SectionSubtitle from '../../components/SectionSubtitle/SectionSubtitle'
import PaginatedPages from '../../components/PaginatedGrid/PaginatedPages'
import Dropdown from '../../components/Dropdown/Dropdown'
import FormControl from '@material-ui/core/FormControl'
//import TextField from '@material-ui/core/TextField'
//import CrudCard from '../../components/CrudCard/CrudCard'
//import UserInfo from "./UserInfo/UserInfo";
import UserDetail from './UserDetail/UserDetail'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog'
import DetailDialog from '../../components/DetailDialog/DetailDialog'
import DataTable from '../../components/Table/table'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import styles from './Users.less'

class Users extends PureComponent {
  state = {
    loading: true,
    start: 0,
    end: 5,
    search: "",
    showDetailDialog: false,
    showDeleteDialog: false,
    selected: null,
  }

  async componentDidMount() {
    await this.props.fetchUserList()
    this.setState({ loading: false })
  }

  handlePaginationChange = data => {
    this.setState({ start: data.start, end: data.end })
  }

  onClicked = () => {
    this.props.history.push(`/admin/users/new`);
  }

  DeleteItem = () => {
    alert("¿Desea elimiar usuario?");
  }

  handleDetailsClicked = data => {
    this.setState({ showDetailDialog: !this.state.showDetailDialog, selected: data })
  }

  handleDeleteClicked = data => {
    this.setState({ showDeleteDialog: !this.state.showDeleteDialog, selected: data })
  }

  handleCloseClicked = reason => {
    this.setState({ showDeleteDialog: !this.state.showDeleteDialog })
    if (reason === "accept") {
      // delete user
    }
  }

  handleCloseDetail = reason => {
    this.setState({ showDetailDialog: !this.state.showDetailDialog })
    if (reason === "edit") {
      this.props.history.push(`/admin/users/edit/${this.state.selected.id}`)
    }
  }

  render() {
    return (
      <Section>
        <SectionTitle title="Usuarios">
          <RoundedButton title="Agregar Usuario" onClickButton={this.onClicked}/>
        </SectionTitle>
        
        <div>
          <FormControl style={{ minWidth: 120, margin: 10 }}>
            <Dropdown label="Rol:" valueProp="id" textProp="name"></Dropdown>
          </FormControl>
          <FormControl style={{ minWidth: 120, margin: 10 }}>
            <Dropdown label="Ubicación:" valueProp="id" textProp="name"></Dropdown>
          </FormControl>
        </div>
        
        <PaginatedPages 
          data={this.props.list} 
          isLoading={this.state.loading}
          onPaginationChange={this.handlePaginationChange}>
        {
          (() => {
            // if (this.props.list !== null) {
            //   return this.props.list.slice(this.state.start, this.state.end).map(item => {
            //     return(
            //       **Here render table content**
            //       <DataTable />
            //     )
            //   })
            // }
                return (
                  <DataTable
                  name={
                    <div className={`${styles.NameContainer}`}>
                      <div className={`${styles.SpanGray}`}><span className={`${styles.GrayCircle}`}></span></div>
                      <div className={`${styles.NameTxt}`}><p>Paola Cecilia C. Guerrero</p></div>
                    </div>
                  }
                  rol={"Admin"}
                  userName={"asad"}
                  location={"wework"}
                  showDetail={"detalles/info"}
                  edit={
                    <Edit onClick={this.onClicked} />
                  }
                  delete={
                    <DeleteIcon onClick={this.handleDeleteClicked} />
                  }
                  />    
                )
          })()
        }        
        </PaginatedPages>

        <DetailDialog 
          title="Detalle de Usuario"
          open={this.state.showDetailDialog}
          onClose={this.handleCloseDetail}>
          <UserDetail user={this.state.selected} />
        </DetailDialog>

        <DeleteDialog 
          onCloseClicked={this.handleCloseClicked} 
          open={this.state.showDeleteDialog}
          title="Eliminar elemento"
          content={
            <div>
                Estás a punto de borrar el elemento Pablo Coronado
                <br />
                ¿Estás seguro que deseas eliminarlo?
            </div>
          }/>
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.user.list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);