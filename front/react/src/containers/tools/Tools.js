
import React, { Component } from "react"
//import { connect } from "react-redux"
//import { bindActionCreators } from "redux"

//import { fetchUserList } from '../../store/user/actions'

import { guid } from "../../lib/utils"

import Section from '../../components/Section/Section'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import SectionSubtitle from '../../components/SectionSubtitle/SectionSubtitle'
import PaginatedGrid from '../../components/PaginatedGrid/PaginatedGrid'
import CrudCard from '../../components/CrudCard/CrudCard'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog'
import DetailDialog from '../../components/DetailDialog/DetailDialog'
import ToolInfo from './ToolInfo/ToolInfo'
import ToolDetail from './ToolDetail/ToolDetail'

class Tools extends Component {
    
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
            this.props.history.push(`/admin/tools/edit/${this.state.selected.id}`)
        }
    }

    render() {    
        
        let arrTools = [{"Id":1,"DescTool":"40155"},{"Id":2,"DescTool":"10007"},{"Id":3,"DescTool":"10006"},
                        {"Id":4,"DescTool":"10005"},{"Id":5,"DescTool":"40154"},{"Id":6,"DescTool":"40087"},
                        {"Id":7,"DescTool":"40088"},{"Id":8,"DescTool":"40093"},{"Id":9,"DescTool":"040011"},
                        {"Id":10,"DescTool":"040013"},{"Id":11,"DescTool":"020002"},{"Id":12,"DescTool":"040002"},
                        {"Id":13,"DescTool":"040003"},{"Id":14,"DescTool":"040004"},{"Id":15,"DescTool":"040005"},
                        {"Id":16,"DescTool":"10154"},{"Id":17,"DescTool":"10153"},{"Id":18,"DescTool":"040010"},
                        {"Id":19,"DescTool":"10008"},{"Id":20,"DescTool":"601669"},{"Id":21,"DescTool":"10174"},
                        {"Id":22,"DescTool":"10175"},{"Id":23,"DescTool":"101051"},{"Id":24,"DescTool":"401089"},
                        {"Id":25,"DescTool":"401090"},{"Id":26,"DescTool":"60063/64"},{"Id":27,"DescTool":"40095"},
                        {"Id":28,"DescTool":"601667"},{"Id":29,"DescTool":"050000"},{"Id":30,"DescTool":"020003"},
                        {"Id":31,"DescTool":"60063-4"}]
        return (
            <Section>
                <SectionTitle title="Herramientas"/>
                <SectionSubtitle subtitle="Listado de herramientas"/>
                <PaginatedGrid 
                    data={arrTools} 
                    isLoading={this.state.loading} 
                    newUrl="/admin/tools/new" 
                    onPaginationChange={this.handlePaginationChange}>
                    {
                    (() => {
                        if (arrTools !== null) {
                        return arrTools.slice(this.state.start, this.state.end).map(item => {
                            return (
                            <CrudCard 
                                key={guid()}
                                data={item}
                                editRoute={`/admin/tools/edit/${item.Id}`}
                                onDetailsClicked={this.handleDetailsClicked}
                                onDeleteClicked={this.handleDeleteClicked}>
                                <ToolInfo tool={item} />                          
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
                    <ToolDetail tool={this.state.selected} />
                </DetailDialog>

                
                <DeleteDialog 
                    onCloseClicked={this.handleCloseClicked} 
                    open={this.state.showDeleteDialog}
                    title="Eliminar Usuario"
                    content={
                        <div>
                            Vas a eliminar una herramienta
                            <br/>
                            ¿Seguro que deseas eliminarlo?
                        </div>
                    }/>
            </Section>        
        )
    }
}

export default Tools;