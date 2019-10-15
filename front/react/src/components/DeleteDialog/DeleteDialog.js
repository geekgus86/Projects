import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RoundedButton from '../RoundedButton/RoundedButton';
import stylesDialog from './DialogDelete.less';

export default (props) => {
    const handleClose = reason => {
        props.onCloseClicked && props.onCloseClicked(reason)
    }
    return (
        <Dialog
            open={props.open}
            aria-labelledby="responsive-dialog-title"
            maxWidth="md"
            fullWidth={false}
            onBackdropClick={() => handleClose("backdrop")}>
            <DialogTitle id="responsive-dialog-title" className={`${stylesDialog.dialogTitle}`}>
                <span>{props.title}</span>
            </DialogTitle>

            <DialogContent className={`${stylesDialog.contentDialog}`}>
                <div className={`${stylesDialog.borders}`}>{props.content}</div>
            </DialogContent>

            <DialogActions className={`${stylesDialog.ActionDialog}`}>
                <RoundedButton className={`${stylesDialog.closeBtn}`} onClickButton={() => handleClose("cancel")} type="outlinedBlue" title="Cerrar"/>
                <RoundedButton className={`${stylesDialog.saveBtn}`} onClickButton={() => handleClose("accept")} title="Aceptar"/>
            </DialogActions>
        </Dialog>
	);
};