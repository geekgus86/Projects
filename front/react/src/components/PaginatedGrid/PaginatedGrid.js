import React, { PureComponent } from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import AddCard from '../AddCard/AddCard'

class PaginatedGrid extends PureComponent {
  state = {
    rowsPerPage: 5,
    page: 0,
  }

  callBack = () => {
    const { page, rowsPerPage } = this.state
    const data = {
      start: page * rowsPerPage,
      end: page * rowsPerPage + rowsPerPage,
      empty: rowsPerPage - Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage)
    }
    this.props.onPaginationChange && this.props.onPaginationChange(data)
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, () => {
      this.callBack()
    })
    
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.callBack()
    })    
  }

  render() {
    const { data, isLoading, children, newUrl } = this.props
    let mainContent = <CircularProgress />
    if (!isLoading) {
      mainContent = (
        <React.Fragment>
          <Grid container spacing={24}>
            {children}
            <AddCard url={newUrl}/>
          </Grid>
          <TablePagination 
            component="div"
            // count={data.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </React.Fragment>
      )
    }
    return (
      <div>
      {
        (() => {
          if (data) {
            return mainContent
          } else {
            return <div>No hay datos que mostrar</div>
          }
        })()
      }
      </div>
    );
  }
}

export default PaginatedGrid