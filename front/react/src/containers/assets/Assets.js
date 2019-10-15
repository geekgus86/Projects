import React, { Component } from "react"
//import { connect } from "react-redux"
//import { bindActionCreators } from "redux"

//import { fetchUserList } from '../../store/user/actions'

import { guid } from "../../lib/utils"

import { Link } from 'react-router-dom'
import RoundedButton from '../../components/RoundedButton/RoundedButton'
import Section from '../../components/Section/Section'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SectionSubtitle from '../../components/SectionSubtitle/SectionSubtitle'
import PaginatedGrid from '../../components/PaginatedGrid/PaginatedGrid'
import Dropdown from '../../components/Dropdown/Dropdown'
import FormControl from '@material-ui/core/FormControl'
import CrudCard from '../../components/CrudCard/CrudCard'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog'
import DetailDialog from '../../components/DetailDialog/DetailDialog'
import AssetInfo from './AssetInfo/AssetInfo'
import AssetDetail from './AssetDetail/AssetDetail'

class Assets extends Component {    

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
        //await this.props.fetchUserList()
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
            this.props.history.push(`/admin/assets/edit/${this.state.selected.id}`)
        }
    }

    render() {    

        let arrAssets = []
            for(let i = 0; i<20; i++){
                arrAssets.push({ id: i, name: `Schuler ${i}` });
            };
            
        let arrFilters = []            
            arrFilters.push({ id: 1, name: "ENN" });
            arrFilters.push({ id: 2, name: "Proceso" });
            arrFilters.push({ id: 3, name: "Planta" });
            arrFilters.push({ id: 4, name: "Pais" });
            arrFilters.push({ id: 5, name: "Región" });
            arrFilters.push({ id: 6, name: "SBU" });

        return (
            <Section>
                <SectionTitle title="Prensas"/>
                <SectionSubtitle subtitle="Listado de prensas">
                    <Link to='/admin/assets/new' style={{ textDecoration: 'none' }}>
                        <RoundedButton title="Nueva prensa"/>    
                    </Link>
                </SectionSubtitle>
                <div container spacing={24}>
                {
                    arrFilters.map(filter => {
                        return (
                            <FormControl style={{ minWidth: "200px", margin: 10 }}>
                                <Dropdown label={filter.name} valueProp="id" textProp="name"></Dropdown>
                            </FormControl>
                        )
                    })
                }
                </div>
                <PaginatedGrid 
                    data={arrAssets} 
                    isLoading={this.state.loading} 
                    newUrl="/admin/assets/new" 
                    onPaginationChange={this.handlePaginationChange}>
                    {
                    (() => {
                        if (arrAssets !== null) {
                        return arrAssets.slice(this.state.start, this.state.end).map(item => {
                            return (
                            <CrudCard 
                                key={guid()}
                                data={item}
                                editRoute={`/admin/assets/edit/${item.id}`}
                                onDetailsClicked={this.handleDetailsClicked}
                                onDeleteClicked={this.handleDeleteClicked}>
                                <AssetInfo asset={item} />
                            </CrudCard>
                            )
                        })
                        }
                    })()
                }        
                </PaginatedGrid>
                
                <DetailDialog 
                    title="Detalle de prensa"
                    open={this.state.showDetailDialog}
                    onClose={this.handleCloseDetail}>
                    <AssetDetail asset={this.state.selected} />                    
                </DetailDialog>
                <DeleteDialog 
                    onCloseClicked={this.handleCloseClicked} 
                    open={this.state.showDeleteDialog}
                    title="Eliminar Usuario"
                    content={
                        <div>
                            Vas a eliminar una prensa
                            <br/>
                            ¿Seguro que deseas eliminarlo?
                        </div>
                    }/>
            </Section>        
        )
    }
}

export default Assets;