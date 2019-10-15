import React from 'react'
import styles from './table.less'
import Grid from '@material-ui/core/Grid'
import ArrowDown from '../../assets/arrowDown.png'

export default (props) => {
    return(
        <Grid className={`${styles.TableContainer}`}> 
        <table className={`${styles.MainTable}`}>
            <thead>
                <tr>
                    <th>Nombre <img alt="desc" src={ArrowDown} /></th>
                    <th>Rol <img alt="desc" src={ArrowDown} /></th>
                    <th>Área <img alt="desc" src={ArrowDown} /></th>
                    <th>Nombre Usuario <img alt="desc" src={ArrowDown} /></th>
                    <th>Correo <img alt="desc" src={ArrowDown} /></th>
                    <th colSpan = {1}></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.name}</td>
                    <td>{props.rol}</td>
                    <td>{props.userName}</td>
                    <td>{props.location}</td>
                    <td>{props.showDetail}</td>
                    <td className={`${styles.icons}`}>{props.delete} {props.edit}</td>
                </tr>
                <tr>
                    <td>{props.name}</td>
                    <td>Admin</td>
                    <td>pablo.coronadoh</td>
                    <td>pablo@sensai.net</td>
                    <td>Región México</td>
                    <td className={`${styles.icons}`}>{props.delete} {props.edit}</td>
                </tr>
                <tr>
                    <td>{props.name}</td>
                    <td>Admin</td>
                    <td>pablo.coronadoh</td>
                    <td>pablo@sensai.net</td>
                    <td>Región México</td>
                    <td className={`${styles.icons}`}>{props.delete} {props.edit}</td>
                </tr>
            </tbody>
        </table>
        </Grid>
    )
}
