import React from 'react';
import RoundedButton from '../../components/RoundedButton/RoundedButton'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Link } from 'react-router-dom'

const styles = {
    content : {
        padding: '20px 10px'
    }, 
    bottom : {
        padding: 10, 
        borderTop: '1px solid rgba(0,0,0,.1)'
    },
    deleteButton:{
        cursor: 'pointer', 
        color: 'red',
        marginLeft: 10
    },
    editButton:{
        cursor: 'pointer'
    }
}

export default (props) => {
    const handleDeleteClick = () => {
        props.onDeleteClicked && props.onDeleteClicked(props.data)
    }
    const handleDetailClick = () => {
        props.onDetailsClicked && props.onDetailsClicked(props.data)
    }
    return (
        <Grid item xs={props.size || 3}>
            <Paper>
                <Grid container alignItems="center" style={styles.content}>       
                    {props.children}
                </Grid>
                <Grid container style={styles.bottom} justify="space-between" alignItems="center">
                    <RoundedButton onClickButton={handleDetailClick} type="outlinedBlue" title="Ver detalle"/>
                    <Grid item>
                        <Link to={(props.editRoute) ? props.editRoute : "/" }>
                            <EditOutlinedIcon style={styles.editButton}/>
                        </Link>
                        <DeleteOutlinedIcon onClick={handleDeleteClick} style={styles.deleteButton} />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
	);
};