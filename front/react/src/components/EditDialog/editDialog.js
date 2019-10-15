import React from "react"
import Button from '@material-ui/core/Button'
import stylesDialog from './EditDialog.less'

export default (props) => {
    return(
    <Button className={`${stylesDialog.EditDialog}`} onClick={props.clickProps}>
        <img alt="imageEdit" src={props.img}/>
    </Button>
    );
};