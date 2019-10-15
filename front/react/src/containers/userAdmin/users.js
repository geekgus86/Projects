import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUserList } from '../../store/user/actions'
import { guid } from "../../lib/utils";

import { Link } from 'react-router-dom'
import RoundedButton from '../../components/RoundedButton/RoundedButton'
import Section from '../../components/Section/Section'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SectionSubtitle from '../../components/SectionSubtitle/SectionSubtitle'
import PaginatedGrid from '../../components/PaginatedGrid/PaginatedGrid'
import Dropdown from '../../components/Dropdown/Dropdown'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import CrudCard from '../../components/CrudCard/CrudCard'
import UserInfo from "./UserInfo/UserInfo";
import UserDetail from './UserDetail/UserDetail'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog'
import DetailDialog from '../../components/DetailDialog/DetailDialog'
import styles from './users.less'

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
        <SectionTitle title="Usuarios"/>
        <SectionSubtitle subtitle="Listado de Usuarios">
          <Link to='/admin/users/new' style={{ textDecoration: 'none' }}>
            <RoundedButton title="Nuevo Usuario"/>    
          </Link>
        </SectionSubtitle>

        <div>
          <FormControl style={{ minWidth: 120, margin: 10 }}>
            <TextField
              label="Buscar"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl style={{ minWidth: 120, margin: 10 }}>
            <Dropdown label="Planta" valueProp="id" textProp="name"></Dropdown>
          </FormControl>
          <FormControl style={{ minWidth: 120, margin: 10 }}>
            <Dropdown label="ENN" valueProp="id" textProp="name"></Dropdown>
          </FormControl>
        </div>

        <PaginatedGrid 
          data={this.props.list} 
          isLoading={this.state.loading} 
          newUrl="/admin/users/new" 
          onPaginationChange={this.handlePaginationChange}>
        {
          (() => {
            if (this.props.list !== null) {
              return this.props.list.slice(this.state.start, this.state.end).map(item => {
                return (
                  <CrudCard 
                    key={guid()}
                    data={item}
                    editRoute={`/admin/users/edit/${item.id}`}
                    onDetailsClicked={this.handleDetailsClicked}
                    onDeleteClicked={this.handleDeleteClicked}>
                    <UserInfo user={item} />
                  </CrudCard>
                )
              })
            }
          })()
        }        
        </PaginatedGrid>

        <DetailDialog 
          title="Detalle de Usuario"
          open={this.state.showDetailDialog}
          onClose={this.handleCloseDetail}>
          <UserDetail user={this.state.selected} />
        </DetailDialog>

        <DeleteDialog 
          onCloseClicked={this.handleCloseClicked} 
          open={this.state.showDeleteDialog}
          title="Eliminar Usuario"
          content={
            <div>
                Vas a eliminar un usuario
                <br/>
                ¿Seguro que deseas eliminarlo?
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