import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
const styles = {
    content : {
        border: '3px dashed #b4b4b4',
        borderRadius: '20px',
        maxHeight: '100%',
        minHeight: "158px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#A6A8AB",
        fontSize: "70px",
        fontFamily: "serif",
        cursor: "pointer"
    }
}

export default (props) => {
    return (
        <Grid item xs={3}>
            <Link to={props.url} style={{ textDecoration: 'none' }}>
                <div style={styles.content}>{"+"}</div>
            </Link>
        </Grid>
	);
};
                    


                    